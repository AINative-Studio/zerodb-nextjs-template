import { NextRequest } from 'next/server';
import { memory } from '@/lib/zerodb';

/**
 * POST /api/chat
 * Body: { messages: { role: string; content: string }[]; sessionId: string }
 *
 * Retrieves relevant ZeroDB memories, prepends them as context,
 * then streams a response from Claude or GPT.
 * Stores the new turn to ZeroDB memory for future recall.
 */
export async function POST(req: NextRequest) {
  const { messages, sessionId = 'default' } = await req.json();
  const userMessage: string = messages[messages.length - 1]?.content ?? '';

  // Recall relevant memories from ZeroDB
  let contextBlock = '';
  try {
    const recalled = await memory.recall(userMessage, 8);
    if (recalled.length > 0) {
      contextBlock =
        '\n\n[Relevant context from memory]\n' +
        recalled.map((m) => `- ${m.content}`).join('\n') +
        '\n';
    }
  } catch {
    // Memory recall is non-critical
  }

  const systemPrompt =
    `You are a helpful AI assistant with access to persistent memory via ZeroDB.${contextBlock}` +
    '\nAnswer concisely. If you recall relevant context from memory, use it.';

  // Try Anthropic first, fall back to OpenAI
  if (process.env.ANTHROPIC_API_KEY) {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    // Store the user turn to memory (fire-and-forget)
    memory.remember(`${sessionId}-${Date.now()}`, userMessage, {
      role: 'user',
      sessionId,
      timestamp: new Date().toISOString(),
    }).catch(() => {});

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  if (process.env.OPENAI_API_KEY) {
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
    });

    memory.remember(`${sessionId}-${Date.now()}`, userMessage, {
      role: 'user',
      sessionId,
      timestamp: new Date().toISOString(),
    }).catch(() => {});

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(
    JSON.stringify({ error: 'Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env.local' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}
