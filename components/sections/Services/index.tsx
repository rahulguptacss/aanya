'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ServicesSectionData } from '../../types';

interface ServicesProps {
  data: ServicesSectionData;
}

export default function Services({ data }: ServicesProps) {
  return (
    <section className="relative w-full bg-white pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 text-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-8"
        >
          {/* Thin gold accent lines flanking OUR */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70" />
            <span className="text-[11px] sm:text-[13px] tracking-[0.3em] uppercase text-[#c59b5f] font-medium">
              {data.eyebrow}
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.16em] uppercase text-[#1e1b18]">
            {data.title}
          </h2>
        </motion.div>

        {/* 2x2 Grid of Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-10">
          {data.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10.5] w-full overflow-hidden bg-[#e8e2d8] shadow-sm">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Floating White Label Box Overlapping Bottom Center */}
              <div className="relative -mt-7 sm:-mt-9 mx-auto w-[86%] sm:w-[82%] z-10 bg-white py-4 sm:py-5 px-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/[0.05] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-medium tracking-wide text-[#1e1b18]">
                  {item.title}
                </h3>
                <div className="w-8 h-[2px] bg-[#c59b5f] mx-auto mt-2.5 transition-all duration-300 group-hover:w-14" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
