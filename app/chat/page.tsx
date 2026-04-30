'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SESSION_ID = `session-${Math.random().toString(36).slice(2, 9)}`;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || streaming) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setStreaming(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages([...updated, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, sessionId: SESSION_ID }),
      });

      if (!res.body) throw new Error('No response body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages([...updated, { role: 'assistant', content: full }]);
      }
    } catch (err) {
      setMessages([...updated, { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}` }]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="mb-4">
        <h1 className="text-3xl font-bold">AI Chat</h1>
        <p className="text-gray-400 text-sm mt-1">
          Conversations are stored in ZeroDB memory and recalled as context.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 py-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-16 text-gray-600 text-sm">
            Start a conversation. ZeroDB will remember context across sessions.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#161B22] border border-gray-800 text-gray-200'
              }`}
            >
              {m.content || <span className="text-gray-500 animate-pulse">▋</span>}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          disabled={streaming}
          className="flex-1 px-4 py-2.5 bg-[#161B22] border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
