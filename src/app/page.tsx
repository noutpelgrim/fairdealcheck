"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FairnessGauge } from "@/components/landing/FairnessGauge";
import { AnalysisPreview } from "@/components/landing/AnalysisPreview";
import { NegotiationScript } from "@/components/landing/NegotiationScript";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-navy" />
            <span className="font-bold text-lg tracking-tight text-navy">FairDeal</span>
          </div>
          <Link href="/analyze">
            <span className="text-sm font-medium text-navy hover:text-emerald-600 transition-colors">Analyze Now</span>
          </Link>
        </div>
      </nav>

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
        </section>

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
