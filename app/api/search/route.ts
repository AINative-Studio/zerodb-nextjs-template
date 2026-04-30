import { NextRequest, NextResponse } from 'next/server';
import { vectors } from '@/lib/zerodb';

/**
 * POST /api/search
 * Body: { query: string; topK?: number }
 * Returns: { results: VectorResult[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { query, topK = 5 } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'query is required' }, { status: 400 });
    }
    const results = await vectors.search(query.trim(), topK);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('[/api/search]', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

/**
 * PUT /api/search
 * Body: { id: string; text: string; metadata?: object }[]
 * Indexes documents for future search.
 */
export async function PUT(req: NextRequest) {
  try {
    const docs = await req.json();
    if (!Array.isArray(docs)) {
      return NextResponse.json({ error: 'Expected array of documents' }, { status: 400 });
    }
    await vectors.upsert(docs);
    return NextResponse.json({ ok: true, indexed: docs.length });
  } catch (error) {
    console.error('[/api/search PUT]', error);
    return NextResponse.json({ error: 'Index failed' }, { status: 500 });
  }
}
