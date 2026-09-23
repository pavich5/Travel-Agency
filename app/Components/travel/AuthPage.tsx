"use client";
import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { authConfigured } from "@/app/lib/config";
import Icon from "./Icon";
export default function AuthPage({ signUp = false }: { signUp?: boolean }) {
  return (
    <main className="auth-page">
      {authConfigured ? (
        signUp ? (
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        ) : (
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        )
      ) : (
        <div className="auth-card">
          <Icon name="globe" size={40} />
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h1>A world of possibilities.</h1>
          <p>
            Account sign-in is being set up. You can still explore every
            destination and save your favorite trips on this device.
          </p>
          <p className="notice">
            Sign-in will be available when the agency connects its Clerk
            account.
          </p>
          <Link href="/offers" className="button button-green">
            Keep exploring <Icon name="arrow" size={17} />
          </Link>
        </div>
      )}
    </main>
  );
}
