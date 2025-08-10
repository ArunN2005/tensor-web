"use client";
import { useEffect } from "react";
import Hero from "@/components/pages/Hero";
import AboutUs from "@/components/pages/AboutUs";
import Testimonials from "@/components/pages/Testimonials";
import Promotions from "@/components/pages/Promotions";

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay of 100ms
    }
  }, []);

  return (
    <>
      <div
        className="min-h-screen"
        style={{
          boxShadow: "0px 4px 6px rgba(28, 25, 23, 0.2), 0px 1px 3px rgba(28, 25, 23, 0.1)",
        }}
      >
        <Hero />
      </div>
      <AboutUs />
      <Testimonials />
      <Promotions promotions={[
        {
          title: "AI Workshop",
          subtitle: "Learn the core concepts of AI and Machine Learning in this beginner-friendly workshop. Understand data, algorithms, and model training through simple, practical examples.",
          ctaText: "Register Now",
          ctaLink: "/register",
          imageUrl: "/Promotions/AI_Workshop.jpg"
        }
      ]} />
    </>
  );
}