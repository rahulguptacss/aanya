'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { BreadcrumbData, BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  data: BreadcrumbData;
  currentPage?: string;
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ data, currentPage, items: customItems }: BreadcrumbProps) {
  const rootItem = data.items?.[0] ?? { name: 'Home', href: '/' };
  const breadcrumbItems: BreadcrumbItem[] =
    customItems ??
    (currentPage
      ? [
          rootItem,
          { name: currentPage, href: '#' },
        ]
      : data.items.length > 1
      ? data.items
      : [
          rootItem,
          { name: data.title || 'Page', href: '#' },
        ]);

  return (
    <section className="relative w-full h-[320px] sm:h-[360px] lg:h-[420px] overflow-hidden flex items-end justify-center pb-6 sm:pb-10 bg-[#0c1f17]">
      {/* Background Banner Image - Formatted to frame model on mobile & desktop */}
      <div className="absolute inset-0">
        <Image
          src={data.background_image}
          alt={data.background_alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[84%_18%] sm:object-[82%_22%] lg:object-center"
        />
        {/* Subtle Luxury Gradient Overlay for header & breadcrumb legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/35" />
      </div>

      {/* Floating Centered Breadcrumb Capsule */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-xl px-4 flex justify-center"
      >
        <div className="w-auto inline-flex items-center justify-center bg-white/95 backdrop-blur-md px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg shadow-xl border border-black/[0.06] text-xs sm:text-sm tracking-[0.16em] uppercase font-medium">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <span key={item.name + index} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-2 sm:mx-2.5 text-[#c59b5f] font-light">/</span>
                )}
                {isLast ? (
                  <span className="text-[#c59b5f] font-semibold">{item.name}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#111111] hover:text-[#c59b5f] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
