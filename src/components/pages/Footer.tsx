import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-16 bg-[hsl(var(--background))] border-t border-[hsla(var(--border),0.2)]">
      <div className="container mx-auto px-6">
        {/* Top section with grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand column - spans 4 columns on medium screens */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/Tensor_Logo_White.png" 
                alt="Tensor Logo" 
                width={40} 
                height={40} 
                className="rounded-md"
              />
              <span className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: 'var(--font-unbounded)' }}>
                Tensor Club
              </span>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6 max-w-md" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              A community of innovators building tomorrow&apos;s AI-powered applications. Join us in pushing technological boundaries.
            </p>
            
            {/* Email newsletter signup */}
            <div className="mt-6 mb-8">
              <h4 className="text-sm font-medium text-white mb-3">
                Stay updated with our newsletter
              </h4>
              <div className="flex max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-[hsla(var(--card),0.5)] border border-[hsla(var(--border),0.3)] rounded-l-md px-4 py-2 text-sm flex-grow focus:outline-none focus:border-[hsla(var(--electric-cyan),0.5)]"
                />
                <button className="bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] px-4 py-2 rounded-r-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Links section - spans 8 columns split into a grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Club Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-geist-sans)' }}>Club</h3>
              <nav className="flex flex-col space-y-3">
                <Link href="/#about" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>About</Link>
                <Link href="/#projects" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Projects</Link>
                <Link href="/#events" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Events</Link>
                <Link href="/#blog" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Blog</Link>
                <Link href="/#leaderboard" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Leaderboard</Link>
              </nav>
            </div>
            
            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h3>
              <nav className="flex flex-col space-y-3">
                <Link href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors">Documentation</Link>
                <Link href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors">Tutorials</Link>
                <Link href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors">AI Resources</Link>
                <Link href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors">Machine Learning</Link>
              </nav>
            </div>
            
            {/* Contact Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h3>
              <nav className="flex flex-col space-y-3">
                <a href="mailto:tensorclub@cb.amrita.edu" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] text-sm transition-colors">tensorclub@cb.amrita.edu</a>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  Amrita Vishwa Vidyapeetham<br />
                  Coimbatore, Tamil Nadu<br />
                  India
                </p>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Bottom section with socials and copyright */}
        <div className="pt-8 border-t border-[hsla(var(--border),0.1)] flex flex-col md:flex-row justify-between items-center">
          {/* Social links */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link href="https://github.com/Tensor-Amrita-Coimbatore" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com/tensor_club/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--electric-cyan))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-[hsl(var(--muted-foreground))] text-sm">
            © {new Date().getFullYear()} Tensor Club. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
