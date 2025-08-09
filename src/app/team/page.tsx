'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface TeamMember {
  name: string;
  position: string;
  imageName: string;
}

export default function TeamPage() {
  const teamRef = useRef<HTMLDivElement>(null);
  const teamMembers: TeamMember[] = [
    {
      name: 'Alex Johnson',
      position: 'President',
      imageName: 'alex-johnson'
    },
    {
      name: 'Maya Patel',
      position: 'Vice President',
      imageName: 'maya-patel'
    },
    {
      name: 'David Kim',
      position: 'Technical Lead',
      imageName: 'david-kim'
    },
    {
      name: 'Sarah Chen',
      position: 'Events Coordinator',
      imageName: 'sarah-chen'
    }
  ];

  useEffect(() => {
    if (teamRef.current) {
      const teamCards = teamRef.current.querySelectorAll('.team-card');
      gsap.fromTo(
        teamCards, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
      </div>

      <div 
        ref={teamRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="team-card bg-[hsla(var(--card),0.5)] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300 group"
          >
            <div className="relative h-80 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-10"></div>
              <Image
                src={`/images/team/${member.imageName}.jpg`}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/Team.jpg"; // Fallback to team image if individual photo not found
                }}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-[hsl(var(--muted-foreground))]">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
