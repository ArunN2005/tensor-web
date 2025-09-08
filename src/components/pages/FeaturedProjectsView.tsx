"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ExternalLink, Github, Star } from "lucide-react";
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


export default function FeaturedProjectsView({
  projects,
}: FeaturedProjectsViewProps) {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length > 0) {

      if (projectsRef.current) {
        const projectCards =
          projectsRef.current.querySelectorAll(".project-card");
        gsap.fromTo(
          projectCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    }
  }, [projects]);

  return (
    <div
      ref={projectsRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project, index) => (
        <Card
          key={project._id || index}
          className="project-card relative overflow-hidden bg-card/70 backdrop-blur border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:border-2 hover:border-primary/50 group"
        >
          {project.featured && (
            <div className="absolute top-4 right-4 z-10 rounded-full backdrop-blur-sm flex items-center gap-1 text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1  border border-primary/20">
              <Star className="h-4 w-4" />
              Featured
            </div>
          )}

          <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
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

          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              {project.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground bg-muted hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-sm font-medium flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors bg-transparent"
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
              className="rounded-full text-sm font-medium flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors bg-transparent"
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
  );
}
