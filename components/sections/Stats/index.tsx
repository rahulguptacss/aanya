'use client';

import { motion } from 'framer-motion';
import type { StatsSectionData } from '../../types';
import Counter from '../../ui/Counter';

interface StatsProps {
  data: StatsSectionData;
}

export default function Stats({ data }: StatsProps) {
  return (
    <section className="relative w-full bg-white py-14 sm:py-16 border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {data.items.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col items-center justify-center text-center py-4 ${
                idx !== data.items.length - 1 ? 'lg:border-r lg:border-black/10' : ''
              } ${idx % 2 === 0 ? 'border-r border-black/10 lg:border-r' : ''}`}
            >
              <span className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-light text-[#1e1b18] tracking-tight leading-none">
                <Counter value={stat.value} duration={2} delay={idx * 0.1} />
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-[#77746e] mt-3">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
