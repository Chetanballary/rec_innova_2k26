# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + Framer Motion

## Project: REC INNOVA 2K26

A college cultural fest web application with:
- Home page with hero section and countdown timer to April 15, 2026
- Events page with 6 competitions (Singing, Dance, Mehandi, Makeup, Hairstyle, Cooking Without Fire)
- Registration system (full form with validation, duplicate prevention)
- Announcements page with dynamic DB-backed content
- Admin panel (login: admin / innova2k26) for managing announcements and viewing registrations
- Contact page with WhatsApp integration
- Dark theme with vibrant purple/blue/gold gradients

## Admin Credentials
- **Username**: admin
- **Password**: innova2k26

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── rec-innova/         # React + Vite frontend (at /)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package
```

## Database Schema

- **registrations**: id, full_name, email, phone, college_department, event, participation_type, team_name, team_size, registered_at
- **announcements**: id, title, content, category, is_active, created_at, updated_at

## API Routes

- `POST /api/registrations` — submit registration
- `GET /api/registrations/all` — admin: all registrations (paginated, filterable)
- `GET /api/registrations/stats` — registration stats by event
- `GET /api/announcements` — get active announcements
- `POST /api/announcements` — create announcement (admin)
- `PUT /api/announcements/:id` — update announcement (admin)
- `DELETE /api/announcements/:id` — delete announcement (admin)
- `POST /api/admin/login` — admin login
- `POST /api/admin/logout` — admin logout
- `GET /api/admin/me` — current session

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes
