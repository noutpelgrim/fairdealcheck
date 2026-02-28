"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "You share the quote",
        subtitle: "Paste, upload, or type any service estimate.",
        body: "You don\u2019t need to be an expert. Just enter what you were charged \u2014 even a rough handwritten estimate works. We accept quotes for auto repair, home services, HVAC, plumbing, electrical, appliances, and more. Nothing is stored after your analysis is complete.",
        tag: "Step 1",
    },
    {
        number: "02",
        title: "We run the numbers",
        subtitle: "Your quote is compared against verified real-world regional data.",
        body: null,
        bullets: [
            {
                label: "Regional price databases",
                detail:
                    "We pull from a continuously updated database of verified service prices sorted by ZIP code and service category. You\u2019re compared to local market rates \u2014 not a national average that ignores where you actually live.",
            },
            {
                label: "Labor rate comparison",
                detail:
                    "We check your quoted hourly labor rate against certified industry benchmarks for that trade and region. A 20%+ markup over local average triggers a flag.",
            },
            {
                label: "Parts markup analysis",
                detail:
                    "Parts have transparent distributor prices. We flag anything priced significantly above standard retail or distributor cost.",
            },
            {
                label: "Fairness Score calculation",
                detail:
                    "Each data point is weighted and combined into a single 0\u2013100 score. A score of 70+ means your quote is fair. Below 50 means you\u2019re likely being overcharged.",
            },
        ],
        footnote:
            "Our benchmark data is sourced from industry rate guides, verified contractor databases, and millions of anonymized quote data points \u2014 updated monthly.",
        tag: "Step 2",
    },
    {
        number: "03",
        title: "You get results + a script",
        subtitle: "A Fairness Score, a breakdown, and words to use.",
        body: null,
        results: [
            "Your Fairness Score (0\u2013100)",
            "A line-by-line breakdown showing where your quote is over or under market rate",
            "A word-for-word negotiation script tailored to your specific quote",
            "The market rate range for your area so you know exactly what fair looks like",
        ],
        tag: "Step 3",
    },
];

export function HowItWorksDeep() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="pb-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    No black boxes
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight mb-3">
                    Exactly how FairDealCheck works.
                </h2>
                <p className="text-navy/60 max-w-md mx-auto">
                    No guesswork. No mystery algorithm. Here&apos;s a plain-English explanation of every step.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step, i) => {
                    const isOpen = open === i;
                    return (
                        <div
                            key={i}
                            className={`rounded-3xl border transition-all duration-200 overflow-hidden ${isOpen
                                    ? "border-navy/20 bg-white shadow-lg shadow-navy/5"
                                    : "border-neutral-100 bg-neutral-50 hover:border-neutral-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="w-full flex items-center justify-between p-7 text-left"
                            >
                                <div className="flex items-center gap-5">
                                    <span
                                        className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isOpen
                                                ? "bg-navy text-white"
                                                : "bg-neutral-200 text-navy/50"
                                            }`}
                                    >
                                        {step.tag}
                                    </span>
                                    <div>
                                        <div className="font-bold text-navy text-lg">{step.title}</div>
                                        <div className="text-sm text-navy/50 mt-0.5">{step.subtitle}</div>
                                    </div>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="w-5 h-5 text-navy/40 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-navy/40 flex-shrink-0" />
                                )}
                            </button>

                            {isOpen && (
                                <div className="px-7 pb-8 space-y-5">
                                    {step.body && (
                                        <p className="text-navy/70 leading-relaxed">{step.body}</p>
                                    )}

                                    {step.bullets && (
                                        <div className="space-y-4">
                                            {step.bullets.map((b, j) => (
                                                <div key={j} className="flex gap-4">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                                    <div>
                                                        <div className="font-semibold text-navy">{b.label}</div>
                                                        <div className="text-sm text-navy/60 mt-0.5 leading-relaxed">{b.detail}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {step.footnote && (
                                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-sm text-emerald-800 italic">
                                            {step.footnote}
                                        </div>
                                    )}

                                    {step.results && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {step.results.map((r, j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-start gap-3 bg-neutral-50 rounded-2xl px-4 py-3 border border-neutral-100"
                                                >
                                                    <span className="text-emerald-500 mt-0.5 text-lg font-bold flex-shrink-0">&#10003;</span>
                                                    <span className="text-sm text-navy/70">{r}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
