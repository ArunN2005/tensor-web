'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Logo() {
  return (
    <div className="flex items-center gap-3 magnetic-hover">
      <div className="relative">
        <Image 
          src="/Tensor_Logo_White.png" 
          alt="Tensor Logo" 
          width={40} 
          height={40} 
          className="rounded-md transition-all duration-300 hover:scale-110 hover:rotate-3"
        />
        <div className="absolute inset-0 bg-[hsl(var(--electric-cyan))] opacity-0 hover:opacity-20 rounded-md transition-opacity duration-300"></div>
      </div>
      <div className="flex flex-col items-start">
        <span className="font-bold text-white text-xl tracking-tight hover:text-[hsl(var(--electric-cyan))] transition-colors duration-300" style={{ fontFamily: 'var(--font-unbounded)' }}>
          Tensor Club
        </span>
        <span className="text-[hsl(var(--electric-cyan))] text-xs font-light animate-pulse" style={{ fontFamily: 'var(--font-geist-mono)' }}>
          Build the future
        </span>
      </div>
    </div>
  );
}

function Navigation({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const navItems = [
    { text: 'Home', path: '/', icon: '⌂' },
    { text: 'Team', path: '/team', icon: '' },
    { text: 'Projects', path: '/projects', icon: '' },
    { text: 'Events', path: '/events', icon: '' },
    { text: 'Blog', path: '/blog', icon: '' },
    { text: 'Leaderboard', path: '/leaderboard', icon: '' },
  ];

  return (
    <nav className="flex flex-col md:flex-row md:gap-2 text-md md:text-sm font-medium">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;
        const isHovered = hoveredItem === item.path;
        
        return (
          <Link
            href={item.path}
            key={index}
            className={`relative group py-3 px-4 transition-all duration-500 rounded-xl overflow-hidden ${
              isActive 
                ? 'text-[hsl(var(--electric-cyan))] bg-[hsla(var(--electric-cyan),0.1)] shadow-glow' 
                : 'text-[hsl(var(--foreground))] hover:text-[hsl(var(--electric-cyan))]'
            }`}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
            onClick={onClick}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Background effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.1)] to-[hsla(var(--digital-purple),0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? 'opacity-50' : ''}`}></div>
            
            {/* Sliding underline */}
            <div className={`absolute bottom-0 left-0 h-0.5 bg-[hsl(var(--electric-cyan))] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-2">
              <span className={`text-xs transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
            </div>
            
            {/* Particle effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[hsl(var(--electric-cyan))] rounded-full opacity-60 animate-ping"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };
  
  const handleOpenModal = () => {
    const modal = document.getElementById('community-modal');
    if (modal) modal.classList.remove('hidden');
  };
  
  const handleCloseModal = () => {
    const modal = document.getElementById('community-modal');
    if (modal) modal.classList.add('hidden');
  };

  return (
    <>
      <header 
        ref={navRef}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? 'bg-[hsla(var(--background),0.95)] backdrop-blur-xl border-b border-[hsla(var(--border),0.3)] shadow-2xl' 
            : 'bg-transparent'
        }`}
        style={{
          background: scrolled 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(var(--electric-cyan), 0.05), transparent 40%)`
            : 'transparent'
        }}
      >
        {/* Ambient light effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(var(--electric-cyan), 0.1), transparent 70%)`,
            opacity: scrolled ? 0.3 : 0,
          }}
        />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Logo on the left */}
            <Link href="/" className="flex items-center z-20">
              <Logo />
            </Link>
            
            {/* Navigation in the center */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="relative">
                <Navigation onClick={handleCloseMenu} />
              </div>
            </div>
            
            {/* Action button on the right */}
            <div className="hidden md:flex z-20">
              <button 
                onClick={handleOpenModal}
                className="morph-button relative group px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-500 backdrop-blur-sm overflow-hidden"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
              >
                <span className="relative z-10 text-[hsl(var(--electric-cyan))] group-hover:text-white transition-colors duration-300">
                  Join Community
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--digital-purple))] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
            
            {/* Enhanced Mobile menu button */}
            <button
              className="relative inline-flex items-center justify-center p-3 rounded-xl text-white md:hidden hover:text-[hsl(var(--electric-cyan))] hover:bg-[hsla(var(--electric-cyan),0.1)] transition-all duration-300 group z-20"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`absolute left-0 w-full backdrop-blur-xl z-[90] transition-all duration-500 ease-in-out border-b border-[hsla(var(--border),0.3)] ${
            menuOpen ? 'opacity-100 max-h-[500px] visible' : 'opacity-0 max-h-0 invisible overflow-hidden'
          }`}
          style={{
            background: 'linear-gradient(135deg, hsla(var(--background), 0.98) 0%, hsla(var(--background), 0.95) 100%)',
          }}
        >
          <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col items-start space-y-2">
              <Navigation onClick={handleCloseMenu} />
              <div className="pt-6 w-full border-t border-[hsla(var(--border),0.2)]">
                <button 
                  onClick={handleOpenModal}
                  className="morph-button inline-flex items-center justify-center w-full px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-500"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
                >
                  <span className="text-[hsl(var(--electric-cyan))]">Join Community</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Community Modal */}
      <div id="community-modal" className="fixed inset-0 z-[100] hidden">
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={handleCloseModal}></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <div className="glassmorphism p-6 rounded-2xl border border-[hsla(var(--digital-purple),0.3)] shadow-glow m-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-unbounded)' }}>
                Join Our Community
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-[hsl(var(--muted-foreground))] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <span className="text-[hsl(var(--electric-cyan))] font-medium">Greeting,</span><br/>
                The official Tensor Discussion Group Chat is now live!! It is open for all!!
              </p>
              
              <p style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Do you have any doubts in AI or do you wanna know how well you can utilise some AI tools/ any AI-project related doubts?
                Don&apos;t worry, we&apos;re here - the <span className="gradient-text font-semibold">TENSOR TROOPS</span>, we&apos;re here to help you, learn together, discuss cool stuffs.
              </p>
              
              <p style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Make AI work more for us, for our assignments :P , Let&apos;s Burn Open AI and other&apos;s servers together!
              </p>
              
              <p className="text-[hsl(var(--muted-foreground))]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Please Join the WhatsApp group using the link given only.
              </p>
              
              <div className="flex justify-center pt-2">
                <a 
                  href="https://chat.whatsapp.com/K4Du49mIpL5JplISuw2Ulr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[hsl(var(--electric-cyan))] text-[hsl(var(--background))] px-6 py-3 rounded-lg shadow-glow inline-flex items-center gap-2 font-medium"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp Group
                </a>
              </div>
              
              <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                ~Team TENSOR ^^
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
