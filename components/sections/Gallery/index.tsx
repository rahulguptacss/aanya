'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GallerySectionData } from '../../types';

interface GalleryProps {
  data: GallerySectionData;
}

export default function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery" className="relative w-full bg-[#111111] overflow-hidden">
      {/* 7 Edge-to-Edge Portrait Images Strip matching screenshot */}
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
              className="group relative aspect-[9/16] last:col-span-2 sm:last:col-span-1 last:aspect-[16/9] sm:last:aspect-[9/16] w-full overflow-hidden bg-[#222222]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 15vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
