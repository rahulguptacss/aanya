'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <section id="blog-list-section" className="relative w-full bg-[#fdfbf7] pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-14 lg:pb-16 text-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-8"
        >
          {/* Eyebrow with gold divider lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
            <span className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70" />
            <span className="text-[11px] sm:text-[13px] tracking-[0.3em] uppercase text-[#c59b5f] font-medium">
              {data.eyebrow}
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-[#c59b5f]/70" />
          </div>

          {/* Heading with italic gold highlight */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1e1b18] mb-2">
            <span>{data.title_regular}</span>
            <span className="italic font-serif text-[#b88a44] ml-1.5">
              {data.title_highlight}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#66615b] max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Grid of Blog Cards matching screenshot */}
        <div key={`page-${currentPage}`} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-10">
          {visiblePosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col"
            >
              {/* Image Frame */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8e2d8] shadow-sm block"
              >
                <Image
                  src={post.image}
                  alt={post.alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </Link>

              {/* Content Body matching screenshot */}
              <div className="pt-4 sm:pt-4.5 flex flex-col flex-1">
                {/* Meta Row: Star + Category (left) | Date (right) with subtle border divider */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-black/[0.08] mb-3.5">
                  <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] font-semibold text-[#a07844] text-[11px] sm:text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#a07844] text-[#a07844]" />
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

                {/* Read More Button matching screenshot */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/btn inline-flex items-center gap-2.5 self-start text-[13.5px] sm:text-sm font-semibold text-[#5c4327] hover:text-[#a07844] transition-colors pt-0.5"
                >
                  <span>{data.read_more_text || 'Read More'}</span>
                  <span className="w-[26px] h-[26px] rounded-full bg-[#946b38] text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:bg-[#a6773e] shrink-0">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination matching screenshot with Prev and Next */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className={`w-10 h-10 flex items-center justify-center bg-white text-[#1e1b18] border border-black/15 transition-all duration-200 ${
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#967040] hover:text-[#967040] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`w-10 h-10 flex items-center justify-center font-medium text-sm transition-all duration-200 cursor-pointer ${
                currentPage === page
                  ? 'bg-[#967040] text-white border border-[#967040] shadow-sm'
                  : 'bg-white text-[#1e1b18] border border-black/15 hover:border-[#967040] hover:text-[#967040]'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className={`w-10 h-10 flex items-center justify-center bg-white text-[#1e1b18] border border-black/15 transition-all duration-200 ${
              currentPage >= totalPages
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#967040] hover:text-[#967040] cursor-pointer'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
