"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    if (!section || !text || !image) return;

    // Create animation for section elements
    gsap.fromTo(
      text,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      image,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-[hsla(var(--background),1)]"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - About text */}
          <div ref={textRef} className="flex flex-col space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
              <span className="gradient-text">About</span> Us
            </h2>
            <p className="text-lg text-[hsl(var(--foreground))] opacity-90" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Welcome to Tensor Club, the official AI club of Amrita Vishwa Vidyapeetham, Coimbatore! We are a passionate community of students, developers, and innovators excited about all things Artificial Intelligence, Machine Learning, and Deep Learning.
            </p>
            <p className="text-lg text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Whether you&apos;re a beginner or an expert, Tensor Club is the place to learn cutting-edge AI concepts, build real-world projects, participate in competitions, attend workshops, and share resources with like-minded individuals.
            </p>
            <p className="text-lg text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Our mission is to cultivate a vibrant AI community that fosters innovation, curiosity, and collaboration—helping students become creators, not just consumers of technology.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[hsla(var(--digital-purple),0.03)] blur-[40px]"></div>
            <div className="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[30px]"></div>
          </div>
          
          {/* Right side - Team image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-lg cyber-border p-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image 
                  src="/Team.jpg" 
                  alt="Tensor Club Team" 
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500 wiggle-on-hover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            {/* Code symbols decoration */}
            <div className="absolute -bottom-6 -right-6 text-[hsla(var(--electric-cyan),0.3)] text-5xl opacity-40 rotate-12" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
            <div className="absolute -top-6 -left-6 text-[hsla(var(--digital-purple),0.3)] text-4xl opacity-40 rotate-6" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>
          </div>
        </div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
      </div>
    </section>
  );
}
