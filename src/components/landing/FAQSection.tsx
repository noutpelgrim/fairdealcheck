"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const objections = [
    {
        q: "How do I know your pricing is accurate?",
        a: "We pull live data from 84,000 distributor catalogs and regional labor databases used by the industry."
    },
    {
        q: "Is this just an AI hallucination?",
        a: "No. We use AI only to parse the document. The pricing comes directly from hard wholesale data."
    },
    {
        q: "Will my contractor get mad?",
        a: "You aren't arguing. You are simply asking them to match the standard market rate. We provide the scripts."
    },
    {
        q: "Does this work for my area?",
        a: "Yes. Our database adjusts for localized cost-of-living and regional labor trends."
    },
    {
        q: "Is my data safe?",
        a: "We process your quote instantly and delete it from our servers. We never sell your information."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="pb-32 px-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-navy tracking-tight">
                    Clear Answers.
                </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-3">
                {objections.map((obj, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                ? "border-navy/10 shadow-sm bg-white"
                                : "border-neutral-100 bg-neutral-50/60 hover:bg-white hover:border-neutral-200"
                                }`}
                        >
                            <button
                                className="w-full flex items-center justify-between px-7 py-5 text-left group"
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                            >
                                <span className={`text-base font-bold transition-colors ${isOpen ? "text-navy" : "text-navy/80 group-hover:text-navy"}`}>
                                    {obj.q}
                                </span>
                                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-navy text-white rotate-180" : "bg-neutral-100 text-navy/40 group-hover:bg-neutral-200"
                                    }`}>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <p className="px-7 pb-6 text-navy/65 leading-relaxed text-[0.9375rem]">
                                    {obj.a}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
