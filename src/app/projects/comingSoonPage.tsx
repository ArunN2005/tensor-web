"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ProjectsComingSoon() {
  const linesRef = useRef<HTMLParagraphElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const asciiBarRef = useRef<HTMLSpanElement>(null);
  const [showGenerating, setShowGenerating] = useState(false);

  const addLineRef = (el: HTMLParagraphElement) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // scanning line animation
    gsap.to(scanRef.current, {
      y: "100%",
      duration: 1.2,
      repeat: -1,
      ease: "linear",
    });

    // fade in first lines
    linesRef.current.slice(0, 3).forEach((line, i) => {
      tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.3 }, i * 0.5);
    });

    // ASCII progress bar
    tl.fromTo(
      linesRef.current[3],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        onStart: () => {
          let totalBlocks = 5;
          let current = 0;
          let interval = setInterval(() => {
            current++;
            if (asciiBarRef.current) {
              asciiBarRef.current.textContent = `[${"█".repeat(
                current
              )}${"░".repeat(totalBlocks - current)}]`;
            }
            if (current >= totalBlocks) {
              clearInterval(interval);
              setTimeout(() => {
                setShowGenerating(true);
              }, 300);
            }
          }, 400);
        },
      },
      "+=0.5"
    );

    tl.to({}, { duration: 3.5 });

    // Title glitch + reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        onStart: () => {
          if (titleRef.current)
            titleRef.current.textContent = "Initi@lizing Pr0j3ct5...";
        },
        onComplete: () => {
          if (titleRef.current)
            titleRef.current.textContent = "Projects Coming Soon";
        },
      }
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative bg-[hsla(var(--background),0.9)] border border-[hsl(var(--electric-cyan))] rounded-lg overflow-hidden w-full max-w-3xl shadow-[0_0_25px_rgba(0,255,255,0.3)]">
        <div
          ref={scanRef}
          className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-[hsla(var(--electric-cyan),0.2)] to-transparent"
        ></div>
        <div className="p-6 font-mono text-[hsl(var(--electric-cyan))] text-sm space-y-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>
          <p ref={addLineRef}>{">> AI SYSTEM ONLINE"}</p>
          <p ref={addLineRef}>{">> Loading projects repository..."}</p>
          <p ref={addLineRef}>{">> Scanning innovation logs..."}</p>
          <p ref={addLineRef} className="flex items-center gap-2">
            {">> Compiling showcase "}
            <span ref={asciiBarRef}>[░░░░░]</span>
          </p>
          {showGenerating && (
            <p
              className="opacity-0"
              ref={(el) => {
                if (el) {
                  gsap.to(el, { opacity: 1, duration: 0.3 });
                }
              }}
            >
              {">> Generating projects view..."}
            </p>
          )}
        </div>
      </div>
      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold mt-8 text-center gradient-text"
        style={{ fontFamily: 'var(--font-unbounded)' }}
      >
        Projects Coming Soon
      </h1>
      <p 
        className="text-[hsl(var(--muted-foreground))] mt-3 max-w-lg text-center"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        Our AI is curating groundbreaking projects to showcase here. Stay tuned
        for an inspiring collection of innovation!
      </p>
    </div>
  );
}
