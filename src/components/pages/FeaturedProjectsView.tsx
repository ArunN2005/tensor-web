"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ExternalLink, Github, Star, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/app/data/projects";

interface FeaturedProjectsViewProps {
  projects: Project[];
}

// Simple pseudo-random number generator with seed (same as Hero component)
const seededRandom = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed) * 10000;
  const result = (x - Math.floor(x)) * (max - min) + min;
  return result;
};

// Generate particles for background
const generateParticles = (count: number, seed: number = 456) => {
  return Array.from({ length: count }, (_, i) => {
    const size = seededRandom(1, 3, seed + i * 0.1);
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

export default function FeaturedProjectsView({
  projects,
}: FeaturedProjectsViewProps) {
  const projectsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
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
    setParticles(generateParticles(20));
    
    if (projects.length > 0 && projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }
    
    // Add subtle floating animation to particles
    setTimeout(() => {
      const particleElements = document.querySelectorAll('.project-particle');
      particleElements.forEach((particle, i) => {
        const delay = i * 0.05;
        gsap.fromTo(
          particle,
          { 
            opacity: 0,
            y: seededRandom(-10, 10, 456 + i),
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
          y: `+=${seededRandom(-15, 15, 101 + i)}`,
          x: `+=${seededRandom(-15, 15, 202 + i)}`,
          duration: 3 + seededRandom(0, 5, 303 + i),
          delay: delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    }, 100);
  }, [projects]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden py-16 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[100px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[25vw] h-[25vw] rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[80px]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
        </div>
      </div>
      
      {/* Particles animation - only rendered on client side */}
      {isLoaded && particles.map(particle => (
        <div 
          key={particle.id} 
          className="project-particle absolute rounded-full z-1 opacity-0"
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

      {/* Circuit pattern element - similar to Hero component */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[60%] h-[2px] bg-[hsla(var(--electric-cyan),0.15)]">
        <div className="absolute top-0 left-1/4 w-[2px] h-16 bg-[hsla(var(--electric-cyan),0.15)]"></div>
        <div className="absolute top-0 left-2/4 w-[2px] h-10 bg-[hsla(var(--electric-cyan),0.15)]"></div>
        <div className="absolute top-0 left-3/4 w-[2px] h-20 bg-[hsla(var(--electric-cyan),0.15)]"></div>
      </div>

      {/* Projects grid */}
      <div
        ref={projectsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-7xl mx-auto"
      >
        {projects.map((project, index) => (
          <Card
            key={project._id || index}
            className="project-card relative overflow-hidden bg-[hsla(var(--card),0.9)] backdrop-blur border border-[hsla(var(--border),0.6)] shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[hsla(var(--electric-cyan),0.2)] hover:-translate-y-2 hover:border-[hsla(var(--electric-cyan),0.4)] group flex flex-col h-full"
          >
            {project.featured && (
              <div className="absolute top-4 right-4 z-10 rounded-full backdrop-blur-sm flex items-center gap-1 text-sm font-semibold text-[hsla(var(--electric-cyan),1)] bg-[hsla(var(--electric-cyan),0.1)] px-2.5 py-1 border border-[hsla(var(--electric-cyan),0.3)]">
                <Star className="h-4 w-4" />
                Featured
              </div>
            )}

            <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[hsla(var(--background),0.9)] to-transparent z-10"></div>
              <Image
                src={`/images/projects/${project.imageName}.webp`}
                alt={project.title}
                fill
                className="object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/projects/placeholder.webp";
                }}
              />
            </div>

            <CardHeader className="flex-shrink-0">
              <CardTitle 
                className="text-xl font-bold text-white group-hover:text-[hsla(var(--electric-cyan),1)] transition-colors duration-300 line-clamp-2"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {project.title}
              </CardTitle>
              <CardDescription 
                className="text-[hsl(var(--muted-foreground))] line-clamp-3 min-h-[4.5rem]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-4 flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags?.slice(0, 4).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center rounded-full border border-[hsla(var(--electric-cyan),0.3)] px-3 py-1 text-xs font-medium text-[hsla(var(--muted-foreground),0.9)] bg-[hsla(var(--electric-cyan),0.05)] hover:bg-[hsla(var(--electric-cyan),0.1)] hover:text-[hsla(var(--electric-cyan),1)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors"
                    style={{ fontFamily: 'var(--font-geist-mono)' }}
                  >
                    {typeof tag === "string" ? tag : tag.name}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-0 gap-2 mt-auto flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-sm font-medium flex-1 bg-[hsla(var(--background),0.5)] hover:bg-[hsla(var(--electric-cyan),0.1)] hover:text-[hsla(var(--electric-cyan),1)] hover:border-[hsla(var(--electric-cyan),0.4)] transition-colors backdrop-blur-sm border-[hsla(var(--electric-cyan),0.3)]"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
                asChild
              >
                <Link
                  href={project.githubLink || project.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-sm font-medium flex-1 bg-[hsla(var(--background),0.5)] hover:bg-[hsla(var(--electric-cyan),0.1)] hover:text-[hsla(var(--electric-cyan),1)] hover:border-[hsla(var(--electric-cyan),0.4)] transition-colors backdrop-blur-sm border-[hsla(var(--electric-cyan),0.3)]"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
                asChild
              >
                <Link
                  href={project.projectLink || project.demo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Code symbols - similar to Hero component */}
      <div className="absolute top-[15%] left-[10%] text-[hsla(var(--electric-cyan),0.2)] text-4xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
      <div className="absolute bottom-[25%] right-[12%] text-[hsla(var(--digital-purple),0.2)] text-3xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>

      {/* Enhanced designer elements */}
      <div className="absolute bottom-10 right-10 w-10 h-10 border border-[hsla(var(--electric-cyan),0.1)] rounded-md rotate-12 opacity-20"></div>
      <div className="absolute top-20 right-20 w-6 h-6 border border-[hsla(var(--digital-purple),0.1)] rounded-full opacity-20"></div>
    </div>
  );
}
