'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { PortfolioGridSectionData, PortfolioGridItem } from '../../types';

interface PortfolioGridProps {
  data: PortfolioGridSectionData;
}

export default function PortfolioGrid({ data }: PortfolioGridProps) {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const items = data.items;

  // Find items by ID or index for deterministic placement
  const itemMap = new Map<string, PortfolioGridItem>();
  items.forEach((item) => itemMap.set(item.id, item));

  const getItem = (id: string, fallbackIdx: number): PortfolioGridItem => {
    return itemMap.get(id) ?? items[fallbackIdx] ?? items[0];
  };

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') setActiveItemIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null ? (prev - 1 + items.length) % items.length : null
        );
      }
    },
    [activeItemIndex, items.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (item: PortfolioGridItem) => {
    const idx = items.findIndex((i) => i.id === item.id);
    setActiveItemIndex(idx >= 0 ? idx : 0);
  };

  // Reusable Image Card Component
  const PhotoCard = ({
    item,
    className = '',
    priority = false,
  }: {
    item: PortfolioGridItem;
    className?: string;
    priority?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => openLightbox(item)}
      className={`group relative overflow-hidden bg-[#e8e2d8] cursor-pointer ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={item.image}
          alt={item.alt || item.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Luxury Vignette & Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#c59b5f] block">
                {item.category}
              </span>
              <p className="text-xs sm:text-sm font-serif text-white font-medium line-clamp-1 drop-shadow-sm">
                {item.title}
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative w-full bg-white py-3 sm:py-5 lg:py-6 text-[#111111] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-3 md:px-4">
        {/* DESKTOP EDITORIAL COLLAGE (>= 1024px) */}
        <div className="hidden lg:flex flex-col gap-2">
          {/* Top Row: Left Wide (p-1) + Right Straw Hat (p-2) */}
          <div className="grid grid-cols-12 gap-2">
            {/* p-1: Top Wide White Sweater (spans cols 1-7 or width ~62.5%) */}
            <div className="col-span-8 h-[270px] xl:h-[300px]">
              <PhotoCard item={getItem('p-1', 0)} className="w-full h-full" priority={true} />
            </div>

            {/* p-2: Top Right Straw Hat (spans cols 8-12, height matches top + overlaps downward) */}
            <div className="col-span-4 h-[410px] xl:h-[450px]">
              <PhotoCard item={getItem('p-2', 1)} className="w-full h-full" priority={true} />
            </div>
          </div>

          {/* Main Grid Below: Left Rail (8 Items) + Center/Right Layout */}
          <div className="grid grid-cols-12 gap-2 -mt-[132px] xl:-mt-[142px]">
            {/* Left Rail: 8 Stacked Portrait Shots (spans 3 cols or width ~27%) */}
            <div className="col-span-3 flex flex-col gap-2">
              <div className="h-[185px]">
                <PhotoCard item={getItem('p-3', 2)} className="w-full h-full" />
              </div>
              <div className="h-[215px]">
                <PhotoCard item={getItem('p-4', 3)} className="w-full h-full" />
              </div>
              <div className="h-[285px]">
                <PhotoCard item={getItem('p-5', 4)} className="w-full h-full" />
              </div>
              <div className="h-[260px]">
                <PhotoCard item={getItem('p-6', 5)} className="w-full h-full" />
              </div>
              <div className="h-[220px]">
                <PhotoCard item={getItem('p-7', 6)} className="w-full h-full" />
              </div>
              <div className="h-[200px]">
                <PhotoCard item={getItem('p-8', 7)} className="w-full h-full" />
              </div>
              <div className="h-[235px]">
                <PhotoCard item={getItem('p-9', 8)} className="w-full h-full" />
              </div>
              <div className="h-[270px]">
                <PhotoCard item={getItem('p-10', 9)} className="w-full h-full" />
              </div>
            </div>

            {/* Center & Right Block (spans remaining 9 cols) */}
            <div className="col-span-9 flex flex-col gap-2">
              {/* Row 1: Sunset Beach (Left, p-11) & Champagne Gown (Right, p-12) */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 h-[255px]">
                  <PhotoCard item={getItem('p-11', 10)} className="w-full h-full" />
                </div>
                <div className="col-span-5 h-[255px]">
                  <PhotoCard item={getItem('p-12', 11)} className="w-full h-full" />
                </div>
              </div>

              {/* Row 2: Black Blazer (Left, p-13) & Lavender Field (Right, p-14) */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 h-[290px]">
                  <PhotoCard item={getItem('p-13', 12)} className="w-full h-full" />
                </div>
                <div className="col-span-6 h-[290px]">
                  <PhotoCard item={getItem('p-14', 13)} className="w-full h-full" />
                </div>
              </div>

              {/* Row 3: Bed Knit Sweater (Left, p-15) & Beach Swimsuit (Right, p-16) */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 h-[305px]">
                  <PhotoCard item={getItem('p-15', 14)} className="w-full h-full" />
                </div>
                <div className="col-span-6 h-[305px]">
                  <PhotoCard item={getItem('p-16', 15)} className="w-full h-full" />
                </div>
              </div>

              {/* Row 4: HERO Crimson Red Ballgown on Palace Steps (Full Width of Block, p-17) */}
              <div className="w-full h-[580px] xl:h-[630px]">
                <PhotoCard item={getItem('p-17', 16)} className="w-full h-full" />
              </div>

              {/* Row 5: White Roses Bridal (Left, p-18) & Pink Tulle Sunset (Right, p-19) */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5 h-[415px]">
                  <PhotoCard item={getItem('p-18', 17)} className="w-full h-full" />
                </div>
                <div className="col-span-7 h-[415px]">
                  <PhotoCard item={getItem('p-19', 18)} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLET & MOBILE RESPONSIVE MASONRY/GRID (< 1024px) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:hidden">
          {items.map((item, idx) => {
            // Give hero items larger spanning for editorial feel on mobile
            const isFullWidth = item.id === 'p-1' || item.id === 'p-17';
            return (
              <div
                key={item.id}
                className={`${isFullWidth ? 'col-span-2 sm:col-span-2 md:col-span-2' : 'col-span-1'
                  } ${isFullWidth
                    ? 'h-[220px] sm:h-[300px]'
                    : idx % 3 === 0
                      ? 'h-[240px] sm:h-[280px]'
                      : 'h-[190px] sm:h-[230px]'
                  }`}
              >
                <PhotoCard item={item} className="w-full h-full" priority={idx < 4} />
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeItemIndex !== null && (
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
                  AANYA SHARMA PORTFOLIO
                </span>
                <span className="text-white/40 text-xs">|</span>
                <span className="text-xs text-white/70 tracking-wider">
                  {activeItemIndex + 1} / {items.length}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveItemIndex(null);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) =>
                  prev !== null ? (prev - 1 + items.length) % items.length : 0
                );
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Previous image"
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
                  src={items[activeItemIndex].image}
                  alt={items[activeItemIndex].alt || items[activeItemIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c59b5f] font-medium block">
                  {items[activeItemIndex].category}
                </span>
                <h4 className="text-sm sm:text-base font-serif text-white font-medium tracking-wide mt-0.5">
                  {items[activeItemIndex].title}
                </h4>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveItemIndex((prev) =>
                  prev !== null ? (prev + 1) % items.length : 0
                );
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
