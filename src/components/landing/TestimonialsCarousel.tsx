"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
    {
        quote:
            "The quote for my transmission repair came in at $2,800. FairDealCheck scored it a 38 and flagged the labor rate as 40% above average. I showed the mechanic the market breakdown and got it down to $2,100. That\u2019s $700 back in my pocket on a Tuesday.",
        name: "Marcus D.",
        age: "34",
        location: "Atlanta, GA",
        category: "Auto Repair Quote",
        saved: "$700",
    },
    {
        quote:
            "My contractor quoted $18,500 to redo my kitchen floors. The app told me fair market was $11,000\u2013$13,500 for the square footage. I didn\u2019t argue \u2014 I just asked if they could come closer to market rate. They dropped to $14,200 without blinking.",
        name: "Priya S.",
        age: "41",
        location: "Austin, TX",
        category: "Home Contractor Quote",
        saved: "$4,300",
    },
    {
        quote:
            "As a first-time homeowner, I had no idea what anything should cost. My HVAC company gave me a $4,400 quote. FairDealCheck said the average in my zip code was $2,900. I got two more quotes and ended up paying $3,100. I felt like an adult for the first time.",
        name: "Jordan W.",
        age: "28",
        location: "Charlotte, NC",
        category: "HVAC Installation Quote",
        saved: "$1,300",
    },
    {
        quote:
            "I run a small caf\u00e9 and use it for every vendor contract now. Last month it flagged a commercial refrigeration repair quote as 55% over market \u2014 the score was 31. I negotiated $1,800 off the service contract. It\u2019s paid for itself for the next two years.",
        name: "Elena M.",
        age: "47",
        location: "Chicago, IL",
        category: "Small Business Owner",
        saved: "$1,800",
    },
    {
        quote:
            "Honestly, I thought it was going to tell me everything is overpriced just to feel validated. My roofing quote came back at a 74 \u2014 basically fair. But it still flagged one underlayment line item marked up 60%. I negotiated just that part and saved $380.",
        name: "Tom B.",
        age: "52",
        location: "Denver, CO",
        category: "Skeptical First-Time User",
        saved: "$380",
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

            <div className="relative bg-neutral-50 rounded-[40px] border border-neutral-100 p-10 md:p-16 overflow-hidden min-h-[280px] flex flex-col justify-between">
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
                            <div className="font-bold text-navy">{t.name}, {t.age}</div>
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
                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-navy w-6" : "bg-neutral-300"}`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrows */}
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
