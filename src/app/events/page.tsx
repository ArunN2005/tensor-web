"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

// Updated Event interface — added imageName and learnMoreLink
interface UpcomingEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string; // e.g., "10:00 AM"
  description: string; // brief event summary
  location: string; // city or "Online"
  isOnline: boolean; // determines badge color
  imageUrl?: string; // fallback image if missing
  imageName: string; // new: base image name without extension
  learnMoreLink: string; // new: link to event details or learn more
}

// Updated sample events with new fields and example values
const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "AI Innovations 2025",
    date: "2025-09-01",
    time: "10:00 AM",
    description: "Explore the latest trends in artificial intelligence.",
    location: "New York, USA",
    isOnline: false,
    imageUrl: "/event1.jpg",
    imageName: "ai-innovations-2025",
    learnMoreLink: "/events/ai-innovations-2025"
  },
  {
    id: "2",
    title: "Global Web Summit",
    date: "2025-10-15",
    time: "3:00 PM",
    description: "Networking and knowledge sharing with web experts.",
    location: "Online",
    isOnline: true,
    imageName: "global-web-summit",
    learnMoreLink: "/events/global-web-summit"
  },
  {
    id: "3",
    title: "Next.js Developers Meetup",
    date: "2025-11-20",
    time: "5:30 PM",
    description: "Meet other developers and discuss Next.js best practices.",
    location: "San Francisco, USA",
    isOnline: false,
    imageUrl: "/event3.jpg",
    imageName: "nextjs-dev-meetup",
    learnMoreLink: "/events/nextjs-dev-meetup"
  },
];

// Sort events by date
const sortedEvents = [...upcomingEvents].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);
const FALLBACK_EVENT_IMAGE = "/placeholder-event.jpg";
function EventCard({ event, index }: { event: UpcomingEvent; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: index * 0.2,
        duration: 0.6,
        ease: "power1.out",
      }
    );
  }, [index]);

  // Determine image src: use imageUrl if provided, else fallback to /images/${imageName}.jpg
  const imgSrc = event.imageUrl
    ? event.imageUrl
    : `/images/${event.imageName}.jpg`; // fallback path convention

  return (
    <div
      ref={cardRef}
      className="bg-[hsla(var(--background),0.5)] rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300 overflow-hidden flex flex-col"
    >
      {/* Event Image */}
      <div className="relative w-full h-48">
        <Image
          src={imgSrc}
          alt={event.title}
          fill
          className="object-cover"
          // Optional: you can add onError to handle missing images if needed
          onError={(e) => {
            // If image fails to load, fallback to a placeholder image
            (e.currentTarget as HTMLImageElement).src = FALLBACK_EVENT_IMAGE;

          }}
        />
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col justify-center">
        {/* Online/Offline Badge */}
        <span
          className="px-3 py-1 text-sm font-medium border rounded-full mb-3 self-start"
          style={{
            backgroundColor: "transparent",
            borderColor: event.isOnline
              ? "rgba(56, 189, 248, 0.5)"
              : "rgba(248, 113, 113, 0.5)",
            color: event.isOnline
              ? "rgba(56, 189, 248, 1)"
              : "rgba(248, 113, 113, 1)",
          }}
        >
          {event.isOnline ? "Online" : "Offline"}
        </span>

        {/* Title */}
        <h3
          className="text-lg font-semibold mb-2"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          className="text-[hsl(var(--foreground))] opacity-90 mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {event.description}
        </p>

        {/* Date & Time */}
        <p
          className="text-sm text-[hsl(var(--muted-foreground))] mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          • {event.time}
        </p>

        {/* Location */}
        <p
          className="text-sm text-[hsl(var(--muted-foreground))] mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Location: {event.location}
        </p>

        {/* Learn More Link */}
        <Link
          href={event.learnMoreLink}
          className="text-sm text-white font-semibold hover:underline"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}

export default function UpcomingEventsPage() {
  // Added refs as requested
  const eventsRef = useRef<HTMLDivElement>(null);
  

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (headingRef.current && subheadingRef.current) {
      tl.fromTo(
        headingRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power1.out" }
      ).fromTo(
        subheadingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section
      ref={eventsRef}
      className="relative py-24 overflow-hidden bg-[hsla(var(--background),1)]"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
       <h2
  ref={headingRef} 
  className="text-4xl md:text-5xl font-bold text-center gradient-text -mt-10"
  style={{ fontFamily: "var(--font-unbounded)" }}
>
  Upcoming Events
</h2>


        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="mt-4 text-center text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-12"
        >
          Join us for these exciting opportunities to learn, connect, <br />
          and grow with the Tensor community.
        </p>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link
            href="/events/all"
            className="px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium hover:bg-[hsla(var(--electric-cyan),0.8)] transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}