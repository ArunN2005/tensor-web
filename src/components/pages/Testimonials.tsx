"use client";

import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  quote: string;
  avatarUrl?: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, position, quote, avatarUrl } = testimonial;

  // Fallback initials logic
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-[hsla(var(--background),0.5)] p-6 rounded-lg border border-[hsla(var(--border),0.3)] hover:border-[hsla(var(--electric-cyan),0.3)] transition-colors duration-300">
      <div className="flex items-start gap-4">
        {/* Avatar or fallback */}
        {avatarUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-[hsla(var(--digital-purple),0.5)] flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {initials}
          </div>
        )}
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-unbounded)' }}>
            {name}
          </h4>
          <p className="text-sm text-[hsl(var(--muted-foreground))]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {position}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[hsl(var(--foreground))] opacity-90" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {quote}
      </p>
    </div>
  );
}

export default function Testimonials() {
  // Static array of testimonials
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "John Doe",
      position: "AI Enthusiast",
      quote: "Tensor Club has been an amazing platform to learn and collaborate on AI projects. Highly recommended!",
      avatarUrl: "/avatar1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Machine Learning Developer",
      quote: "The workshops and events organized by Tensor Club have greatly enhanced my skills in deep learning.",
    },
    {
      id: "3",
      name: "Alex Johnson",
      position: "Student Researcher",
      quote: "Being part of this community has opened up numerous opportunities for research and innovation in AI.",
      avatarUrl: "/avatar3.jpg",
    },
    {
      id: "4",
      name: "Emily Davis",
      position: "Data Scientist",
      quote: "Tensor Club fosters a collaborative environment that's perfect for both beginners and experts in AI.",
      avatarUrl: "/avatar4.jpg",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[hsla(var(--background),1)]">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ fontFamily: 'var(--font-unbounded)' }}>
          <span className="gradient-text">Testimonials</span>
        </h2>
        {/* TODO: Implement carousel logic here, e.g., using Swiper or react-slick for sliding functionality */}
        {/* For now, rendering as a static grid; in future, wrap in carousel container and handle navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}