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
import AllProjectsView from "@/components/pages/AllProjectsView";


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

    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
     
        <div className="text-center mb-16">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-sans"
          >
            {isExpanded ? "All Projects" : "Featured Projects"}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isExpanded
              ? `Browse our complete collection of ${projectsData.length} innovative projects across various technologies and domains.`
              : "Explore our most innovative projects that showcase cutting-edge technology and creative problem-solving."}
          </p>
        </div>


        {!isExpanded && <FeaturedProjectsView projects={projects} />}

   
        {isExpanded && (
          <AllProjectsView
            filteredProjects={filteredProjects}
            categories={categories}
            statuses={statuses}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            setCategoryFilter={setCategoryFilter}
            setStatusFilter={setStatusFilter}
            filtersRef={filtersRef}
            expandedSectionRef={expandedSectionRef}
          />
        )}


        <div className="text-center mt-12">
          {!isExpanded ? (
            <Button
              onClick={handleViewAll} 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              View All Projects ({projectsData.length})
            </Button>
          ) : (
            <Button
              onClick={handleCollapse} 
              variant="outline"
              className="px-6 py-3 rounded-lg font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors bg-transparent"
            >
              <ChevronUp className="mr-2 h-4 w-4" />
              Show Less
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
