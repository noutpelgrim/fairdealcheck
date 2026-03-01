"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        category: "Privacy & Security",
        q: "Is my quote data private and secure?",
        a: "Absolutely. Every document you upload is processed over a 256-bit encrypted connection and is never shared with third parties, service providers, or advertisers. We have no commercial relationship with any contractor, repair shop, or home service marketplace — so there is zero incentive for us to mishandle your data. Your file exists only long enough to run the analysis, then it is permanently deleted from our servers."
    },
    {
        category: "Privacy & Security",
        q: "Do you store my personal information?",
        a: "We do not store the content of your quotes after the analysis is complete. Your account information (name and email) is held securely to power your dashboard, and your analysis history is retained only as long as you have an active account. You can request full deletion of your account data at any time by emailing privacy@fairdealcheck.com — no questions asked."
    },
    {
        category: "Accuracy",
        q: "How accurate is the Fairness Score?",
        a: "Our Fairness Score is calculated from three independent pricing layers: industry benchmark databases updated quarterly, regional market averages broken down by ZIP code, and anonymized real-world quote contributions from verified users. Together, these sources cover more than 84,000 verified service transactions and are recalibrated monthly. Independent accuracy testing shows our price deviation estimates land within 8% of actual market rates in over 90% of cases."
    },
    {
        category: "Accuracy",
        q: "Where does your pricing data come from?",
        a: "We source data from established industry benchmarks (such as labor rate guides used by insurance adjusters), regional pricing surveys, verified public records, and anonymized community contributions from users who opt in. We never rely on a single database — every score is cross-referenced across at least three independent sources to minimize bias. You can read our full methodology at fairdealcheck.com/methodology."
    },
    {
        category: "Industries & File Formats",
        q: "Which service industries does FairDealCheck support?",
        a: "We currently support auto repair and body shops, plumbing and HVAC, electrical work, general contracting and renovation, dental and elective medical procedures, moving services, appliance repair, and landscaping. We are actively expanding coverage — if your industry isn't listed, upload your quote anyway and our engine will flag anything it can benchmark with confidence, noting any gaps transparently."
    },
    {
        category: "Industries & File Formats",
        q: "What file formats can I upload?",
        a: "You can upload PDFs, JPEGs, PNGs, and Word documents (.docx). You can also paste quote text directly into the text field if you received your estimate by email or message. Our OCR engine handles scanned paper quotes as long as the image is reasonably clear. If a file fails to process, you'll receive an immediate error message with guidance — we never silently fail."
    },
    {
        category: "Pricing & Plans",
        q: "Is FairDealCheck free to use?",
        a: "Yes — your first analysis is completely free with no credit card required. The free tier gives you a Fairness Score, a summary of overpriced line items, and a basic negotiation pointer. Pro subscribers ($9.99/month or $79/year) unlock full line-item breakdowns, word-for-word negotiation scripts, unlimited analyses, and priority support. Most users find that a single negotiation pays for the entire year many times over."
    },
    {
        category: "Pricing & Plans",
        q: "What is your refund policy for Pro?",
        a: "We offer a 14-day money-back guarantee, no questions asked. If you subscribe to Pro and feel it didn't deliver value within your first two weeks, email us at support@fairdealcheck.com and we'll process a full refund within 2 business days. After the 14-day window, you can cancel at any time and retain access until the end of your billing cycle."
    },
    {
        category: "How It Works",
        q: "How long does the analysis take?",
        a: "Most analyses complete in under 60 seconds. More complex multi-page quotes with many line items may take up to 90 seconds. You'll see a real-time progress indicator while the engine works, and you'll never be left wondering what's happening. If something takes longer than expected due to server load, we'll notify you by email as soon as your report is ready."
    },
    {
        category: "How It Works",
        q: "What happens after I upload my quote?",
        a: "Our engine extracts every line item and cross-references each one against regional pricing data for your area. Within seconds you'll see a 0–100 Fairness Score, a color-coded breakdown of which items are fairly priced vs. overpriced, a side-by-side price comparison (your quote vs. market rate), and — on Pro — a word-for-word negotiation script you can use immediately. You can share, download, or revisit your report at any time from your dashboard."
    },
    {
        category: "Usability",
        q: "Can I use FairDealCheck on my phone?",
        a: "Yes — FairDealCheck is fully responsive and works on any modern smartphone or tablet browser. You can photograph a paper quote with your phone's camera and upload it directly, making it easy to check a quote while you're still sitting in the waiting room or speaking with a contractor. A dedicated mobile app is on our roadmap for later this year."
    },
    {
        category: "About FairDealCheck",
        q: "What makes FairDealCheck different from just Googling prices?",
        a: "Googling gives you national averages that ignore your city, your ZIP code, and current market conditions — which can be off by 40% or more. FairDealCheck analyzes your specific quote, line by line, against hyper-local verified data updated monthly. Beyond the score, we give you the exact language to use in a negotiation so you don't have to figure out what to say — we hand you the script. No other consumer tool combines real-time regional benchmarking with a ready-to-use negotiation strategy in under 60 seconds."
    }
];

const categories = [...new Set(faqs.map(f => f.category))];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const displayCategories = ["All", ...categories];
    const filtered = activeCategory === "All" ? faqs : faqs.filter(f => f.category === activeCategory);

    return (
        <section className="pb-32 px-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
                <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    FAQ
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight mb-3">
                    Everything you need to know.
                </h2>
                <p className="text-navy/60 max-w-md mx-auto">
                    Straight answers, no spin. If you have a question we haven't covered, email us at{" "}
                    <a href="mailto:support@fairdealcheck.com" className="text-emerald-600 font-semibold hover:underline">
                        support@fairdealcheck.com
                    </a>
                </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {displayCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border min-h-[44px] flex items-center justify-center ${activeCategory === cat
                            ? "bg-navy text-white border-navy shadow-md"
                            : "bg-white text-navy/50 border-neutral-200 hover:border-navy/30 hover:text-navy"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
                {filtered.map((faq, idx) => {
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
                                <div className="flex items-center gap-4 pr-4">
                                    <span className="hidden sm:inline-block text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                                        {faq.category}
                                    </span>
                                    <span className={`text-base font-bold transition-colors ${isOpen ? "text-navy" : "text-navy/80 group-hover:text-navy"}`}>
                                        {faq.q}
                                    </span>
                                </div>
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
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 text-center">
                <p className="text-navy/40 text-sm">
                    Still have questions?{" "}
                    <a href="mailto:support@fairdealcheck.com" className="text-navy font-semibold hover:text-emerald-600 transition-colors">
                        We reply within 24 hours. →
                    </a>
                </p>
            </div>
        </section>
    );
}
