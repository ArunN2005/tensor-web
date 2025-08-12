'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
export default function LeaderboardPage() {
  const linesRef = useRef<HTMLParagraphElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const asciiBarRef = useRef<HTMLSpanElement>(null);
  const [showGenerating, setShowGenerating] = useState(false); // controls rendering
  const addLineRef = (el: HTMLParagraphElement) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    gsap.to(scanRef.current, {
      y: '100%',
      duration: 1.2,
      repeat: -1,
      ease: 'linear',
    });
    linesRef.current.slice(0, 3).forEach((line, i) => {
      tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.3 }, i * 0.5);
    });
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
              asciiBarRef.current.textContent =
                `[${'█'.repeat(current)}${'░'.repeat(totalBlocks - current)}]`;
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
      '+=0.5'
    );
    tl.to({}, { duration: 3.5 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        onStart: () => {
          if (titleRef.current)
            titleRef.current.textContent = 'Initi@lizing L34d3rb0@rd...';
        },
        onComplete: () => {
          if (titleRef.current)
            titleRef.current.textContent = 'Leaderboard Coming Soon';
        },
      }
    );
  }, []);
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative bg-black border border-[hsl(var(--electric-cyan))] rounded-lg overflow-hidden w-full max-w-3xl shadow-[0_0_25px_rgba(0,255,255,0.3)]">
        <div
          ref={scanRef}
          className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-[hsla(var(--electric-cyan),0.2)] to-transparent"
        ></div>
        <div className="p-6 font-mono text-[hsl(var(--electric-cyan))] text-sm space-y-2">
          <p ref={addLineRef}>{'>> AI SYSTEM ONLINE'}</p>
          <p ref={addLineRef}>{'>> Loading competition dataset...'}</p>
          <p ref={addLineRef}>{'>> Scanning community activity logs...'}</p>
          <p ref={addLineRef} className="flex items-center gap-2">
            {'>> Detecting top contributors '}
            <span ref={asciiBarRef}>[░░░░░]</span>
          </p>
          {showGenerating && (
            <p className="opacity-0" ref={el => el && gsap.to(el, { opacity: 1, duration: 0.3 })}>
              {'>> Generating leaderboard view...'}
            </p>
          )}
        </div>
      </div>
      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-white mt-8 text-center"
      >
        Leaderboard Coming Soon
      </h1>
      <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-lg text-center">
        Our AI is crunching the numbers to bring you the ultimate ranking of our top innovators.
      </p>
    </div>
  );
}
