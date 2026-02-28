"use client";

import React from "react";
import { Check, AlertCircle, ArrowRight } from "lucide-react";

interface LineItem {
    label: string;
    value: string | number;
    type: "fair" | "overcharge";
}

interface AnalysisPreviewProps {
    title?: string;
    lineItems?: LineItem[];
    originalPrice?: string | number;
    fairPrice?: string | number;
    negotiationScript?: string;
    currency?: string;
    className?: string;
}

export function AnalysisPreview({
    title = "Auto Transmission Repair",
    lineItems = [
        { label: "Labor Rate Overcharge", value: "+$240", type: "overcharge" },
        { label: "Parts/Inventory", value: "Fair", type: "fair" }
    ],
    originalPrice = "2,450.00",
    fairPrice = "1,850.00",
    negotiationScript = "I've cross-referenced the labor rates for this repair in our area, and $180/hr is 30% above market average...",
    currency = "$",
    className = ""
}: AnalysisPreviewProps) {
    return (
        <div className={`w-full max-w-2xl mx-auto glass rounded-[40px] overflow-hidden shadow-premium transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1 group/analysis ${className}`}>
            {/* App Header */}
            <div className="bg-navy px-8 py-5 flex items-center justify-between border-b border-white/10">
                <div className="flex space-x-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/50"></div>
                </div>
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                    Analysis Dashboard
                </div>
            </div>

            <div className="p-10">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Main Card */}
                    <div className="flex-1 space-y-8 w-full">
                        <div>
                            <h4 className="text-[10px] font-black text-neutral-400 mb-2 uppercase tracking-widest">Case Context</h4>
                            <p className="text-2xl font-black text-navy tracking-tighter">{title}</p>
                        </div>

                        <div className="space-y-4">
                            {lineItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex justify-between items-center p-5 rounded-3xl border transition-all duration-300 ${item.type === "overcharge"
                                        ? "bg-rose-50/50 border-rose-100 hover:bg-rose-50"
                                        : "bg-neutral-50/50 border-neutral-100 hover:bg-neutral-50"
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.type === "overcharge" ? "bg-rose-100 text-rose-500" : "bg-emerald-100 text-emerald-500"}`}>
                                            {item.type === "overcharge" ? (
                                                <AlertCircle className="w-5 h-5" />
                                            ) : (
                                                <Check className="w-5 h-5" />
                                            )}
                                        </div>
                                        <span className={`text-sm font-bold ${item.type === "overcharge" ? "text-rose-900" : "text-navy-light"}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-black ${item.type === "overcharge" ? "text-rose-600" : "text-navy"}`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-10 border-t border-navy/5 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">Original Quote</p>
                                <p className="text-3xl font-black text-navy line-through decoration-rose-500/20">{currency}{originalPrice}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center">
                                <ArrowRight className="w-6 h-6 text-navy/20" />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Fair Market Rate</p>
                                <p className="text-4xl font-black text-emerald-600 tracking-tighter">{currency}{fairPrice}</p>
                            </div>
                        </div>
                    </div>

                    {/* Script Section */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-navy p-8 rounded-[40px] shadow-2xl shadow-navy/20 relative overflow-hidden group/script">
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">AI Negotiation Script</h4>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed italic font-medium mb-10">
                                    "{negotiationScript}"
                                </p>
                                <button className="w-full py-4 bg-white text-navy text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-neutral-100 transition-all shadow-xl shadow-black/10 active:scale-95">
                                    Copy Script
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
