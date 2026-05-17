# Globetrotter

A modern travel agency demo built with Next.js. The project includes curated seasonal trips, destination browsing, offer detail pages, booking flow scaffolding, a travel AI page, and editorial-style travel stories.

## Highlights

- Modern responsive travel UI with destination, hotel, and offer pages
- Seasonal vacation browsing by country and category
- Travel story / editorial pages with static mock content
- Clerk authentication integration
- Stripe checkout flow scaffolding
- Email confirmation integration points
- MongoDB-backed blog API routes
- Jest + React Testing Library setup

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Ant Design
- Clerk
- Stripe
- MongoDB / Mongoose
- OpenAI API
- Mailjet

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Fill in your own credentials in `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

This repo does not include real credentials.

Use the variables from `.env.example`:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGODB_URL`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_ACCESS_KEY`
- `MAILJET_API`
- `MAILJET_SECRET_KEY`
- `MAIL_FROM_EMAIL`
- `MAIL_FROM_NAME`
- `EDGE_STORE_ACCESS_KEY`
- `EDGE_STORE_SECRET_KEY`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
```

## Project Structure

```text
app/
  Components/          Reusable UI pieces
  api/                 Route handlers for Stripe, OpenAI, posts, email, etc.
  blogs/               Travel experiences index and story pages
  offer/               Offer detail pages
  hotel/               Hotel detail pages
  vacation/            Seasonal and country travel pages
  mocks/               Static travel and editorial mock data
```

## Public Repo Notes

- All secrets have been replaced with placeholders.
- Local env files are gitignored.
- The app URL and sender identity are environment-driven.
- If credentials were ever previously committed anywhere outside the current working tree, rotate them before publishing.

## Known Notes

- Some API routes depend on valid external services and credentials to work fully.
- The Mongo-backed blog API routes require a working `MONGODB_URL`.
- Stripe, Clerk, Mailjet, OpenAI, and EdgeStore features are optional until configured.

## License

MIT
