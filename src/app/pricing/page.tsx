"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Flame } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Navbar } from "@/components/Navbar";
import { RecurringValueSection } from "@/components/pricing/RecurringValueSection";

const tiers = [
    {
        id: "basic",
        name: "Basic",
        tagline: "Instant validation",
        price: "$0",
        priceSub: "Forever",
        badge: null,
        theme: "wireframe",
        cta: "Start for Free",
        ctaHref: "/analyze",
        priceId: undefined,
        features: [
            { label: "Instant Fairness Score (0-100)", value: true },
            { label: "Top-level summary (Fair vs. Overpriced)", value: true },
            { label: "Basic market confidence rating", value: true },
            { label: "Line-by-line benchmark analysis", value: false },
            { label: "Exact-match negotiation script", value: false },
            { label: "Downloadable PDF audit report", value: false },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "For active negotiations",
        price: "$12",
        priceSub: "/month",
        badge: null,
        theme: "solid",
        cta: "Upgrade to Pro",
        ctaHref: null,
        priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || "pro",
        features: [
            { label: "Everything in Basic", value: true },
            { label: "Line-by-line benchmark analysis", value: true },
            { label: "Exact-match negotiation script", value: true },
            { label: "Savings estimate range (High/Low)", value: true },
            { label: "Downloadable PDF audit report", value: true },
            { label: "Historical price dashboard", value: true },
            { label: "Unlimited quote audits", value: "5 / month" },
        ],
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "Year-round peace of mind",
        price: "$79",
        priceSub: "/year",
        badge: "Best Value",
        theme: "premium",
        cta: "Get Premium",
        ctaHref: null,
        priceId: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_PRICE_ID || "premium",
        features: [
            { label: "Everything in Pro", value: true },
            { label: "Unlimited quote audits", value: true },
            { label: "Priority analysis speed", value: true },
            { label: "Digital Asset Log (Home & Auto)", value: true },
            { label: "Dedicated priority support", value: true },
        ],
    },
];

const faqs = [
    {
        q: "Do I really need a subscription for this?",
        a: "If you only have one quote, the Pro plan gives you what you need, and you can cancel anytime. However, most users realize that maintaining cars, homes, and health requires constant quotes. The Premium plan defends your wallet year-round.",
    },
    {
        q: "Am I guaranteed to save money?",
        a: "FairDealCheck provides the exact regional benchmarking data used by insurance adjusters and fleet managers. While we cannot force a contractor to lower their price, an objective data report is the ultimate negotiation leverage.",
    },
    {
        q: "Can I cancel the monthly plan after I use it?",
        a: "Yes. There are no lock-in contracts for the Monthly Pro tier. You can cancel your subscription from your dashboard with two clicks.",
    },
    {
        q: "What if the analysis says my quote is fair?",
        a: "Then you have bought absolute peace of mind. Knowing you are paying a fair market rate is just as valuable as exposing an overcharge.",
    },
    {
        q: "Is there a limit to how many quotes I can upload?",
        a: "The Pro plan includes up to 5 comprehensive audits per month to prevent automated abuse. The Premium Annual plan includes unlimited quote auditing for personal use.",
    },
];

function FeatureValue({ value }: { value: string | boolean }) {
    if (value === true) return <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (value === false) return <XCircle className="w-5 h-5 text-neutral-300 mx-auto" />;
    return <span className="text-sm font-medium text-navy">{value}</span>;
}

export default function PricingPage() {
    const [paddle, setPaddle] = useState<Paddle>();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        initializePaddle({
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production",
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        }).then((p) => { if (p) setPaddle(p); });
    }, []);

    const handleUpgrade = (priceId?: string) => {
        if (!isSignedIn || !user) {
            window.location.href = "/sign-in?redirect_url=/pricing";
            return;
        }
        if (paddle && priceId) {
            paddle.Checkout.open({
                settings: { displayMode: "overlay", theme: "light" },
                items: [{ priceId, quantity: 1 }],
                customData: { userId: user.id },
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
                        The average FairDealCheck user saves $340 per audit. Choose your leverage.
                    </h1>
                    <p className="text-lg text-navy/60">
                        Stop overpaying for opaque services. Simple, transparent pricing for every tier.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative flex flex-col rounded-[32px] border p-8 ${tier.theme === "premium"
                                    ? "bg-white text-navy border-navy shadow-2xl shadow-navy/10 md:-translate-y-4 z-10 lg:p-10"
                                    : tier.theme === "solid"
                                        ? "bg-white text-navy border-neutral-200 shadow-sm"
                                        : "bg-neutral-50/50 text-navy border-neutral-200 border-dashed"
                                }`}
                        >
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">
                                    ⭐ {tier.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${tier.theme === "premium" ? "text-emerald-600" : "text-navy/40"}`}>
                                    {tier.tagline}
                                </div>
                                <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                                    <span className="text-base text-navy/50 font-medium">{tier.priceSub}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map((f, i) => (
                                    <li key={i} className={`flex items-start text-sm gap-3 ${f.value === false ? "text-navy/40" : "text-navy/80"}`}>
                                        <span className="flex-shrink-0 mt-0.5">
                                            {f.value === true ? (
                                                <CheckCircle2 className={`w-4 h-4 ${tier.theme === "premium" ? "text-emerald-500" : "text-emerald-400"}`} />
                                            ) : f.value === false ? (
                                                <span className="w-4 h-4 flex items-center justify-center text-neutral-300">—</span>
                                            ) : (
                                                <span className="font-semibold text-xs text-navy bg-navy/5 px-2 py-0.5 rounded">{f.value}</span>
                                            )}
                                        </span>
                                        <span className={f.value === false ? "line-through" : "font-medium leading-tight"}>{f.label}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            {tier.ctaHref ? (
                                <Link href={tier.ctaHref}>
                                    <button
                                        className={`w-full py-4 rounded-full font-bold text-sm transition-all border-2 ${tier.theme === "premium"
                                                ? "bg-navy text-white border-navy hover:bg-navy-light"
                                                : "bg-transparent text-navy border-neutral-200 hover:border-navy hover:bg-neutral-50"
                                            }`}
                                    >
                                        {tier.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => handleUpgrade(tier.priceId)}
                                    disabled={!paddle}
                                    className={`w-full py-4 rounded-full font-bold text-sm transition-all border-2 ${tier.theme === "premium"
                                            ? "bg-navy text-white border-navy hover:bg-navy-light"
                                            : "bg-white text-navy border-neutral-200 hover:border-navy hover:bg-neutral-50 shadow-sm"
                                        } disabled:opacity-50`}
                                >
                                    {!paddle ? "Loading..." : `${tier.cta} →`}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Recurring Value Section */}
                <RecurringValueSection />

                {/* Savings Confidence Guarantee */}
                <div className="max-w-3xl mx-auto mb-20">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-[40px] p-10 text-center">
                        <div className="text-4xl mb-4">🔥</div>
                        <h2 className="text-2xl font-bold text-navy mb-3">Savings Confidence Guarantee</h2>
                        <p className="text-navy/70 leading-relaxed max-w-xl mx-auto mb-6">
                            If FairDealCheck doesn&apos;t help you identify savings, pricing insight, or negotiation leverage within 30 days, we refund you &mdash; guaranteed.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-navy/50">
                            <span>🔒 Secure checkout</span>
                            <span>↩ 30-day refund</span>
                            <span>✅ Cancel anytime</span>
                            <span>🚫 No hidden fees</span>
                        </div>
                    </div>
                </div>

                {/* Reframe */}
                <div className="text-center mb-20">
                    <p className="text-navy/40 text-sm italic max-w-md mx-auto">
                        &ldquo;Your next quote analysis is $0. The overcharge you miss isn&apos;t.&rdquo;
                    </p>
                </div>

                {/* FAQ */}
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-navy">Common questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-3xl border transition-all overflow-hidden ${openFaq === i ? "border-navy/20 bg-white shadow-md shadow-navy/5" : "border-neutral-100 bg-neutral-50"}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full text-left px-7 py-5 flex justify-between items-center"
                                >
                                    <span className="font-semibold text-navy">{faq.q}</span>
                                    <span className={`text-navy/30 ml-4 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                                        ✕
                                    </span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-7 pb-6 text-navy/60 leading-relaxed text-sm">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom trust */}
                <div className="text-center mt-16 text-sm text-navy/40">
                    Payments securely processed by{" "}
                    <span className="font-semibold text-navy/60">Paddle</span>.
                    &nbsp;GDPR compliant. Cancel anytime.
                </div>
            </main>
        </div>
    );
}
