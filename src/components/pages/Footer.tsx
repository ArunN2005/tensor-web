'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Users, Zap, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  // To this (initialize with null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Tensor-Amrita-Coimbatore', icon: Github, color: 'from-cyan-500 to-blue-700' },
    { name: 'Instagram', href: 'https://www.instagram.com/tensor_club/', icon: Instagram, color: 'from-pink-500 to-red-700' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/tensor-club', icon: Linkedin, color: 'from-blue-500 to-cyan-900' },
    { name: 'Discord', href: '#', icon: MessageCircle, color: 'from-purple-400 to-indigo-700' }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Events', href: '/#events' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Leaderboard', href: '/#leaderboard' },
  ];

  const resources = [
    { name: 'Documentation', href: '#' },
    { name: 'AI Tutorials', href: '#' },
    { name: 'Research Papers', href: '#' },
    { name: 'Open Source', href: '#' },
    { name: 'Community Forum', href: '#' },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-t from-black to-transparent overflow-hidden z-10">
      
      <svg
        className="absolute -top-1 left-0 w-full h-8"
        viewBox="0 0 1440 40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
      <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b3d9dff" />   {/* purple-300 */}
            <stop offset="50%" stopColor="#99f6e4" />  {/* teal-200 */}
            <stop offset="100%" stopColor="#f099f6ff" /> {/* keep teal-200 at end */}
          </linearGradient>
      </defs>
        <path
          d="M0,20 C360,0 1080,40 1440,20"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          fill="transparent"
        >
          <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
                M0,10 C360,0 1080,40 1440,30;
                M0,30 C360,40 1080,0 1440,10;
                M0,10 C360,0 1080,40 1440,30"
            />
        </path>
      </svg>

      {/* Background grid effect (tech blue tint) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Huge translucent background text at bottom */}
      <div className="absolute -bottom-12 inset-x-0 flex items-end justify-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.08, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-[6rem] md:text-[10rem] lg:text-[13rem] font-extrabold tracking-tight text-sky-500 select-none leading-none"
        >
          TENSOR
        </motion.h1>
      </div>

      <div className="relative z-50 max-w-7xl mx-auto px-10 py-50 pt-12">
        {/* Main Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.6 } }
          }}
        >

          {/* Brand */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <div className="flex items-center space-x-3 mb-4">
              <motion.div 
                className="p-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-[-1px]">Tensor Club</h2>
                <p className="text-sky-400 text-xs font-mono">AI Community</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Join our community of AI enthusiasts and developers building the future.
            </p>

            {/* Live Status */}
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 text-xs font-semibold">Live</span>
              </div>
             <div className="text-slate-400 text-xs font-mono">
                {/* Conditionally render based on state */}
                {currentTime ? (
                  <>
                    {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                  </>
                ) : (
                  // Render a static placeholder or nothing on the server
                  <span className="opacity-0">Loading...</span> 
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}className="pl-7">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm mb-4">Explore</h3>
            <nav className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.a 
                  key={i} href={link.href}
                  whileHover={{ x: 6, color: "#22d3ee" }}
                  className="block text-slate-400 transition-colors duration-100 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm mb-4">Resources</h3>
            <nav className="space-y-3">
              {resources.map((link, i) => (
                <motion.a 
                  key={i} href={link.href}
                  whileHover={{ x: 6, color: "#a855f7" }}
                  className="block text-slate-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm mb-4">Connect</h3>
            <div className="space-y-4">
              <a href="mailto:tensorclub@cb.amrita.edu" className="flex items-start space-x-3 text-slate-400 hover:text-pink-400 transition-colors duration-300 group">
                <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm break-all">tensorclub@cb.amrita.edu</span>
              </a>
              <div className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 mt-0.5" />
                <div className="text-sm">
                  <p>Amrita Vishwa Vidyapeetham</p>
                  <p>Coimbatore, Tamil Nadu</p>
                  <p>India 🇮🇳</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Users className="w-5 h-5" />
                <span className="text-sm">70+ Active Members</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Icons + Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-8 border-t border-slate-800">
          <div className="flex items-center space-x-6">
            <span className="text-slate-400 text-sm">Follow us</span>
            <div className="flex space-x-4">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg text-slate-400 border border-slate-800 bg-slate-900/40 relative overflow-hidden group backdrop-blur-sm"
                >
                  <span className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500`} />
                  <s.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <motion.div 
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-slate-400 font-mono">70+ Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div 
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <span className="text-slate-400 font-mono">15+ Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div 
                className="w-2 h-2 bg-pink-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-slate-400 font-mono">Always Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 bg-slate-950/60 relative z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-sm">
          <div> © {new Date().getFullYear()} Tensor Club • All rights reserved</div>
          <div className="font-mono flex items-center space-x-2">
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>Online</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;