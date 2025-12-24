"use client" 

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Team', path: '/team' },
    { text: 'Projects', path: '/projects' },
    { text: 'Events', path: '/events' },
    { text: 'Blog', path: '/blog' },
    { text: 'Leaderboard', path: '/leaderboard' },
  ]

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-[hsla(var(--electric-cyan),0.2)] rounded-full shadow-lg shadow-cyan-500/10 w-full max-w-4xl relative z-10 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative rounded-lg bg-gradient-to-br from-[hsla(var(--electric-cyan),0.1)] via-transparent to-[hsla(var(--digital-purple),0.1)] border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-[hsla(var(--electric-cyan),0.3)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] w-12 h-12">
              <div className="absolute inset-0.5 bg-slate-950/60 rounded-md flex items-center justify-center">
                <img
                  src="/Tensor_Logo_White.png"
                  alt="Tensor Logo"
                  width={32}
                  height={32}
                  className="relative z-10 transition-all duration-500 group-hover:brightness-110"
                />
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col">
            <span className="font-semibold text-white tracking-tight group-hover:text-[hsla(var(--electric-cyan),1)] transition-all duration-300 text-lg" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Tensor Club
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-0.5 h-0.5 bg-[hsla(var(--electric-cyan),0.6)] rounded-full" />
              <span className="text-[hsla(var(--electric-cyan),0.8)] font-mono uppercase tracking-widest text-[8px]">
                Build Future
              </span>
              <div className="w-0.5 h-0.5 bg-[hsla(var(--electric-cyan),0.6)] rounded-full" />
            </div>
          </div>
        </Link>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  href={item.path} 
                  className="text-sm text-white/80 hover:text-[hsla(var(--electric-cyan),1)] transition-all duration-300 font-medium px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 relative group"
                >
                  {item.text}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[hsla(var(--electric-cyan),1)] to-[hsla(var(--digital-purple),1)] group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-[hsla(var(--electric-cyan),1)]" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-[hsla(var(--electric-cyan),1)]" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link 
                    href={item.path} 
                    className="text-lg text-white/90 hover:text-[hsla(var(--electric-cyan),1)] font-medium block py-2 transition-all duration-300 border-b border-white/5 hover:border-[hsla(var(--electric-cyan),0.3)]" 
                    onClick={toggleMenu}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


export { Navbar1 }
