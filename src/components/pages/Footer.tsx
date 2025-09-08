'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Users, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

// FooterUsageIndicator Component (matches navbar style but for bottom)
function FooterUsageIndicator({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`fixed bottom-4 right-6 transition-all duration-700 z-30 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}>
      <div className="bg-slate-900/90 backdrop-blur-md border border-blue-400/20 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs font-mono">GUIDE</span>
          </div>
          <div className="text-slate-300 text-xs">
            <span className="text-blue-400 font-mono">Hover</span> bottom edge to access footer
          </div>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const indicatorTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection for glow color change (matches navbar)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide indicator after 5 seconds (matches navbar timeout)
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

  // Hide indicator when footer is hovered
  useEffect(() => {
    if (isHovered) {
      setShowIndicator(false);
    }
  }, [isHovered]);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Tensor-Amrita-Coimbatore', icon: Github },
    { name: 'Instagram', href: 'https://www.instagram.com/tensor_club/', icon: Instagram },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/tensor-club', icon: Linkedin },
    { name: 'Discord', href: '#', icon: MessageCircle }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/#about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  return (
    <>
      {/* Styles for Neon Glow (matches navbar exactly) */}
      <style jsx>{`
        @keyframes neonGlow {
          0%, 100% { 
            box-shadow: 0 0 12px ${scrolled ? 'rgba(59, 130, 246, 0.7)' : 'rgba(147, 51, 234, 0.7)'}, 0 0 24px ${scrolled ? 'rgba(59, 130, 246, 0.4)' : 'rgba(147, 51, 234, 0.4)'};
            background: linear-gradient(90deg, transparent, ${scrolled ? 'rgba(59, 130, 246, 0.8)' : 'rgba(147, 51, 234, 0.8)'}, transparent);
          }
          50% { 
            box-shadow: 0 0 16px ${scrolled ? 'rgba(59, 130, 246, 0.9)' : 'rgba(147, 51, 234, 0.9)'}, 0 0 32px ${scrolled ? 'rgba(59, 130, 246, 0.6)' : 'rgba(147, 51, 234, 0.6)'}, 0 0 48px ${scrolled ? 'rgba(59, 130, 246, 0.4)' : 'rgba(147, 51, 234, 0.4)'};
            background: linear-gradient(90deg, transparent, ${scrolled ? 'rgba(59, 130, 246, 1)' : 'rgba(147, 51, 234, 1)'}, transparent);
          }
        }
        .neon-trigger {
          animation: neonGlow 4s ease-in-out infinite;
          transition: all 0.3s ease;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-8px) scale(1.1) rotate(2deg); opacity: 0.7; }
          66% { transform: translateY(-4px) scale(0.95) rotate(-1deg); opacity: 0.5; }
        }
      `}</style>

      {/* Footer Usage Indicator (pops up for 5s on first load, blue theme to match navbar) */}
      <FooterUsageIndicator isVisible={showIndicator && !isHovered} />

      {/* Enhanced Neon Trigger Line at Bottom (exact match to navbar glow) */}
      <div 
        className="fixed bottom-0 left-0 w-full h-1 neon-trigger cursor-pointer z-50 transition-all duration-500 hover:h-2"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowIndicator(false);
        }}
        style={{
          background: scrolled 
            ? 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.9), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.9), transparent)',
        }}
      />

      {/* Footer with Slide-up Animation (appears on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.footer 
            className="fixed bottom-0 left-0 w-full z-[9999] bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-800/90 backdrop-blur-md border-t border-slate-700/50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.3 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Enhanced wave animation (matches footer style but with glow colors) */}
            <div className="absolute -top-1 left-0 w-full h-4">
              <svg className="w-full h-full" viewBox="0 0 1200 20" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,10 Q300,0 600,10 T1200,10"
                  stroke="url(#wave)"
                  strokeWidth="3"
                  fill="none"
                  animate={{
                    d: [
                      "M0,10 Q300,0 600,10 T1200,10",
                      "M0,8 Q300,15 600,8 T1200,8", 
                      "M0,10 Q300,0 600,10 T1200,10"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* TENSOR Background Text */}
            <div className="absolute -bottom-4 inset-x-0 flex items-end justify-center pointer-events-none">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.06, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold tracking-tight text-sky-500 select-none leading-none"
              >
                TENSOR
              </motion.h1>
            </div>

            {/* Enhanced Background Effects (floating orbs like navbar) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Animated floating elements */}
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full blur-xl float-orb`}
                  style={{
                    width: `${80 + i * 20}px`,
                    height: `${80 + i * 20}px`,
                    left: `${10 + i * 15}%`,
                    top: `${15 + i * 12}%`,
                    background: i % 3 === 0 
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.08))'
                      : i % 3 === 1
                      ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.08))'
                      : 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.08))',
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${4 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Container */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 text-left">
              
              {/* Main Content - 3-Column Layout */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                
                {/* Left Column - Brand Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-3"
                >
                  {/* Enhanced Tensor Logo Container */}
                  <div className="flex justify-start mb-2">
                    <motion.div 
                      className="relative p-3 bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 rounded-2xl shadow-2xl border-2 border-cyan-500/60 backdrop-blur-md"
                      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.4)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-blue-400/20 blur-sm"></div>
                      <Image 
                        src="/tensor-horizontal.png"
                        alt="Tensor Club"
                        width={220}
                        height={60}
                        className="relative z-10 object-contain opacity-100 transition-opacity duration-300 outline-none border-none"
                      />
                    </motion.div>
                  </div>
                  
                  <p className="text-cyan-400 text-sm font-mono text-left font-semibold">AI Community</p>
                  
                  <p className="text-slate-300 text-sm leading-relaxed text-left">
                    Join our community of AI enthusiasts building the future.
                  </p>

                  {/* Enhanced Live Status Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800/70 to-slate-700/70 rounded-xl border-2 border-emerald-500/50 shadow-lg backdrop-blur-md">
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-emerald-400 text-sm font-semibold">Live</span>
                    <span className="text-slate-300 text-sm font-mono">
                      {currentTime?.toLocaleTimeString('en-IN', { 
                        timeZone: 'Asia/Kolkata',
                        hour12: false 
                      })} IST
                    </span>
                  </div>
                </motion.div>

                {/* Center Column - Explore Links - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-center">
                    Explore
                  </h3>
                  
                  <nav className="space-y-2 text-center">
                    {quickLinks.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="block text-slate-400 hover:text-cyan-400 text-sm transition-all duration-200"
                        whileHover={{ x: 4, color: "#22d3ee" }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </nav>
                </motion.div>

                {/* Right Column - Connect Section */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  {/* Clickable Amrita Logo */}
                  <div className="flex justify-start">
                    <motion.a 
                      href="https://amrita.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image 
                        src="/images/amrita_logo.png"
                        alt="Amrita Vishwa Vidyapeetham"
                        width={200}
                        height={120}
                        className="opacity-90 hover:opacity-100 transition-opacity duration-300 object-contain outline-none border-none cursor-pointer"
                      />
                    </motion.a>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-left">
                    Connect
                  </h3>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <motion.div 
                      className="flex items-center gap-3 text-slate-300 text-left p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <a 
                        href="mailto:tensorclub@cb.amrita.edu" 
                        className="hover:text-cyan-400 transition-colors text-xs"
                      >
                        tensorclub@cb.amrita.edu
                      </a>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 text-slate-300 text-left p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-xs">Coimbatore, Tamil Nadu</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 text-slate-300 text-left p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs">70+ Active Members</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Section */}
              <motion.div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-4 border-t-2 border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                
                {/* Social Media Links */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm font-medium">Follow us</span>
                  <div className="flex gap-2">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-700/60 border-2 border-slate-600/50 text-slate-400 hover:text-white hover:border-cyan-400/60 transition-all duration-300 outline-none shadow-lg backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.1, 
                          y: -3,
                          boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Statistics & Copyright */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50"
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span>70+ Members</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-sm shadow-purple-400/50"
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span>15+ Projects</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span>© 2025 Tensor Club</span>
                </div>
              </motion.div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
