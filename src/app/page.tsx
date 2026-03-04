"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Server, Trash2 } from "lucide-react";
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
        {/* Live Integrity Ticker */}
        <div className="w-full bg-white border-b border-slate-100 py-2.5 mt-16 mt-0">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-medium text-slate-500 uppercase tracking-widest gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Market Indexes Verified: {new Date().toLocaleDateString()}
            </div>
            <div className="hidden sm:block text-slate-400">
              Calibrated against $4.2B in historical service invoices
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              SOC-2 Compliant Infrastructure
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-24 sm:pb-32 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Stop Overpaying for Service Work.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            We audit your repair and service quotes against 84,000 real-world distributor catalogs to expose hidden markups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">✓</span> Upload any quote in seconds
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">✓</span> See exact wholesale parts pricing
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">✓</span> Get standard local labor rates
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link href="/analyze">
              <Button size="lg" className="h-14 w-full sm:w-auto px-10 rounded-full bg-slate-900 text-white hover:opacity-90 shadow-none transition-opacity font-medium text-lg border border-slate-900">
                Audit My Quote
                <ArrowRight className="ml-2 w-5 h-5 opacity-70" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-2 px-3 sm:px-4 rounded-full mt-2 self-center">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <p className="text-[9px] sm:text-[11px] font-medium text-slate-600 uppercase tracking-widest text-center sm:text-left">
                100% Consumer Funded. Zero Contractor Kickbacks.
              </p>
            </div>
          </div>

          {/* Demo — directly under CTA for above-the-fold placement */}
          <div className="mt-10 text-left">
            <DemoVideo />
          </div>

          {/* Updated Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
              Neutral Agency
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
              No Kickbacks
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
              100% Independent
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[13px] font-medium">
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
        <section className="pb-24 sm:pb-32 pt-24 px-6 w-full bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                Hard Data. Not Guesses.
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                We deploy algorithmic modeling against real-time regional labor indexes down to the 5-digit ZIP code. Our computations are consistently accurate within a <strong className="text-slate-900 font-medium">+/- 4.2% regional variance.</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative flex flex-col items-start p-8 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-4 uppercase">Step 01</div>
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">Upload the quote.</h3>
                <p className="text-slate-500 leading-relaxed text-[13px]">
                  Drop your PDF or image directly into the analyzer via our secure 256-bit connection.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-start p-8 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-4 uppercase">Step 02</div>
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">Get your score.</h3>
                <p className="text-slate-500 leading-relaxed text-[13px]">
                  We parse every line item and cross-reference against 84k regional distributor catalogs.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-start p-8 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-4 uppercase">Step 03</div>
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">Use the script.</h3>
                <p className="text-slate-500 leading-relaxed text-[13px]">
                  We generate the exact, data-backed counter-offer script you need to negotiate.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Mid-page CTA to capture intent */}
        <div className="py-24 px-6 text-center max-w-xl mx-auto border-t border-slate-100">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-3">
            Walk In With Leverage.
          </h2>
          <p className="text-slate-500 mb-8">
            Never second-guess an invoice again.
          </p>
          <Link href="/analyze">
            <Button className="h-14 w-full sm:w-auto px-10 rounded-full bg-slate-900 text-white hover:opacity-90 shadow-none transition-opacity font-medium text-lg border border-slate-900">
              Get My Fairness Score
              <ArrowRight className="ml-2 w-5 h-5 opacity-70" />
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

      <footer className="pt-24 pb-24 sm:pb-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Lock className="w-5 h-5 text-slate-400 mb-4" />
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">AES-256 Encryption</div>
              <p className="text-[13px] text-slate-500 leading-relaxed max-w-[250px]">Bank-grade secure encryption applies to all uploaded documents and in-transit data APIs.</p>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Server className="w-5 h-5 text-slate-400 mb-4" />
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">SOC 2 Type II Audited</div>
              <p className="text-[13px] text-slate-500 leading-relaxed max-w-[250px]">FairDealCheck is built exclusively upon independently audited and certified compliant infrastructure.</p>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Trash2 className="w-5 h-5 text-slate-400 mb-4" />
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Auto-Deletion Policy</div>
              <p className="text-[13px] text-slate-500 leading-relaxed max-w-[250px]">To protect your privacy, raw invoices and unredacted PII are permanently purged within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm text-slate-500 border-t border-slate-200 pt-8 text-center md:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-semibold tracking-tight text-slate-900">FairDeal Technologies</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 font-medium">
            <Link href="/transparency" className="hover:text-slate-900 transition-colors">Transparency</Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Press & Partnerships</Link>
          </div>
          <p className="mt-4 md:mt-0 text-xs">© {new Date().getFullYear()} FairDeal Technologies Inc.</p>
        </div>
      </footer>
    </div>
  );
}
