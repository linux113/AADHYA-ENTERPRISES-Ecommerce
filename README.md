# Sholkveda Product Catalogue

A Next.js storefront built around product names, package options, printed MRPs and package photography transcribed from the supplied 16-page `ONLY AYURVEDA BROCHURE.pdf`. “Only Ayurveda” remains the source packaging identity shown in the images; **Sholkveda** is the storefront brand.

## Persistence status

The app has two data modes:

- **Local preview:** with `DATABASE_URL` unset, repositories use the in-memory preview data. This is useful for the local storefront and automated checks, but data is not durable.
- **Neon PostgreSQL:** when `DATABASE_URL` is set, the product/catalogue, user/address, settings, coupon, CMS/review/audit, inventory, and order/payment/shipment repository paths use the shared `pg` pool. Production runtime refuses to start without a database URL.

The Neon bootstrap script is in `prisma/neon-setup.sql`. The user-reported database currently contains 31 tables, 8 categories, 84 products, 101 variants, and 84 images. **Stock was intentionally seeded at zero** because verified available inventory was not supplied; checkout must not be enabled for sale until accurate stock is entered. The bootstrap creates no administrator, coupon, order, or review records.

The database-backed code has passed TypeScript and production-build checks, plus the in-memory backend and storefront QA suites. A live Neon connection and database-backed CRUD/payment/inventory flow have **not** been validated from this checkout because its `DATABASE_URL` is intentionally unset. Do not treat the build as proof of live database readiness or deploy to accept orders until private-URL validation is complete.

Carts and wishlists remain browser-local (localStorage). Razorpay also requires valid server-side credentials and a configured webhook secret; payment success is not simulated. Verify business contact details, delivery terms, inventory, and payment settings before launch. Rotate any Neon credential that was previously exposed before using the database in production.

## Local preview

```bash
npm ci
npm run dev
```

Open the local Next.js URL printed by the dev server. Without `DATABASE_URL`, this is an in-memory preview. Do not submit real customer or payment information to it.

## Neon and production setup

1. In Neon, rotate any credential previously shared outside the private dashboard, then use the new connection string.
2. Run `prisma/neon-setup.sql` once against an **empty** Neon schema. Do not rerun it over an initialized database.
3. Set `DATABASE_URL`, a strong stable `AUTH_SECRET`, and required payment/webhook variables in the **private deployment environment** (for example, Vercel Production). Never commit or paste secrets into source control or chat.
4. Create the first administrator from a private execution environment using `npm run admin:bootstrap` with `DATABASE_URL`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` of at least 14 characters. The command only creates a new account; it will not promote or reset an existing email. Do not put the database URL or password in a shared terminal transcript.
5. Enter verified inventory quantities in the admin inventory screen and verify checkout, order persistence, stock-ledger changes, payment callbacks, and cancellation/refund flows against the private database before accepting live orders.

`DATABASE_URL` is deliberately not stored in this checkout. The optional `ADMIN_EMAIL` / `ADMIN_PASSWORD` values are consumed only by the explicit bootstrap script; they are not an automatic production-startup mechanism.

## Deploying on Vercel

`vercel.json` holds the framework preset and security headers, but the Vercel project itself is created and linked once from your own Vercel account. Use **one** of the two routes below; running both deploys every push to `main` twice.

**A. Vercel Git integration (simplest).** In the Vercel dashboard choose *Add New… → Project*, import `linux113/AADHYA-ENTERPRISES-Ecommerce`, add the environment variables described below, then deploy. Pushes to `main` deploy to production and other branches get preview deployments. If you use this route, delete `.github/workflows/deploy.yml`.

**B. GitHub Actions (`.github/workflows/deploy.yml`).** Link the project once from a machine that can reach Vercel:

```bash
npm i -g vercel
vercel login
vercel link                # choose or create the project; writes .vercel/project.json (git-ignored)
cat .vercel/project.json   # note "orgId" and "projectId"
```

Then add three repository secrets under GitHub → *Settings → Secrets and variables → Actions*: `VERCEL_TOKEN` (a Vercel access token), `VERCEL_ORG_ID` (`orgId`) and `VERCEL_PROJECT_ID` (`projectId`). The workflow deploys to production on every push to `main` and fails immediately, naming any missing secret.

Whichever route you choose, add the variables from **Environment variables** below to the Vercel project (*Settings → Environment Variables*) before the first deploy. `DATABASE_URL` is mandatory (the production runtime refuses to start without it), and `AUTH_SECRET` must be a fixed value; without it every serverless instance signs sessions with its own random secret. `NEXT_PUBLIC_*` values are inlined at build time, so changing one requires a redeploy. `ADMIN_EMAIL` / `ADMIN_PASSWORD` are for the one-off bootstrap command only and do not belong in Vercel. Do not accept real orders until the checks under **Neon and production setup** are complete.

## Environment variables

- `DATABASE_URL`: Neon PostgreSQL connection string; required by the production runtime.
- `AUTH_SECRET`: stable, random secret of at least 32 characters for signed sessions.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_FULL_NAME`: used only by the explicit administrator bootstrap command.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`: server-side payment configuration for live Razorpay operations.
- `NEXT_PUBLIC_SITE_URL`: verified public site origin for absolute sitemap links.

## Validation

```bash
npm run test:backend
npm run test:qa
npx tsc --noEmit
npm run build
```

The automated backend checks run against the in-memory preview mode unless a database URL is configured; they do not replace live Neon validation.

## Main directories

- `src/lib/brochure-data.ts` — source-derived product, category, pack-size and MRP data.
- `public/products/` — optimized package images extracted from the brochure.
- `src/repositories/` — conditional PostgreSQL persistence plus local in-memory fallback.
- `src/lib/postgres.ts` — lazy PostgreSQL pool, query, transaction, and production-configuration guard.
- `src/services/` — pricing, checkout, inventory and payment service logic.
- `prisma/schema.prisma` — relational schema.
- `prisma/neon-setup.sql` — one-time schema and brochure-catalog bootstrap for an empty Neon schema.
- `scripts/bootstrap-admin.ts` — one-time secure first-administrator creation command.
