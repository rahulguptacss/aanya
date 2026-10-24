'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { GallerySectionData } from '../../types';

interface GalleryProps {
  data: GallerySectionData;
}

export default function Gallery({ data }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const total = data.items.length;

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev !== null ? (prev + 1) % total : 0));
  }, [total]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  // Keyboard navigation & body scroll locking for Lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIdx, handleClose, handlePrev, handleNext]);

  return (
    <section id="gallery" className="relative w-full bg-[#111111] overflow-hidden">
      {/* 7 Edge-to-Edge Portrait Images Strip */}
      <div className="w-full">
        {/* Desktop / Tablet 7-column layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1 sm:gap-1.5 p-1 sm:p-1.5">
          {data.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => setActiveIdx(idx)}
              data-cursor="VIEW"
              className="group relative aspect-[9/16] last:col-span-2 sm:last:col-span-1 last:aspect-[16/9] sm:last:aspect-[9/16] w-full overflow-hidden bg-[#222222] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 15vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Subtle hover overlay with gold zoom icon */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/70 border border-[#c59b5f]/70 text-[#c59b5f] flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                  <ZoomIn className="w-5 h-5 stroke-[1.8]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LUXURY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeIdx !== null && data.items[activeIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 select-none"
            onClick={handleClose}
          >
            {/* Top Bar with Counter & Close */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c59b5f] font-semibold">
                  AANYA SHARMA GALLERY
                </span>
                <span className="text-white/40 text-xs">|</span>
                <span className="text-xs text-white/70 tracking-wider">
                  {activeIdx + 1} / {total}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#c59b5f] text-white hover:text-[#c59b5f] flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Previous Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-[#c59b5f]/20 border border-white/20 hover:border-[#c59b5f] text-white hover:text-[#c59b5f] flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Active Image Container */}
            <div
              className="relative max-w-4xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full max-h-[72vh] flex items-center justify-center"
                >
                  <Image
                    src={data.items[activeIdx].image}
                    alt={data.items[activeIdx].alt}
                    fill
                    sizes="100vw"
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-sm sm:text-base font-serif text-white/90 font-medium tracking-wide">
                  {data.items[activeIdx].alt}
                </p>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-[#c59b5f]/20 border border-white/20 hover:border-[#c59b5f] text-white hover:text-[#c59b5f] flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
