'use client';

import { motion } from 'framer-motion';
import type { SkillsSectionData } from '../../types';

interface SkillsProps {
  data: SkillsSectionData;
}

export default function Skills({ data }: SkillsProps) {
  // Render exact high-fashion vector SVG icons matching user screenshot
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'brush':
        // Makeup Artistry (Angled cosmetic brush)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4.5 19.5l6.5-6.5" />
            <path d="M10 14l1.5-1.5" />
            <path d="M12.5 11.5c1-1 2.5-3.5 5.5-2.5 1 3-1.5 4.5-2.5 5.5l-3-3z" />
          </svg>
        );

      case 'camera':
        // Photoshoot Collaboration (Camera)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5L14.5 4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        );

      case 'hair':
        // Hair Styling (Woman silhouette with wavy hair)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5a4 4 0 0 1 4 4c0 1.5-.5 3-1 4.5-.5 1.5-1 3.5-1 5.5" />
            <path d="M12 5a4 4 0 0 0-4 4c0 1.5.5 3 1 4.5.5 1.5 1 3.5 1 5.5" />
            <path d="M7 9c-1 2-1.5 4-.5 6s3 2 3 5" />
            <path d="M17 9c1 2 1.5 4 .5 6s-3 2-3 5" />
            <path d="M9 5c1-1 2-1 3-1s2 0 3 1" />
          </svg>
        );

      case 'lotus':
        // Beauty Consultation (Lotus flower)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 4c-1.5 3-2 6-2 9a2 2 0 0 0 4 0c0-3-.5-6-2-9z" />
            <path d="M10 13c-2-2-4.5-3-7-2 1 3 3 5.5 6 6" />
            <path d="M14 13c2-2 4.5-3 7-2-1 3-3 5.5-6 6" />
            <path d="M7 17c3 2 7 2 10 0" />
          </svg>
        );

      case 'dress':
        // Fashion Styling (Flared dress)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 3l-1.5 5 2.5 1.5-2 11.5h8l-2-11.5 2.5-1.5L15 3" />
            <path d="M9 3c1.5 1.5 4.5 1.5 6 0" />
            <path d="M10 9.5h4" />
          </svg>
        );

      case 'users':
      default:
        // Client Communication (3 people)
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 sm:w-7 sm:h-7 stroke-[#9b7b48]"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="7" r="3" />
            <path d="M7.5 19v-2a4.5 4.5 0 0 1 9 0v2" />
            <circle cx="6" cy="9" r="2" />
            <path d="M3 19v-1.5a3.5 3.5 0 0 1 3.5-3.5" />
            <circle cx="18" cy="9" r="2" />
            <path d="M21 19v-1.5a3.5 3.5 0 0 0-3.5-3.5" />
          </svg>
        );
    }
  };

  return (
    <section className="relative w-full bg-[#fbf8f3] py-8 sm:py-12 lg:py-14 text-[#111111] border-t border-black/[0.05]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Header matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Eyebrow: —— SKILLS —— */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-10 sm:w-12 h-px bg-[#b89562]" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#b89562]">
              {data.eyebrow}
            </span>
            <span className="w-10 sm:w-12 h-px bg-[#b89562]" />
          </div>

          {/* Heading: My Professional Skills */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif text-[#1e1b18] leading-[1.15] font-normal mb-2">
            <span>{data.title_regular} </span>
            <span className="italic text-[#b89562] font-serif">{data.title_highlight}</span>
          </h2>

          {/* Subtitle matching screenshot */}
          <p className="mt-2 text-xs sm:text-[13px] md:text-sm text-[#4a4742] font-sans font-normal max-w-xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* 2-Column x 3-Row Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-5 sm:gap-y-6 max-w-5xl mx-auto">
          {data.items.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex items-center gap-4 sm:gap-5"
            >
              {/* Circular Icon Badge matching screenshot */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f2ebd9] border border-[#d9ccb8]/70 flex items-center justify-center shrink-0 shadow-xs">
                {renderSkillIcon(skill.icon)}
              </div>

              {/* Title, Percentage & Progress Bar */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-serif text-lg sm:text-[19px] text-[#1e1b18] font-normal tracking-wide">
                    {skill.name}
                  </span>
                  <span className="font-serif text-[15px] sm:text-[17px] text-[#1e1b18] font-medium">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar Track matching screenshot */}
                <div className="w-full h-[6px] sm:h-[7px] bg-[#eae3d6] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 + idx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full bg-[#a8834c] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
