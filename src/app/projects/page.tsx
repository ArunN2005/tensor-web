'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

interface ProjectTag {
  name: string;
  color?: string;
}

interface Project {
  title: string;
  description: string;
  imageName: string;
  tags: ProjectTag[];
  githubLink: string;
  projectLink: string;
}

export default function ProjectsPage() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const projects: Project[] = [
    {
      title: 'Tensor ML Framework',
      description: 'An open-source machine learning framework focused on tensor computations and deep learning algorithms.',
      imageName: 'tensor-ml',
      tags: [
        { name: 'Python' },
        { name: 'PyTorch' },
        { name: 'TensorFlow' },
        { name: 'CUDA' }
      ],
      githubLink: 'https://github.com',
      projectLink: '#'
    },
    {
      title: 'Web Development Platform',
      description: 'A comprehensive platform for learning and practicing modern web development technologies.',
      imageName: 'web-dev',
      tags: [
        { name: 'React' },
        { name: 'TypeScript' },
        { name: 'Next.js' },
        { name: 'Tailwind CSS' }
      ],
      githubLink: 'https://github.com',
      projectLink: '#'
    },
    {
      title: 'Quantum Computing Simulator',
      description: 'A simulator for quantum computing algorithms and visualizations of quantum phenomena.',
      imageName: 'quantum-sim',
      tags: [
        { name: 'Python' },
        { name: 'Qiskit' },
        { name: 'React' },
        { name: 'WebGL' }
      ],
      githubLink: 'https://github.com',
      projectLink: '#'
    },
    {
      title: 'Blockchain Explorer',
      description: 'A tool for exploring and analyzing blockchain transactions and smart contracts.',
      imageName: 'blockchain',
      tags: [
        { name: 'JavaScript' },
        { name: 'Solidity' },
        { name: 'Ethereum' },
        { name: 'Web3.js' }
      ],
      githubLink: 'https://github.com',
      projectLink: '#'
    }
  ];

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate project cards
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        projectCards, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
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
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-4">Our Projects</h1>
        <div className="w-20 h-1 bg-[hsl(var(--electric-cyan))] mx-auto"></div>
        <p className="mt-6 text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Explore some of our innovative projects that demonstrate our technical expertise and creative problem-solving.
        </p>
      </div>

      <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="project-card bg-[hsla(var(--card),0.5)] rounded-xl overflow-hidden border border-[hsla(var(--border),0.2)] hover:border-[hsla(var(--electric-cyan),0.5)] transition-colors duration-300 group"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[hsla(var(--background),0.8)] to-transparent z-10"></div>
              <Image
                src={`/images/projects/${project.imageName}.jpg`}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/grid-pattern.svg"; // Fallback image
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs rounded-full bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.2)]"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Link 
                  href={project.githubLink} 
                  className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Link>
                <Link 
                  href={project.projectLink} 
                  className="px-4 py-2 rounded-lg bg-[hsla(var(--electric-cyan),0.1)] text-[hsl(var(--electric-cyan))] border border-[hsla(var(--electric-cyan),0.3)] hover:bg-[hsla(var(--electric-cyan),0.2)] transition-colors"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          href="/projects/all" 
          className="px-6 py-3 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] rounded-lg font-medium hover:bg-[hsla(var(--electric-cyan),0.8)] transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}
