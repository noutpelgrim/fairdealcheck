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
        color: "bg-navy text-white",
        chipColor: "bg-white/10 text-white/70 border-white/10",
        savedColor: "text-emerald-400",
        quoteColor: "text-white/80",
        nameColor: "text-white",
        locColor: "text-white/50",
        borderColor: "border-navy/20",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
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
        quoteColor: "text-neutral-600",
        nameColor: "text-navy",
        locColor: "text-neutral-400",
        borderColor: "border-neutral-100",
    },
];

function Stars() {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
    return (
        <div className={`flex-shrink-0 w-80 rounded-3xl border p-6 flex flex-col gap-3 shadow-sm ${t.color} ${t.borderColor}`}>
            {/* Top row */}
            <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${t.chipColor}`}>
                    {t.category}
                </span>
                <span className={`text-xs font-bold ${t.savedColor}`}>💰 {t.saved}</span>
            </div>

            <Stars />

            {/* Quote */}
            <p className={`text-sm leading-relaxed ${t.quoteColor}`}>
                &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-2.5 pt-2 mt-auto border-t border-current/10">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                    <Image src={t.avatar} alt={t.name} width={36} height={36} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${t.nameColor}`}>{t.name}</p>
                    <p className={`text-[11px] ${t.locColor}`}>{t.location}</p>
                </div>
                <svg className={`w-4 h-4 flex-shrink-0 ${t.savedColor}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}

export function TestimonialsSection() {
    // Duplicate cards for seamless loop
    const all = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section className="pb-24 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-10 px-6">
                <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Real Results
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight mb-2">
                    People who stopped paying full price.
                </h2>
                <p className="text-navy/50 text-sm">
                    From brake jobs to HVAC to dental bills — real savings from real people.
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

            <p className="text-center text-xs text-neutral-400 mt-6 px-6">
                All outcomes reflect individual results. Savings vary based on region, service type, and negotiation.
            </p>
        </section>
    );
}
