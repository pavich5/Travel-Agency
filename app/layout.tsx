import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "./Components/Footer/Footer";
import { EdgeStoreProvider } from './lib/edgestore';

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Globetrotter | Curated Modern Travel",
  description: "A refined travel agency experience for curated getaways, seasonal escapes, and city stays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${headingFont.variable} ${bodyFont.variable}`}>
          <Header />
          <EdgeStoreProvider>
          {children}
          </EdgeStoreProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
