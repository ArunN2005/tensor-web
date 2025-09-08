"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/pages/Hero";
import AboutUs from "@/components/pages/AboutUs";
import Promotions from "@/components/pages/Promotions";
import Image from "next/image";

export default function HomePage() {
  // Countdown for marquee (Induction 2025)
  const [marqueeCountdown, setMarqueeCountdown] = useState<string>("");
  const eventISO = "2025-09-08T16:45:00+05:30";

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
    const target = new Date(eventISO).getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
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
      {/* Induction 2025 marquee hero */}
      <section className="relative py-12 bg-[hsla(var(--background),1)] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative rounded-xl border border-[hsla(var(--border),0.2)] bg-[hsla(var(--card),0.5)] backdrop-blur-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>
                <span className="gradient-text">Induction 2025</span>
              </h3>
              {marqueeCountdown && (
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[hsla(var(--electric-cyan),0.4)] bg-[hsla(var(--background),0.6)] text-[hsla(var(--electric-cyan),1)] text-xs md:text-sm" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  <span className="w-2 h-2 rounded-full bg-[hsla(var(--electric-cyan),1)] animate-pulse"></span>
                  Starts in {marqueeCountdown}
                </div>
              )}
              <p className="text-[hsl(var(--foreground))] opacity-85 mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                September 8th, 2025 • 4:45 PM • Amriteshwari Hall
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="/events" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsla(var(--electric-cyan),0.9)] hover:bg-[hsla(var(--electric-cyan),1)] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  View Event Details
                </a>
              </div>
            </div>
            <div className="relative w-full md:w-80 overflow-hidden rounded-lg border border-[hsla(var(--border),0.2)]">
              <div className="relative aspect-[904/1280] overflow-hidden rounded-lg bg-[hsla(var(--background),0.7)]">
                {/* Blurred ambient background */}
                <div 
                  aria-hidden 
                  className="absolute inset-0 bg-center bg-cover blur-2xl scale-110 opacity-35"
                  style={{ backgroundImage: "url('/images/upcoming events/induction 2025.jpg')" }}
                />
                <Image src="/images/upcoming events/induction 2025.jpg" alt="Induction 2025" fill className="object-contain" sizes="(max-width: 768px) 80vw, 20vw" priority />
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
          title: "Induction 2025",
          subtitle: "Join us for the official induction of Tensor Club — vision, projects, and an inspiring kickoff to the year.",
          ctaText: "View Event Details",
          ctaLink: "/events",
          imageUrl: "/images/upcoming events/induction 2025.jpg",
          eventDate: "2025-09-08T16:45:00+05:30"
        }
      ]} />
    </>
  );
}