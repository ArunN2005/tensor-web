"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Simple pseudo-random number generator with seed
const seededRandom = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed) * 10000;
  const result = (x - Math.floor(x)) * (max - min) + min;
  return result;
};

// Define a function to generate deterministic particles with a seed
const generateParticles = (count: number, seed: number = 123) => {
  return Array.from({ length: count }, (_, i) => {
    const size = seededRandom(1, 4, seed + i * 0.1);
    const top = seededRandom(0, 100, seed + i * 0.2);
    const left = seededRandom(0, 100, seed + i * 0.3);
    const color = i % 3 === 0 
      ? 'hsla(var(--electric-cyan), 0.6)' 
      : i % 3 === 1 
        ? 'hsla(var(--digital-purple), 0.6)' 
        : 'hsla(var(--magenta), 0.6)';
        
    return { size, top, left, color, id: i };
  });
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  interface Particle {
    size: number;
    top: number;
    left: number;
    color: string;
    id: number;
  }
  
  const [particles, setParticles] = useState<Array<Particle>>([]);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Generate particles on the client side only to avoid hydration mismatch
    setParticles(generateParticles(30));
    
    // Create orb animation on mouse move
    const container = containerRef.current;
    const orb = orbRef.current;
    
    if (!container || !orb) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Move the orb with mouse position
      gsap.to(orb, {
        x: (x - 0.5) * 80,
        y: (y - 0.5) * 80,
        duration: 1.5,
        ease: "power3.out"
      });
    };
    
    // Fade in elements on load with a slight delay
    const timeline = gsap.timeline({ delay: 0.2 });
    
    timeline.fromTo(
      orb,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );
    
    timeline.fromTo(
      textRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.8"
    );
    
    timeline.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
    
    // Add subtle floating animation to the orb
    gsap.to(orb, {
      y: "+=20",
      x: "+=10",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Wait a brief moment for particles to be in the DOM
    setTimeout(() => {
      // Animate the particles
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        const delay = i * 0.1;
        gsap.fromTo(
          particle,
          { 
            opacity: 0,
            y: seededRandom(-10, 10, 456 + i), // Use seeded random here too
            x: seededRandom(-10, 10, 789 + i)
          },
          { 
            opacity: 0.7,
            y: 0,
            x: 0,
            duration: 1.5,
            delay: delay,
            ease: "power2.out"
          }
        );
        
        // Add continuous floating movement
        gsap.to(particle, {
          y: `+=${seededRandom(-15, 15, 101 + i)}`, // Use seeded random
          x: `+=${seededRandom(-15, 15, 202 + i)}`,
          duration: 3 + seededRandom(0, 5, 303 + i),
          delay: delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    }, 100);
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="relative min-h-[90vh] flex flex-col items-center justify-start pt-6 md:pt-8 overflow-hidden px-6 py-12" 
      ref={containerRef}
    >
      {/* Gradient orb background elements */}
      <div 
        ref={orbRef}
        className="absolute z-0"
      >
        {/* Primary cyan orb */}
        <div className="absolute top-[10%] left-0 w-[40vw] h-[40vw] rounded-full bg-[hsla(var(--electric-cyan),0.15)] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Secondary purple orb */}
        <div className="absolute bottom-20 right-20 w-[35vw] h-[35vw] rounded-full bg-[hsla(var(--digital-purple),0.15)] blur-[100px] transform translate-x-1/4 translate-y-1/4"></div>
        
        {/* Small accent magenta orb */}
        <div className="absolute top-[20%] right-40 w-[15vw] h-[15vw] rounded-full bg-[hsla(var(--magenta),0.1)] blur-[80px]"></div>
      </div>

      {/* Particles animation - only rendered on client side */}
      {isLoaded && particles.map(particle => (
        <div 
          key={particle.id} 
          className="particle absolute rounded-full z-1 opacity-0"
          style={{ 
            width: `${particle.size}px`, 
            height: `${particle.size}px`, 
            top: `${particle.top}%`, 
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        ></div>
      ))}

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-1 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
      </div>

      {/* Neural network visualization */}
      <div className="absolute inset-0 z-1 opacity-20 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,50 Q25,25 50,50 T100,50" 
            fill="none" 
            stroke="hsla(var(--electric-cyan), 0.5)" 
            strokeWidth="0.2"
            className={`${isLoaded ? 'animate-draw-path' : ''}`}
          />
          <path 
            d="M0,60 Q30,40 50,60 T100,60" 
            fill="none" 
            stroke="hsla(var(--digital-purple), 0.5)" 
            strokeWidth="0.2"
            className={`${isLoaded ? 'animate-draw-path-delay' : ''}`}
          />
          <path 
            d="M0,40 Q20,60 50,40 T100,40" 
            fill="none" 
            stroke="hsla(var(--magenta), 0.5)" 
            strokeWidth="0.2"
            className={`${isLoaded ? 'animate-draw-path-delay-more' : ''}`}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-8 md:mt-16">
        {/* Logo animation */}
        <div className="mb-6 transform scale-75 sm:scale-100">
          <div className={`mx-auto w-64 relative ${isLoaded ? 'animate-logo-reveal' : ''}`}>
            <Image 
              src="/tensor-horizontal-modified.png" 
              alt="Tensor Logo" 
              width={320}
              height={80}
              className="object-contain mix-blend-screen opacity-85 drop-shadow-lg"
              priority
            />
          </div>
        </div>
        
        {/* Main Headline */}
        <div
          ref={(el) => {
            if (el) textRefs.current[0] = el;
          }}
          className="mb-0"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-unbounded)' }}>
            <span className="text-white">The Future of</span><br />
            <span className="gradient-text relative inline-block">
              AI Engineering
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.7)] to-[hsla(var(--magenta),0.7)]"></span>
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          ref={(el) => {
            if (el) textRefs.current[1] = el;
          }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            A community of innovators building tomorrow&apos;s <span className="text-[hsla(var(--electric-cyan),1)] font-semibold">AI-powered applications</span>. Join us in pushing technological boundaries.
          </p>
        </div>

        {/* Featured Highlights */}
        <div className="hidden md:flex justify-center gap-12 mb-10 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-[hsla(var(--background),0.6)] border border-[hsla(var(--electric-cyan),0.3)] shadow-[0_0_15px_hsla(var(--electric-cyan),0.2)] transition-all duration-300 group-hover:shadow-[0_0_25px_hsla(var(--electric-cyan),0.4)] group-hover:scale-105">
              <Image
                src="/workshop.svg"
                width={28}
                height={28}
                alt="AI Workshops"
                className="text-[hsla(var(--electric-cyan),1)] invert"
              />
            </div>
            <span className="text-base font-medium" style={{ fontFamily: 'var(--font-space-grotesk)' }}>AI Workshops</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-[hsla(var(--background),0.6)] border border-[hsla(var(--digital-purple),0.3)] shadow-[0_0_15px_hsla(var(--digital-purple),0.2)] transition-all duration-300 group-hover:shadow-[0_0_25px_hsla(var(--digital-purple),0.4)] group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[hsla(var(--digital-purple),1)]">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <span className="text-base font-medium" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Hackathons</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-[hsla(var(--background),0.6)] border border-[hsla(var(--magenta),0.3)] shadow-[0_0_15px_hsla(var(--magenta),0.2)] transition-all duration-300 group-hover:shadow-[0_0_25px_hsla(var(--magenta),0.4)] group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[hsla(var(--magenta),1)]">
                <path d="M22 2 11 13"></path>
                <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
              </svg>
            </div>
            <span className="text-base font-medium" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Projects</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link 
            href="/projects" 
            className="bg-[hsla(var(--electric-cyan),1)] hover:bg-[hsla(var(--electric-cyan),0.9)] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-glow hover:scale-105 transform"
            style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700 }}
          >
            Explore Projects
          </Link>
          <Link 
            href="/#about" 
            className="bg-[hsla(var(--background),0.5)] hover:bg-[hsla(var(--background),0.7)] border border-[hsla(var(--electric-cyan),0.3)] text-[hsl(var(--electric-cyan))] px-8 py-4 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-[hsla(var(--electric-cyan),0.6)] hover:scale-105 transform"
            style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
          >
            Learn More
          </Link>
        </div>
        
        {/* Floating decorative elements - tech-inspired shapes */}
        <div className="absolute top-20 left-10 w-10 h-10 border border-[hsla(var(--electric-cyan),0.2)] rounded-md rotate-12 opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 border border-[hsla(var(--digital-purple),0.2)] rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-4 h-20 border border-[hsla(var(--magenta),0.2)] rounded-sm rotate-45 opacity-20 animate-pulse"></div>
        
        {/* Enhanced designer elements */}
        <div className="absolute top-[30%] left-[15%] w-32 h-32 blur-[80px] bg-[hsla(var(--electric-cyan),0.15)] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 blur-[100px] bg-[hsla(var(--digital-purple),0.15)] rounded-full animate-pulse"></div>
        
        {/* Circuit pattern element */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-[2px] bg-[hsla(var(--electric-cyan),0.3)]">
          <div className="absolute top-0 left-1/4 w-[2px] h-10 bg-[hsla(var(--electric-cyan),0.3)]"></div>
          <div className="absolute top-0 left-2/4 w-[2px] h-6 bg-[hsla(var(--electric-cyan),0.3)]"></div>
          <div className="absolute top-0 left-3/4 w-[2px] h-12 bg-[hsla(var(--electric-cyan),0.3)]"></div>
        </div>
        
        {/* Code symbols */}
        <div className="absolute top-[15%] left-[10%] text-[hsla(var(--electric-cyan),0.3)] text-4xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
        <div className="absolute bottom-[25%] right-[12%] text-[hsla(var(--digital-purple),0.3)] text-3xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>
        
        {/* AI-themed decorative element */}
        <div className="absolute bottom-[10%] left-[5%] opacity-40">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-4 bg-[hsla(var(--electric-cyan),0.5)] rounded-full" 
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animation: 'equalizer 1.5s ease-in-out infinite alternate'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Small badge */}
        <div className="absolute top-[5%] right-[8%] px-3 py-1 rounded-full bg-[hsla(var(--background),0.7)] border border-[hsla(var(--electric-cyan),0.3)] text-xs backdrop-blur-md">
          <span className="text-[hsla(var(--electric-cyan),1)]" style={{ fontFamily: 'var(--font-geist-mono)' }}>Beta v0.1</span>
        </div>
      </div>
    </div>
  );
}
