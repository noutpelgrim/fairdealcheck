"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ShieldCheck, Lock, Globe, Zap, Scale, EyeOff, Users, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function TransparencyPage() {
    const objections = [
        {
            icon: <Lock className="w-6 h-6 text-emerald-600" />,
            title: "The Personal Privacy Fear",
            objection: "If I upload this, are you going to sell my data or notify the service provider that I'm 'shopping' them?",
            response: "We are a Neutral Transparency Agency, not a data broker. Your quote is processed via 256-bit encryption and is never shared with third parties or the provider themselves. We make money through subscriptions, not by selling your data. We are your private 'black box' for pricing verification."
        },
        {
            icon: <Globe className="w-6 h-6 text-emerald-600" />,
            title: "The Accuracy Skepticism",
            objection: "Prices are different everywhere. How can an online tool know what a fair price is in my specific ZIP code?",
            response: "National averages are useless, which is why we don't use them. Our engine benchmarks your quote against verified regional transactions updated monthly. We factor in your exact ZIP code, local labor rates, and part markups specific to your area to ensure the benchmark is a 'market reality,' not a guess."
        },
        {
            icon: <Scale className="w-6 h-6 text-emerald-600" />,
            title: "The Conflict Avoidance",
            objection: "I like my contractor/mechanic. I don’t want to start an awkward fight over a few dollars.",
            response: "Negotiation doesn’t have to be a confrontation; it’s an audit. We provide expert-grade, professional scripts that frame the conversation as a 'budget alignment' rather than an accusation. Most providers respect customers who use independent data—it shows you’re a savvy client, not a difficult one."
        },
        {
            icon: <Zap className="w-6 h-6 text-emerald-600" />,
            title: "The Friction Barrier",
            objection: "I don't have time to fill out a 20-field form or wait days for a result.",
            response: "If you can take a photo, you can save money. Our 60-Second Audit handles the heavy lifting. Just drop the file or snap a picture; our AI extracts the data and benchmarks it instantly. It takes less time than ordering a coffee."
        },
        {
            icon: <Info className="w-6 h-6 text-emerald-600" />,
            title: "The 'Too Good To Be True' Trap",
            objection: "Is this really free? There must be a catch or a hidden paywall at the end.",
            response: "Your first audit is 100% free—no credit card required. We do this because the data speaks for itself. Once you see exactly how much you’re overpaying, you’ll see the value in our Pro tools. We win only when you save."
        },
        {
            icon: <EyeOff className="w-6 h-6 text-emerald-600" />,
            title: "The Lead-Gen Concern",
            objection: "Are you just going to score my quote 'bad' so you can recommend one of your own partners?",
            response: "FairDealCheck is 100% Independent. We do not have a 'provider network,' we don't take kickbacks from contractors, and we don't sell leads. Our only 'client' is you. Our independence is our greatest asset; if we weren't neutral, our Fairness Score would be meaningless."
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-emerald-600" />,
            title: "The Time Pressure",
            objection: "My car is already on the lift / the plumber is already here. I need to decide now.",
            response: "That urgency is exactly why providers overcharge. Taking 60 seconds to audit the quote right now can save you an average of $340. Don't let a 1-minute decision turn into a $500 mistake. Audit before you sign."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
            title: "The 'My Job is Unique' Fallacy",
            objection: "My repair is super complex and specific. A standard benchmark won't work for me.",
            response: "While every job has its nuances, labor rates and parts markups follow strict market patterns. Even if your job is unique, our audit flags if the 'base ingredients' (hourly rates and wholesale-to-retail markups) are out of line. We audit the math, not just the job description."
        },
        {
            icon: <Users className="w-6 h-6 text-emerald-600" />,
            title: "The Social Validity Gap",
            objection: "Does anyone actually use this to successfully get a lower price?",
            response: "Join over 4,200 savvy consumers who have used the FairDeal Standard to re-base their service costs. Our users save an average of $340 per negotiation. We don't just give you a score; we give you the exact leverage used by professional procurement experts."
        },
        {
            icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
            title: "The Learned Helplessness",
            objection: "Even if it is overpriced, what am I going to do? I'm not an expert, I have no leverage.",
            response: "Knowledge is the ultimate leverage. Walking into a conversation saying 'I think this is high' is a weak position. Walking in with 'Independent market benchmarks for this ZIP code show a 25% markup on these specific parts' is a position of power. We provide the data; the data provides the leverage."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 text-navy/40 bg-neutral-50 border border-neutral-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Neutral. Independent. Precise.</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
                        Transparency & Trust Centre
                    </h1>
                    <p className="text-navy/60 max-w-2xl mx-auto text-lg">
                        FairDealCheck exists to bring transparency to an opaque market. Here is how we protect your interests, maintain independence, and calculate the Independent Standard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {objections.map((item, index) => (
                        <Card key={index} className="p-8 border-neutral-100 bg-neutral-50/50 hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all duration-300">
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100 shrink-0">
                                    {item.icon}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                                        <p className="text-navy/40 italic font-medium text-sm leading-relaxed">
                                            &quot;{item.objection}&quot;
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-navy/70 leading-relaxed text-sm font-medium">
                                            {item.response}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="bg-navy rounded-[40px] p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready for an independent audit?</h2>
                    <p className="text-white/60 mb-8 max-w-md mx-auto">
                        Join 4,200+ consumers who have saved an average of $340 by verifying their quotes before paying.
                    </p>
                    <a href="/analyze" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-900/20">
                        Audit My Quote Now
                    </a>
                </div>
            </main>

            <footer className="py-12 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 text-center text-sm text-neutral-400">
                    <p>© 2026 FairDeal Technologies Inc. • Independent Pricing Authority</p>
                </div>
            </footer>
        </div>
    );
}
