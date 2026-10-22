'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="relative w-full h-[80svh] sm:h-[88svh] lg:h-[100svh] min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-[#1a1714] text-white">
      {/* Background Photography positioned to frame model on mobile & desktop matching screenshot */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.background_image}
          alt={data.background_alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[73%_15%] sm:object-[76%_20%] md:object-[82%_24%] lg:object-[86%_25%]"
        />
        {/* Subtle gradient: top gradient for header & bottom gradient for title legibility on mobile, left-to-right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 lg:bg-gradient-to-r lg:from-black/45 lg:via-black/15 lg:to-transparent" />
      </div>

      {/* Hero Content: On mobile positioned at bottom center; on desktop vertically centered & left-aligned */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-end lg:justify-center items-center lg:items-start pb-8 sm:pb-12 md:pb-14 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl select-none flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Main Title matching typography & positioning */}
          <h1 className="font-serif uppercase text-white leading-[0.88] tracking-[0.02em] text-center lg:text-left">
            <span className="block text-[3.2rem] sm:text-[4.8rem] md:text-[6.8rem] lg:text-[9.5rem] xl:text-[10.5rem] font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              {data.title_first}
            </span>
            <span className="block text-[3.2rem] sm:text-[4.8rem] md:text-[6.8rem] lg:text-[9.5rem] xl:text-[10.5rem] font-normal tracking-[0.02em] -mt-1 sm:-mt-2 md:-mt-4 lg:-mt-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              {data.title_last}
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
