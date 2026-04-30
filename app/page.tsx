export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
        Next.js 14 + ZeroDB Starter
      </div>
      <h1 className="text-5xl font-bold mb-4">
        Build AI apps with <span className="text-blue-400">persistent memory</span>
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
        This template includes semantic search, AI chat with ZeroDB memory, and S3-compatible file uploads — all wired up and ready to customize.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 text-left mb-12">
        {[
          { href: '/search', icon: '🔍', title: 'Semantic Search', desc: 'Vector search over your documents via ZeroDB' },
          { href: '/chat', icon: '💬', title: 'AI Chat + Memory', desc: 'Claude/GPT chat with persistent context via ZeroDB Memory API' },
          { href: '/upload', icon: '📁', title: 'File Upload', desc: 'S3-compatible file storage via ZeroDB' },
        ].map(({ href, icon, title, desc }) => (
          <a
            key={href}
            href={href}
            className="block p-5 bg-[#161B22] border border-gray-800 rounded-xl hover:border-blue-500/40 transition-colors"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-semibold text-sm mb-1">{title}</div>
            <div className="text-gray-500 text-xs">{desc}</div>
          </a>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://github.com/AINative-Studio/zerodb-nextjs-template"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-[#161B22] border border-gray-700 rounded-lg text-sm font-medium hover:border-gray-500 transition-colors"
        >
          GitHub →
        </a>
        <a
          href="https://docs.ainative.studio/docs/api/zerodb"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          ZeroDB Docs →
        </a>
      </div>
    </div>
  );
}
