"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
    {
        quote:
            "My mechanic quoted $1,850 for brake pads and rotors. FairDealCheck gave it a score of 29 and showed me the average in my zip was $1,100. I asked the shop to match market rates \u2014 they came down to $1,250 without argument.",
        name: "Kevin A.",
        location: "Phoenix, AZ",
        category: "Auto Repair",
        saved: "$600",
    },
    {
        quote:
            "My contractor wanted $22,000 for a bathroom remodel. The score was 41. I used the negotiation script, got them to $16,800, and they still took the job. I was shocked it actually worked.",
        name: "Rachel M.",
        location: "Nashville, TN",
        category: "Home Contractor",
        saved: "$5,200",
    },
    {
        quote:
            "The third appliance company I called quoted $680 for a fridge compressor. FairDealCheck scored it a 33 \u2014 fair market was $390. I found another tech at $420 the same day.",
        name: "David L.",
        location: "Portland, OR",
        category: "Appliance Service",
        saved: "$260",
    },
    {
        quote:
            "As a first-time homeowner, every quote felt like a lottery. FairDealCheck told me my HVAC installation quote was actually fair (score: 72). That saved me a week of second-guessing and two unnecessary service calls.",
        name: "Amara O.",
        location: "Richmond, VA",
        category: "First-Time Homeowner",
        saved: "Peace of mind",
    },
    {
        quote:
            "I run a property management company and thought I knew pricing. It flagged a landscaping contract at 58% over market. Renegotiated and saved $3,200 annually across four properties.",
        name: "James T.",
        location: "Dallas, TX",
        category: "Property Manager",
        saved: "$3,200/yr",
    },
];

export function TestimonialsCarousel() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
    const next = () => setActive((a) => (a + 1) % testimonials.length);

    const t = testimonials[active];

    return (
        <section className="pb-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    Real Results
                </div>
                <h2 className="text-4xl font-bold text-navy tracking-tight">
                    People just like you saved real money.
                </h2>
            </div>

            <div className="relative bg-neutral-50 rounded-[40px] border border-neutral-100 p-10 md:p-16 overflow-hidden min-h-[300px] flex flex-col justify-between">
                {/* Quote */}
                <div className="flex-1">
                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                        ))}
                    </div>
                    <blockquote className="text-navy text-lg md:text-xl font-medium leading-relaxed mb-8">
                        &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="font-bold text-navy">{t.name}</div>
                            <div className="text-sm text-navy/50">{t.location} &bull; {t.category}</div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-3 text-center">
                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-0.5">Saved</div>
                            <div className="text-2xl font-bold text-emerald-700">{t.saved}</div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <div className="flex items-center justify-between mt-10">
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-navy w-6" : "bg-neutral-300 w-2"}`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-all"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
