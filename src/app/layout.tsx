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
  title: "FairDealCheck — Know If Your Service Quote Is Fair",
  description: "Upload any service quote and get an instant Fairness Score, market rate comparison, and negotiation scripts. Stop overpaying for repairs and contractor work.",
  keywords: [
    "check if a quote is fair",
    "overpriced contractor quote",
    "fair price for auto repair",
    "service quote comparison tool",
    "how to negotiate a contractor price",
    "is my mechanic overcharging me",
    "home repair cost calculator",
    "contractor quote too high",
    "how to dispute a service quote",
    "negotiate repair bill scripts",
  ],
  authors: [{ name: "FairDealCheck Team" }],
  openGraph: {
    title: "FairDealCheck — Know If Your Service Quote Is Fair",
    description: "Upload any quote. Get an instant Fairness Score and word-for-word scripts to negotiate a lower price.",
    url: "https://www.fairdealcheck.com",
    siteName: "FairDealCheck",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairDealCheck — Know If Your Service Quote Is Fair",
    description: "Upload any quote. Get an instant Fairness Score and word-for-word scripts to negotiate a lower price.",
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
