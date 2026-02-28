"use client";

import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";

interface FairnessGaugeProps {
    score: number;
    className?: string;
}

export function FairnessGauge({ score, className = "" }: FairnessGaugeProps) {
    const [displayScore, setDisplayScore] = useState(0);
    const radius = 80;
    const circumference = radius * Math.PI; // Semicircle
    const offset = circumference - (displayScore / 100) * circumference;

    useEffect(() => {
        const duration = 1500;
        const start = 0;
        const end = score;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: easeOutExpo
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentScore = Math.floor(start + (end - start) * easedProgress);

            setDisplayScore(currentScore);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [score]);

    const getStatus = (s: number) => {
        if (s >= 80) return { label: "Fair", color: "text-emerald-500", stroke: "stroke-emerald-500", bg: "bg-emerald-50" };
        if (s >= 50) return { label: "Caution", color: "text-amber-500", stroke: "stroke-amber-500", bg: "bg-amber-50" };
        return { label: "Overpriced", color: "text-rose-500", stroke: "stroke-rose-500", bg: "bg-rose-50" };
    };

    const status = getStatus(score);

    const getExplanation = (s: number) => {
        if (s >= 80) return "This quote is within 5% of local market rates. Competitive value.";
        if (s >= 50) return "Quote is 15-20% above regional average. Negotiate labor.";
        return "Significant markup detected. Use our script to challenge this.";
    };

    return (
        <div className={`relative flex flex-col items-center bg-white p-10 rounded-[40px] border border-neutral-100 shadow-premium transition-all duration-500 hover:shadow-premium-hover group ${className}`}>
            <div className="relative mb-6">
                <svg width="240" height="140" className="transform -rotate-0 filter drop-shadow-sm">
                    {/* Background arc */}
                    <path
                        d="M 30 120 A 90 90 0 0 1 210 120"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />

                    {/* Progress arc */}
                    <path
                        d="M 30 120 A 90 90 0 0 1 210 120"
                        fill="none"
                        className={`${status.stroke} transition-all duration-300 ease-out`}
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />

                    {/* Range indicators */}
                    <circle cx="30" cy="120" r="4" className="fill-rose-400 group-hover:scale-125 transition-transform" />
                    <circle cx="120" cy="30" r="4" className="fill-amber-400 group-hover:scale-125 transition-transform" />
                    <circle cx="210" cy="120" r="4" className="fill-emerald-400 group-hover:scale-125 transition-transform" />
                </svg>

                {/* Central Label */}
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
                    <div className="flex items-baseline">
                        <span className={`text-6xl font-black tracking-tighter ${status.color}`}>
                            {displayScore}
                        </span>
                        <span className="text-xl font-bold text-neutral-300 italic -ml-1">/100</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 -mt-1">
                        Fairness Score
                    </span>
                </div>
            </div>

            {/* Status Badge & Explanation */}
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className={`px-5 py-1.5 rounded-full ${status.bg} border border-white shadow-sm flex items-center space-x-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text', 'bg')} animate-pulse`}></div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${status.color}`}>
                        {status.label}
                    </span>
                </div>

                <p className="text-sm font-bold text-neutral-500 leading-relaxed max-w-[220px]">
                    {getExplanation(score)}
                </p>
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-8 border-t border-neutral-50 w-full flex justify-center">
                <div className="flex items-center space-x-2 text-neutral-400">
                    <Info className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        Cross-referenced Database
                    </span>
                </div>
            </div>
        </div>
    );
}
