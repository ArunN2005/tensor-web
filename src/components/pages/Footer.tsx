'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Tensor-Amrita-Coimbatore',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-[hsl(var(--electric-cyan))]',
      gradient: 'from-[hsl(var(--electric-cyan))] to-[hsl(var(--digital-purple))]'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/tensor_club/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'hover:text-[hsl(var(--magenta))]',
      gradient: 'from-[hsl(var(--magenta))] to-[hsl(var(--electric-cyan))]'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: 'hover:text-[hsl(var(--digital-purple))]',
      gradient: 'from-[hsl(var(--digital-purple))] to-[hsl(var(--magenta))]'
    },
    {
      name: 'Discord',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.607.874-1.248 1.226-1.932a.075.075 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.246.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.683.772 1.324 1.225 1.932a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
        </svg>
      ),
      color: 'hover:text-[hsl(var(--chartreuse))]',
      gradient: 'from-[hsl(var(--chartreuse))] to-[hsl(var(--electric-cyan))]'
    }
  ];

  return (
    <footer className="relative w-full py-20 bg-gradient-to-br from-[hsl(var(--background))] via-[hsla(var(--card),0.5)] to-[hsl(var(--background))] border-t border-[hsla(var(--border),0.3)] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10 animate-pulse"
            style={{
              background: `radial-gradient(circle, hsl(var(--electric-cyan)), transparent)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse cursor glow effect */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-5 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle, hsl(var(--electric-cyan)), transparent 70%)`,
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top section with enhanced grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand column - enhanced */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-4 mb-6 group">
              <div className="relative">
                <Image 
                  src="/Tensor_Logo_White.png" 
                  alt="Tensor Logo" 
                  width={50} 
                  height={50} 
                  className="rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-[hsl(var(--electric-cyan))] opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500"></div>
              </div>
              <div>
                <span className="font-bold text-white text-2xl tracking-tight block group-hover:text-[hsl(var(--electric-cyan))] transition-colors duration-500" style={{ fontFamily: 'var(--font-unbounded)' }}>
                  Tensor Club
                </span>
                <span className="text-[hsl(var(--electric-cyan))] text-sm font-light block animate-pulse" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                  Building tomorrow&apos;s AI ecosystem
                </span>
              </div>
            </div>
            
            <p className="text-[hsl(var(--muted-foreground))] text-base mb-8 max-w-md leading-relaxed" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Join our thriving community of AI enthusiasts, developers, and innovators. We&apos;re pushing the boundaries of what&apos;s possible with artificial intelligence and machine learning.
            </p>
            
            {/* Live status indicator */}
            <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-[hsla(var(--card),0.5)] border border-[hsla(var(--border),0.3)] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-[hsl(var(--electric-cyan))] font-medium">Live</span>
              </div>
              <div className="text-sm text-[hsl(var(--muted-foreground))]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                {isClient && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'} IST
              </div>
            </div>
            
            {/* Enhanced email newsletter signup */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>Stay in the loop</span>
              </h4>
              <div className="flex max-w-md">
                <input 
                  type="email" 
                  placeholder="your.email@domain.com" 
                  className="bg-[hsla(var(--card),0.8)] border border-[hsla(var(--border),0.5)] rounded-l-xl px-4 py-3 text-sm flex-grow focus:outline-none focus:border-[hsl(var(--electric-cyan))] focus:ring-1 focus:ring-[hsl(var(--electric-cyan))] transition-all duration-300 backdrop-blur-sm"
                  style={{ fontFamily: 'var(--font-geist-mono)' }}
                />
                <button className="morph-button relative group px-6 py-3 rounded-r-xl text-sm font-semibold overflow-hidden">
                  <span className="relative z-10 text-[hsl(var(--electric-cyan))] group-hover:text-white transition-colors duration-300">
                    Subscribe
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--digital-purple))] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Get weekly AI insights, project updates, and exclusive content.
              </p>
            </div>
          </div>
          
          {/* Links section - enhanced grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Club Links */}
            <div className="group">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 group-hover:text-[hsl(var(--electric-cyan))] transition-colors duration-300" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <span>Explore</span>
              </h3>
              <nav className="flex flex-col space-y-4">
                {[
                  { href: "/#about", text: "About Us" },
                  { href: "/#projects", text: "Projects" },
                  { href: "/#events", text: "Events" },
                  { href: "/#blog", text: "Blog" },
                  { href: "/#leaderboard", text: "Leaderboard" },
                ].map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href} 
                    className="group/link flex items-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-all duration-300 hover:translate-x-2" 
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    <span>{link.text}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Resources Links */}
            <div className="group">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 group-hover:text-[hsl(var(--digital-purple))] transition-colors duration-300">
                <span>Resources</span>
              </h3>
              <nav className="flex flex-col space-y-4">
                {[
                  { href: "#", text: "Documentation" },
                  { href: "#", text: "Tutorials" },
                  { href: "#", text: "AI Tools" },
                  { href: "#", text: "Research Papers" },
                  { href: "#", text: "Open Source" },
                ].map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href} 
                    className="group/link flex items-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--digital-purple))] text-sm transition-all duration-300 hover:translate-x-2"
                  >
                    <span>{link.text}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Contact Links */}
            <div className="group">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 group-hover:text-[hsl(var(--magenta))] transition-colors duration-300">
                <span></span>
                <span>Connect</span>
              </h3>
              <nav className="flex flex-col space-y-4">
                <a 
                  href="mailto:tensorclub@cb.amrita.edu" 
                  className="group/link flex items-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--magenta))] text-sm transition-all duration-300 hover:translate-x-2"
                >
                  <span className="group-hover/link:scale-125 transition-transform duration-300"></span>
                  <span>tensorclub@cb.amrita.edu</span>
                </a>
                <div className="flex items-start gap-3 text-[hsl(var(--muted-foreground))] text-sm">
                  <span></span>
                  <div>
                    <p>Amrita Vishwa Vidyapeetham</p>
                    <p>Coimbatore, Tamil Nadu</p>
                    <p>India 🇮🇳</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[hsl(var(--muted-foreground))] text-sm">
                  <span></span>
                  <span>Join our community chat</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Enhanced bottom section */}
        <div className="pt-12 border-t border-[hsla(var(--border),0.2)]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Enhanced Social links */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-[hsl(var(--muted-foreground))] font-medium">Follow us</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`relative group p-3 rounded-xl bg-[hsla(var(--card),0.5)] border border-[hsla(var(--border),0.3)] text-[hsl(var(--muted-foreground))] ${social.color} transition-all duration-500 hover:scale-110 hover:rotate-3 backdrop-blur-sm overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Enhanced Copyright with stats */}
            <div className="flex flex-col lg:flex-row items-center gap-6 text-sm text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[hsl(var(--electric-cyan))] rounded-full animate-pulse"></div>
                  <span>500+ Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[hsl(var(--digital-purple))] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>50+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[hsl(var(--magenta))] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>24/7 Active</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>© {new Date().getFullYear()} Tensor Club.</span>
                <span className="hidden lg:block">•</span>
                <span>Crafted with ⚡ & 🤖</span>
                <span className="hidden lg:block">•</span>
                <span className="text-[hsl(var(--electric-cyan))] font-medium">All rights reserved.</span>
              </div>
            </div>
          </div>
          
          {/* Tech stack indicator */}
          <div className="mt-8 pt-6 border-t border-[hsla(var(--border),0.1)]">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              <div className="flex items-center gap-4">
                <span>Built with:</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-[hsla(var(--card),0.5)] rounded border border-[hsla(var(--border),0.3)]">Next.js</span>
                  <span className="px-2 py-1 bg-[hsla(var(--card),0.5)] rounded border border-[hsla(var(--border),0.3)]">TypeScript</span>
                  <span className="px-2 py-1 bg-[hsla(var(--card),0.5)] rounded border border-[hsla(var(--border),0.3)]">Tailwind</span>
                  <span className="px-2 py-1 bg-[hsla(var(--card),0.5)] rounded border border-[hsla(var(--border),0.3)]">Framer Motion</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>Status:</span>
                <span className="text-green-400">● Online</span>
                <span>•</span>
                <span>Version 2.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
