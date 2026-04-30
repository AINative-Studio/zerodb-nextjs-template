# ZeroDB × Next.js Template

A production-ready Next.js 14 App Router starter with [ZeroDB](https://zerodb.ainative.studio) — the persistent knowledge layer for AI agents. Includes semantic search, vector storage, file uploads, and a working AI chat with memory.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/zerodb-nextjs)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AINative-Studio/zerodb-nextjs-template)

---

## What's included

- **Semantic search** — vector search over your documents using ZeroDB embeddings
- **AI chat with memory** — Claude/GPT chat that remembers context across sessions via ZeroDB Memory API
- **File uploads** — S3-compatible file storage via ZeroDB
- **Auth** — NextAuth.js with GitHub OAuth + credentials
- **UI** — Tailwind CSS, shadcn/ui components, dark mode

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Database / Memory | ZeroDB (vectors, SQL, files, memory) |
| Auth | NextAuth.js v5 |
| AI | Vercel AI SDK + Claude / OpenAI |
| Deployment | Railway or Vercel |

---

## Quick start

### 1. Clone

```bash
git clone https://github.com/AINative-Studio/zerodb-nextjs-template.git my-app
cd my-app
npm install
```

### 2. Set up ZeroDB (free, no credit card)

```bash
# Provision a ZeroDB instance instantly — returns your API key
curl -X POST https://api.ainative.studio/api/v1/instant-db \
  -H "Content-Type: application/json" \
  -d '{}' | jq .
```

Copy the `api_key` and `project_id` from the response.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# ZeroDB
ZERODB_API_KEY=your_api_key_here
ZERODB_PROJECT_ID=your_project_id_here
ZERODB_BASE_URL=https://api.ainative.studio

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI (pick one or both)
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
├── app/
│   ├── (auth)/           # Login / signup pages
│   ├── chat/             # AI chat with ZeroDB memory
│   ├── search/           # Semantic search UI
│   ├── upload/           # File upload to ZeroDB
│   └── api/
│       ├── chat/         # AI chat route (Vercel AI SDK)
│       ├── search/       # Semantic search route
│       └── upload/       # File upload route
├── lib/
│   ├── zerodb.ts         # ZeroDB client (vectors, memory, files)
│   └── auth.ts           # NextAuth config
├── components/
│   ├── chat/             # Chat UI components
│   ├── search/           # Search bar and results
│   └── ui/               # shadcn/ui base components
└── .env.example
```

---

## ZeroDB API usage

The template uses three ZeroDB capabilities:

### Vector search

```ts
// lib/zerodb.ts
import { ZeroDBClient } from './zerodb';

const zerodb = new ZeroDBClient({
  apiKey: process.env.ZERODB_API_KEY!,
  projectId: process.env.ZERODB_PROJECT_ID!,
});

// Store a document with embedding
await zerodb.vectors.upsert([{
  id: 'doc-1',
  text: 'ZeroDB is a persistent knowledge layer for AI agents.',
  metadata: { source: 'docs', category: 'intro' },
}]);

// Semantic search
const results = await zerodb.vectors.search({
  query: 'how does ZeroDB work?',
  topK: 5,
});
```

### Memory API (chat history)

```ts
// Remember a conversation turn
await zerodb.memory.remember({
  key: `session-${sessionId}`,
  content: userMessage,
  metadata: { role: 'user', timestamp: new Date().toISOString() },
});

// Recall relevant context
const context = await zerodb.memory.recall({
  query: userMessage,
  limit: 10,
});
```

### File storage

```ts
// Upload a file
const { url } = await zerodb.files.upload(file, {
  bucket: 'uploads',
  path: `users/${userId}/${file.name}`,
});
```

---

## Deploy

### Railway (recommended)

1. Fork this repo
2. Create a new Railway project → "Deploy from GitHub repo"
3. Add environment variables in Railway dashboard
4. Deploy

### Vercel

1. Click the "Deploy with Vercel" button above
2. Add environment variables
3. Deploy

---

## Environment variables reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ZERODB_API_KEY` | ✅ | ZeroDB API key from `POST /api/v1/instant-db` |
| `ZERODB_PROJECT_ID` | ✅ | ZeroDB project ID |
| `ZERODB_BASE_URL` | ✅ | `https://api.ainative.studio` |
| `NEXTAUTH_SECRET` | ✅ | Random string for session signing |
| `NEXTAUTH_URL` | ✅ | Your app URL |
| `GITHUB_CLIENT_ID` | ✅ | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | ✅ | GitHub OAuth app secret |
| `ANTHROPIC_API_KEY` | optional | For Claude-powered chat |
| `OPENAI_API_KEY` | optional | For GPT-powered chat |

---

## Links

- [ZeroDB docs](https://docs.ainative.studio/docs/api/zerodb)
- [AINative Studio](https://ainative.studio)
- [API Reference](https://docs.ainative.studio/docs/api/overview)
- [Agent Memory API](https://ainative.studio/agent-memory-api)
- [Issues & support](https://github.com/AINative-Studio/zerodb-nextjs-template/issues)

---

## License

MIT © [AINative Studio](https://ainative.studio)
