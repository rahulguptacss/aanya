'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { MissionSectionData } from '../../types';

interface MissionProps {
  data: MissionSectionData;
}

export default function Mission({ data }: MissionProps) {
  return (
    <section className="relative w-full bg-[#fbf9f5] py-8 sm:py-10 lg:py-12 text-[#111111] overflow-hidden border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Mission Text (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Eyebrow with gold accent bar */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c59b5f]">
                {data.eyebrow}
              </span>
              <span className="w-8 h-px bg-[#c59b5f]" />
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-[#1e1b18] leading-[1.18] mb-3.5">
              <span className="block">{data.title_regular}</span>
              <span className="block italic text-gold-gradient font-serif">
                {data.title_highlight}
              </span>
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#55524e] leading-relaxed font-light">
              {data.description}
            </p>
          </motion.div>

          {/* Mission Image - Arched Top matching screenshot (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center order-1 lg:order-2"
          >
            <div className="relative aspect-[3/4] w-full max-w-[380px] sm:max-w-[420px] rounded-t-full overflow-hidden bg-[#e8e2d8] shadow-2xl shadow-black/15 ring-1 ring-black/5">
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center zoom-effect"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
