"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, TrendingDown, Users, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ProofTrustSection() {
    return (
        <section className="pb-24 px-6 max-w-5xl mx-auto">
            {/* Massive Proof Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 mt-12">
                {[
                    { label: "Total Savings Found", value: "$4.2M", icon: <TrendingDown className="w-5 h-5 text-emerald-500" /> },
                    { label: "Data Points", value: "84,000+", icon: <ShieldCheck className="w-5 h-5 text-slate-400" /> },
                    { label: "Accuracy Rate", value: "94%", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
                    { label: "Independent Audits", value: "4,200+", icon: <Users className="w-5 h-5 text-slate-400" /> },
                ].map((stat, i) => (
                    <div key={i} className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center gap-2">
                        <div className="p-2 bg-slate-50 rounded-lg shadow-sm border border-slate-100 mb-1">
                            {stat.icon}
                        </div>
                        <div className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Side: Credibility Narrative */}
                <div className="lg:col-span-6 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
                            Built on Truth.
                        </h2>
                    </div>

                    <div className="space-y-6 pt-2">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Real Data Advantage</h3>
                                <p className="text-sm text-slate-500">We don’t guess. We cross-reference exact part numbers and local labor rates.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Zero Conflict of Interest</h3>
                                <p className="text-sm text-slate-500">We take zero referral fees from contractors or mechanics.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Total Transparency</h3>
                                <p className="text-sm text-slate-500">See exactly what contractors pay wholesale versus what they charge you.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Bank-Grade Security</h3>
                                <p className="text-sm text-slate-500">Your uploads are encrypted and automatically deleted after analysis.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Audit Result Card */}
                <div className="lg:col-span-6 space-y-6">
                    <Card className="relative p-8 border-slate-200 shadow-sm bg-white overflow-hidden group rounded-2xl">
                        {/* Status Stamp */}
                        <div className="absolute top-6 right-6 -rotate-12 border-2 border-red-500/20 text-red-500/50 px-4 py-1 text-xl font-bold uppercase tracking-widest opacity-20 pointer-events-none transition-opacity">
                            Audit Verified
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-2xl">🚗</div>
                            <div>
                                <h4 className="font-semibold text-slate-900">Auto Repair Audit #8942</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Columbus, OH • Mar 2026</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Original Quote</div>
                                    <div className="text-2xl font-semibold text-slate-400 line-through">$1,340.00</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-1">Fair Market Price</div>
                                    <div className="text-4xl font-semibold tracking-tight text-slate-900">$940.00</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Labor Rate Deviation</span>
                                    <span className="text-red-500 font-semibold">+38%</span>
                                </div>
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingDown className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-semibold text-emerald-700">Audit Outcome: $400 Saved</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                                        User applied "Labor Alignment" script. Provider adjusted rate to market average.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Verification Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neutral Audit Result</span>
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic font-mono">
                                Benchmark: 02-OH-43215
                            </div>
                        </div>
                    </Card>

                    {/* Integrated Testimonial Formatting */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100">
                            <Image src="/avatar-marcus.png" alt="Marcus T." width={48} height={48} className="object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-3 h-3 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                ))}
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                "I uploaded a $1,200 brake quote. FairDealCheck flagged a 55% parts markup and gave me the exact counter-offer. I saved $400 in five minutes."
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">— Marcus T., Dallas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
