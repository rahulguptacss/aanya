'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { BlogListSectionData } from '../../types';

interface BlogListProps {
  data: BlogListSectionData;
}

export default function BlogList({ data }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(data.posts.length / postsPerPage));

  // Visible posts for current page (exactly 6 per page)
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = data.posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById('blog-list-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog-list-section" className="relative w-full bg-[#fdfbf7] pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 text-[#111111] overflow-hidden">
      {/* Subtle luxury ambient glow in background */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-[#c59b5f]/[0.05] via-[#c59b5f]/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animated gold lines & reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-7 sm:mb-10"
        >
          {/* Eyebrow with expanding gold divider lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70 origin-right"
            />
            <span className="text-[11px] sm:text-[13px] tracking-[0.3em] uppercase text-[#c59b5f] font-medium">
              {data.eyebrow}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70 origin-left"
            />
          </div>

          {/* Heading with italic gold highlight */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1e1b18] mb-2.5">
            <span>{data.title_regular}</span>
            <span className="italic font-serif text-[#b88a44] ml-2">
              {data.title_highlight}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#66615b] max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Grid of Blog Cards with AnimatePresence Page Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`blog-page-${currentPage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-9 sm:gap-y-12"
          >
            {visiblePosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col transition-transform duration-300"
              >
                {/* Image Frame with Shimmer & Zoom */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e2d8] shadow-sm rounded-[2px] block group-hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={post.image}
                    alt={post.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Luxury soft dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                </Link>

                {/* Content Body */}
                <div className="pt-4 sm:pt-4.5 flex flex-col flex-1">
                  {/* Meta Row: Star + Category | Date */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-black/[0.08] mb-3.5">
                    <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] font-semibold text-[#a07844] text-[11px] sm:text-xs transition-colors duration-200 group-hover:text-[#8a6130]">
                      <Star className="w-3.5 h-3.5 fill-[#a07844] text-[#a07844] transition-transform duration-300 group-hover:scale-110" />
                      <span>{post.category}</span>
                    </span>
                    <time className="text-[#77726b] text-xs font-normal">
                      {post.date}
                    </time>
                  </div>

                  {/* Title in Serif Italic */}
                  <h3 className="font-serif italic font-normal text-2xl sm:text-[26px] md:text-[28px] text-[#1c1917] group-hover:text-[#a07844] transition-colors duration-200 line-clamp-2 leading-[1.25] tracking-tight mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[13.5px] sm:text-sm text-[#6b665f] leading-[1.65] line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read More Button with Smooth Arrow Slide */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/btn inline-flex items-center gap-2.5 self-start text-[13.5px] sm:text-sm font-semibold text-[#5c4327] hover:text-[#a07844] transition-colors pt-0.5"
                  >
                    <span>{data.read_more_text || 'Read More'}</span>
                    <span className="w-[26px] h-[26px] rounded-full bg-[#946b38] text-white flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-1.5 group-hover/btn:bg-[#a6773e] group-hover/btn:shadow-[0_2px_8px_rgba(166,119,62,0.4)] shrink-0">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination with Smooth Micro-Interactions */}
        <div className="mt-9 sm:mt-12 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <motion.button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            whileHover={currentPage > 1 ? { scale: 1.06, y: -1 } : {}}
            whileTap={currentPage > 1 ? { scale: 0.94 } : {}}
            aria-label="Previous page"
            className={`w-10 h-10 flex items-center justify-center bg-white text-[#1e1b18] border border-black/15 transition-all duration-200 rounded-[2px] ${
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#967040] hover:text-[#967040] shadow-xs cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.94 }}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`w-10 h-10 flex items-center justify-center font-medium text-sm transition-all duration-200 cursor-pointer rounded-[2px] ${
                currentPage === page
                  ? 'bg-[#967040] text-white border border-[#967040] shadow-md shadow-[#967040]/25'
                  : 'bg-white text-[#1e1b18] border border-black/15 hover:border-[#967040] hover:text-[#967040] shadow-xs'
              }`}
            >
              {page}
            </motion.button>
          ))}

          {/* Next Button */}
          <motion.button
            type="button"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            whileHover={currentPage < totalPages ? { scale: 1.06, y: -1 } : {}}
            whileTap={currentPage < totalPages ? { scale: 0.94 } : {}}
            aria-label="Next page"
            className={`w-10 h-10 flex items-center justify-center bg-white text-[#1e1b18] border border-black/15 transition-all duration-200 rounded-[2px] ${
              currentPage >= totalPages
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#967040] hover:text-[#967040] shadow-xs cursor-pointer'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
