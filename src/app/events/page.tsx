"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Updated Event interface
interface UpcomingEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g., "10:00 AM"
  description: string;
  location: string;
  isOnline: boolean;
  imageUrl?: string;
  imageName: string;
  learnMoreLink: string;
}

// Sample events
const events: UpcomingEvent[] = [
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
    learnMoreLink: "/events/ai-innovations-2025",
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
    learnMoreLink: "/events/global-web-summit",
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
    learnMoreLink: "/events/nextjs-dev-meetup",
  },
];

const FALLBACK_EVENT_IMAGE = "/placeholder-event.jpg";

export default function UpcomingEventsPage() {
  const [cardOrder, setCardOrder] = useState(events);
  const [animate, setAnimate] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleCardClick = (index: number) => {
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    setTimeout(() => {
      const [first, ...rest] = cardOrder;
      setCardOrder([...rest, first]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center justify-start py-16 px-6 overflow-hidden">
      
      {/* Section Title */}
      <div className="relative mb-20 text-center">
        <h2
          className={`text-5xl font-extrabold text-white transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Upcoming Events
        </h2>
        <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-cyan-400 transform -translate-x-1/2"></span>
      </div>

      {/* Cards Stack */}
      <div className="relative w-full max-w-2xl h-[650px] perspective-1000">
        {cardOrder.map((event, index) => {
          const isTopCard = index === 0;
          const rotation = (index - 1) * 2;

          const imgSrc = event.imageUrl
            ? event.imageUrl
            : `/images/${event.imageName}.jpg`;

          return (
            <motion.div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              key={event.id}
              className="absolute w-full h-[550px] bg-[#111827] border border-cyan-500 rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-pointer"
              style={{
                transform: `translate(${index * 20}px, ${index * 20}px) rotate(${rotation}deg) scale(${1 - index * 0.06})`,
                zIndex: cardOrder.length - index,
                opacity: index === 0 ? 1 : 0.85,
              }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ opacity: index === 0 ? 1 : 0.85, y: 0, rotate: rotation }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 120 }}
              whileHover={
                isTopCard
                  ? {
                      scale: 1.05,
                      rotate: 0,
                      borderColor: "#00e6e6",
                      boxShadow: "0px 20px 40px rgba(0, 255, 255, 0.5)",
                    }
                  : {}
              }
              whileTap={isTopCard ? { scale: 0.97 } : {}}
              onClick={isTopCard ? () => handleCardClick(index) : undefined}
            >
              {/* Event Image */}
              <div className="relative w-full h-48">
                <Image
                  src={imgSrc}
                  alt={event.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_EVENT_IMAGE;
                  }}
                />
              </div>

              {/* Event Details */}
              <div className="p-6 flex flex-col justify-center flex-1">
                {/* Badge */}
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

                <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                <p className="text-gray-300 mb-2">{event.description}</p>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })} • {event.time}
                </p>
                <p className="text-gray-400 text-sm mb-4">Location: {event.location}</p>
                <Link
                  href={event.learnMoreLink}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
