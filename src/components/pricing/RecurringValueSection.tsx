"use client";

import React from "react";
import { Car, BellRing, ShieldCheck, Repeat } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function RecurringValueSection() {
    const features = [
        {
            id: "garage",
            icon: <Car className="w-6 h-6 text-emerald-600" />,
            title: "Digital Garage & Home Ledger",
            subtitle: "Predictive asset management.",
            description: "Log your major assets (cars, HVAC, appliances). We forecast predictive maintenance costs and track your repair ROI so you know exactly when to repair vs. replace based on live market data."
        },
        {
            id: "alerts",
            icon: <BellRing className="w-6 h-6 text-emerald-600" />,
            title: "Live Market Rate Alerts",
            subtitle: "The 'Zillow Zestimate' for services.",
            description: "Labor rates fluctuate. We monitor your specific ZIP code and alert you when off-season rates drop (like HVAC in October), allowing you to time your non-emergency repairs for maximum savings."
        },
        {
            id: "network",
            icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
            title: "Verified Provider Network",
            subtitle: "The Inverse Lead-Gen Model.",
            description: "Contractors don't pay us for leads; you pay us for truth. Access our 'Green List' of local providers who have a mathematical track record of quoting at or below the Fair Market Price."
        },
        {
            id: "bills",
            icon: <Repeat className="w-6 h-6 text-emerald-600" />,
            title: "Subscription Auditing",
            subtitle: "Auto-monitor recurring bills.",
            description: "Link your recurring bills (Internet, Insurance, Pest Control). We constantly check them against promotional rates and give you the exact script to call and demand the lower price."
        }
    ];

    return (
        <section className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-100">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Proactive Protection
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight mb-4">
                    Never overpay for anything, ever again.
                </h2>
                <p className="text-lg text-navy/60">
                    FairDeal Pro is more than a quote checker. It’s your permanent financial shield against the opaque service industry.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                    <Card key={feature.id} padding="lg" className="bg-neutral-50 border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 group">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-neutral-100 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-1">{feature.title}</h3>
                            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">{feature.subtitle}</p>
                            <p className="text-navy/60 leading-relaxed max-w-sm">
                                {feature.description}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-navy rounded-3xl p-10 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
                <h3 className="text-2xl font-bold mb-3 relative z-10">The ROI is automatic.</h3>
                <p className="text-white/60 max-w-md mx-auto relative z-10">
                    Catching just one $20 overcharge on your internet bill pays for two months of Pro. Catching a $400 markup on your brakes pays for three years.
                </p>
            </div>
        </section>
    );
}
