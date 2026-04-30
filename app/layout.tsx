import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZeroDB + Next.js Template',
  description: 'Next.js 14 starter with semantic search, AI chat memory, and file storage via ZeroDB.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0D1117] text-white antialiased">
        <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-bold text-lg">
            <span className="text-blue-400">ZeroDB</span> × Next.js
          </a>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/search" className="hover:text-white transition-colors">Search</a>
            <a href="/chat" className="hover:text-white transition-colors">Chat</a>
            <a href="/upload" className="hover:text-white transition-colors">Upload</a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
