# Fest Innova 2K26 (monorepo)

## Dev (frontend apps only)

From `Fest-Innova-2K26/Fest-Innova-2K26`:

```bash
pnpm install
pnpm dev
```

- **REC app**: prints a `➜  Local:` URL (default `http://localhost:19392/`)
- **Mockup sandbox**: prints a `➜  Local:` URL (default `http://localhost:8081/__mockup`)

If a port is already in use, Vite will automatically pick the next one (e.g. `19393`).

## Dev (everything)

```bash
pnpm dev:all
```

Note: `@workspace/api-server` requires `DATABASE_URL` (Supabase Postgres works).

### Supabase database setup

1. Create a Supabase project.
2. Copy the Postgres connection string and set it as `DATABASE_URL`.
   - Make sure it includes `sslmode=require` (Supabase requires SSL).
3. Start the API server:

```bash
pnpm --filter @workspace/api-server dev
```

If you need a template, see `.env.example`.

## Competition-specific admin logins

Admin sessions are **scoped to a competition (event)**. Login request now includes an `event` value:

- `singing`
- `dance`
- `mehandi`
- `hair_and_makeover`
- `rangoli`
- `cooking_without_fire`
- `nail_art`
- `reels`
- `debate`

### Configure credentials (recommended)

Set a JSON env var `ADMIN_COMPETITION_CREDENTIALS` for per-competition logins:

```bash
ADMIN_COMPETITION_CREDENTIALS='{
  "singing": {"username":"singing_admin","password":"..."},
  "dance": {"username":"dance_admin","password":"..."}
}'
```

If `ADMIN_COMPETITION_CREDENTIALS` is not set, the server falls back to:

- `ADMIN_USERNAME` (default `admin`)
- `ADMIN_PASSWORD` (default `innova2k26`)
