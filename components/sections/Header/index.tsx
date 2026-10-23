'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

/** Overlay Menu Item — handles standard link, Level 1 accordion, and Level 2 nested accordion */
function OverlayNavItem({
  item,
  idx,
  onClose,
  isActive,
}: {
  item: NavItem;
  idx: number;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const active = isActive(item.href);

  const toggleSub = (name: string) => {
    setSubExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!hasChildren) {
    return (
      <motion.div
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
          href={item.href}
          onClick={onClose}
          className={`group flex items-center justify-between text-3xl sm:text-5xl md:text-6xl font-serif transition-colors duration-200 py-1 ${
            active ? 'text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
          }`}
        >
          <span className="transition-transform duration-200 group-hover:translate-x-2">
            {item.name}
          </span>
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#c59b5f]" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        delay: 0.04 + idx * 0.04,
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col"
    >
      <div className="py-1">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={`Toggle ${item.name} sub-menu`}
          className={`group flex items-center justify-between w-full text-left transition-colors duration-200 cursor-pointer ${
            active || expanded ? 'text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
          }`}
        >
          <span className="text-3xl sm:text-5xl md:text-6xl font-serif transition-transform duration-200 group-hover:translate-x-2">
            {item.name}
          </span>
          <div
            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border transition-all shrink-0 ${
              expanded
                ? 'border-[#c59b5f] text-[#c59b5f] bg-[#c59b5f]/15'
                : 'border-white/20 text-white/80 group-hover:border-[#c59b5f] group-hover:text-[#c59b5f]'
            }`}
          >
            <ChevronDown
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                expanded ? 'rotate-180 text-[#c59b5f]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pl-4 sm:pl-8 pt-2 pb-3 space-y-2 border-l border-[#c59b5f]/30 mt-2"
          >
            {item.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubOpen = Boolean(subExpanded[sub.name]);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-serif transition-colors duration-200 py-1 ${
                        isSubActive ? 'text-[#c59b5f]' : 'text-white/85 hover:text-[#c59b5f]'
                      }`}
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                        {sub.name}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c59b5f]" />
                    </Link>
                  </li>
                );
              }

              // Level 2 inside overlay accordion (Dropdown inside dropdown)
              return (
                <li key={sub.name} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleSub(sub.name)}
                    aria-expanded={isSubOpen}
                    aria-label={`Toggle ${sub.name} nested menu`}
                    className={`group flex items-center justify-between w-full py-1 text-left transition-colors duration-200 cursor-pointer ${
                      isSubActive || isSubOpen ? 'text-[#c59b5f]' : 'text-white/85 hover:text-[#c59b5f]'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl font-serif transition-transform duration-200 group-hover:translate-x-1.5">
                      {sub.name}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all shrink-0 ${
                        isSubOpen
                          ? 'border-[#c59b5f] text-[#c59b5f] bg-[#c59b5f]/15'
                          : 'border-white/20 text-white/70 group-hover:border-[#c59b5f] group-hover:text-[#c59b5f]'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-[#c59b5f]' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isSubOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden pl-4 sm:pl-6 pt-1 pb-2 space-y-1.5 border-l border-white/20 mt-1"
                      >
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              onClick={onClose}
                              className={`block text-base sm:text-lg font-serif transition-colors duration-200 py-1 ${
                                isActive(nested.href)
                                  ? 'text-[#c59b5f]'
                                  : 'text-white/70 hover:text-[#c59b5f]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
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

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-2.5 sm:py-3 shadow-lg shadow-black/30 border-b border-white/5'
            : 'bg-transparent py-5 sm:py-7 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-8">
          {/* Logo - Smoothly scales down on scroll */}
          <Link
            href="/"
            className="flex items-center group transition-opacity hover:opacity-90 shrink-0"
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
            className={`rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shrink-0 ${
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

            {/* Menu Links with multi-level dropdown accordion support */}
            <div className="max-w-7xl w-full mx-auto my-auto py-6 max-h-[75vh] overflow-y-auto pr-2">
              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {data.links.map((link, idx) => (
                  <OverlayNavItem
                    key={link.name}
                    item={link}
                    idx={idx}
                    onClose={() => setIsOpen(false)}
                    isActive={isActive}
                  />
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
