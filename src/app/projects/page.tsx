"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  projectsData,
  getFeaturedProjects,
  getProjectsByCategory,
  type Project,
} from "@/app/data/projects";
import FeaturedProjectsView from "@/components/pages/FeaturedProjectsView";
// import AllProjectsView from "@/components/pages/AllProjectsView";  
import ProjectsComingSoon from "@/app/projects/comingSoonPage";

export default function ProjectsPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const expandedSectionRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  //  This state controls which VIEW to show (not which PAGE)
  const [isExpanded, setIsExpanded] = useState(false); // false = Featured View, true = All Projects View

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique categories and statuses
  const categories = Array.from(
    new Set(projectsData.map((p) => p.category).filter(Boolean))
  );
  const statuses = Array.from(
    new Set(projectsData.map((p) => p.status).filter(Boolean))
  );

  const goToTop = () => {
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  //  EXPAND FUNCTION - No navigation, just state change
  const handleViewAll = () => {
    setIsExpanded(true); // Show All Projects View component
    setFilteredProjects(projectsData);

    // Small delay to ensure DOM is updated
    setTimeout(() => {
     
      if (expandedSectionRef.current && filtersRef.current) {
        gsap.fromTo(
          [filtersRef.current, expandedSectionRef.current],
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            onComplete: () => {
           
              const newCards = expandedSectionRef.current?.querySelectorAll(
                ".expanded-project-card"
              );
              if (newCards) {
                gsap.fromTo(
                  newCards,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power3.out",
                  }
                );
              }
            },
          }
        );
      }
    }, 50);
  };


  const handleCollapse = () => {
   
    if (expandedSectionRef.current && filtersRef.current) {
      gsap.to([filtersRef.current, expandedSectionRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setIsExpanded(false); // Show Featured Projects View component
          setCategoryFilter("all");
          setStatusFilter("all");
          goToTop();
        },
      });
    }
  };

  useEffect(() => {
  
    const featuredProjects = getFeaturedProjects();
    const displayProjects =
      featuredProjects.length > 0 ? featuredProjects : projectsData.slice(0, 6);

    setProjects(displayProjects);
    setFilteredProjects(projectsData);
    setLoading(false);
    goToTop();
  }, []);

  useEffect(() => {
    if (isExpanded) {
      let filtered = projectsData;

      if (categoryFilter !== "all") {
        filtered = getProjectsByCategory(categoryFilter);
      }

      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (project) => project.status === statusFilter
        );
      }

      setFilteredProjects(filtered);
    }
  }, [categoryFilter, statusFilter, isExpanded]);

  useEffect(() => {
    if (!loading && projects.length > 0 && !isExpanded) {
     
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [loading, projects, isExpanded]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[hsl(var(--background))] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[hsla(var(--electric-cyan),0.05)] blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[25vw] h-[25vw] rounded-full bg-[hsla(var(--digital-purple),0.05)] blur-[80px]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-center"></div>
        </div>

        {/* Code symbols */}
        <div className="absolute top-[15%] left-[10%] text-[hsla(var(--electric-cyan),0.2)] text-4xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`{ }`}</div>
        <div className="absolute bottom-[25%] right-[12%] text-[hsla(var(--digital-purple),0.2)] text-3xl opacity-40" style={{ fontFamily: 'var(--font-geist-mono)' }}>{`</>`}</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            <span className="text-white">{isExpanded ? "All" : "Featured"}</span>{' '}
            <span className="gradient-text relative inline-block">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.7)] to-[hsla(var(--magenta),0.7)]"></span>
            </span>
          </h1>
          <p 
            className="text-lg text-[hsl(var(--foreground))] opacity-80 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {isExpanded
              ? `Browse our complete collection of innovative projects across various technologies and domains.`
              : "Explore our most innovative projects that showcase cutting-edge technology and creative problem-solving."}
          </p>
        </div>

        {/* Featured View */}
        {!isExpanded && (
          <>
            <FeaturedProjectsView projects={projects} />

            <div className="text-center mt-12">
              <Button
                onClick={handleViewAll}
                className="px-6 py-4 bg-[hsla(var(--electric-cyan),1)] text-black rounded-lg font-bold hover:bg-[hsla(var(--electric-cyan),0.9)] transition-all duration-300 shadow-[0_0_15px_hsla(var(--electric-cyan),0.3)] hover:shadow-[0_0_20px_hsla(var(--electric-cyan),0.5)] hover:scale-105 transform"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <ChevronDown className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
            </div>
          </>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <>
            {/* <AllProjectsView
              filteredProjects={filteredProjects}
              categories={categories}
              statuses={statuses}
              categoryFilter={categoryFilter}
              statusFilter={statusFilter}
              setCategoryFilter={setCategoryFilter}
              setStatusFilter={setStatusFilter}
              filtersRef={filtersRef}
              expandedSectionRef={expandedSectionRef}
            /> */}
            <div ref={expandedSectionRef}>
              <ProjectsComingSoon /> {/* temporary coming soon page */}
            </div>
            <div className="text-center mt-12" ref={filtersRef}>
              <Button
                onClick={handleCollapse}
                className="px-6 py-3 bg-[hsla(var(--background),0.5)] hover:bg-[hsla(var(--electric-cyan),0.1)] border border-[hsla(var(--electric-cyan),0.3)] text-[hsl(var(--electric-cyan))] rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:border-[hsla(var(--electric-cyan),0.6)] hover:scale-105 transform"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Featured Projects
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
