"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Flame } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { Navbar } from "@/components/Navbar";

const tiers = [
    {
        id: "starter",
        name: "Starter",
        tagline: "Try it risk-free",
        price: "Free",
        priceSub: "forever",
        badge: null,
        highlight: false,
        cta: "Start for Free",
        ctaHref: "/analyze",
        features: [
            { label: "Quote analyses per month", value: "1" },
            { label: "Fairness Score (0–100)", value: true },
            { label: "Line-item breakdown", value: "Basic" },
            { label: "Regional market comparison", value: true },
            { label: "Parts markup analysis", value: false },
            { label: "Labor rate benchmarking", value: false },
            { label: "Negotiation script", value: "Generic" },
            { label: "Negotiation template library", value: false },
            { label: "PDF export", value: false },
            { label: "Priority support", value: false },
        ],
    },
    {
        id: "pro",
        name: "FairDeal Pro",
        tagline: "For savvy consumers",
        price: "$9",
        priceSub: "/month",
        annualNote: "$90/yr — 2 months free",
        badge: "Most Popular",
        highlight: true,
        cta: "Upgrade to Pro",
        ctaHref: null, // triggers paddle
        features: [
            { label: "Quote analyses per month", value: "Unlimited" },
            { label: "Fairness Score (0–100)", value: true },
            { label: "Line-item breakdown", value: "Full" },
            { label: "Regional market comparison", value: true },
            { label: "Parts markup analysis", value: true },
            { label: "Labor rate benchmarking", value: true },
            { label: "Negotiation script", value: "Tailored" },
            { label: "Negotiation template library", value: "15+ templates" },
            { label: "PDF export", value: true },
            { label: "Priority support", value: "Email" },
        ],
    },
    {
        id: "business",
        name: "FairDeal Business",
        tagline: "For teams & property managers",
        price: "$39",
        priceSub: "/month",
        annualNote: "$390/yr — 2 months free",
        badge: null,
        highlight: false,
        cta: "Get Business",
        ctaHref: "mailto:hello@fairdealcheck.com?subject=Business Plan",
        features: [
            { label: "Quote analyses per month", value: "Unlimited" },
            { label: "Fairness Score (0–100)", value: true },
            { label: "Line-item breakdown", value: "Full" },
            { label: "Regional market comparison", value: true },
            { label: "Parts markup analysis", value: true },
            { label: "Labor rate benchmarking", value: true },
            { label: "Negotiation script", value: "Tailored" },
            { label: "Negotiation template library", value: "15+ templates" },
            { label: "PDF export", value: true },
            { label: "Priority support", value: "Priority + chat" },
            { label: "Team seats", value: "Up to 10" },
            { label: "Team quote history & tracking", value: true },
        ],
    },
];

const faqs = [
    {
        q: "Why pay when I can just Google repair prices?",
        a: "Google gives you national averages. We give you your ZIP code, your vehicle, your service category — benchmarked against real transactions updated monthly. That specificity is what makes the negotiation actually work.",
    },
    {
        q: "What if I only need to check one quote?",
        a: "Start with Starter — it's free, forever. You get one complete analysis at no cost. Upgrade to Pro when you realize it worked.",
    },
    {
        q: "Is there a contract or long-term commitment?",
        a: "No contracts, no commitments. Pro and Business plans are month-to-month. Cancel anytime in one click — we don't make it hard to leave because we're confident you won't want to.",
    },
    {
        q: "What if my service isn't in the database?",
        a: "We cover 200+ service categories across automotive, home services, and appliances. If your category isn't supported, we'll refund your first month — no questions asked.",
    },
    {
        q: "Can I share an analysis with a contractor or mechanic?",
        a: "Yes. Pro and Business users can export a full PDF of their analysis — including the Fairness Score and line-item breakdown — to share directly with a service provider.",
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

    const handleUpgrade = () => {
        if (!isSignedIn || !user) {
            window.location.href = "/sign-in?redirect_url=/pricing";
            return;
        }
        if (paddle) {
            paddle.Checkout.open({
                settings: { displayMode: "overlay", theme: "light" },
                items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID!, quantity: 1 }],
                customData: { userId: user.id },
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Pricing
                    </div>
                    <h1 className="text-5xl font-bold text-navy tracking-tight mb-4">
                        One negotiation pays for a year of Pro.
                    </h1>
                    <p className="text-lg text-navy/60">
                        The average FairDealCheck user saves $340 on their first negotiation. Pro costs $9/month.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative flex flex-col rounded-[32px] border p-8 ${tier.highlight
                                    ? "bg-navy text-white border-navy shadow-2xl shadow-navy/20 scale-105"
                                    : "bg-neutral-50 text-navy border-neutral-100"
                                }`}
                        >
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                                    ⭐ {tier.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.highlight ? "text-emerald-400" : "text-navy/40"}`}>
                                    {tier.tagline}
                                </div>
                                <h2 className="text-2xl font-bold mb-5">{tier.name}</h2>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold">{tier.price}</span>
                                    <span className={`text-sm ${tier.highlight ? "text-white/60" : "text-navy/40"}`}>{tier.priceSub}</span>
                                </div>
                                {"annualNote" in tier && (
                                    <div className={`text-xs mt-2 ${tier.highlight ? "text-emerald-400" : "text-emerald-600"}`}>
                                        {(tier as typeof tiers[1]).annualNote}
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((f, i) => (
                                    <li key={i} className={`flex items-center justify-between text-sm gap-3 ${tier.highlight ? "text-white/80" : "text-navy/70"}`}>
                                        <span>{f.label}</span>
                                        <span className="flex-shrink-0">
                                            {f.value === true ? (
                                                <CheckCircle2 className={`w-4 h-4 ${tier.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
                                            ) : f.value === false ? (
                                                <XCircle className={`w-4 h-4 ${tier.highlight ? "text-white/20" : "text-neutral-300"}`} />
                                            ) : (
                                                <span className={`font-semibold text-xs ${tier.highlight ? "text-emerald-300" : "text-navy"}`}>{f.value}</span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            {tier.ctaHref ? (
                                <Link href={tier.ctaHref}>
                                    <button
                                        className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${tier.highlight
                                                ? "bg-white text-navy hover:bg-emerald-50"
                                                : "bg-navy text-white hover:bg-emerald-700"
                                            }`}
                                    >
                                        {tier.cta} <ArrowRight className="inline w-4 h-4 ml-1" />
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={handleUpgrade}
                                    disabled={!paddle}
                                    className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${tier.highlight
                                            ? "bg-white text-navy hover:bg-emerald-50"
                                            : "bg-navy text-white hover:bg-emerald-700"
                                        } disabled:opacity-50`}
                                >
                                    {!paddle ? "Loading..." : `${tier.cta} →`}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

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
