"use client";

import React from "react";
import { Check, ShieldCheck, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function PricingGrid() {
    const comparison = [
        { feature: "Quote Checks", free: "1 per month", pro: "Unlimited" },
        { feature: "Digital Garage & Home Ledger", free: false, pro: "Full Tracking" },
        { feature: "Live Market Rate Alerts", free: "Basic", pro: "Real-time ZIP Tracking" },
        { feature: "Subscription Auditing", free: false, pro: "Automated" },
        { feature: "Verified Provider Network", free: false, pro: "Full Access" },
        { feature: "Priority Support", free: false, pro: true },
    ];

    return (
        <div className="space-y-24">
            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Tier */}
                <div className="group relative p-10 md:p-12 rounded-[40px] border border-neutral-100 bg-white hover:border-neutral-200 transition-all duration-500 shadow-premium hover:shadow-premium-hover">
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Tier 01</h3>
                            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest italic">Standard Access</span>
                        </div>
                        <h4 className="text-3xl font-black text-navy tracking-tighter">Free</h4>
                        <div className="flex items-baseline mt-6">
                            <span className="text-6xl font-black text-navy tracking-tighter">€0</span>
                            <span className="text-neutral-400 font-bold ml-2 uppercase tracking-widest text-[10px]">/ forever</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-10">
                        {["1 Quote Analysis per month", "Basic Market Baseline", "Standard Negotiation Scripts"].map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-navy-light/70 font-bold group-hover:text-navy transition-colors">
                                <Check className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link href="/analyze" className="block">
                        <Button variant="outline" className="w-full h-20 rounded-2xl border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px]">
                            Start Free Check
                        </Button>
                    </Link>
                </div>

                {/* Pro Tier */}
                <div className="group relative p-10 md:p-12 rounded-[40px] bg-navy text-white shadow-2xl transition-all duration-500 overflow-hidden border border-white/5 hover:scale-[1.02]">
                    {/* Internal Glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full"></div>

                    <div className="mb-10 relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Tier 02</h3>
                            <div className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-lg shadow-emerald-500/20">
                                <Zap className="w-2.5 h-2.5 fill-current" />
                                <span>Most Popular</span>
                            </div>
                        </div>
                        <h4 className="text-3xl font-black tracking-tighter">Pro</h4>
                        <div className="flex items-baseline mt-6">
                            <span className="text-6xl font-black tracking-tighter">€19</span>
                            <span className="text-white/40 font-bold ml-2 uppercase tracking-widest text-[10px]">/ month</span>
                        </div>
                    </div>

                    <ul className="space-y-4 mb-10 relative z-10">
                        {["Digital Garage Asset Tracking", "Live Market Rate Alerts", "Subscription Bill Auditing", "Verified Provider Network"].map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-white/70 font-bold group-hover:text-white transition-colors">
                                <Check className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <Link href="/pricing" className="block relative z-10">
                        <Button className="w-full h-20 rounded-2xl bg-white text-navy hover:bg-neutral-100 transition-all font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-black/20">
                            Unlock All Features
                        </Button>
                    </Link>

                    <div className="mt-8 flex items-center justify-center space-x-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 relative z-10">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>30-Day Money-Back Guarantee</span>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Deep Dive</h3>
                    <h4 className="text-4xl font-black text-navy tracking-tighter">Feature Comparison</h4>
                </div>

                <div className="overflow-hidden rounded-[40px] border border-neutral-100 bg-white shadow-premium">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50/50 border-b border-neutral-100">
                                <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Capability</th>
                                <th className="p-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] text-center">Free</th>
                                <th className="p-8 text-[10px] font-black text-navy uppercase tracking-[0.2em] text-center bg-navy text-white">Pro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50">
                            {comparison.map((item, idx) => (
                                <tr key={idx} className="hover:bg-neutral-50/30 transition-colors group/row">
                                    <td className="p-8 text-sm font-bold text-navy-light group-hover/row:text-navy transition-colors">{item.feature}</td>
                                    <td className="p-8 text-sm text-neutral-400 text-center font-bold">
                                        {typeof item.free === 'string' ? item.free : (item.free ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-neutral-200 mx-auto" />)}
                                    </td>
                                    <td className={`p-8 text-sm text-center font-black bg-navy/5 ${typeof item.pro === 'string' ? 'text-navy' : ''}`}>
                                        {typeof item.pro === 'string' ? item.pro : (item.pro ? <Check className="w-5 h-5 text-emerald-500 mx-auto transition-transform group-hover/row:scale-110" /> : <X className="w-5 h-5 text-neutral-200 mx-auto" />)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
