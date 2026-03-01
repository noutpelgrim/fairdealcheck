"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { FairnessGauge } from "@/components/landing/FairnessGauge";
import { AnalysisPreview } from "@/components/landing/AnalysisPreview";
import { NegotiationScript } from "@/components/landing/NegotiationScript";
import { TestimonialsCarousel } from "@/components/landing/TestimonialsCarousel";
import { HowItWorksDeep } from "@/components/landing/HowItWorksDeep";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { AuthoritySection } from "@/components/landing/AuthoritySection";
import { SavingsCounter } from "@/components/landing/SavingsCounter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-navy mb-6 leading-[1.1]">
            Stop wondering if you’re <br /> getting ripped off.
          </h1>
          <p className="text-lg md:text-xl text-navy/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Upload any service quote and get an instant Fairness Score, real market rates, and word-for-word scripts to negotiate a lower price — in under 60 seconds.
          </p>
          <Link href="/analyze">
            <Button size="lg" className="h-14 px-8 rounded-full bg-navy text-white hover:bg-navy-light shadow-xl shadow-navy/10 transition-all font-semibold">
              Check My Quote — It&apos;s Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>

          {/* Security badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-navy/40 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              256-bit encrypted
            </div>
            <div className="flex items-center gap-1.5 text-navy/40 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
              Never shared
            </div>
            <div className="flex items-center gap-1.5 text-navy/40 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Auto-deleted after analysis
            </div>
            <div className="flex items-center gap-1.5 text-navy/40 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              GDPR compliant
            </div>
          </div>

          {/* Savings counter */}
          <div className="flex justify-center">
            <SavingsCounter />
          </div>
        </section>

        {/* Demo Video Section */}
        <DemoVideo />

        {/* Authority / Pricing Standard Section */}
        <AuthoritySection />

        {/* How It Works Section */}
        <section className="pb-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              How It Works
            </div>
            <h2 className="text-4xl font-bold text-navy tracking-tight mb-3">
              Three steps to a fairer price.
            </h2>
            <p className="text-navy/60 max-w-md mx-auto">
              Upload your quote, see your score, and get the exact words to negotiate &mdash; all in under 60 seconds.
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
              <h3 className="text-xl font-bold text-navy mb-3">Get Your Fairness Score</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                We compare your quote against thousands of verified real-world prices in your area. Receive a 0&ndash;100 score and a clear breakdown of every overpriced line item.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-start p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Negotiate With Confidence</h3>
              <p className="text-navy/60 leading-relaxed text-sm">
                No confrontation needed. We generate polite, professional negotiation scripts tailored to your quote &mdash; so you know exactly what to say to get a lower price, every time.
              </p>
            </div>
          </div>
        </section>


        {/* How It Works Deep Dive */}
        <HowItWorksDeep />

        {/* Trust & Credibility Section */}
        <section className="pb-24 px-6 max-w-5xl mx-auto">
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
        {/* Testimonials Carousel */}
        <TestimonialsCarousel />
        {/* Product Preview Section */}
        <section className="pb-32 px-6 max-w-5xl mx-auto">
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

              <div className="relative flex flex-col items-center">
                <AnalysisPreview
                  title="Auto Repair Quote"
                  originalPrice="3,200"
                  fairPrice="2,450"
                  lineItems={[
                    { label: "Labor Hours", value: "+€420", type: "overcharge" },
                    { label: "Parts Markup", value: "+€330", type: "overcharge" }
                  ]}
                  className="shadow-2xl !rounded-3xl"
                />
                <div className="absolute -bottom-8 -right-4 md:-right-8">
                  <FairnessGauge score={42} className="shadow-2xl border-neutral-200 !p-6 scale-90" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 opacity-40" />
            <span className="font-semibold tracking-tight text-neutral-400 opacity-60">FairDeal</span>
          </div>
          <div className="flex items-center space-x-8">
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
