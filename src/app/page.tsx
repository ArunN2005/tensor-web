"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/pages/Hero";
import AboutUs from "@/components/pages/AboutUs";
import Promotions from "@/components/pages/Promotions";
import Image from "next/image";

export default function HomePage() {
  // Countdown for marquee (AI-Verse Hackathon Grand Finale)
  const [marqueeCountdown, setMarqueeCountdown] = useState<string>("");
  const finaleISO = "2026-01-08T09:00:00+05:30"; // Grand Finale: Jan 8, 2026 at 9 AM IST

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay of 100ms
    }
  }, []);

  useEffect(() => {
    const target = new Date(finaleISO).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      if (diff === 0) {
        setMarqueeCountdown("");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setMarqueeCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          boxShadow: "0px 4px 6px rgba(28, 25, 23, 0.2), 0px 1px 3px rgba(28, 25, 23, 0.1)",
        }}
      >
        <Hero />
      </div>
      {/* AI-Verse Hackathon marquee hero */}
      <section className="relative py-12 bg-[hsla(var(--background),1)] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative rounded-xl border border-[hsla(var(--border),0.2)] bg-[hsla(var(--card),0.5)] backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>
                <span className="gradient-text">AI-Verse Hackathon | ANOKHA 2026</span>
              </h3>
              {marqueeCountdown && (
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-3 rounded-full border-2 border-[hsla(var(--electric-cyan),0.6)] bg-[hsla(var(--background),0.8)] text-[hsla(var(--electric-cyan),1)] text-sm md:text-base font-bold shadow-lg shadow-[hsla(var(--electric-cyan),0.3)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-[hsla(var(--electric-cyan),1)] animate-pulse"></span>
                  Grand Finale in {marqueeCountdown}
                </div>
              )}
              <p className="text-[hsl(var(--foreground))] opacity-85 mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                • Online: Dec 22-30, 2025 
              </p>
              <p className="text-[hsl(var(--foreground))] opacity-85 mb-3 font-semibold text-[hsla(var(--electric-cyan),1)]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                • Grand Finale: Jan 8, 2026 @ 9:00 AM | Amrita Coimbatore
              </p>
              <p className="text-[hsl(var(--foreground))] opacity-85 mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                • ₹3L Prize Pool
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="https://anokha.amrita.edu/hackathon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--magenta))] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Register Now
                </a>
                <a href="/events" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[hsla(var(--electric-cyan),0.5)] hover:bg-[hsla(var(--electric-cyan),0.1)] text-[hsla(var(--electric-cyan),1)] font-semibold rounded-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  View Details
                </a>
              </div>
            </div>
            <div className="relative w-full md:w-80 overflow-hidden rounded-lg border border-[hsla(var(--border),0.2)]">
              <div className="relative aspect-[904/1280] overflow-hidden rounded-lg bg-[hsla(var(--background),0.7)]">
                {/* Blurred ambient background */}
                <div 
                  aria-hidden 
                  className="absolute inset-0 bg-center bg-cover blur-2xl scale-110 opacity-35"
                  style={{ backgroundImage: "url('/images/aiversenew.jpeg')" }}
                />
                <Image src="/images/aiversenew.jpeg" alt="AI-Verse Hackathon" fill className="object-contain" sizes="(max-width: 768px) 80vw, 20vw" priority />
                {/* Inner shadow for depth */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[rgba(255,255,255,0.05)] pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[hsla(var(--digital-purple),0.04)] blur-[60px]"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[hsla(var(--electric-cyan),0.04)] blur-[60px]"></div>
      </section>
      <AboutUs />
      <Promotions promotions={[
        {
          title: "AI-Verse Hackathon | ANOKHA 2026",
          subtitle: "Premier National-Level Hackathon with ₹3L Prize Pool. Tracks: Generative AI, Agentic AI, AIoT. Grand Finale: Jan 8, 2026 @ 9:00 AM.",
          ctaText: "Register Now",
          ctaLink: "https://anokha.amrita.edu/hackathon",
          imageUrl: "/images/aiversenew.jpeg",
          eventDate: "2026-01-08T09:00:00+05:30"
        }
      ]} />
    </>
  );
}