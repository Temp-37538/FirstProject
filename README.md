# 📸 PhotoShare

A modern photo gallery platform built with Next.js 16 in a scalable monorepo architecture. Upload, organize, and share photos with enterprise-grade monitoring and performance.

## Features

- 📤 **Photo Uploads** - Drag & drop interface with UploadThing
- 🖼️ **Interactive Gallery** - Responsive grid with optimized image loading
- 🔍 **Full-Screen Modal** - Smooth navigation using Next.js parallel routes
- 🔐 **Authentication** - Custom auth system with session management
- 📊 **Analytics** - Real-time monitoring with Sentry (edge + server)
- 🌙 **Dark Mode** - Theme switching with system preference detection

## Tech Stack

**Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Shadcn UI  
**Backend**: Next.js API Routes, Prisma ORM, UploadThing  
**Infrastructure**: Turbo monorepo, pnpm, Upstash Redis, Sentry

## Architecture

```
FirstProject/
├── apps/web/              # Next.js application
│   ├── src/app/
│   │   ├── @modal/        # Parallel routes for modals
│   │   ├── photos/        # Gallery pages
│   │   └── api/           # API endpoints
│   └── server/            # Rate limiting, queries, analytics
└── packages/
    ├── auth/              # Reusable auth package
    └── db/                # Prisma database layer
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env

# Run database migrations
cd packages/db && pnpm prisma migrate dev

# Start dev server
pnpm dev
```

## Key Technical Features

- **Parallel Routes**: Smooth modal navigation for full-screen image viewing
- **Rate Limiting**: Upstash Redis protection (10 uploads/100 seconds)
- **Instrumentation**: Custom client + server metrics tracking
- **Monorepo**: Turbo-powered build system with shared packages
- **Type Safety**: 100% TypeScript coverage in strict mode
