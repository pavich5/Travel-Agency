# Globetrotter

A responsive travel agency built with Next.js 14, React, TypeScript, Clerk, and Stripe. The interface includes a destination-led homepage, searchable offers, hotel and trip details, saved trips, booking checkout, account history, a travel journal, and a travel planner.

## Run locally

```bash
npm install
npm run dev
```

Browsing, filters, saved trips, stories, and the catalog-based planner work without service credentials. Clerk and Stripe remain connected to the production environment; missing local credentials do not block the site. Put any local credentials in a gitignored `.env.local` using `.env.example` as a reference.

```bash
npm test -- --runInBand
npx tsc --noEmit
npm run build
```

## Existing production integrations

- Keep `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` configured. Clerk's publishable key is read at build time. Sign-in and sign-up use `/sign-in` and `/sign-up`.
- Keep `STRIPE_SECRET_KEY` and set `NEXT_PUBLIC_APP_URL` to the production origin. Valid production credentials enable checkout; no additional activation flag is needed. Checkout redirects to the URL returned by Stripe and no longer requires the Stripe.js public-key lookup.
- Configure the Stripe webhook at `/api/webhook` and add its signing secret as `STRIPE_WEBHOOK_SECRET`. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Unsigned requests are rejected.
- Optional confirmation emails use the existing Mailjet keys, `MAIL_FROM_EMAIL`, and `MONGODB_URL`. MongoDB stores delivery claims so sequential webhook retries do not resend emails. A crash after sending but before recording success can still cause a duplicate email. Payment confirmation and booking history are available independently of email delivery.
- `CONTACT_EMAIL` and `NEXT_PUBLIC_VIBER_NUMBER` populate actual support channels; no placeholder phone number is used.
- `OPENAI_API_KEY` enables the existing AI integration for authenticated users. `OPENAI_MODEL` is optional and defaults to the existing `gpt-3.5-turbo` model. Other visitors get useful local catalog suggestions. Chat history remains in their browser and can be cleared.
- EdgeStore is initialized only when its credentials are configured. Existing Mongo blog API routes remain in the repository.

## Booking behavior

1. A traveler opens an offer and selects one to four packages. Each package explicitly states the number of travelers included.
2. Checkout collects the lead traveler's name, account email, phone, optional requests, and acceptance of the displayed booking information.
3. The server identifies the Clerk user and looks up the offer and price itself. Client-supplied prices and user IDs are ignored. Charges use integer EUR cents and include the same 10% taxes and fees displayed in the UI.
4. After Stripe checkout, the confirmation page retrieves the session on the server, checks ownership and paid status, and verifies that it matches the selected offer.
5. `/trips` reads paid Checkout Sessions and returns only the signed-in user's records. The legacy `/user/[id]` route still works and always uses the authenticated account. Older Clerk records remain visible as unverified historical records.

Booking history currently scans Stripe Checkout Session pages of 100 records, filtering by user on the server. For a large agency, replace this scan with an indexed booking database populated from verified webhooks. The current catalog retains the repository's 29 sample packages in `app/mocks/data.ts`; it is not connected to supplier availability or a hotel reservation API. Verify offer content, dates, pricing, and the agency's final booking/privacy terms before using those packages commercially.

## Frontend

- Shared design tokens and responsive styles: `app/globals.css`
- New reusable travel components: `app/Components/travel/`
- Central catalog, filters, dates, and pricing: `app/lib/catalog.ts`
- Searchable offers: `/offers`, existing destination and seasonal routes
- Saved trips: `/saved` (local to the current browser/device)
- Booking history: `/trips`
- Journal and stories: `/blogs`
- Support and booking information: `/contact`, `/terms`, `/privacy`

Tests cover search, saving/removing trips, package totals, checkout identity/price tampering, confirmation ownership, webhook signatures, missing routes, mobile navigation, and planner error recovery. External credentials are mocked in API tests; tests do not create live bookings or send emails.
