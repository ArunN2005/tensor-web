'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
const StaggeredMenu = dynamic(() => import('./StaggeredMenu'), { ssr: false });
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

function Logo({ isOverlay = false }: { isOverlay?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-3 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div
          className={`relative rounded-lg bg-gradient-to-br from-[hsla(var(--electric-cyan),0.1)] via-transparent to-[hsla(var(--digital-purple),0.1)] border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-[hsla(var(--electric-cyan),0.3)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] ${
            isOverlay ? 'w-16 h-16' : 'w-16 h-16'
          }`}
        >
          <div className="absolute inset-0.5 bg-slate-950/60 rounded-md flex items-center justify-center">
            <Image
              src="/Tensor_Logo_White.png"
              alt="Tensor Logo"
              width={isOverlay ? 42 : 42}
              height={isOverlay ? 42 : 42}
              className="relative z-10 transition-all duration-500 group-hover:brightness-110"
            />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsla(var(--electric-cyan),0.2)] to-transparent animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-semibold text-white tracking-tight group-hover:text-[hsla(var(--electric-cyan),1)] transition-all duration-300 ${
            isOverlay ? 'text-2xl' : 'text-xl'
          }`}
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Tensor Club
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-0.5 h-0.5 bg-[hsla(var(--electric-cyan),0.6)] rounded-full" />
          <span
            className={`text-[hsla(var(--electric-cyan),0.8)] font-mono uppercase tracking-widest ${
              isOverlay ? 'text-[10px]' : 'text-[9px]'
            }`}
          >
            Build Future
          </span>

          <div className="w-0.5 h-0.5 bg-[hsla(var(--electric-cyan),0.6)] rounded-full" />
        </div>
      </div>
    </div>
  );
}

function FullPageNavigation({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { text: 'Home', path: '/', icon: '◆', description: 'Main hub' },
    { text: 'Team', path: '/team', icon: '◈', description: 'Our creators' },
    { text: 'Projects', path: '/projects', icon: '◇', description: 'AI innovations' },
    { text: 'Events', path: '/events', icon: '◉', description: 'Upcoming activities' },
    { text: 'Blog', path: '/blog', icon: '◎', description: 'Latest insights' },
    { text: 'Leaderboard', path: '/leaderboard', icon: '◊', description: 'Top performers' },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    onClick(); // close overlay first

    // Smooth transition delay
    setTimeout(() => {
      if (path.startsWith('#')) {
        // Handle in-page anchor links
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      } else if (path === pathname) {
        // If clicking current page, just stay here - no navigation needed
        return;
      } else {
        // Navigate to different page
        router.push(path);
      }
    }, 150); // Reduced delay for smoother experience
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;
        const isHovered = hoveredItem === item.path;
        
        return (
          <div
            key={index}
            className="relative group"
            style={{
              transform: `translateX(${isOpen ? '0' : '60px'}) translateY(${isOpen ? '0' : '20px'})`,
              opacity: isOpen ? '1' : '0',
              transitionDelay: `${index * 0.08}s`,
              transitionDuration: '0.5s',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <button
              onClick={(e) => handleNavClick(e, item.path)}
              
              className={`relative w-full py-4 px-6 transition-all duration-300 overflow-hidden rounded-xl border text-left block group ${
                isActive 
                  ? 'text-[hsla(var(--electric-cyan),1)] font-semibold border-[hsla(var(--electric-cyan),0.4)] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 shadow-lg' 
                  : 'text-white hover:text-[hsla(var(--electric-cyan),1)] border-transparent hover:border-[hsla(var(--electric-cyan),0.4)] hover:bg-gradient-to-r hover:from-white/5 hover:via-purple-500/10 hover:to-cyan-500/10'
              }`}


              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Enhanced Active/Hover Indicator */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                isActive 
                  ? 'w-1 h-8 bg-gradient-to-b from-[hsla(var(--electric-cyan),0.8)] via-[hsla(var(--digital-purple),0.8)] to-[hsla(var(--electric-cyan),0.8)] opacity-100 scale-100 rounded-r-full' 
                  : isHovered
                  ? 'w-0.5 h-6 bg-gradient-to-b from-[hsla(var(--digital-purple),0.8)] to-[hsla(var(--electric-cyan),0.8)] opacity-70 scale-100 rounded-r-full'
                  : 'w-0.5 h-4 bg-[hsla(var(--digital-purple),0.8)] opacity-0 scale-0 rounded-r-full'
              }`} />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-lg transition-all duration-300 ${
                    isHovered 
                      ? 'text-[hsla(var(--electric-cyan),1)] scale-125 rotate-12' 
                      : isActive 
                      ? 'text-[hsla(var(--electric-cyan),1)] scale-110' 
                      : 'text-slate-400'
                  }`}>
                    {item.icon}
                  </div>

                  <div>
                    <span className="font-semibold tracking-wide text-base block" style={{ fontFamily: 'var(--font-unbounded)' }}>
                      {item.text}
                    </span>
                    <span className="text-xs text-slate-400 tracking-wider" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {item.description}
                    </span>

                  </div>
                </div>
                
                {/* Arrow indicator */}
                <div className={`transition-all duration-300 ${
                  isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                }`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[hsla(var(--electric-cyan),1)]">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Hover Effect */}
              {isHovered && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsla(var(--electric-cyan),0.1)] to-transparent" 
                       style={{ animation: 'slideRight 0.8s ease-out' }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsla(var(--digital-purple),0.05)] to-transparent opacity-50" />
                </>
              )}
              
              {/* Glassmorphism effect for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[hsla(var(--electric-cyan),0.05)] via-[hsla(var(--digital-purple),0.1)] to-[hsla(var(--electric-cyan),0.05)] backdrop-blur-sm" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function UsageIndicator({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`fixed top-4 right-6 transition-all duration-700 z-30 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`}>
      <div className="bg-slate-900/90 backdrop-blur-md border border-blue-400/20 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-mono">GUIDE</span>
          </div>
          <div className="text-slate-300 text-xs">
            <span className="text-blue-400 font-mono">Hover</span> top edge to access menu
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const indicatorTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide indicator after delay
  useEffect(() => {
    indicatorTimeoutRef.current = setTimeout(() => {
      setShowIndicator(false);
    }, 5000);

    return () => {
      if (indicatorTimeoutRef.current) {
        clearTimeout(indicatorTimeoutRef.current);
      }
    };
  }, []);

  // Show indicator again when menu is opened/closed
  useEffect(() => {
    if (menuOpen || isTransitioning) {
      setShowIndicator(false);
    }
  }, [menuOpen, isTransitioning]);

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX);
    
    if (!isVerticalSwipe) {
      if (isRightSwipe && !menuOpen) {
        setMenuOpen(true);
        setShowIndicator(false);
      } else if (isLeftSwipe && menuOpen) {
        handleCloseMenu();
      }
    }
  }, [touchStart, touchEnd, menuOpen, minSwipeDistance]);

  useEffect(() => {
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  const handleCloseMenu = () => {
    setIsTransitioning(true);
    setMenuOpen(false);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle overlay click - only close if clicking on background, not navigation items
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking on the overlay background itself
    if (e.target === e.currentTarget) {
      handleCloseMenu();
    }
  };
  
  const handleOpenModal = () => {
    const modal = document.getElementById('community-modal');
    if (modal) modal.classList.remove('hidden');
  };
  
  const handleCloseModal = () => {
    const modal = document.getElementById('community-modal');
    if (modal) modal.classList.add('hidden');
  };

  // Close menu on escape key and toggle body class for footer visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseMenu();
      }
    };
    
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Add class for footer to hide
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      // Remove class for footer
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <>
      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes neonGlow {
          0%, 100% { 
            box-shadow: 0 0 12px ${scrolled ? 'rgba(0, 255, 255, 0.7)' : 'rgba(0, 255, 255, 0.7)'}, 0 0 24px ${scrolled ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 255, 255, 0.4)'};
            background: linear-gradient(90deg, transparent, ${scrolled ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.8)'}, transparent);
          }
          50% { 
            box-shadow: 0 0 16px ${scrolled ? 'rgba(0, 255, 255, 0.9)' : 'rgba(0, 255, 255, 0.9)'}, 0 0 32px ${scrolled ? 'rgba(0, 255, 255, 0.6)' : 'rgba(0, 255, 255, 0.6)'}, 0 0 48px ${scrolled ? 'rgba(0, 255, 255, 0.4)' : 'rgba(0, 255, 255, 0.4)'};
            background: linear-gradient(90deg, transparent, ${scrolled ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 1)'}, transparent);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-8px) scale(1.1) rotate(2deg); opacity: 0.7; }
          66% { transform: translateY(-4px) scale(0.95) rotate(-1deg); opacity: 0.5; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .neon-trigger {
          animation: neonGlow 4s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        .float-orb {
          animation: float 6s ease-in-out infinite;
        }
        .pulse-orb {
          animation: pulse 3s ease-in-out infinite;
        }
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Usage Indicator */}
      <UsageIndicator isVisible={showIndicator && !menuOpen} />

      {/* Enhanced Neon Trigger Line with Scroll Color Change */}
      <div 
        className="fixed top-0 left-0 w-full h-2 neon-trigger z-50 transition-all duration-500"
        style={{
          background: scrolled 
            ? 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.9), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.9), transparent)',
        }}
      />

      {/* Simplified overlay/backdrop (no heavy decorative layers) */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
          menuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ background: 'rgba(2,6,23,0.75)' }}
        onClick={handleOverlayClick}
      />

      {/* StaggeredMenu rendered as sibling so overlay only acts as backdrop */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="pointer-events-auto">
          <StaggeredMenu
            position="right"
            items={[
              { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
              { label: 'Team', ariaLabel: 'Our creators', link: '/team' },
              { label: 'Projects', ariaLabel: 'AI innovations', link: '/projects' },
              { label: 'Events', ariaLabel: 'Upcoming activities', link: '/events' },
              { label: 'Blog', ariaLabel: 'Latest insights', link: '/blog' },
              { label: 'Leaderboard', ariaLabel: 'Top performers', link: '/leaderboard' },
            ]}
            socialItems={[
              { label: 'Twitter', link: 'https://twitter.com' },
              { label: 'GitHub', link: 'https://github.com' },
              { label: 'LinkedIn', link: 'https://linkedin.com' },
            ]}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            logoUrl="/Tensor_Logo_White.png"
            accentColor="#5227FF"
            isFixed={false}
            open={menuOpen}
            onOpenChange={(v) => setMenuOpen(v)}
            onMenuClose={handleCloseMenu}
          />
        </div>
      </div>

      {/* Enhanced Community Modal */}
      <div id="community-modal" className="fixed inset-0 z-[100] hidden">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={handleCloseModal}></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
          <div className="bg-slate-950/95 backdrop-blur-2xl border border-blue-400/20 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] m-4 overflow-hidden">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 border-b border-blue-400/10 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white tracking-wide">
                    Network Access
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-blue-400/80 font-mono tracking-wider">SECURE CONNECTION</span>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="text-slate-500 hover:text-blue-400 transition-colors duration-300 p-2 rounded-md hover:bg-blue-400/10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Enhanced Content */}
            <div className="p-6 space-y-5">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20 backdrop-blur-sm">
                <p className="text-blue-400/90 font-mono text-xs mb-2">[System Active]</p>
                <p className="text-slate-200 text-sm leading-relaxed">
                  The official Tensor Discussion Group Chat is now live!! It is open for all!!
                </p>
              </div>
              
              <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1 animate-pulse" />
                  <div>
                    <span className="text-blue-400/90 font-mono block mb-1">[AI Support]</span>
                    <span>Connect with TENSOR TROOPS for collaborative AI learning and project assistance.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-1 animate-pulse" />
                  <div>
                    <span className="text-purple-400/90 font-mono block mb-1">[Optimization]</span>
                    <span>Make AI work more for us, for our assignments :P , Let&apos;s Burn Open AI and other&apos;s servers together!</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-3">
                <p className="text-orange-400/90 text-xs font-mono mb-1">SECURITY NOTICE</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Please Join the WhatsApp group using the link given only.
                </p>
              </div>
              
              <div className="flex justify-center pt-4">
                <a 
                  href="https://chat.whatsapp.com/K4Du49mIpL5JplISuw2Ulr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 py-3 rounded-lg font-mono text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center gap-3 group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Connect</span>
                </a>
              </div>
              
              <div className="text-center pt-4 border-t border-slate-800/30">
                <p className="text-slate-600 text-xs font-mono tracking-wider">
                  tensor.system.v2.1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



