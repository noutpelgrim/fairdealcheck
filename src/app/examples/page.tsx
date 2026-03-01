import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Example Results — FairDealCheck | See Real Quote Analyses",
    description:
        "See how FairDealCheck analyzes real service quotes. Auto repair, contractor renovation, and appliance repair — with Fairness Scores, market comparisons, and negotiation scripts.",
};

const cases = [
    {
        id: "auto",
        label: "Auto Repair",
        title: "Brake Job — Toyota Camry, Dallas TX",
        score: 31,
        scoreColor: "text-red-500",
        scoreBg: "bg-red-50 border-red-100",
        scoreRing: "bg-red-500",
        submitted: "Brake pad + rotor replacement, Toyota Camry, suburban Dallas TX",
        rows: [
            { item: "Front brake pads", quoted: "$189", market: "$95–$120", variance: "+58%", flag: true },
            { item: "Front rotors (×2)", quoted: "$310", market: "$160–$200", variance: "+55%", flag: true },
            { item: "Labor (2.5 hrs @ $145/hr)", quoted: "$362", market: "$95–$110/hr avg", variance: "+40%", flag: true },
            { item: "Brake fluid flush", quoted: "$89", market: "Not due (car: 14 mo old)", variance: "Unnecessary", flag: true },
            { item: "Total", quoted: "$950", market: "Fair: $520–$640", variance: "", flag: false, isTotals: true },
        ],
        flags: [
            "Parts priced 55–58% above regional distributor averages",
            "Labor rate 40% above the Dallas metro benchmark",
            "Fluid flush added unnecessarily on a 14-month-old vehicle",
        ],
        script: "I've done some research on regional pricing for this repair. The parts and labor are coming in significantly above the Dallas market average. I'd like to move forward — can we look at using OEM-equivalent parts at closer to retail and adjusting the labor rate to around $100/hr?",
        savings: "$280–$380",
    },
    {
        id: "contractor",
        label: "Home Contractor",
        title: "Master Bathroom Remodel — Charlotte NC",
        score: 38,
        scoreColor: "text-red-500",
        scoreBg: "bg-red-50 border-red-100",
        scoreRing: "bg-red-500",
        submitted: "Master bathroom remodel, 85 sq ft, Charlotte NC",
        rows: [
            { item: "Demo & haul-away", quoted: "$1,800", market: "$600–$900", variance: "+100%", flag: true },
            { item: "Tile (materials)", quoted: "$2,400", market: "$1,100–$1,400", variance: "+70%", flag: true },
            { item: "Tile installation labor", quoted: "$3,200", market: "$2,000–$2,600", variance: "+35%", flag: true },
            { item: "Vanity + fixture install", quoted: "$1,400", market: "$800–$1,100", variance: "+40%", flag: true },
            { item: "Project management fee", quoted: "$1,700", market: "Not standard for scope", variance: "Inflated", flag: true },
            { item: "Total", quoted: "$19,800", market: "Fair: $12,500–$15,000", variance: "", flag: false, isTotals: true },
        ],
        flags: [
            "Demolition labor priced at 2× market rate",
            "Materials marked up 70% above retail supply cost",
            "Project management fee added without clear scope definition",
        ],
        script: "I've had a chance to review the estimate against market rates for this scope in Charlotte. I'm committed to moving forward with you — a few line items came in higher than expected. Can we revisit the demo cost and materials sourcing? I'd also like to clarify what's included in the project management fee.",
        savings: "$3,500–$5,200",
    },
    {
        id: "appliance",
        label: "Appliance Repair",
        title: "Refrigerator Compressor — LG French Door, Atlanta GA",
        score: 22,
        scoreColor: "text-red-500",
        scoreBg: "bg-red-50 border-red-100",
        scoreRing: "bg-red-500",
        submitted: "Refrigerator compressor replacement, LG French door, Atlanta GA",
        rows: [
            { item: "Compressor (OEM)", quoted: "$640", market: "$280–$340 retail", variance: "+90%", flag: true },
            { item: "Labor (2 hrs @ $185/hr)", quoted: "$370", market: "$95–$120/hr avg", variance: "+60%", flag: true },
            { item: "Diagnostic fee", quoted: "$175", market: "$75–$100 avg", variance: "+90%", flag: true },
            { item: "Total", quoted: "$1,185", market: "Fair: $520–$680", variance: "", flag: false, isTotals: true },
        ],
        flags: [
            "Compressor sourced at 90% above distributor cost",
            "Diagnostic fee nearly double the Atlanta regional average",
            "Labor rate 60% above market benchmark for appliance repair",
        ],
        script: "The compressor quote is about double retail and the labor rate is above the Atlanta average. I want to get this resolved quickly — can we revisit the parts sourcing and bring the labor rate closer to $100/hr?",
        savings: "$420–$600",
    },
];

const scoreFactors = [
    { factor: "Labor rate deviation", weight: "40%", what: "Your quoted rate vs. certified regional benchmark" },
    { factor: "Parts / materials markup", weight: "40%", what: "Quote price vs. verified distributor/retail cost" },
    { factor: "Scope reasonableness", weight: "20%", what: "Unnecessary add-ons flagged against service history norms" },
];

export default function ExamplesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShieldCheck className="h-6 w-6 text-navy" />
                        <span className="font-bold text-lg tracking-tight text-navy">FairDeal</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/blog" className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">Blog</Link>
                        <Link href="/analyze" className="text-sm font-medium text-navy hover:text-emerald-600 transition-colors">Analyze Now</Link>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        Example Results
                    </div>
                    <h1 className="text-5xl font-bold text-navy tracking-tight mb-5">
                        See FairDealCheck in action.
                    </h1>
                    <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">
                        Real quote scenarios. Real data. Every example below shows exactly how we break down a service quote, where overcharges hide, and what to say to get a lower price.
                    </p>
                </div>

                {/* Cases */}
                <div className="space-y-16">
                    {cases.map((c, i) => (
                        <div key={c.id} className="bg-neutral-50 rounded-[40px] border border-neutral-100 overflow-hidden">
                            {/* Case header */}
                            <div className="p-8 md:p-12 border-b border-neutral-100">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                                                {c.label}
                                            </span>
                                            <span className="text-xs text-navy/40">Example {i + 1}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-navy mb-2">{c.title}</h2>
                                        <p className="text-sm text-navy/50">Quote submitted: {c.submitted}</p>
                                    </div>
                                    {/* Score badge */}
                                    <div className={`flex-shrink-0 flex flex-col items-center justify-center rounded-3xl border px-8 py-5 ${c.scoreBg}`}>
                                        <div className="text-xs font-bold uppercase tracking-widest text-navy/50 mb-1">Fairness Score</div>
                                        <div className={`text-5xl font-bold ${c.scoreColor}`}>{c.score}</div>
                                        <div className="text-xs text-navy/40 mt-1">/ 100</div>
                                        <div className="mt-2 text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Overpriced</div>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-navy text-white">
                                            <th className="text-left px-6 py-3 font-semibold text-xs uppercase tracking-wider">Line Item</th>
                                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">Quoted</th>
                                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">Market Rate</th>
                                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">Variance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {c.rows.map((row, j) => (
                                            <tr
                                                key={j}
                                                className={`border-b border-neutral-100 ${row.isTotals ? "bg-navy/5 font-bold" : row.flag ? "bg-red-50/50" : "bg-white"}`}
                                            >
                                                <td className="px-6 py-3 text-navy flex items-center gap-2">
                                                    {row.flag && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 inline-block" />}
                                                    {row.item}
                                                </td>
                                                <td className="px-4 py-3 text-navy font-medium">{row.quoted}</td>
                                                <td className="px-4 py-3 text-navy/60">{row.market}</td>
                                                <td className={`px-4 py-3 font-semibold ${row.variance.includes("+") ? "text-red-500" : row.variance === "Unnecessary" || row.variance === "Inflated" ? "text-amber-600" : "text-navy/40"}`}>
                                                    {row.variance}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Flags + Script */}
                            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-navy/40 mb-4">What We Flagged</div>
                                    <ul className="space-y-2">
                                        {c.flags.map((f, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-navy/70">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-0.5">Potential Savings</div>
                                            <div className="text-xl font-bold text-emerald-700">{c.savings}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-navy/40 mb-4">Negotiation Script Generated</div>
                                    <blockquote className="bg-white border border-neutral-200 rounded-2xl p-5 text-sm text-navy/70 leading-relaxed italic">
                                        &ldquo;{c.script}&rdquo;
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Score explanation */}
                <div className="mt-20 bg-navy rounded-[40px] p-10 md:p-16 text-white">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            How Scoring Works
                        </div>
                        <h2 className="text-3xl font-bold mb-3">Your score is calculated, not estimated.</h2>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Every Fairness Score is a weighted index of three independently verified factors.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                        {scoreFactors.map((f, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="text-emerald-400 text-2xl font-bold mb-1">{f.weight}</div>
                                <div className="font-bold text-white mb-2">{f.factor}</div>
                                <div className="text-sm text-white/60 leading-relaxed">{f.what}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                            <span className="text-white/70"><strong className="text-white">70–100</strong> &nbsp;Fair or competitive</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                            <span className="text-white/70"><strong className="text-white">50–69</strong> &nbsp;Room to negotiate</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/20" />
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                            <span className="text-white/70"><strong className="text-white">0–49</strong> &nbsp;Statistically overpriced</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <h2 className="text-4xl font-bold text-navy tracking-tight mb-4">Your quote is next.</h2>
                    <p className="text-navy/60 mb-8 max-w-md mx-auto">
                        Every example above started with someone uploading a quote they weren&apos;t sure about. In under 60 seconds, they had data.
                    </p>
                    <Link href="/analyze">
                        <button className="bg-navy text-white font-bold px-10 py-5 rounded-full hover:bg-emerald-700 transition-all shadow-xl shadow-navy/10 text-lg">
                            Check My Quote — It&apos;s Free
                            <ArrowRight className="inline ml-2 w-5 h-5" />
                        </button>
                    </Link>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {[
                            { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "256-bit encrypted" },
                            { icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", label: "Never shared" },
                            { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", label: "Auto-deleted" },
                            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "GDPR compliant" },
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-navy/40 text-xs">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                                </svg>
                                {b.label}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-400">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 opacity-40" />
                        <span className="font-semibold tracking-tight opacity-60">FairDealCheck</span>
                    </Link>
                    <div className="flex items-center space-x-8">
                        <Link href="/examples" className="hover:text-navy transition-colors">Examples</Link>
                        <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
                        <Link href="/pricing" className="hover:text-navy transition-colors">Pricing</Link>
                    </div>
                    <p>© 2026 FairDeal Technologies Inc.</p>
                </div>
            </footer>
        </div>
    );
}
