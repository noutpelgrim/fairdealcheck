"use client";

import React from "react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        name: "Marcus T.",
        location: "Columbus, OH",
        category: "Auto Repair",
        saved: "$400 saved",
        avatar: "/avatar-marcus.png",
        quote: "My mechanic quoted me $1,340 for a brake job and I almost just paid it. FairDealCheck flagged the labor rate as 38% above local benchmark. I walked out paying $940.",
        color: "bg-slate-900 text-white",
        chipColor: "bg-white/10 text-white/70 border-white/10",
        savedColor: "text-emerald-400",
        quoteColor: "text-white/80",
        nameColor: "text-white",
        locColor: "text-white/50",
        borderColor: "border-slate-800",
    },
    {
        name: "Sandra L.",
        location: "Phoenix, AZ",
        category: "HVAC",
        saved: "$2,700 saved",
        avatar: "/avatar-sandra.png",
        quote: "FairDealCheck scored the highest HVAC quote a 44 out of 100 and broke down exactly which line items were inflated. Got him down to $3,100 using their script.",
        color: "bg-white",
        chipColor: "bg-orange-50 text-orange-600 border-orange-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
    {
        name: "James K.",
        location: "Denver, CO",
        category: "Appliance Repair",
        saved: "$170 saved",
        avatar: "/avatar-james.png",
        quote: "The repair service wanted $380 to replace a washing machine pump — the part is $45 on Amazon. FairDealCheck showed me the markup and the technician dropped to $210.",
        color: "bg-white",
        chipColor: "bg-violet-50 text-violet-600 border-violet-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
    {
        name: "Patricia M.",
        location: "Nashville, TN",
        category: "Dental Billing",
        saved: "$290 recovered",
        avatar: "/avatar-patricia.png",
        quote: "I found I was billed $290 above my insurance's allowed amount. FairDealCheck gave me the exact language to dispute it. One phone call and they corrected the bill.",
        color: "bg-white",
        chipColor: "bg-pink-50 text-pink-600 border-pink-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
    {
        name: "Derek W.",
        location: "Portland, OR",
        category: "Home Renovation",
        saved: "$2,100 saved",
        avatar: "/avatar-derek.png",
        quote: "FairDealCheck helped me see which contractor was padding materials vs just expensive on labor. I saved $2,100 by targeting specific line items. Felt like I finally knew what I was talking about.",
        color: "bg-white",
        chipColor: "bg-amber-50 text-amber-600 border-amber-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
    {
        name: "Rachel H.",
        location: "Chicago, IL",
        category: "Plumbing",
        saved: "$220 saved",
        avatar: "/avatar-rachel.png",
        quote: "A plumber quoted me $680 to replace a shower valve. FairDealCheck gave it a 51 fairness score. I used the script and we landed at $460. The plumber respected that I'd done my homework.",
        color: "bg-white",
        chipColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
    {
        name: "Tony B.",
        location: "Sacramento, CA",
        category: "Equipment Servicing",
        saved: "$600 saved",
        avatar: "/avatar-tony.png",
        quote: "A commercial oven repair came in at $1,800. FairDealCheck found the diagnostic charge was nearly double the regional average. Negotiated it to $1,200. Now I run every quote through here.",
        color: "bg-white",
        chipColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
        savedColor: "text-emerald-600",
        quoteColor: "text-slate-600",
        nameColor: "text-slate-900",
        locColor: "text-slate-500",
        borderColor: "border-slate-200",
    },
];

// Stars removed for a more financial, data-driven aesthetic

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
    return (
        <div className="flex-shrink-0 w-80 rounded-lg border border-slate-200 bg-white p-6 flex flex-col shadow-sm">
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {t.category}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">{t.saved}</span>
            </div>

            {/* Quote */}
            <p className="text-[13px] leading-relaxed text-slate-600 mb-6">
                &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col pt-3 mt-auto border-t border-slate-100">
                <p className="text-[13px] font-semibold tracking-tight text-slate-900">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">{t.location}</p>
            </div>
        </div>
    );
}

export function TestimonialsSection() {
    // Duplicate cards for seamless loop
    const all = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section className="pb-32 overflow-hidden border-t border-slate-100 pt-24 mt-12 bg-slate-50">
            {/* Header */}
            <div className="text-center mb-10 px-6">
                <div className="inline-flex items-center gap-2 text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest mb-4">
                    Verified Outcomes
                </div>
                <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-2">
                    Data-backed negotiations.
                </h2>
                <p className="text-slate-500 text-sm">
                    Consistent fee reductions across multiple service sectors.
                </p>
            </div>

            {/* Marquee track */}
            <div
                className="flex gap-5 w-max"
                style={{
                    animation: "scroll-left 40s linear infinite",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
                {all.map((t, i) => (
                    <Card key={`${t.name}-${i}`} t={t} />
                ))}
            </div>

            {/* CSS keyframes injected inline */}
            <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

            <p className="text-center text-[10px] font-bold text-slate-400 mt-10 px-6 uppercase tracking-widest max-w-2xl mx-auto">
                All outcomes reflect individual results. Savings vary based on region, service type, and negotiation.
            </p>
        </section>
    );
}
