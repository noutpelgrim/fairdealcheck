import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FairDealCheck | Stop Wondering If You're Being Ripped Off",
  description: "Get a Fairness Score on any service quote and receive AI-generated scripts to negotiate like a pro. Stop overpaying and start knowing.",
  keywords: ["fairness score", "negotiation scripts", "service quotes", "budget protection", "financial intelligence"],
  authors: [{ name: "FairDealCheck Team" }],
  openGraph: {
    title: "FairDealCheck | Stop Wondering If You're Being Ripped Off",
    description: "Analyze any quote and get an instant fairness score.",
    url: "https://www.fairdealcheck.com",
    siteName: "FairDealCheck",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairDealCheck | Stop Wondering If You're Being Ripped Off",
    description: "Analyze any quote and get an instant fairness score.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
