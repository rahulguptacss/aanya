'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, NavItem } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

/** Desktop Navigation Item — handles standard link, Level 1 dropdown, and Level 2 nested dropdown flyouts */
function DesktopNavItem({
  item,
  active,
  isActive,
}: {
  item: NavItem;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const hasChildren = Boolean(item.children && item.children.length > 0);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`relative py-1 text-[12.5px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 ${
          active ? 'text-[#c59b5f]' : 'text-white/80 hover:text-[#c59b5f]'
        }`}
      >
        {item.name}
        {active && (
          <motion.span
            layoutId="aanya-desktop-active"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#c59b5f]"
          />
        )}
      </Link>
    );
  }

  return (
    <div className="group/nav relative inline-block">
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1.5 py-1 text-[12.5px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 ${
          active ? 'text-[#c59b5f]' : 'text-white/80 hover:text-[#c59b5f]'
        }`}
      >
        <span>{item.name}</span>
        <ChevronDown className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/nav:rotate-180" />
        {active && (
          <motion.span
            layoutId="aanya-desktop-active"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#c59b5f]"
          />
        )}
      </Link>

      {/* Level 1 Dropdown Menu */}
      <div className="pointer-events-none absolute left-0 top-full pt-3 opacity-0 translate-y-2 transition-all duration-200 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-hover/nav:translate-y-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-y-0 z-50">
        <div className="min-w-[230px] rounded-xl border border-white/10 bg-[#121110]/95 backdrop-blur-xl p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
          <ul className="space-y-0.5">
            {item.children?.map((sub) => {
              const hasSubChildren = Boolean(sub.children && sub.children.length > 0);
              const isSubActive = isActive(sub.href);

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className={`block rounded-lg px-3.5 py-2.5 text-[12px] uppercase tracking-[0.16em] font-medium transition-colors ${
                        isSubActive ? 'bg-[#c59b5f]/15 text-[#c59b5f]' : 'text-white/80 hover:bg-white/5 hover:text-[#c59b5f]'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                );
              }

              // Level 2: Nested dropdown flyout
              return (
                <li key={sub.name} className="group/sub relative">
                  <Link
                    href={sub.href}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[12px] uppercase tracking-[0.16em] font-medium transition-colors ${
                      isSubActive ? 'bg-[#c59b5f]/15 text-[#c59b5f]' : 'text-white/80 hover:bg-white/5 hover:text-[#c59b5f]'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/sub:translate-x-0.5" />
                  </Link>

                  {/* Level 2 Sub-Dropdown Card */}
                  <div className="pointer-events-none absolute left-full top-0 pl-2 opacity-0 translate-x-2 transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:opacity-100 group-hover/sub:translate-x-0 focus-within:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 z-50">
                    <div className="min-w-[210px] rounded-xl border border-white/10 bg-[#121110]/95 backdrop-blur-xl p-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
                      <ul className="space-y-0.5">
                        {sub.children?.map((nested) => (
                          <li key={nested.name}>
                            <Link
                              href={nested.href}
                              className={`block rounded-lg px-3.5 py-2 text-[11.5px] uppercase tracking-[0.16em] font-medium transition-colors ${
                                isActive(nested.href) ? 'bg-[#c59b5f]/15 text-[#c59b5f]' : 'text-white/70 hover:bg-white/5 hover:text-[#c59b5f]'
                              }`}
                            >
                              {nested.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Overlay Menu Item — handles standard link, Level 1 accordion, and Level 2 nested accordion */
function OverlayNavItem({
  item,
  idx,
  onClose,
}: {
  item: NavItem;
  idx: number;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const hasChildren = Boolean(item.children && item.children.length > 0);

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
          className="group flex items-center justify-between text-3xl sm:text-5xl md:text-6xl font-serif text-white hover:text-[#c59b5f] transition-colors duration-200 py-1"
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
      <div className="group flex items-center justify-between py-1">
        <Link
          href={item.href}
          onClick={onClose}
          className="text-3xl sm:text-5xl md:text-6xl font-serif text-white hover:text-[#c59b5f] transition-colors duration-200 flex-1"
        >
          <span className="transition-transform duration-200 group-hover:translate-x-2">
            {item.name}
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={`Toggle ${item.name} sub-menu`}
          aria-expanded={expanded}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all cursor-pointer"
        >
          <ChevronDown
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
              expanded ? 'rotate-180 text-[#c59b5f]' : ''
            }`}
          />
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

              if (!hasSubChildren) {
                return (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className="group flex items-center justify-between text-xl sm:text-2xl md:text-3xl font-serif text-white/85 hover:text-[#c59b5f] transition-colors duration-200 py-1"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                        {sub.name}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c59b5f]" />
                    </Link>
                  </li>
                );
              }

              // Level 2 inside overlay accordion
              return (
                <li key={sub.name} className="flex flex-col">
                  <div className="flex items-center justify-between py-1">
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className="text-xl sm:text-2xl md:text-3xl font-serif text-white/85 hover:text-[#c59b5f] transition-colors duration-200 flex-1"
                    >
                      {sub.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleSub(sub.name)}
                      aria-label={`Toggle ${sub.name} nested menu`}
                      aria-expanded={isSubOpen}
                      className="p-2 text-white/70 hover:text-[#c59b5f] cursor-pointer"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSubOpen ? 'rotate-180 text-[#c59b5f]' : ''
                        }`}
                      />
                    </button>
                  </div>

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
                              className="block text-base sm:text-lg font-serif text-white/70 hover:text-[#c59b5f] transition-colors duration-200 py-1"
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

          {/* Desktop inline navbar with multi-level dropdown support */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
            {data.links.map((link) => (
              <DesktopNavItem
                key={link.name}
                item={link}
                active={isActive(link.href)}
                isActive={isActive}
              />
            ))}
          </nav>

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
