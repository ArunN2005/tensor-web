"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Promotion {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

interface PromotionBannerProps {
  promotion: Promotion;
}

function PromotionBanner({ promotion }: PromotionBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    gsap.fromTo(
      banner,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: banner,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative bg-[hsla(var(--card),0.6)] p-8 md:p-12 rounded-xl border border-[hsla(var(--border),0.3)] backdrop-blur-sm overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[40px]"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[hsla(var(--electric-cyan),0.03)] blur-[30px]"></div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Content Section */}
        <div className="text-center md:text-left order-2 md:order-1">
          <h3 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            {promotion.title}
          </h3>
          <p 
            className="text-lg md:text-xl text-[hsl(var(--foreground))] opacity-90 mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {promotion.subtitle}
          </p>
          
          {/* Optional CTA Button */}
          {promotion.ctaText && promotion.ctaLink && (
            <div className="flex justify-center md:justify-start">
              <Link 
                href={promotion.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsla(var(--digital-purple),0.8)] hover:bg-[hsla(var(--digital-purple),1)] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[hsla(var(--digital-purple),0.3)]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {promotion.ctaText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Image Section */}
        {promotion.imageUrl && (
          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-lg cyber-border p-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image 
                  src={promotion.imageUrl}
                  alt={promotion.title}
                  fill
                  className="object-cover filter hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            {/* Code symbols decoration */}
            <div className="absolute -bottom-4 -right-4 text-[hsla(var(--electric-cyan),0.3)] text-4xl opacity-30 rotate-12" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`<AI/>`}</div>
            <div className="absolute -top-4 -left-4 text-[hsla(var(--digital-purple),0.3)] text-3xl opacity-30 rotate-6" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{}`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PromotionsProps {
  promotions: Promotion[];
}

export default function Promotions({ promotions }: PromotionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    gsap.fromTo(
      title,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
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
      id="promotions" 
      ref={sectionRef}
      className="relative py-24 bg-[hsla(var(--background),1)] overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Latest <span className="gradient-text">Promotions</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Discover exciting opportunities, events, and announcements from Tensor Club
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="space-y-12">
          {promotions.map((promotion, index) => (
            <PromotionBanner key={index} promotion={promotion} />
          ))}
        </div>

        {/* Call-to-action section */}
        <div className="mt-20">
          <div className="bg-[hsla(var(--card),0.4)] p-8 md:p-12 rounded-xl border border-[hsla(var(--border),0.2)] backdrop-blur-sm text-center">
            <h3 
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Stay Updated
            </h3>
            <p 
              className="text-lg text-[hsl(var(--muted-foreground))] mb-6 text-center max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Never miss out on our latest events, workshops, and opportunities. Join our community today!
            </p>
            <div className="flex justify-center">
              <Link 
                href="https://chat.whatsapp.com/K4Du49mIpL5JplISuw2Ulr" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsla(var(--electric-cyan),0.8)] hover:bg-[hsla(var(--electric-cyan),1)] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Join Tensor Club
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[hsla(var(--digital-purple),0.02)] blur-[50px]"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[hsla(var(--electric-cyan),0.03)] blur-[40px]"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-3 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
      </div>
    </section>
  );
}