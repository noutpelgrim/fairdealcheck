"use client";

import React, { useEffect, useRef, useState } from "react";

const SCENES = [
  { id: "s1", start: 0, end: 8 },
  { id: "s2", start: 7, end: 18 },
  { id: "s3", start: 17, end: 27 },
  { id: "s4", start: 26, end: 36 },
  { id: "s5", start: 35, end: 43 },
  { id: "s6", start: 42, end: 52 },
];
const TOTAL = 52;

export function DemoVideo() {
  const [activeScene, setActiveScene] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setPlaying(true);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!playing) return;
    const tick = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const t = (ts - startTimeRef.current) / 1000;
      setElapsed(t);
      let sceneIdx = SCENES.length - 1;
      for (let i = 0; i < SCENES.length; i++) {
        if (t >= SCENES[i].start && t < SCENES[i].end) { sceneIdx = i; break; }
      }
      setActiveScene(sceneIdx);
      if (t < TOTAL) { rafRef.current = requestAnimationFrame(tick); }
      else { startTimeRef.current = null; setElapsed(0); setActiveScene(0); rafRef.current = requestAnimationFrame(tick); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing]);

  const progress = Math.min((elapsed / TOTAL) * 100, 100);
  const is = (idx: number) => activeScene === idx;

  return (
    <section className="pb-6 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          See It In Action
        </div>
        <h2 className="text-3xl font-bold text-navy tracking-tight mb-2">
          From quote to negotiation in 60 seconds.
        </h2>
        <p className="text-navy/60 text-sm max-w-md mx-auto">
          Watch how FairDealCheck turns a confusing repair bill into a clear, data-backed action plan.
        </p>
      </div>

      {/* Demo frame */}
      <div
        ref={containerRef}
        className="relative bg-[#f8fafc] border border-neutral-200 rounded-[28px] overflow-hidden shadow-xl"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Scene dots */}
        <div className="absolute top-4 right-5 z-20 flex items-center gap-1.5">
          {SCENES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeScene ? "w-6 bg-emerald-500" : i < activeScene ? "w-1.5 bg-emerald-200" : "w-1.5 bg-neutral-200"}`} />
          ))}
        </div>

        {/* ── SCENE 1: HOOK ── */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${is(0) ? "opacity-100" : "opacity-0"}`}>
          <div className="relative mb-8" style={{ transform: "rotate(-1.5deg)" }}>
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 w-72">
              <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-4">Repair Estimate #4821</p>
              {[["Brake Pads & Rotors", "$340"], ["Labor (3.5 hrs)", "$580"], ["Diagnostic Fee", "$140"], ["Miscellaneous", "$140"]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-xs py-1.5 border-b border-neutral-50 text-neutral-600"><span>{l}</span><span>{v}</span></div>
              ))}
              <div className="flex justify-between text-base font-black pt-3 text-red-600"><span>TOTAL DUE</span><span>$1,200</span></div>
            </div>
            <div className={`absolute top-3 right-3 border-2 border-red-500 text-red-500 text-[9px] font-black px-2 py-0.5 rounded rotate-12 bg-white tracking-widest transition-opacity duration-500 ${is(0) ? "opacity-100 delay-700" : "opacity-0"}`}>FAIR?</div>
          </div>
          <div className={`text-center transition-all duration-500 ${is(0) ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-3"}`}>
            <p className="text-2xl font-black text-navy tracking-tight leading-tight mb-2">
              You just got a $1,200 quote.<br />
              <span className="text-red-500">But should you have said yes?</span>
            </p>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">Mechanics and contractors set prices knowing you can&apos;t verify them. <strong className="text-navy">FairDealCheck changes that.</strong></p>
          </div>
        </div>

        {/* ── SCENE 2: UPLOAD ── */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${is(1) ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white border border-neutral-200 rounded-2xl shadow p-5 w-[480px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="flex-1 bg-neutral-100 rounded text-[10px] text-neutral-400 px-2 py-1 ml-1">fairdealcheck.com/analyze</span>
            </div>
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-700 ${is(1) ? "border-emerald-400 bg-emerald-50/40" : "border-neutral-200"}`}>
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm font-bold text-navy">Drop your repair quote here</p>
              <p className="text-xs text-neutral-400 mt-1">PDF, image, or text — we handle it all</p>
              <div className={`mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity duration-500 ${is(1) ? "opacity-100 delay-[1000ms]" : "opacity-0"}`}>
                ✅ RepairEstimate_4821.pdf — Uploaded
              </div>
              {/* Trust chip */}
              <div className={`mt-2 inline-flex items-center gap-1.5 text-[10px] text-neutral-400 transition-opacity duration-500 ${is(1) ? "opacity-100 delay-[1200ms]" : "opacity-0"}`}>
                🔒 Encrypted upload · Auto-deleted after analysis
              </div>
              <div className={`mt-3 h-1 bg-neutral-100 rounded-full overflow-hidden transition-opacity duration-300 ${is(1) ? "opacity-100 delay-[1400ms]" : "opacity-0"}`}>
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: is(1) ? "100%" : "0%", transition: is(1) ? "width 1.8s ease 1.6s" : "none" }} />
              </div>
            </div>
          </div>
          <p className={`text-sm text-neutral-500 transition-all duration-500 delay-300 ${is(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
            Compared against <strong className="text-navy">84,000+ verified records from your region.</strong>
          </p>
        </div>

        {/* ── SCENE 3: SCORE ── */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${is(2) ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-10 text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-5">Your Fairness Score</p>
            <div className="relative w-36 h-36 mx-auto mb-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="60" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" strokeDasharray="377"
                  style={{ strokeDashoffset: is(2) ? 377 * 0.39 : 377, transition: is(2) ? "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.4s" : "none" }} />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-4xl font-black text-amber-500 tracking-tighter transition-opacity duration-500 ${is(2) ? "opacity-100 delay-700" : "opacity-0"}`}>61</span>
            </div>
            <div className={`inline-block bg-amber-50 border border-amber-200 text-amber-700 font-bold text-base px-5 py-2 rounded-xl mb-3 transition-all duration-500 ${is(2) ? "opacity-100 scale-100 delay-[1500ms]" : "opacity-0 scale-95"}`}>
              ⚠️ Overpriced
            </div>
            <p className={`text-xs text-neutral-400 max-w-[240px] mx-auto leading-relaxed transition-opacity duration-500 ${is(2) ? "opacity-100 delay-[2000ms]" : "opacity-0"}`}>
              Below the 75/100 fair threshold — based on <strong className="text-navy">verified regional benchmark data.</strong>
            </p>
          </div>
        </div>

        {/* ── SCENE 4: BREAKDOWN ── */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${is(3) ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 w-[540px]">
            <p className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mb-4 pb-3 border-b border-neutral-100">Every Line Item, Audited</p>
            {[
              { label: "Brake Pads & Rotors", charged: "$340", fair: "$190–$220", tag: "+$120 Over", over: true, delay: "delay-[250ms]" },
              { label: "Labor (3.5 hrs @ $165/hr)", charged: "$580", fair: "$320–$400", tag: "+$180 Over", over: true, delay: "delay-[500ms]" },
              { label: "Diagnostic Fee", charged: "$140", fair: "$80–$120", tag: "Borderline", over: false, delay: "delay-[750ms]" },
            ].map((row) => (
              <div key={row.label} className={`grid grid-cols-[1fr_80px_100px_80px] gap-2 items-center py-2.5 border-b border-neutral-50 text-xs transition-all duration-400 ${is(3) ? `opacity-100 translate-x-0 ${row.delay}` : "opacity-0 -translate-x-3"}`}>
                <span className="font-semibold text-navy">{row.label}</span>
                <span className="font-bold text-red-500">{row.charged}</span>
                <span className="text-neutral-400">{row.fair}</span>
                <span className={`inline-block text-center px-2 py-0.5 rounded-full font-bold text-[10px] ${row.over ? "bg-red-50 text-red-500 border border-red-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>{row.tag}</span>
              </div>
            ))}
            <div className={`flex justify-between items-end pt-4 transition-opacity duration-500 ${is(3) ? "opacity-100 delay-[1200ms]" : "opacity-0"}`}>
              <div>
                <p className="text-[9px] text-neutral-400 font-medium mb-0.5">What people in your area actually pay</p>
                <p className="text-2xl font-black text-emerald-600 tracking-tight">Up to $300 overcharged</p>
              </div>
              <p className="text-[9px] text-neutral-300 text-right leading-relaxed">Based on 84,000+<br />regional repair records</p>
            </div>
          </div>
        </div>

        {/* ── SCENE 5: SCRIPT ── */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${is(4) ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 w-[520px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-sm">💬</div>
              <p className="font-bold text-sm text-navy">Then we give you <span className="text-emerald-600">the exact words.</span></p>
            </div>
            <div className={`bg-neutral-50 border border-neutral-100 border-l-4 border-l-emerald-500 rounded-r-xl p-4 text-sm text-neutral-600 italic leading-relaxed transition-all duration-500 ${is(4) ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-2"}`}>
              &ldquo;I looked at regional pricing data for this repair. I&apos;m seeing parts in the{" "}
              <strong className="text-navy not-italic">$190–$220 range</strong> and labor rates of{" "}
              <strong className="text-navy not-italic">$320–$400.</strong> Can you help me understand the difference?&rdquo;
            </div>
            <div className={`flex flex-wrap gap-2 mt-4 transition-opacity duration-500 ${is(4) ? "opacity-100 delay-[900ms]" : "opacity-0"}`}>
              {["💡 Data-backed", "✅ Non-confrontational", "📋 Copy & paste ready", "🔄 Auto-generated"].map((chip) => (
                <span key={chip} className="text-[10px] font-semibold text-neutral-500 bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded-md">{chip}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SCENE 6: CTA ── */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${is(5) ? "opacity-100" : "opacity-0"}`}>
          <div className={`flex items-center gap-2 mb-1 transition-all duration-400 ${is(5) ? "opacity-100 translate-y-0 delay-100" : "opacity-0 -translate-y-2"}`}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L4 6.5V13.5C4 19.025 8.4 24.225 14 25.5C19.6 24.225 24 19.025 24 13.5V6.5L14 2Z" fill="#0f172a" />
              <path d="M10 14L13 17L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-base font-black text-navy">FairDeal<span className="text-emerald-500">Check</span></span>
          </div>
          {/* CRO-optimized headline — advances emotional journey, doesn't repeat hero */}
          <h3 className={`text-3xl font-black text-navy text-center leading-tight tracking-tight transition-all duration-500 ${is(5) ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3"}`}>
            Walk in knowing exactly<br />
            what <span className="text-emerald-500">fair</span> looks like.
          </h3>
          <p className={`text-sm text-neutral-500 text-center max-w-xs leading-relaxed transition-opacity duration-500 ${is(5) ? "opacity-100 delay-[450ms]" : "opacity-0"}`}>
            Upload your quote. Get your score. Negotiate with confidence — in 60 seconds.
          </p>
          <div className={`transition-all duration-400 ${is(5) ? "opacity-100 scale-100 delay-[650ms]" : "opacity-0 scale-95"}`}>
            <a href="/analyze" className="inline-flex items-center gap-2 bg-navy text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-navy/20 hover:bg-navy/90 transition-colors">
              Get My Fairness Score — It&apos;s Free →
            </a>
          </div>
          <div className={`flex gap-5 mt-1 transition-opacity duration-500 ${is(5) ? "opacity-100 delay-[900ms]" : "opacity-0"}`}>
            {["🔒 256-bit encrypted", "🚫 Auto-deleted", "✅ GDPR compliant"].map((item) => (
              <span key={item} className="text-[10px] text-neutral-400 font-medium">{item}</span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-100">
          <div className="h-full bg-emerald-500 transition-none" style={{ width: `${progress}%` }} />
        </div>

        {/* Paused state */}
        {!playing && (
          <button onClick={() => { startTimeRef.current = null; setPlaying(true); }} className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </button>
        )}
      </div>

      {/* Scene labels */}
      <div className="flex justify-between mt-3 px-2">
        {["1. The Quote", "2. Upload", "3. Score", "4. Breakdown", "5. Script", "6. Act"].map((label, i) => (
          <span key={label} className={`text-[10px] font-semibold transition-colors duration-300 ${i === activeScene ? "text-emerald-600" : "text-neutral-300"}`}>{label}</span>
        ))}
      </div>
    </section>
  );
}
