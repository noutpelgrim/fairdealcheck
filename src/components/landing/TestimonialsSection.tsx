import React from "react";
import Image from "next/image";

const TESTIMONIALS = [
    {
        name: "Marcus T.",
        location: "Columbus, OH",
        category: "Auto Repair",
        saved: "$400 saved",
        score: 5,
        avatar: "/avatar-marcus.png",
        quote:
            "My mechanic quoted me $1,340 for a brake job and I almost just paid it. FairDealCheck flagged the labor rate as 38% above local benchmark and gave me a script to use. I read it almost word-for-word at the shop and walked out paying $940. I was honestly a little shocked it worked.",
        highlight: "walked out paying $940",
    },
    {
        name: "Sandra L.",
        location: "Phoenix, AZ",
        category: "HVAC",
        saved: "$2,700 saved",
        score: 5,
        avatar: "/avatar-sandra.png",
        quote:
            "I had three HVAC quotes ranging from $3,800 to $6,200 for a new unit install. FairDealCheck scored the highest one a 44 out of 100 and broke down exactly which line items were inflated. I used the negotiation script on the mid-range contractor and got him down to $3,100.",
        highlight: "scored 44/100 — immediately knew it was wrong",
    },
    {
        name: "James K.",
        location: "Denver, CO",
        category: "Appliance Repair",
        saved: "$170 saved",
        score: 5,
        avatar: "/avatar-james.png",
        quote:
            "The repair service wanted $380 to replace a washing machine pump — the part is $45 on Amazon. FairDealCheck showed me the markup breakdown and I used the script they generated. The technician dropped to $210. Worth every penny for the subscription.",
        highlight: "markup breakdown said it all",
    },
    {
        name: "Patricia M.",
        location: "Nashville, TN",
        category: "Dental Billing",
        saved: "$290 recovered",
        score: 5,
        avatar: "/avatar-patricia.png",
        quote:
            "I uploaded an EOB from my dentist after a crown procedure and found out I was billed $290 above what my insurance's allowed amount should have been. FairDealCheck gave me the exact language to dispute it. It took one phone call and they corrected the bill immediately. Nobody tells you this stuff.",
        highlight: "one phone call, bill corrected",
    },
    {
        name: "Derek W.",
        location: "Portland, OR",
        category: "Home Renovation",
        saved: "$2,100 saved",
        score: 5,
        avatar: "/avatar-derek.png",
        quote:
            "I was getting quotes for a bathroom renovation and they varied wildly. FairDealCheck helped me understand which contractor was padding materials versus which was just expensive on labor. I saved about $2,100 on the final contract by targeting specific line items. It made me feel like I actually knew what I was talking about.",
        highlight: "felt like I actually knew what I was talking about",
    },
    {
        name: "Rachel H.",
        location: "Chicago, IL",
        category: "Plumbing",
        saved: "$220 saved",
        score: 5,
        avatar: "/avatar-rachel.png",
        quote:
            "A plumber quoted me $680 to replace a shower valve. FairDealCheck gave it a 51 fairness score and showed me the part should run $60–$90 and the job typically takes under two hours. I pushed back using their script and we landed at $460. The plumber actually seemed to respect that I'd done my homework.",
        highlight: "fairness score: 51/100",
    },
    {
        name: "Tony B.",
        location: "Sacramento, CA",
        category: "Equipment Servicing",
        saved: "$600 saved",
        score: 5,
        avatar: "/avatar-tony.png",
        quote:
            "I run a small bakery and had a commercial oven repair quote come in at just over $1,800. FairDealCheck found the travel fee and diagnostic charge were nearly double the regional average. I negotiated it down to $1,200 and now I run every service quote through here before I sign anything.",
        highlight: "now I run every quote through here",
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    "Auto Repair": "bg-blue-50 text-blue-600 border-blue-100",
    "HVAC": "bg-orange-50 text-orange-600 border-orange-100",
    "Appliance Repair": "bg-violet-50 text-violet-600 border-violet-100",
    "Dental Billing": "bg-pink-50 text-pink-600 border-pink-100",
    "Home Renovation": "bg-amber-50 text-amber-600 border-amber-100",
    "Plumbing": "bg-cyan-50 text-cyan-600 border-cyan-100",
    "Equipment Servicing": "bg-emerald-50 text-emerald-600 border-emerald-100",
};

function Stars({ n }: { n: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: n }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export function TestimonialsSection() {
    // Split into 3 columns for masonry effect
    const col1 = [TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[6]];
    const col2 = [TESTIMONIALS[1], TESTIMONIALS[4]];
    const col3 = [TESTIMONIALS[2], TESTIMONIALS[5]];

    const Card = ({ t, featured }: { t: typeof TESTIMONIALS[0]; featured?: boolean }) => (
        <div className={`relative flex flex-col gap-4 rounded-3xl border p-6 transition-shadow hover:shadow-lg ${featured
                ? "bg-navy text-white border-navy/20 shadow-xl shadow-navy/10"
                : "bg-white border-neutral-100 shadow-sm"
            }`}>
            {/* Category + savings */}
            <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${featured
                        ? "bg-white/10 text-white/70 border-white/10"
                        : CATEGORY_COLORS[t.category]
                    }`}>
                    {t.category}
                </span>
                <span className={`text-xs font-bold ${featured ? "text-emerald-400" : "text-emerald-600"}`}>
                    💰 {t.saved}
                </span>
            </div>

            {/* Stars */}
            <Stars n={t.score} />

            {/* Quote */}
            <p className={`text-sm leading-relaxed ${featured ? "text-white/80" : "text-neutral-600"}`}>
                &ldquo;{t.quote}&rdquo;
            </p>

            {/* Highlight chip */}
            <div className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl w-fit ${featured ? "bg-white/10 text-white/70" : "bg-neutral-50 text-neutral-400 border border-neutral-100"
                }`}>
                ✦ &ldquo;{t.highlight}&rdquo;
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-1 mt-auto border-t border-neutral-100/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <div>
                    <p className={`text-sm font-bold ${featured ? "text-white" : "text-navy"}`}>{t.name}</p>
                    <p className={`text-[11px] ${featured ? "text-white/50" : "text-neutral-400"}`}>{t.location}</p>
                </div>
                {/* Verified badge */}
                <div className="ml-auto">
                    <svg className={`w-5 h-5 ${featured ? "text-emerald-400" : "text-emerald-500"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );

    return (
        <section className="pb-24 px-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Real Results
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight mb-3">
                    People who stopped paying full price.
                </h2>
                <p className="text-navy/50 max-w-sm mx-auto text-sm">
                    From brake jobs to HVAC to dental bills — real savings from real people.
                </p>
            </div>

            {/* Masonry grid — hidden on mobile, shown on md+ */}
            <div className="hidden md:grid md:grid-cols-3 gap-5 items-start">
                {/* Column 1 */}
                <div className="flex flex-col gap-5">
                    {col1.map((t, i) => (
                        <Card key={t.name} t={t} featured={i === 0} />
                    ))}
                </div>
                {/* Column 2 — offset down */}
                <div className="flex flex-col gap-5 mt-8">
                    {col2.map((t) => (
                        <Card key={t.name} t={t} />
                    ))}
                </div>
                {/* Column 3 — offset down less */}
                <div className="flex flex-col gap-5 mt-4">
                    {col3.map((t) => (
                        <Card key={t.name} t={t} />
                    ))}
                </div>
            </div>

            {/* Mobile: single column */}
            <div className="md:hidden flex flex-col gap-4">
                {TESTIMONIALS.map((t, i) => (
                    <Card key={t.name} t={t} featured={i === 0} />
                ))}
            </div>

            {/* Bottom trust line */}
            <div className="mt-10 text-center">
                <p className="text-xs text-neutral-400">
                    All outcomes reflect individual results. Savings vary based on region, service type, and negotiation.
                </p>
            </div>
        </section>
    );
}
