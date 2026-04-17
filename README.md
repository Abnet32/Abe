# ABE Garage App

Full-stack garage management platform built with Next.js, TypeScript, MongoDB, and Better Auth.

## Features

- Public website pages (home, about, services, contact)
- Authentication and role-aware access control
- Admin dashboard for operational workflows
- REST APIs for customers, employees, orders, services, vehicles, and inventory
- Dashboard summary endpoint for KPIs and recent activity

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- MongoDB + Mongoose
- Better Auth
- Vitest

## Project Structure

- `app/`: Next.js routes and API handlers
- `components/`: UI and admin components
- `lib/`: Client/server utilities, auth, API helpers
- `scripts/`: Project scripts (including first-admin bootstrap)
- `tests/`: Integration tests
- `docs/`: Architecture and roadmap notes

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB (Atlas or local)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env
   ```

   If `.env.example` does not exist yet, create `.env` manually with the variables listed below.

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Environment Variables

Set these variables in `.env`:

- `MONGODB_URL`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `NEXT_PUBLIC_GEMINI_API_KEY` (optional)
- `NEXT_PUBLIC_GEMINI_API_URL` (optional)
- `CORS_ORIGINS` (recommended for backend CORS hardening)

## Available Scripts

- `npm run dev`: Start local development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run lint checks
- `npm run bootstrap:admin`: Bootstrap first admin user

## API Surface (high level)

Main route groups under `app/api/`:

- `auth`
- `customers`
- `employees`
- `orders` (including `dashboard/summary`)
- `services`
- `vehicles`
- `inventories`

## Testing

Run tests with Vitest:

```bash
npx vitest
```

Current test suite includes auth integration coverage in `tests/auth.integration.test.ts`.

## Security Notes

- Do not commit real secrets in `.env`.
- Rotate exposed secrets immediately if they were ever committed.
- Use strong, environment-specific values for auth and database credentials.

## Roadmap

See `docs/fullstack-review-and-roadmap.md` for architecture review, completed improvements, and next iteration recommendations.
