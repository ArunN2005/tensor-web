'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MinimalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryLinks = [
    { text: 'Gift Vouchers', href: '/vouchers' },
    { text: 'Group Dining', href: '/dining' },
    { text: 'Book a Table', href: '/booking' },
    { text: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsla(var(--background),0.9)] backdrop-blur-md border-b border-[hsla(var(--border),0.3)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left-aligned logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/Tensor_Logo_White.png" 
              alt="Tensor Logo" 
              width={32} 
              height={32} 
              className="rounded-md"
            />
          </Link>

          {/* Centered primary links - hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--soft-pink))] transition-colors duration-300"
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger menu */}
          <button
            className="lg:hidden w-6 h-6 flex flex-col justify-center items-center space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span 
              className={`block w-4 h-0.5 bg-[hsl(var(--foreground))] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span 
              className={`block w-4 h-0.5 bg-[hsl(var(--foreground))] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-4 h-0.5 bg-[hsl(var(--foreground))] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-[hsla(var(--border),0.3)]">
            <div className="flex flex-col space-y-3">
              {primaryLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-[hsl(var(--foreground))] hover:text-[hsl(var(--soft-pink))] transition-colors duration-300 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
