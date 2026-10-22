'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BlogDetailSectionData } from '../../types';

interface BlogDetailProps {
  data: BlogDetailSectionData;
}

export default function BlogDetail({ data }: BlogDetailProps) {
  return (
    <article className="relative w-full bg-white text-[#111111] pt-6 sm:pt-8 pb-5 sm:pb-7">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Article Meta Header matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-5 sm:mb-6"
        >
          {/* Category & Date */}
          <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#b88a44] mb-1.5 sm:mb-2">
            <span>{data.category}</span>
            <span className="mx-3 text-[#c59b5f]/60 font-light">|</span>
            <span className="text-[#88847e] font-normal">{data.date}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1e1b18] leading-[1.2] tracking-tight max-w-4xl mx-auto">
            {data.title}
          </h1>
        </motion.div>

        {/* Main Hero Image with reduced height, full width and object-top to prevent top cutoff */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[440px] overflow-hidden bg-[#e8e2d8] shadow-md mb-5 sm:mb-6"
        >
          <Image
            src={data.hero_image}
            alt={data.hero_alt || data.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1024px"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Intro Paragraph */}
        {data.intro && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base leading-relaxed text-[#55514c] mb-5 sm:mb-6 font-normal"
          >
            {data.intro}
          </motion.p>
        )}

        {/* Article Sections (1, 2, 3, 4) */}
        {data.sections && data.sections.length > 0 && (
          <div className="space-y-6 sm:space-y-7">
            {data.sections.map((section, idx) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Heading with gold line */}
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1e1b18] mb-1">
                  {section.number}. {section.title}
                </h2>
                <div className="w-10 h-[2px] bg-[#c59b5f] mb-2.5" />

                {/* Paragraph */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#55514c] mb-3 sm:mb-3.5">
                  {section.paragraph}
                </p>

                {/* Section Images matching layout */}
                {section.images && section.images.length > 0 && (
                  <>
                    {section.layout === 'full-width' || section.images.length === 1 ? (
                      <div className="relative aspect-[21/9] sm:aspect-[2.3/1] w-full overflow-hidden bg-[#e8e2d8] shadow-sm mt-3.5 sm:mt-4 mb-2">
                        <Image
                          src={section.images[0]}
                          alt={`${section.title} image`}
                          fill
                          sizes="(max-width: 1200px) 100vw, 1024px"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-3.5 sm:mt-4 mb-2">
                        {section.images.map((imgSrc, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e2d8] shadow-sm"
                          >
                            <Image
                              src={imgSrc}
                              alt={`${section.title} detail ${imgIdx + 1}`}
                              fill
                              sizes="(max-width: 640px) 100vw, 440px"
                              className="object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
