'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioSectionData } from '../../types';
import FilterDropdown from '../../ui/FilterDropdown';

interface PortfolioProps {
  data: PortfolioSectionData;
  initialCount?: number;
  enableLightbox?: boolean;
  showReadMore?: boolean;
}

export default function Portfolio({
  data,
  initialCount,
  enableLightbox = false,
  showReadMore = false,
}: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(data.all_category_label);
  
  const defaultCount = useMemo(() => {
    return initialCount ?? (showReadMore ? (data.portfolio_page_count ?? 15) : (data.homepage_count ?? 5));
  }, [initialCount, showReadMore, data.portfolio_page_count, data.homepage_count]);

  const [visibleCount, setVisibleCount] = useState<number>(defaultCount);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === data.all_category_label) {
      return data.items;
    }
    const matching = data.items.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    return matching.length > 0 ? matching : data.items;
  }, [data.items, selectedCategory, data.all_category_label]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = showReadMore && visibleCount < filteredItems.length;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(defaultCount);
  };

  // Keyboard navigation for Lightbox Modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') setActiveItemIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    },
    [activeItemIndex, filteredItems.length]
  );

  useEffect(() => {
    if (activeItemIndex === null) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, handleKeyDown]);

  return (
    <section id="portfolio" className="relative w-full bg-white py-10 sm:py-14 lg:py-16 text-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header with compact spacing matching screenshot */}
        <div className="text-center max-w-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-[0.18em] text-[#1e1b18] font-normal"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-1.5 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#b59368] font-medium"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Filter Pills - Compact spacing matching screenshot */}
        <div className="mt-4 sm:mt-5 hidden md:flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {data.categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#8d7352] text-white shadow-sm font-medium'
                    : 'bg-[#f6f3ed] text-[#55524e] hover:bg-[#eae4d8] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown for Filters */}
        <div className="mt-4 md:hidden">
          <FilterDropdown
            options={data.categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            label={data.subtitle || data.title}
          />
        </div>

        {/* Portfolio Cards Grid matching screenshot */}
        <motion.div
          layout
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4"
        >
          <AnimatePresence>
            {displayedItems.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  if (enableLightbox) {
                    setActiveItemIndex(idx);
                  }
                }}
                className={`group relative aspect-[3/4.2] w-full overflow-hidden bg-[#e8e2d8] shadow-md shadow-black/5 ${
                  enableLightbox ? 'cursor-pointer' : ''
                }`}
                {...(enableLightbox ? { 'data-cursor': 'VIEW' } : {})}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Bottom Left Pill Tag (Static badge matching screenshot, non-clickable) */}
                <div className="absolute bottom-3.5 left-3.5 z-10 pointer-events-none select-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-black/75 backdrop-blur-sm text-[11px] font-semibold tracking-wider uppercase text-white shadow-sm">
                    <span>{item.tag}</span>
                    <span className="text-xs">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Read More / Load More Button for Portfolio Page */}
        {hasMore && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + (data.portfolio_page_count ?? 15))}
              className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 rounded-full bg-[#1e1b18] hover:bg-[#8d7352] text-white text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <span>{data.read_more_text || 'Read More'}</span>
              <span className="text-base leading-none">↓</span>
            </button>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {enableLightbox && activeItemIndex !== null && filteredItems[activeItemIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setActiveItemIndex(null)}
          >
            {/* Top Bar with Counter & Close */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c59b5f] font-semibold">
                  {data.lightbox_modal_title || 'AANYA SHARMA PORTFOLIO'}
                </span>
                <span className="text-white/40 text-xs">|</span>
                <span className="text-xs text-white/70 tracking-wider">
                  {activeItemIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemIndex(null);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label={data.lightbox_close_label || 'Close modal'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) =>
                  prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label={data.lightbox_prev_label || 'Previous image'}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image Modal */}
            <div
              className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[75vh]">
                <Image
                  src={filteredItems[activeItemIndex].image}
                  alt={filteredItems[activeItemIndex].image_alt || filteredItems[activeItemIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c59b5f] font-medium block">
                  {filteredItems[activeItemIndex].category}
                </span>
                <h4 className="text-sm sm:text-base font-serif text-white font-medium tracking-wide mt-0.5">
                  {filteredItems[activeItemIndex].title}
                </h4>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredItems.length : 0
                );
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label={data.lightbox_next_label || 'Next image'}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
