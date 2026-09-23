import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./Components/Footer/Footer";
import { EdgeStoreProvider } from "./lib/edgestore";
import { TravelProvider } from "./Components/travel/TravelProvider";
import { authConfigured } from "./lib/config";
const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading",
});
const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});
export const metadata: Metadata = {
  title: {
    default: "Globetrotter — A little further from the everyday",
    template: "%s | Globetrotter",
  },
  description:
    "Discover thoughtfully curated escapes. Explore destinations, find your perfect stay, and plan your next chapter with Globetrotter.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <TravelProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <div id="main-content">
            {process.env.EDGE_STORE_ACCESS_KEY &&
            !process.env.EDGE_STORE_ACCESS_KEY.includes("your_") ? (
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            ) : (
              children
            )}
          </div>
          <Footer />
        </TravelProvider>
      </body>
    </html>
  );
  return authConfigured ? (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#294f40",
          borderRadius: "12px",
          fontFamily: "Manrope, sans-serif",
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/trips"
      afterSignUpUrl="/trips"
    >
      {content}
    </ClerkProvider>
  ) : (
    content
  );
}
