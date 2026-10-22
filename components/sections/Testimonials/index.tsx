'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { TestimonialsSectionData } from '../../types';

// Safely register GSAP ScrollTrigger plugin on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialsProps {
  data: TestimonialsSectionData;
  className?: string;
}

export default function Testimonials({ data, className }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  useGSAP(
    () => {
      // Respect user's motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Desktop & Tablet (min-width: 1024px): GSAP Pinned Panels with Overscroll Pattern
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.testimonial-panel');
        if (panels.length === 0) return;

        // GSAP Pinned Panels with Overscroll Pattern:
        // Exclude the last panel from pinning so normal scrolling resumes smoothly into the next section
        const panelsToPin = panels.slice(0, -1);

        panelsToPin.forEach((panel, i) => {
          const innerCard = panel.querySelector<HTMLElement>('.testimonial-card-inner');
          const nextPanel = panels[i + 1];

          // Dynamic overscroll calculation if content is taller than viewport
          const panelHeight = innerCard ? innerCard.offsetHeight : panel.offsetHeight;
          const windowHeight = window.innerHeight;
          const difference = panelHeight - (windowHeight - 160);

          // Pinned Panel Timeline with smooth inertia scrub
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top top+=110',
              endTrigger: nextPanel,
              end: 'top top+=110',
              pin: true,
              pinSpacing: false,
              scrub: 1, // Smooth inertia scrub
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onEnter: () => setActiveCard(i),
              onEnterBack: () => setActiveCard(i),
              onLeave: () => setActiveCard(i + 1),
              onLeaveBack: () => setActiveCard(Math.max(0, i - 1)),
              onRefresh: () => {
                gsap.set(panel, {
                  transformOrigin: 'center center',
                });
              },
            },
          });

          // Overscroll Solution: scrub inner content smoothly if taller than viewport
          if (difference > 0 && innerCard) {
            tl.to(innerCard, {
              y: -difference - 24,
              ease: 'none',
            });
          }

          // Tactile depth: as the next panel slides over, softly scale & dim the pinned card
          if (innerCard) {
            tl.to(
              innerCard,
              {
                scale: 0.94,
                opacity: 0.35,
                y: -20,
                ease: 'power1.out',
              },
              difference > 0 ? '+=0.05' : 0
            );
          }
        });

        // Recalculate ScrollTrigger on window load to ensure all images are measured
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);

        return () => {
          window.removeEventListener('load', handleLoad);
        };
      });

      // Mobile View: clean progressive reveal without sticky pinning
      mm.add('(max-width: 1023px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.testimonial-panel');
        panels.forEach((panel, idx) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                toggleActions: 'play none none none',
                onEnter: () => setActiveCard(idx),
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`relative w-full bg-white text-[#111111] ${className || 'py-14 sm:py-20 lg:py-24'}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading with Gold Line (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            {/* Gold Line Accent matching screenshot */}
            <div className="w-12 h-[2px] bg-[#c59b5f] mb-6" />

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-light uppercase tracking-wider text-[#1e1b18] leading-[1.2]">
              {data.title_lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            {/* Active Card Progress Indicator */}
            <div className="hidden lg:flex flex-col gap-3 mt-10 pt-8 border-t border-black/[0.08]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium tracking-widest text-[#c59b5f]">
                  {`0${activeCard + 1}`}
                </span>
                <div className="w-20 h-[2px] bg-black/10 relative overflow-hidden">
                  <div
                    className="h-full bg-[#c59b5f] transition-all duration-300 ease-out"
                    style={{ width: `${((activeCard + 1) / data.items.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-medium tracking-widest text-[#88847e]">
                  {`0${data.items.length}`}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#88847e]">
                {data.scroll_hint || 'Scroll to explore stories'}
              </span>
            </div>
          </div>

          {/* Right Column: Pinned Panels with Overscroll (ONLY ON CARDS) */}
          <div className="lg:col-span-8 flex flex-col">
            {data.items.map((item, idx) => (
              <div
                key={item.id}
                className="testimonial-panel relative w-full mb-16 lg:mb-28 will-change-transform"
                style={{ zIndex: 10 + idx }}
              >
                {/* The card container matching the user screenshot */}
                <div className="testimonial-card-inner bg-white border border-black/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-10 lg:p-12 transition-shadow duration-300 will-change-transform">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Black & White Portrait */}
                    <div className="sm:col-span-5">
                      <div className="relative aspect-[3/4] w-full max-w-[280px] lg:max-w-[320px] mx-auto sm:mx-0 overflow-hidden bg-[#e8e2d8] shadow-md shadow-black/5">
                        <Image
                          src={item.image}
                          alt={item.image_alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover object-center zoom-effect"
                          priority={idx === 0}
                        />
                      </div>
                    </div>

                    {/* Right: Quote Content */}
                    <div className="sm:col-span-7 flex flex-col justify-center">
                      {/* Quote text with golden quotation marks matching screenshot */}
                      <blockquote className="text-lg sm:text-xl lg:text-[22px] font-serif italic text-[#1e1b18] leading-relaxed">
                        <span className="text-[#c59b5f] text-2xl lg:text-3xl font-serif font-bold mr-1 not-italic">
                          “
                        </span>
                        {item.quote}
                        <span className="text-[#c59b5f] text-2xl lg:text-3xl font-serif font-bold ml-1 not-italic">
                          ”
                        </span>
                      </blockquote>

                      {/* Gold Divider Line matching screenshot */}
                      <div className="w-8 h-px bg-[#c59b5f] my-5" />

                      {/* Author Meta matching screenshot */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1e1b18]">
                          {item.author}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] text-[#88847e] mt-1">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
