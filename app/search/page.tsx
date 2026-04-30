'use client';

import { useState } from 'react';

interface Result {
  id: string;
  score: number;
  text?: string;
  metadata: Record<string, unknown>;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, topK: 5 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Semantic Search</h1>
      <p className="text-gray-400 mb-8 text-sm">
        Vector search over your indexed documents via ZeroDB.
      </p>

      <form onSubmit={search} className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your documents..."
          className="flex-1 px-4 py-2.5 bg-[#161B22] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.id} className="p-4 bg-[#161B22] border border-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-mono">{r.id}</span>
                <span className="text-xs text-blue-400 font-mono">
                  {(r.score * 100).toFixed(1)}% match
                </span>
              </div>
              {r.text && <p className="text-gray-300 text-sm">{r.text}</p>}
              {Object.keys(r.metadata).length > 0 && (
                <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
                  {JSON.stringify(r.metadata, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <p className="text-gray-600 text-sm text-center py-8">
          No results found. Try indexing some documents first via <code className="text-blue-400">PUT /api/search</code>.
        </p>
      )}
    </div>
  );
}
