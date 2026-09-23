# NB Classic Scents

A cinematic, full-stack luxury perfume e-commerce experience — built with React,
Three.js/React Three Fiber, Express and MongoDB.

> "A scent that defines you." — NB Classic Scents is a fictional fragrance
> house created for this project. Product photography is represented with
> generated placeholder bottle graphics (`client/public/images/products/*.svg`,
> regenerate via `client/scripts/gen-bottle-svgs.mjs`) and a fully procedural
> WebGL bottle (no external 3D models or textures) so the site works
> completely offline — swap in real photography/models whenever you have them.

## Stack

**Frontend** — `/client`
- React 18 + TypeScript + Vite
- Tailwind CSS (custom champagne/gold/obsidian luxury palette)
- React Three Fiber + drei + Three.js — procedural 3D perfume bottle, glass
  material, gold cap, drifting mist (generated in-canvas, zero external
  texture/HDRI fetches), particles
- Framer Motion — scroll reveals, page transitions, magnetic buttons, the
  cinematic loading screen
- React Router — client-side routing incl. protected `/admin` routes

**Backend** — `/server`
- Node.js + Express
- MongoDB + Mongoose (`Product`, `User`, `Order` models)
- JWT authentication with bcrypt password hashing
- Multer image upload endpoint for the admin dashboard
- REST API: products, auth, orders, upload

## Project structure

```
/client
  /src
    /components/3d        # PerfumeBottle, Mist, ProceduralEnvironment, Canvas wrappers + CSS fallback
    /components/animations # Reveal, Parallax, AnimatedCounter
    /components/ui         # buttons, icons, product card, loader, cursor glow
    /components/layout      # Navbar, Footer, CartDrawer, SearchOverlay
    /sections               # Hero, Collection, FragranceNotes, SignatureFinder, OurStory, ScentInMotion
    /pages                  # routed pages incl. /pages/admin
    /context                # CartContext, AuthContext (localStorage-backed)
    /services               # axios API clients (products, orders, auth, uploads)
    /data                   # offline fallback catalogue (mirrors the seed data)
    /hooks, /utils, /types
  /public/images/{products,hero,textures}
/server
  /models, /controllers, /routes, /middleware, /config, /utils, /seed
```

## Getting started

### 1. Install dependencies

```bash
npm run install:all
# or individually:
npm run client:install
npm run server:install
```

### 2. Configure environment variables

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Edit `server/.env` with your MongoDB connection string and a real JWT
secret. **Never commit `.env` files** — they're already gitignored.

### 3. Seed the database

Requires a running MongoDB instance (local or Atlas) reachable at the
`MONGO_URI` you configured.

```bash
npm run server:seed
```

This inserts the 8-piece launch catalogue and creates an admin account
using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`.

### 4. Run the app

```bash
# terminal 1
npm run server:dev     # http://localhost:5000

# terminal 2
npm run client:dev     # http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000` (see
`client/vite.config.ts`), so the frontend "just works" against your local
backend. If the API is ever unreachable, the storefront gracefully falls
back to the bundled offline catalogue (`client/src/data/products.ts`) so the
experience never breaks — this is intentional, not a bug to "fix".

### 5. Admin dashboard

Sign in at `/login` with the seeded admin account, then visit `/admin` for
product CRUD (with image upload), order management, and live stats.

## API overview

| Method | Route                     | Access        |
|--------|---------------------------|---------------|
| POST   | `/api/auth/register`      | Public        |
| POST   | `/api/auth/login`         | Public        |
| GET    | `/api/products`           | Public (filters: `category`, `gender`, `bestseller`, `newArrival`, `search`) |
| GET    | `/api/products/:slug`     | Public        |
| POST   | `/api/products`           | Admin         |
| PUT    | `/api/products/:id`       | Admin         |
| DELETE | `/api/products/:id`       | Admin         |
| POST   | `/api/orders`             | Public (guest checkout) |
| GET    | `/api/orders/mine`        | Authenticated |
| GET    | `/api/orders`             | Admin         |
| PUT    | `/api/orders/:id/status`  | Admin         |
| POST   | `/api/upload`             | Admin         |

## Notes on 3D & performance

- The bottle, glass, gold cap, and mist are all procedurally generated
  (primitives + `MeshTransmissionMaterial` + a canvas-generated soft sprite
  texture + a Lightformer-based procedural studio environment) — there are
  **no external 3D model or HDRI downloads**, so the scene renders
  identically online or fully offline.
- Every 3D canvas is lazy-loaded (`React.lazy`) and code-split from the main
  bundle, checks for WebGL support, and respects
  `prefers-reduced-motion` — falling back to a CSS/SVG bottle with
  drifting gradient "mist" when 3D isn't available or appropriate.

## Testing performed

- `npm run build` (TypeScript project build + Vite bundle) — passes clean.
- Mongoose schema/validation logic exercised directly (slug generation,
  required-field validation, password hashing) — no live DB needed for this.
- Server boot verified to fail gracefully (clean `process.exit(1)` with a
  clear message) on a missing/invalid `MONGO_URI`, rather than crashing.
- Full click-through smoke test in a headless browser: hero, collection
  filtering, product detail, add-to-bag, cart persistence across reloads,
  search overlay, mobile navigation.
- A live end-to-end MongoDB integration test (seed → REST calls → admin
  auth → CRUD → order lifecycle) was written
  and is safe to re-run locally, but could not execute inside this
  sandbox because it has no network path to MongoDB's binary download
  servers or a local `mongod`. Run it yourself with a real `MONGO_URI` to
  verify end-to-end before deploying.

## License

Proprietary — all rights reserved, NB Classic Scents.
