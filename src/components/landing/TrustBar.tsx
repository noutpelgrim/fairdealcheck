"use client";

import React from "react";

export function TrustBar() {
    const points = [
        { label: "Verified Price Records", value: "84,000+" },
        { label: "Regional Pricing Match", value: "99.4%" },
        { label: "Avg. Negotiation Success", value: "82.5%" },
        { label: "Market Indices Tracked", value: "14,800" },
        { label: "Overcharges Identified", value: "$4.2M+" },
    ];

    return (
        <div className="w-full border-y border-neutral-100 bg-white/50 backdrop-blur-sm py-16">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-6">
                    {points.map((p, i) => (
                        <div key={i} className="text-center md:text-left group transition-all duration-300">
                            <div className="relative inline-block md:block">
                                <p className="text-4xl font-black text-navy tracking-tighter group-hover:text-emerald-500 transition-colors duration-500">{p.value}</p>
                                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500/20 rounded-full md:block hidden"></div>
                            </div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-4 leading-relaxed max-w-[120px]">
                                {p.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
