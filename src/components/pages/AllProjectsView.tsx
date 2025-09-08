"use client";

import type { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/app/data/projects";
import { projectsData } from "@/app/data/projects";

interface AllProjectsViewProps {
  filteredProjects: Project[];
  categories: (string | undefined)[];
  statuses: (string | undefined)[];
  categoryFilter: string;
  statusFilter: string;
  setCategoryFilter: (value: string) => void;
  setStatusFilter: (value: string) => void;
  filtersRef: RefObject<HTMLDivElement>;
  expandedSectionRef: RefObject<HTMLDivElement>;
}

export default function AllProjectsView({
  filteredProjects,
  categories,
  statuses,
  categoryFilter,
  statusFilter,
  setCategoryFilter,
  setStatusFilter,
  filtersRef,
  expandedSectionRef,
}: AllProjectsViewProps) {
  return (
    <>
      {/* Filters */}
      <div ref={filtersRef} className="opacity-0">
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Filter by:
            </span>
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses
                .filter(
                  (status): status is string => typeof status === "string"
                )
                .map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() +
                      status.slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projectsData.length} projects
          </p>
        </div>
      </div>

      {/* Expanded Projects Grid */}
      <div ref={expandedSectionRef} className="opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project._id || index}
              className="expanded-project-card relative overflow-hidden bg-card/70 backdrop-blur border border-border shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:border-2 hover:border-primary/50 group"
            >
              {project.featured && (
                <div className="absolute top-3 right-3 z-10 rounded-full backdrop-blur-sm flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  <Star className="h-3 w-3" />
                  Featured
                </div>
              )}

              {project.status && (
                <div
                  className={`absolute top-3 left-3 z-10 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm ${
                    project.status === "completed"
                      ? "bg-green-500/40 text-green-100"
                      : project.status === "in-progress"
                      ? "bg-yellow-400/60 text-yellow-100"
                      : "bg-blue-500/40 text-blue-100"
                  }`}
                >
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1).replace("-", " ")}
                </div>
              )}

              <div className="relative h-40 w-full overflow-hidden">
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

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </CardDescription>
                {project.category && (
                  <div className="text-xs text-primary font-medium">
                    {project.category}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground bg-muted hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      {typeof tag === "string" ? tag : tag.name}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-medium flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors bg-transparent"
                  asChild
                >
                  <Link
                    href={project.githubLink || project.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1 h-3 w-3" />
                    Code
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-medium flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors bg-transparent"
                  asChild
                >
                  <Link
                    href={project.projectLink || project.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found matching your filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
