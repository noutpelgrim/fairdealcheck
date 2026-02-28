"use client";

import React, { useState } from "react";
import { Copy, Check, MessageSquare, ShieldCheck } from "lucide-react";

interface NegotiationScriptProps {
    script?: string;
    className?: string;
}

export function NegotiationScript({
    script = "I've reviewed the market rates for localized solvent-based paint materials. The quoted price is significantly above the regional average for high-performance clearcoat. I'd like to adjust this to match the fair market value of €3,650.",
    className = ""
}: NegotiationScriptProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`w-full max-w-xl mx-auto glass rounded-[40px] p-10 md:p-12 shadow-premium transition-all duration-500 hover:shadow-premium-hover border border-white/40 relative overflow-hidden group ${className}`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-navy/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-[18px] bg-navy flex items-center justify-center shadow-xl shadow-navy/20">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Strategy Engine</p>
                            <h3 className="text-xl font-black text-navy tracking-tighter">Negotiation Script</h3>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Market Verified</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -left-5 top-0 bottom-0 w-1.5 bg-navy/10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-navy origin-top transition-transform duration-500 group-hover:scale-y-100 scale-y-0"></div>
                    </div>
                    <p className="text-xl md:text-2xl text-navy/80 leading-relaxed font-bold italic pl-4 tracking-tight">
                        "{script}"
                    </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                    <button
                        onClick={handleCopy}
                        className={`w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.1em] text-[11px] transition-all duration-500 active:scale-95 shadow-2xl ${copied
                            ? "bg-emerald-500 text-white shadow-emerald-500/30"
                            : "bg-navy text-white hover:bg-navy-light shadow-navy/20"
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4.5 h-4.5" />
                                <span>Copied Successfully</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4.5 h-4.5" />
                                <span>Copy Expert Template</span>
                            </>
                        )}
                    </button>
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Polite & Firm Tone</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
