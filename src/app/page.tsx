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
          {/* Authority Eyebrow */}
          <div className="inline-flex items-center space-x-2 text-navy/40 bg-neutral-50 border border-neutral-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Independent Pricing Audit Standard</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-navy mb-6 leading-[1.1]">
            Don&apos;t Overpay on Your Next Big Repair Quote.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-navy/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            FairDealCheck eliminates opaque service pricing by auditing your quotes against independent market benchmarks, saving users an average of $340 per negotiation with expert-grade transparency.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/analyze">
              <Button size="lg" className="h-14 w-full sm:w-auto px-10 rounded-full bg-navy text-white hover:bg-navy-light shadow-2xl shadow-navy/20 transition-all font-bold text-lg">
                Audit My Quote — It&apos;s Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">
              Audit before you pay • 100% Independent
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
            <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              The Audit Process
            </div>
            <h2 className="text-4xl font-bold text-navy tracking-tight mb-3">
              The 60-Second Pricing Audit.
            </h2>
            <p className="text-navy/60 max-w-md mx-auto">
              Neutral, data-backed verification of any service quote &mdash; powered by the FairDeal Independent Standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col items-start p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
              <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center text-lg font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Upload Your Quote</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                Paste or upload any service quote &mdash; auto repair, plumber, contractor, dentist. We support all major service categories and most document formats.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-start p-8 bg-neutral-50 rounded-3xl border border-neutral-100">
              <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center text-lg font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Generate Audit Report</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                We benchmark your quote against thousands of verified transactions in your ZIP code. Receive a neutral 0&ndash;100 score and a line-item pricing audit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-start p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Execute Strategy</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                Use the standard. We generate expert negotiation scripts tailored to your audit results, giving you the leverage to align your quote with market reality.
              </p>
            </div>
          </div>
        </section>



        {/* Mid-page CTA to capture intent */}
        <div className="py-20 px-6 text-center max-w-xl mx-auto">
          <Link href="/analyze">
            <Button className="h-14 w-full sm:w-auto px-10 rounded-full bg-navy text-white hover:bg-navy-light shadow-xl shadow-navy/10 transition-all font-bold text-lg">
              Audit My Quote &mdash; It&apos;s Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-navy/40 mt-4 font-medium italic">
            First analysis is 100% free. No credit card required.
          </p>
        </div>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Trust & Credibility Section */}
        <section className="pb-16 sm:pb-24 px-6 max-w-5xl mx-auto">
          {/* Dark banner */}
          <div className="bg-navy rounded-[40px] p-10 md:p-16 text-white">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Trusted by 4,200+ users
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-3">
                Built on real data. Built for real people.
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Every Fairness Score is calculated using real regional price data &mdash; sourced from verified industry databases, labor rate guides, and aggregated market transactions, updated monthly for your ZIP code. We compare your quote to what people in <em>your area</em> are actually paying, right now.
              </p>
            </div>

            {/* Independence Disclaimer */}
            <div className="bg-white/5 border border-white/10 rounded-3xl px-8 py-6 mb-10 flex flex-col sm:flex-row items-start gap-5">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-xl">
                ⚖️
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Our Independence Guarantee</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  FairDealCheck is not affiliated with any service provider network, parts supplier, or home services marketplace.
                  We have no financial incentive to score any quote higher or lower than the data supports.
                  We make money only when you subscribe — not when you get a quote.
                  <a href="/methodology" className="ml-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors underline underline-offset-2">
                    Read our full methodology →
                  </a>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
                <div className="text-emerald-400 text-2xl mb-4">&#128202;</div>
                <h3 className="font-bold text-lg mb-2">How We Source Data</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Three independent layers: industry benchmarks updated quarterly, regional market averages by ZIP code, and anonymized community quote contributions &mdash; with your permission only.
                </p>
              </div>
              <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
                <div className="text-emerald-400 text-2xl mb-4">&#128274;</div>
                <h3 className="font-bold text-lg mb-2">Your Privacy, Fully Protected</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  GDPR compliant and encrypted from start to finish. Every quote is processed with 256-bit encryption, never sold, never shared, and never stored after your analysis is complete. We see only what is needed to score your quote &mdash; nothing else.
                </p>
              </div>
              <div className="bg-white/5 rounded-3xl p-7 border border-white/10">
                <div className="text-emerald-400 text-2xl mb-4">&#128208;</div>
                <h3 className="font-bold text-lg mb-2">How the Score Works</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Your 0&ndash;100 Fairness Score is calculated from price deviation, labor rate comparison, and parts markup analysis. A score below 50 is statistically overpriced.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="text-white/70"><strong className="text-white">70&ndash;100</strong> &nbsp;Fair or competitive pricing</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="text-white/70"><strong className="text-white">50&ndash;69</strong> &nbsp;Slightly elevated &mdash; room to negotiate</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full bg-red-400"></span>
                <span className="text-white/70"><strong className="text-white">0&ndash;49</strong> &nbsp;Statistically overpriced</span>
              </div>
            </div>
          </div>
        </section>
        {/* Product Preview Section */}
        <section className="pb-16 sm:pb-32 px-6 max-w-5xl mx-auto">
          <div className="relative bg-neutral-50 rounded-[40px] p-8 md:p-16 border border-neutral-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Core Analysis
                  </div>
                  <h2 className="text-3xl font-bold text-navy tracking-tight">Audit labor and parts instantly.</h2>
                  <p className="text-navy/60 leading-relaxed font-medium">
                    We compare your quote against thousands of regional price points to flag hidden markups.
                  </p>
                </div>

                {/* Simplified script preview */}
                <div className="pt-4">
                  <NegotiationScript
                    script="I noticed the labor rate is 25% above the local average for structural body work. Can we align this with market rates?"
                    className="border-none shadow-none !p-0 bg-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col items-stretch">
                <AnalysisPreview
                  title="Auto Repair Quote"
                  originalPrice="3,200"
                  fairPrice="2,450"
                  lineItems={[
                    { label: "Labor Hours", value: "+$420", type: "overcharge" },
                    { label: "Parts Markup", value: "+$330", type: "overcharge" }
                  ]}
                  showScript={false}
                  score={42}
                  className="shadow-2xl !rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

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
