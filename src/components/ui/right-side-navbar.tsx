'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RightSideNavbar() {
  const [isVisible, setIsVisible] = useState(true);

  const navItems = [
    { text: 'About', href: '/team' },
    { text: 'Menu', href: '/projects' },
    { text: 'Community', href: '/events' }
  ];

  return (
    <>
      {/* Right-side vertical rail - hidden on mobile */}
      <div className="fixed right-0 top-0 bottom-0 z-40 hidden lg:block">
        <div 
          className="h-full w-16 bg-[hsl(var(--mint-rail))] flex items-center justify-center"
          style={{
            background: 'var(--mint-rail-color)',
            backdropFilter: 'blur(10px)',
            borderLeft: '1px solid hsla(var(--border), 0.3)'
          }}
        >
          <nav className="flex flex-col items-center justify-center space-y-12">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative"
              >
                <span 
                  className="block text-black font-medium tracking-wider uppercase text-sm hover:text-[hsl(var(--warm-red))] transition-colors duration-300"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    letterSpacing: '0.2em'
                  }}
                >
                  {item.text}
                </span>
                
                {/* Hover effect line */}
                <div 
                  className="absolute left-1/2 top-0 w-0.5 h-0 bg-[hsl(var(--warm-red))] -translate-x-1/2 transition-all duration-300 group-hover:h-full"
                  style={{ opacity: 0 }}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for hero image interaction */}
      <div className="fixed right-0 top-0 bottom-0 w-20 z-30 pointer-events-none hidden lg:block" />
    </>
  );
}
