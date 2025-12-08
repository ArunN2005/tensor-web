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
  const storyRef = useRef<HTMLDivElement>(null); // New ref for Our Story section

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const objectives = objectivesRef.current;
    const story = storyRef.current;

    if (!section || !text || !image || !objectives || !story) return;

    // Original enter animations
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

    // Initial hidden state for Our Story items (only on desktop)
    const storyItems = story.querySelectorAll(".story-anim");
    if (window.innerWidth >= 768) {
      gsap.set(storyItems, { opacity: 0, y: 30 });
    }
  }, []);

  // Hover handlers for Our Story
  const handleStoryMouseEnter = () => {
    const q = gsap.utils.selector(storyRef);
    gsap.to(q(".story-anim"), {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleStoryMouseLeave = () => {
    const q = gsap.utils.selector(storyRef);
    gsap.to(q(".story-anim"), {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return (
    <>
      {/* ...keep your existing About/Team/Objectives sections unchanged... */}
      <section 
        id="about" 
        ref={sectionRef} 
        className="relative py-24 overflow-hidden bg-[hsla(var(--background),1)]"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - About text */}
            <div ref={textRef} className="flex flex-col space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold hover:text-[hsla(var(--electric-cyan),1)] transition-colors duration-300" style={{ fontFamily: 'var(--font-unbounded)' }}>
                <span className="gradient-text">About</span> Us
              </h2>
              <p className="text-lg text-[hsl(var(--foreground))] opacity-90 hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Welcome to Tensor Club, the official AI club of Amrita Vishwa Vidyapeetham, Coimbatore! We are a passionate community of students, developers, and innovators excited about all things Artificial Intelligence, Machine Learning, and Deep Learning.
              </p>
              <p className="text-lg text-[hsl(var(--foreground))] opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Whether you&apos;re a beginner or an expert, Tensor Club is the place to learn cutting-edge AI concepts, build real-world projects, participate in competitions, attend workshops, and share resources with like-minded individuals.
              </p>
              <p className="text-lg text-[hsl(var(--foreground))] opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Our mission is to cultivate a vibrant AI community that fosters innovation, curiosity, and collaboration—helping students become creators, not just consumers of technology.
              </p>
              
              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[hsla(var(--digital-purple),0.03)] blur-[40px]"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[30px]"></div>
            </div>
            
            {/* Right side - Team image */}
            <div ref={imageRef} className="relative">
              <div className="relative overflow-hidden rounded-lg cyber-border p-1 hover:shadow-lg hover:scale-105 transition-all duration-300">
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
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center hover:text-[hsla(var(--electric-cyan),1)] transition-colors duration-300" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Our Core Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-lg border border-[hsla(var(--border),0.2)] bg-[hsla(var(--background),0.6)] hover:bg-[hsla(var(--background),0.8)] transition-colors">
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>Learn by Building</h4>
                <p className="text-sm text-[hsl(var(--foreground))] opacity-85" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Hands‑on projects, code labs, and sprints that turn ideas into working AI applications.</p>
              </div>
              <div className="p-5 rounded-lg border border-[hsla(var(--border),0.2)] bg-[hsla(var(--background),0.6)] hover:bg-[hsla(var(--background),0.8)] transition-colors">
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>Grow Together</h4>
                <p className="text-sm text-[hsl(var(--foreground))] opacity-85" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Peer learning, mentorship, and a supportive community across domains and skill levels.</p>
              </div>
              <div className="p-5 rounded-lg border border-[hsla(var(--border),0.2)] bg-[hsla(var(--background),0.6)] hover:bg-[hsla(var(--background),0.8)] transition-colors">
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>Ship Impact</h4>
                <p className="text-sm text-[hsl(var(--foreground))] opacity-85" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Solve real problems through research, open‑source, and campus initiatives.</p>
              </div>
              <div className="p-5 rounded-lg border border-[hsla(var(--border),0.2)] bg-[hsla(var(--background),0.6)] hover:bg-[hsla(var(--background),0.8)] transition-colors">
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-unbounded)' }}>Share and Inspire</h4>
                <p className="text-sm text-[hsl(var(--foreground))] opacity-85" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Talks, workshops, and showcases that spread knowledge and celebrate the community.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/team" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsla(var(--digital-purple),0.8)] hover:bg-[hsla(var(--digital-purple),1)] hover:shadow-lg hover:scale-105 text-white font-medium rounded-lg transition-all duration-300"
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
      
      {/* Our Story Section: Always visible on mobile, hover animation on desktop */}
      <section
        ref={storyRef}
        onMouseEnter={handleStoryMouseEnter}
        onMouseLeave={handleStoryMouseLeave}
        className="relative py-20 bg-[hsla(var(--background),0.7)] cursor-pointer md:cursor-default"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="story-anim md:opacity-0 text-3xl md:text-4xl font-bold mb-6" style={{
              fontFamily: 'var(--font-unbounded)', 
              background: 'linear-gradient(90deg,#fff 20%,#20eaff 45%,#a259f7 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Our Story
            </h3>
            <p className="story-anim md:opacity-0 text-lg mb-6 text-[hsl(var(--foreground))] opacity-90" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Tensor Club was founded by a group of passionate AI enthusiasts who wanted to create a community where students could learn, collaborate, and innovate together.
            </p>
            <p className="story-anim md:opacity-0 text-lg text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Starting with just a handful of members, we&apos;ve grown into a vibrant community of researchers, developers, and AI enthusiasts all working together to push the boundaries of what&apos;s possible with artificial intelligence.
            </p>
            <p className="story-anim md:opacity-0 text-lg mt-6 text-[hsl(var(--foreground))] opacity-80" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
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
