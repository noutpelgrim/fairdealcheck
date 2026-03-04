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
        <section className="pb-32 px-6 max-w-3xl mx-auto border-t border-slate-100 pt-24 mt-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
                    Clear Answers.
                </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-0">
                {objections.map((obj, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            className={`border-b transition-all duration-300 overflow-hidden ${isOpen ? "border-slate-200" : "border-slate-100"
                                }`}
                        >
                            <button
                                className="w-full flex items-center justify-between py-5 text-left group hover:bg-slate-50/50 px-2 rounded-lg"
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                            >
                                <span className={`text-[15px] font-medium tracking-tight transition-colors ${isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                                    {obj.q}
                                </span>
                                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "text-slate-900 rotate-180" : "text-slate-400"}`}>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <p className="px-2 pb-6 text-slate-500 leading-relaxed text-[14px]">
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
