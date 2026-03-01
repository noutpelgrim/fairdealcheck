"use client";

import React, { useEffect, useRef, useState } from "react";

// Animates a number from 0 → target over ~1.8s when in view
function useCountUp(target: number, duration = 1800) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const tick = (now: number) => {
                        const p = Math.min((now - start) / duration, 1);
                        // ease-out cubic
                        const eased = 1 - Math.pow(1 - p, 3);
                        setValue(Math.round(target * eased));
                        if (p < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [target, duration]);

    return { value, ref };
}

export function SavingsCounter() {
    const { value, ref } = useCountUp(4200000);

    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);

    return (
        <div
            ref={ref}
            className="mt-6 inline-flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2"
        >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-sm font-semibold text-emerald-800">
                {formatted} in overcharges identified this month
            </span>
        </div>
    );
}
