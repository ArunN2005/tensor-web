'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

interface Event {
  title: string;
  date: string;
  description: string;
  imageName: string;
  learnMoreLink: string;
}

export default function EventsPage() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const events: Event[] = [
    {
      title: 'AI Workshop',
      date: 'June 15, 2024',
      description: 'Learn about the latest advancements in artificial intelligence and machine learning.',
      imageName: 'ai-workshop',
      learnMoreLink: '#'
    },
    {
      title: 'Web Development Bootcamp',
      date: 'July 5, 2024',
      description: 'Intensive training on modern web development technologies and frameworks.',
      imageName: 'web-bootcamp',
      learnMoreLink: '#'
    },
    {
      title: 'Tensor Tech Talk',
      date: 'July 20, 2024',
      description: 'Industry experts discuss the future of technology and innovation.',
      imageName: 'tech-talk',
      learnMoreLink: '#'
    }
  ];
  
  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    // Animate event cards
    if (eventsRef.current) {
      const eventCards = eventsRef.current.querySelectorAll('.event-card');
      gsap.fromTo(
        eventCards,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Events</h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Join us for these exciting opportunities to learn, connect, and grow with the Tensor community.
        </p>
      </div>
      
      <div ref={eventsRef} className="flex flex-col gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="event-card flex flex-col md:flex-row bg-[hsla(var(--card),0.5)] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300 group"
          >
            <div className="relative w-full md:w-1/3 h-60 md:h-auto overflow-hidden">
              <Image
                src={`/images/events/${event.imageName}.jpg`}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/grid-pattern.svg"; // Fallback image
                }}
              />
            </div>
            
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <span className="px-3 py-1 text-sm rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]">
                    {event.date}
                  </span>
                </div>
                <p className="text-[hsl(var(--muted-foreground))] mb-6">{event.description}</p>
              </div>
              
              <div className="flex justify-end">
                <Link
                  href={event.learnMoreLink}
                  className="px-4 py-2 rounded-lg bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.3)] hover:bg-[hsla(var(--electric-cyan),0.2)] transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link
          href="/events/all"
          className="px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium hover:bg-[hsla(var(--electric-cyan),0.8)] transition-colors"
        >
          View All Events
        </Link>
      </div>
    </div>
  );
}
