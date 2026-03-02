"use client";

import React, { useEffect, useRef, useState } from "react";

const SCENES = [
  { id: "s1", label: "The Hook", start: 0, end: 5 },
  { id: "s2", label: "The Mechanism", start: 4, end: 15 },
  { id: "s3", label: "The Proof", start: 14, end: 25 },
  { id: "s4", label: "The Script", start: 24, end: 30 },
  { id: "s5", label: "Transparency", start: 29, end: 33 },
  { id: "s6", label: "The CTA", start: 32, end: 36 },
];
const TOTAL = 36;

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function DemoVideo() {
  const [activeScene, setActiveScene] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Autoplay when scrolled into view
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

  // Animation loop
  useEffect(() => {
    if (!playing) return;
    const tick = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts - pausedAtRef.current * 1000;
      const t = Math.min((ts - startTimeRef.current) / 1000, TOTAL);
      setElapsed(t);
      let si = SCENES.length - 1;
      for (let i = 0; i < SCENES.length; i++) {
        if (t >= SCENES[i].start && t < SCENES[i].end) { si = i; break; }
      }
      setActiveScene(si);
      if (t < TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // loop
        startTimeRef.current = null;
        pausedAtRef.current = 0;
        setElapsed(0);
        setActiveScene(0);
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing]);

  function togglePlay() {
    if (playing) {
      pausedAtRef.current = elapsed;
      startTimeRef.current = null;
    }
    setPlaying((p) => !p);
  }

  function seek(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    let clientX: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newT = ratio * TOTAL;
    pausedAtRef.current = newT;
    startTimeRef.current = null;
    setElapsed(newT);
  }

  const progress = Math.min((elapsed / TOTAL) * 100, 100);
  const is = (i: number) => activeScene === i;

  return (
    <section className="pb-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          See It In Action
        </div>
        <h2 className="text-3xl font-bold text-navy tracking-tight mb-1">
          Hard data. Not an AI gimmick.
        </h2>
        <p className="text-navy/50 text-sm">
          Watch exactly how FairDealCheck exposes hidden markups in 36 seconds.
        </p>
      </div>

      {/* ── VIDEO PLAYER SHELL ── */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-[#111318]">

        {/* ── TOP BAR (title bar) ── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1c1f26] border-b border-white/5">
          <div className="flex items-center gap-4">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Title */}
            <span className="text-[11px] font-semibold text-white/50 tracking-wide select-none">
              FairDealCheck — Product Demo
            </span>
          </div>
          {/* Duration badge */}
          <span className="text-[10px] font-bold text-white/30 tracking-widest select-none">
            0:36
          </span>
        </div>

        {/* ── SCENE AREA ── */}
        <div
          ref={containerRef}
          className="relative bg-[#f8fafc] overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          {/* Scene progress dots */}
          <div className="absolute top-3 right-4 z-20 flex items-center gap-1.5">
            {SCENES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeScene ? "w-6 bg-emerald-500" :
                  i < activeScene ? "w-1.5 bg-emerald-300/60" :
                    "w-1.5 bg-neutral-300/50"}`}
              />
            ))}
          </div>

          {/* ── SCENE 1: HOOK ── */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${is(0) ? "opacity-100" : "opacity-0"}`}>
            <div className="relative mb-6" style={{ transform: "rotate(-1.5deg)" }}>
              <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 w-72">
                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-3">Repair Estimate #4821</p>
                {[["Brake Pads & Rotors", "$780"], ["Labor (3.5 hrs)", "$560"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-xs py-1.5 border-b border-neutral-50 text-neutral-600"><span>{l}</span><span>{v}</span></div>
                ))}
                <div className="flex justify-between text-base font-black pt-3 text-red-600"><span>TOTAL DUE</span><span>$1,340</span></div>
              </div>
              <div className={`absolute top-3 right-3 border-2 border-red-500 text-red-500 text-[9px] font-black px-2 py-0.5 rounded rotate-12 bg-white tracking-widest transition-opacity duration-500 ${is(0) ? "opacity-100 delay-500" : "opacity-0"}`}>FAIR?</div>
            </div>
            <div className={`text-center px-4 transition-all duration-500 ${is(0) ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3"}`}>
              <p className="text-xl font-black text-navy leading-tight mb-1">Think they are overcharging you?<br /><span className="text-red-500">They probably are.</span></p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">And an AI chatbot can&apos;t prove it. <strong className="text-navy">Data can.</strong></p>
            </div>
          </div>

          {/* ── SCENE 2: UPLOAD & MECHANISM ── */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${is(1) ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-white border border-neutral-200 rounded-2xl shadow p-5 w-full max-w-[460px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="flex-1 bg-neutral-100 rounded text-[10px] text-neutral-400 px-2 py-1 ml-1">fairdealcheck.com/analyze</span>
              </div>
              <div className={`border-2 border-dashed rounded-xl p-7 text-center transition-all duration-500 ${is(1) ? "border-emerald-400 bg-emerald-50/40" : "border-neutral-200"}`}>
                <div className="text-2xl mb-1">🛡️</div>
                <p className="text-sm font-bold text-navy">Proprietary Database Analysis</p>
                <p className="text-xs text-neutral-400 mt-1">Cross-referencing 84,000 distributor catalogs...</p>
                <div className={`mt-3 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity duration-500 ${is(1) ? "opacity-100 delay-700" : "opacity-0"}`}>
                  📍 Matching Local ZIP Code Benchmarks...
                </div>
                <div className={`mt-2 h-1 bg-neutral-100 rounded-full overflow-hidden transition-opacity duration-300 ${is(1) ? "opacity-100 delay-[1100ms]" : "opacity-0"}`}>
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: is(1) ? "100%" : "0%", transition: is(1) ? "width 1.4s ease 1.2s" : "none" }} />
                </div>
              </div>
            </div>
            <p className={`text-xs text-neutral-500 mt-4 text-center max-w-sm transition-all duration-500 delay-300 ${is(1) ? "opacity-100" : "opacity-0"}`}>We don&apos;t use AI to guess. <strong className="text-navy">We use real-world localized pricing data.</strong></p>
          </div>

          {/* ── SCENE 3: THE PROOF ── */}
          <div className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500 ${is(2) ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-5 w-full max-w-[520px]">
              <p className="text-[10px] font-bold tracking-widest uppercase text-navy mb-1">Marcus — Dallas, TX</p>
              <p className="text-[9px] font-bold tracking-widest uppercase text-neutral-400 mb-3 pb-2 border-b border-neutral-100">$1,340 Brake Quote Analyzed</p>
              {[
                { label: "Brake Pads & Rotors", charged: "$780", fair: "$350–$420", tag: "55% MARKUP", over: true, dl: "delay-[200ms]" },
                { label: "Labor (3.5 hrs)", charged: "$560", fair: "$400–$480", tag: "+$80 Over", over: true, dl: "delay-[400ms]" },
              ].map((r) => (
                <div key={r.label} className={`grid grid-cols-[1fr_70px_90px_76px] gap-2 items-center py-2 border-b border-neutral-50 text-xs transition-all duration-400 ${is(2) ? `opacity-100 translate-x-0 ${r.dl}` : "opacity-0 -translate-x-3"}`}>
                  <span className="font-semibold text-navy">{r.label}</span>
                  <span className="font-bold text-red-500">{r.charged}</span>
                  <span className="text-neutral-400">{r.fair}</span>
                  <span className={`text-center px-1.5 py-0.5 rounded-full font-bold text-[10px] ${r.over ? "bg-red-50 text-red-500 border border-red-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>{r.tag}</span>
                </div>
              ))}
              <div className={`flex justify-between items-end pt-3 transition-opacity duration-500 ${is(2) ? "opacity-100 delay-[900ms]" : "opacity-0"}`}>
                <div>
                  <p className="text-[9px] text-neutral-400 mb-0.5">Potential Savings Identified</p>
                  <p className="text-xl font-black text-emerald-600">$400 Overcharged</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── SCENE 4: SCRIPT ── */}
          <div className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500 ${is(3) ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 w-full max-w-[500px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-sm">💬</div>
                <p className="font-bold text-sm text-navy">Then we generate <span className="text-emerald-600">the exact counter-offer.</span></p>
              </div>
              <div className={`bg-neutral-50 border-l-4 border-l-emerald-500 rounded-r-xl p-4 text-sm text-neutral-600 italic leading-relaxed transition-all duration-500 ${is(3) ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-2"}`}>
                &ldquo;I looked at regional pricing for Dallas. The parts are coming in 55% over retail at{" "}
                <strong className="text-navy not-italic">$780.</strong> I would like to move forward, but can we use OEM-equivalent parts at standard retail pricing, closer to $380?&rdquo;
              </div>
              <div className={`flex flex-wrap gap-2 mt-3 transition-opacity duration-500 ${is(3) ? "opacity-100 delay-[700ms]" : "opacity-0"}`}>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">Marcus saved $400 in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* ── SCENE 5: TRANSPARENCY ── */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${is(4) ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-navy border border-navy shadow-lg p-8 rounded-full flex items-center justify-center w-32 h-32 mb-6 transition-all duration-500 ${is(4) ? "scale-100 opacity-100 delay-200" : "scale-90 opacity-0"}`}>
              <svg width="48" height="48" viewBox="0 0 28 28" fill="none">
                <path d="M14 2L4 6.5V13.5C4 19.025 8.4 24.225 14 25.5C19.6 24.225 24 19.025 24 13.5V6.5L14 2Z" fill="#10b981" />
                <path d="M10 14L13 17L18 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className={`text-2xl font-black text-navy text-center leading-tight mb-2 transition-all duration-500 ${is(4) ? "opacity-100 translate-y-0 delay-[400ms]" : "opacity-0 translate-y-3"}`}>
              100% Independent.
            </h3>
            <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${is(4) ? "opacity-100 delay-[600ms]" : "opacity-0"}`}>
              <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">Zero Contractor Kickbacks</span>
              <span className="text-xs text-neutral-500 mt-2">We work only for your wallet.</span>
            </div>
          </div>

          {/* ── SCENE 6: CTA ── */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${is(5) ? "opacity-100 bg-navy" : "opacity-0"}`}>
            <h3 className={`text-4xl font-black text-white text-center leading-tight transition-all duration-500 ${is(5) ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3"}`}>
              GET HARD DATA.<br /><span className="text-emerald-400">NOT GUESSES.</span>
            </h3>
            <p className={`text-sm text-white/60 text-center max-w-sm transition-opacity duration-500 ${is(5) ? "opacity-100 delay-[400ms]" : "opacity-0"}`}>
              Stop guessing. Don&apos;t pay that bill yet.
            </p>
            <div className={`mt-4 transition-all duration-400 ${is(5) ? "opacity-100 scale-100 delay-[600ms]" : "opacity-0 scale-95"}`}>
              <a href="/analyze" className="inline-flex items-center gap-2 bg-emerald-500 text-navy font-black text-sm px-8 py-4 rounded-full shadow-lg hover:bg-emerald-400 transition-colors">
                Audit My Quote In 60 Seconds →
              </a>
            </div>
          </div>

          {/* ── INITIAL PLAY OVERLAY (before autoplay triggers) ── */}
          {!started && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/60 backdrop-blur-[2px] z-30">
              <button
                onClick={() => { setStarted(true); setPlaying(true); }}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-navy ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-sm tracking-wide">Watch Demo — 0:36</span>
              </button>
            </div>
          )}
        </div>

        {/* ── VIDEO CONTROLS BAR ── */}
        <div className="bg-[#1c1f26] px-4 py-3">
          {/* Scrubber - Large hit area for mobile */}
          <div
            className="w-full h-6 flex items-center cursor-pointer relative group"
            onClick={seek}
            onTouchStart={(e) => { e.preventDefault(); seek(e); }}
            onTouchMove={(e) => { e.preventDefault(); seek(e); }}
          >
            <div className="w-full h-1.5 bg-white/10 rounded-full relative overflow-hidden">
              {/* Buffered track */}
              <div className="absolute inset-y-0 left-0 bg-white/20 rounded-full" style={{ width: "100%" }} />
              {/* Played track */}
              <div className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-none" style={{ width: `${progress}%` }} />
            </div>
            {/* Scrubber thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow opacity-0 sm:group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Volume icon */}
              <button className="text-white/40 hover:text-white/70 transition-colors" aria-label="Volume">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              </button>

              {/* Time */}
              <span className="text-white/40 text-[11px] font-mono tabular-nums select-none">
                {fmt(elapsed)} / {fmt(TOTAL)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Scene label */}
              <span className="text-white/30 text-[10px] font-semibold tracking-wide select-none">
                {SCENES[activeScene].label}
              </span>
              {/* Fullscreen icon (decorative) */}
              <button className="text-white/40 hover:text-white/70 transition-colors" aria-label="Fullscreen">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scene step indicators - Grid on mobile, flex on desktop */}
      <div className="grid grid-cols-3 sm:flex sm:justify-between items-center gap-y-2 gap-x-1 mt-3 px-1">
        {SCENES.map((s, i) => (
          <span key={s.id} className={`text-[10px] font-semibold transition-colors duration-300 text-center sm:text-left ${i === activeScene ? "text-emerald-600" : "text-neutral-300"}`}>
            {i + 1}. {s.label}
          </span>
        ))}
      </div>
    </section>
  );
}
