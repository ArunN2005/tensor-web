"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const objectivesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const objectives = objectivesRef.current;

    if (!section || !text || !image || !objectives) return;

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
    
    gsap.fromTo(
      objectives,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: objectives,
          start: "top 90%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <>
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
          
          {/* Core Objectives Section */}
          <div ref={objectivesRef} className="mt-20 bg-[hsla(var(--card),0.5)] p-8 rounded-xl border border-[hsla(var(--border),0.2)] backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Our Core Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[hsla(var(--background),0.5)] p-6 rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300">
                <div className="text-3xl mb-4 text-[hsla(var(--electric-cyan),1)]">🧠</div>
                <h4 className="text-xl font-semibold mb-2">Collaborative Learning</h4>
                <p className="text-[hsl(var(--muted-foreground))]">Foster collaborative learning and discovery in AI through shared knowledge and resources.</p>
              </div>
              
              <div className="bg-[hsla(var(--background),0.5)] p-6 rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300">
                <div className="text-3xl mb-4 text-[hsla(var(--electric-cyan),1)]">🚀</div>
                <h4 className="text-xl font-semibold mb-2">Workshops & Events</h4>
                <p className="text-[hsl(var(--muted-foreground))]">Host workshops and events to share the latest developments in AI technology.</p>
              </div>
              
              <div className="bg-[hsla(var(--background),0.5)] p-6 rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300">
                <div className="text-3xl mb-4 text-[hsla(var(--electric-cyan),1)]">🔬</div>
                <h4 className="text-xl font-semibold mb-2">Research Support</h4>
                <p className="text-[hsl(var(--muted-foreground))]">Support members in research and project initiatives across various AI domains.</p>
              </div>
              
              <div className="bg-[hsla(var(--background),0.5)] p-6 rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300">
                <div className="text-3xl mb-4 text-[hsla(var(--electric-cyan),1)]">🤝</div>
                <h4 className="text-xl font-semibold mb-2">Industry Engagement</h4>
                <p className="text-[hsl(var(--muted-foreground))]">Engage with industry leaders and experts to bridge academia and professional world.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/team" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsla(var(--digital-purple),0.8)] hover:bg-[hsla(var(--digital-purple),1)] text-white font-medium rounded-lg transition-colors duration-300"
              >
                Meet Our Team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="relative py-20 bg-[hsla(var(--background),0.7)]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Our <span className="gradient-text">Story</span>
            </h3>
            <p className="text-lg mb-6 text-[hsl(var(--foreground))] opacity-90" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Tensor Club was founded by a group of passionate AI enthusiasts who wanted to create a community where students could learn, collaborate, and innovate together.
            </p>
            <p className="text-lg text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Starting with just a handful of members, we've grown into a vibrant community of researchers, developers, and AI enthusiasts all working together to push the boundaries of what's possible with artificial intelligence.
            </p>
            <p className="text-lg mt-6 text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Join us as we continue to explore the endless possibilities of AI and make a positive impact on the world through technology.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[hsla(var(--digital-purple),0.03)] blur-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[hsla(var(--electric-cyan),0.02)] blur-[60px]"></div>
      </section>
    </>
  );
}
