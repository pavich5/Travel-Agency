"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="shell section">
      <div className="empty-state">
        <h2>A little bump in the road.</h2>
        <p>We couldn’t load this page. Please try again in a moment.</p>
        <button className="button button-green" onClick={reset}>
          Try again
        </button>
        <Link
          href="/"
          className="button button-outline"
          style={{ marginLeft: 12 }}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
