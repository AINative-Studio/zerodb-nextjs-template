'use client';

import { useState, useCallback } from 'react';

interface UploadResult {
  url: string;
  key: string;
  bucket: string;
}

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState('');

  async function uploadFile(file: File) {
    setUploading(true);
    setError('');
    setResult(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">File Upload</h1>
      <p className="text-gray-400 mb-8 text-sm">
        Upload files to ZeroDB S3-compatible storage. Max 50MB.
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
          dragging ? 'border-blue-500 bg-blue-500/5' : 'border-gray-700 hover:border-gray-600'
        }`}
      >
        <div className="text-4xl mb-4">📁</div>
        <p className="text-gray-400 mb-4">Drag and drop a file, or</p>
        <label className="cursor-pointer">
          <span className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            {uploading ? 'Uploading...' : 'Choose file'}
          </span>
          <input
            type="file"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
          />
        </label>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-5 bg-[#161B22] border border-green-800/50 rounded-xl">
          <div className="flex items-center gap-2 text-green-400 font-medium text-sm mb-3">
            ✓ Uploaded successfully
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">URL: </span>
              <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                {result.url}
              </a>
            </div>
            <div><span className="text-gray-500">Key: </span><code className="text-gray-300">{result.key}</code></div>
            <div><span className="text-gray-500">Bucket: </span><code className="text-gray-300">{result.bucket}</code></div>
          </div>
        </div>
      )}
    </div>
  );
}
