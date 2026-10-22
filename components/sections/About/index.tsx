'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';
import Counter from '../../ui/Counter';

interface AboutProps {
  data: AboutSectionData;
  hideStats?: boolean;
}

export default function About({ data, hideStats = false }: AboutProps) {
  return (
    <section id="about" className="relative w-full bg-[#fbf9f5] py-8 sm:py-12 lg:py-14 text-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Portrait Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[3/4] w-full max-w-[480px] mx-auto overflow-hidden shadow-2xl shadow-[#111111]/10 bg-[#e8e2d8]">
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center zoom-effect"
              />
            </div>
          </motion.div>

          {/* Right Column: Editorial Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow with gold accent bar */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#c59b5f]">
                {data.eyebrow}
              </span>
              <span className="w-8 h-px bg-[#c59b5f]" />
            </div>

            {/* Main Heading matching screenshot */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#1e1b18] leading-[1.15] font-normal mb-4">
              <span className="block">{data.title_line1}</span>
              <span className="block italic text-[#1e1b18]">{data.title_line2}</span>
            </h2>

            {/* Description Paragraphs */}
            {data.description_paragraphs && data.description_paragraphs.length > 0 ? (
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#55524e] font-light">
                {data.description_paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-base leading-relaxed text-[#55524e] font-light">
                {data.description}
              </p>
            )}

            {/* Stats Row (shown only when hideStats is false and stats exist) */}
            {!hideStats && data.stats && data.stats.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#e5dfd5] grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
                {data.stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${
                      idx > 0 ? 'border-l border-[#e5dfd5] pl-4 sm:pl-8' : ''
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-medium text-[#1e1b18] leading-none">
                      <Counter value={stat.value} duration={2} delay={idx * 0.15} />
                    </span>
                    <span className="mt-2 text-[11px] sm:text-xs tracking-wider uppercase text-[#736e67] font-medium leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
