/**
 * ZeroDB client for Next.js
 * Wraps the ZeroDB REST API for vectors, memory, and file storage.
 *
 * Provision a free ZeroDB instance:
 *   curl -X POST https://api.ainative.studio/api/v1/instant-db -d '{}'
 */

const BASE_URL = process.env.ZERODB_BASE_URL || 'https://api.ainative.studio';
const API_KEY = process.env.ZERODB_API_KEY!;
const PROJECT_ID = process.env.ZERODB_PROJECT_ID!;

function headers() {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    'X-Project-ID': PROJECT_ID,
  };
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ZeroDB ${method} ${path} → ${res.status}: ${err}`);
  }
  return res.json() as Promise<T>;
}

// ─── Vector search ────────────────────────────────────────────────────────────

export interface VectorResult {
  id: string;
  score: number;
  metadata: Record<string, unknown>;
  text?: string;
}

export const vectors = {
  /** Upsert documents — ZeroDB embeds them automatically */
  async upsert(docs: { id: string; text: string; metadata?: Record<string, unknown> }[]) {
    return req('POST', '/api/v1/public/memory/v2/embed-batch', { documents: docs });
  },

  /** Semantic search — returns top-k similar documents */
  async search(query: string, topK = 5): Promise<VectorResult[]> {
    const res = await req<{ results: VectorResult[] }>(
      'POST',
      '/api/v1/public/memory/v2/search',
      { query, limit: topK }
    );
    return res.results ?? [];
  },
};

// ─── Memory API ───────────────────────────────────────────────────────────────

export interface MemoryResult {
  key: string;
  content: string;
  metadata: Record<string, unknown>;
  score?: number;
}

export const memory = {
  /** Store a memory */
  async remember(key: string, content: string, metadata?: Record<string, unknown>) {
    return req('POST', '/api/v1/public/memory/v2/remember', { key, content, metadata });
  },

  /** Recall memories relevant to a query */
  async recall(query: string, limit = 10): Promise<MemoryResult[]> {
    const res = await req<{ results: MemoryResult[] }>(
      'POST',
      '/api/v1/public/memory/v2/recall',
      { query, limit }
    );
    return res.results ?? [];
  },

  /** Forget a specific key */
  async forget(key: string) {
    return req('DELETE', `/api/v1/public/memory/v2/forget/${encodeURIComponent(key)}`);
  },
};

// ─── File storage (S3-compatible) ─────────────────────────────────────────────

export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
}

export const files = {
  /** Upload a file — returns public URL */
  async upload(file: File, path?: string): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    if (path) formData.append('path', path);

    const res = await fetch(`${BASE_URL}/api/v1/public/storage/upload`, {
      method: 'POST',
      headers: { 'X-API-Key': API_KEY, 'X-Project-ID': PROJECT_ID },
      body: formData,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    return res.json();
  },
};

export const zerodb = { vectors, memory, files };
export default zerodb;
