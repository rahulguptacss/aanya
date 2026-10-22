'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-2.5 sm:py-3 shadow-lg shadow-black/30 border-b border-white/5'
            : 'bg-transparent py-5 sm:py-7 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Logo - Smoothly scales down on scroll */}
          <Link
            href="/"
            className="flex items-center group transition-opacity hover:opacity-90"
            aria-label={data.logo_text}
          >
            <div
              className={`relative transition-all duration-300 ease-out ${
                isScrolled
                  ? 'w-40 sm:w-48 md:w-56 h-10 sm:h-12 md:h-14'
                  : 'w-52 sm:w-64 md:w-80 h-14 sm:h-18 md:h-22'
              }`}
            >
              <Image
                src={data.logo}
                alt={data.logo_text}
                fill
                priority
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Hamburger Circular Button - Compact on scroll */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={data.menu_aria_label}
            aria-expanded={isOpen}
            className={`rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all duration-200 active:scale-95 cursor-pointer shadow-lg ${
              isScrolled
                ? 'w-10 h-10 sm:w-11 sm:h-11 border border-white/70'
                : 'w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/80'
            }`}
          >
            <Menu
              className={`stroke-[2] transition-all duration-200 ${
                isScrolled ? 'w-5 h-5 sm:w-5.5 sm:h-5.5' : 'w-6 h-6 sm:w-7 sm:h-7'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Luxury Menu Overlay - 100% GPU-accelerated and smooth */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0c0b0a] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none will-change-transform"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto">
              <div className="relative w-52 sm:w-64 md:w-80 h-14 sm:h-18 md:h-22">
                <Image
                  src={data.logo}
                  alt={data.logo_text}
                  fill
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                  className="object-contain object-left"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={data.close_aria_label}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <X className="w-6 h-6 stroke-[1.8]" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="max-w-7xl w-full mx-auto my-auto py-6">
              <nav className="flex flex-col space-y-3 sm:space-y-5">
                {data.links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      delay: 0.04 + idx * 0.04,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-3xl sm:text-5xl md:text-6xl font-serif text-white hover:text-[#c59b5f] transition-colors duration-200 py-1"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-2">
                        {link.name}
                      </span>
                      <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#c59b5f]" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom Info inside Menu */}
            <div className="max-w-7xl w-full mx-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs tracking-wider text-white/50">
              <p>{data.logo_subtext}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
