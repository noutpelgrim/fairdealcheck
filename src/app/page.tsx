"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { FairnessGauge } from "@/components/landing/FairnessGauge";
import { AnalysisPreview } from "@/components/landing/AnalysisPreview";
import { NegotiationScript } from "@/components/landing/NegotiationScript";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { ProofTrustSection } from "@/components/landing/ProofTrustSection";
import { SavingsCounter } from "@/components/landing/SavingsCounter";
import { FAQSection } from "@/components/landing/FAQSection";

export default function Home() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero (approx 400px)
      setShowStickyCTA(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-20 sm:pt-32 pb-16 sm:pb-20 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-navy mb-6 leading-[1.1]">
            Stop Overpaying for Service Work.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-navy/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            We audit your repair and service quotes against 84,000 real-world distributor catalogs to expose hidden markups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm font-medium text-navy/70">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Upload any quote in seconds
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> See exact wholesale parts pricing
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Get standard local labor rates
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link href="/analyze">
              <Button size="lg" className="h-14 w-full sm:w-auto px-10 rounded-full bg-navy text-white hover:bg-navy-light shadow-2xl shadow-navy/20 transition-all font-bold text-lg">
                Audit My Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-[13px] font-medium text-navy/50">
              100% independent. Zero contractor kickbacks.
            </p>
          </div>

          {/* Demo — directly under CTA for above-the-fold placement */}
          <div className="mt-10 text-left">
            <DemoVideo />
          </div>

          {/* Updated Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-navy/60 text-[13px] font-medium">
              <span className="text-emerald-500">⚖️</span>
              Neutral Agency
            </div>
            <div className="flex items-center gap-2 text-navy/60 text-[13px] font-medium">
              <span className="text-emerald-500">🚫</span>
              No Kickbacks
            </div>
            <div className="flex items-center gap-2 text-navy/60 text-[13px] font-medium">
              <span className="text-emerald-500">🛡️</span>
              100% Independent
            </div>
            <div className="flex items-center gap-2 text-navy/60 text-[13px] font-medium">
              <span className="text-emerald-500">✅</span>
              Verified Benchmarks
            </div>
          </div>

          {/* Savings counter */}
          <div className="flex justify-center mt-4">
            <SavingsCounter />
          </div>
        </section>


        {/* Proof & Trust Section */}
        <div id="proof">
          <ProofTrustSection />
        </div>

        {/* How It Works Section */}
        <section className="pb-16 sm:pb-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-navy tracking-tight mb-4">
              Hard Data. Not Guesses.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col items-start p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold mb-6">
                1
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Upload the quote.</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                Drop your PDF or image directly into the analyzer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-start p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold mb-6">
                2
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Get your score.</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                We check every line item against regional pricing data.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-start p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
              <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-bold mb-6">
                3
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Use the script.</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                We generate the exact words you need to negotiate.
              </p>
            </div>
          </div>
        </section>



        {/* Mid-page CTA to capture intent */}
        <div className="py-20 px-6 text-center max-w-xl mx-auto border-t border-neutral-100">
          <h2 className="text-3xl font-bold text-navy mb-3">
            Walk In With Leverage.
          </h2>
          <p className="text-navy/60 mb-8">
            Never second-guess an invoice again.
          </p>
          <Link href="/analyze">
            <Button className="h-14 w-full sm:w-auto px-10 rounded-full bg-navy text-white hover:bg-navy-light shadow-xl shadow-navy/10 transition-all font-bold text-lg">
              Get My Fairness Score
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

      </main>

      {/* Sticky mobile CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur border-t border-neutral-100 px-4 py-3 shadow-2xl transition-all duration-300 transform ${showStickyCTA ? "translate-y-0" : "translate-y-full"}`}>
        <Link href="/analyze">
          <Button className="w-full h-12 rounded-full bg-navy text-white font-bold text-sm shadow-lg">
            Audit My Quote — It&apos;s Free →
          </Button>
        </Link>
      </div>

      <footer className="py-12 border-t border-neutral-100 pb-24 sm:pb-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 opacity-40" />
            <span className="font-semibold tracking-tight text-neutral-400 opacity-60">FairDeal</span>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/transparency" className="hover:text-navy transition-colors">Transparency</Link>
            <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-navy transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-navy transition-colors">Contact</Link>
          </div>
          <p>© 2026 FairDeal Technologies Inc.</p>
        </div>
      </footer>
    </div>
  );
}
