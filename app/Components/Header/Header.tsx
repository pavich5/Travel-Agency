"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Icon from "../travel/Icon";
import { useSavedTrips } from "../travel/TravelProvider";
import { authConfigured } from "@/app/lib/config";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { saved } = useSavedTrips();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const links = [
    { href: "/offers", label: "Explore trips" },
    { href: "/#destinations", label: "Destinations" },
    { href: "/blogs", label: "Travel journal" },
    { href: "/about", label: "Our story" },
  ];
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Globetrotter home">
        <span className="brand-mark">
          <Icon name="globe" size={27} />
        </span>
        globetrotter<span className="brand-dot">.</span>
      </Link>
      <nav
        className={`main-nav ${open ? "is-open" : ""}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={pathname === link.href ? "active" : ""}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/ai" onClick={() => setOpen(false)} className="mobile-only">
          Travel AI
        </Link>
        <Link
          href="/trips"
          onClick={() => setOpen(false)}
          className="mobile-only"
        >
          My bookings
        </Link>
      </nav>
      <div className="header-actions">
        <Link
          href="/saved"
          className="saved-link"
          aria-label={`Saved trips${saved.length ? ` (${saved.length})` : ""}`}
        >
          <Icon name="heart" />
          {saved.length > 0 && <span>{saved.length}</span>}
        </Link>
        {authConfigured ? (
          <>
            <SignedOut>
              <Link href="/sign-in" className="login-link">
                Log in
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/trips" className="login-link">
                My trips
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </>
        ) : (
          <Link href="/sign-in" className="login-link">
            Log in
          </Link>
        )}
        <Link href="/offers" className="button button-dark header-cta">
          Find my trip <Icon name="arrow" size={16} />
        </Link>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
