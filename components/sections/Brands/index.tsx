'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BrandsSectionData } from '../../types';

interface BrandsProps {
  data: BrandsSectionData;
}

export default function Brands({ data }: BrandsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [gapSize, setGapSize] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  // Quadruple items to ensure seamless, long-running infinite sliding
  const displayItems = useMemo(() => {
    if (!data?.items?.length) return [];
    return [
      ...data.items,
      ...data.items,
      ...data.items,
      ...data.items,
    ];
  }, [data?.items]);

  // Calculate responsive visibleCount, gap, and stepWidth in pixels
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const screenWidth = window.innerWidth;

    let count = 6;
    let gap = 12;

    if (screenWidth < 640) {
      count = 2;
      gap = 8;
    } else if (screenWidth < 768) {
      count = 3;
      gap = 10;
    } else if (screenWidth < 1024) {
      count = 4;
      gap = 10;
    } else {
      count = 6;
      gap = 12;
    }

    setVisibleCount(count);
    setGapSize(gap);
    // Exact step = (containerWidth + gap) / count
    const step = (width + gap) / count;
    setStepWidth(step);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const maxIndex = Math.max(0, displayItems.length - visibleCount);

  // Next Slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  }, [maxIndex]);

  // Previous Slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  }, [maxIndex]);

  // Automatic sliding (auto-slides every 2.2 seconds continuously)
  useEffect(() => {
    if (stepWidth === 0 || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2200);
    return () => clearInterval(interval);
  }, [stepWidth, isHovered, handleNext]);

  return (
    <section className="relative w-full bg-[#fbf8f3] py-8 sm:py-10 lg:py-12 text-[#111111] overflow-hidden border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Section with tight, compact screenshot spacing */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Eyebrow: —— WE ARE EXPERIENCED —— */}
          <div className="flex items-center justify-center gap-3 sm:gap-3.5 mb-2">
            <span className="w-8 sm:w-10 h-px bg-[#b89562]/80" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-[#a88452]">
              {data.eyebrow}
            </span>
            <span className="w-8 sm:w-10 h-px bg-[#b89562]/80" />
          </div>

          {/* Heading: With Leading Brands */}
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif text-[#1e1b18] leading-[1.15] mb-2 tracking-tight">
            <span className="font-normal">{data.title_regular} </span>
            <span className="italic font-serif font-normal text-[#a6824f]">
              {data.title_highlight}
            </span>
          </h2>

          {/* Subtitle paragraph */}
          <p className="text-xs sm:text-[13px] md:text-sm text-[#5c5852] font-normal leading-relaxed max-w-xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Carousel Row with Prev and Next buttons */}
        <div
          className="relative flex items-center gap-2 sm:gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous brand logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#d8cfc4] bg-[#fbf8f3] hover:bg-white text-[#4a463f] hover:text-[#111111] flex items-center justify-center transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md shrink-0 focus:outline-none focus:ring-1 focus:ring-[#a88452] active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
          </button>

          {/* Slider Viewport */}
          <div ref={containerRef} className="w-full overflow-hidden py-1">
            <motion.div
              className="flex"
              style={{ gap: `${gapSize}px` }}
              animate={{
                x: stepWidth > 0 ? -currentIndex * stepWidth : 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {displayItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    flex: `0 0 calc(${100 / visibleCount}% - ${
                      ((visibleCount - 1) * gapSize) / visibleCount
                    }px)`,
                  }}
                  className="bg-white border border-[#e8dfd2] rounded-none h-[80px] sm:h-[88px] lg:h-[94px] flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 hover:border-[#b89562]/60 hover:shadow-sm group cursor-pointer select-none"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={170}
                      height={65}
                      className="max-h-7 sm:max-h-8 lg:max-h-9 w-auto max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                      priority={idx < 6}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next brand logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#d8cfc4] bg-[#fbf8f3] hover:bg-white text-[#4a463f] hover:text-[#111111] flex items-center justify-center transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md shrink-0 focus:outline-none focus:ring-1 focus:ring-[#a88452] active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
