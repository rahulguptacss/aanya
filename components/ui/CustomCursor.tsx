'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ringInnerRef.current;
    const dotInner = dotInnerRef.current;
    const badge = badgeRef.current;
    if (!dot || !ring || !ringInner || !dotInner) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let isClicked = false;
    let currentBadgeText = '';
    let rafId: number;

    // State tracking to prevent redundant DOM updates
    let prevHovered = false;
    let prevClicked = false;
    let prevBadgeText = '';

    const updateVisualState = (force = false) => {
      const hasText = Boolean(currentBadgeText);
      if (
        !force &&
        prevHovered === isHovered &&
        prevClicked === isClicked &&
        prevBadgeText === currentBadgeText
      ) {
        return;
      }

      prevHovered = isHovered;
      prevClicked = isClicked;
      prevBadgeText = currentBadgeText;

      if (isClicked) {
        ringInner.style.transform = hasText ? 'scale(1.4)' : isHovered ? 'scale(1.2)' : 'scale(0.85)';
        dotInner.style.transform = 'scale(0.5)';
      } else if (hasText) {
        ringInner.style.transform = 'scale(1.75)';
        ringInner.style.borderColor = '#c59b5f';
        ringInner.style.backgroundColor = 'rgba(197, 155, 95, 0.22)';
        dotInner.style.transform = 'scale(0)';
      } else if (isHovered) {
        ringInner.style.transform = 'scale(1.35)';
        ringInner.style.borderColor = '#c59b5f';
        ringInner.style.backgroundColor = 'rgba(197, 155, 95, 0.12)';
        dotInner.style.transform = 'scale(0.6)';
      } else {
        ringInner.style.transform = 'scale(1)';
        ringInner.style.borderColor = 'rgba(197, 155, 95, 0.45)';
        ringInner.style.backgroundColor = 'rgba(197, 155, 95, 0.04)';
        dotInner.style.transform = 'scale(1)';
      }

      if (badge) {
        badge.textContent = currentBadgeText;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Zero-latency hardware tracking for the precision dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseDown = () => {
      isClicked = true;
      updateVisualState();
    };

    const onMouseUp = () => {
      isClicked = false;
      updateVisualState();
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // When over form inputs, hide custom cursor to let native I-beam cursor shine
      if (target.closest('input, textarea, select')) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        return;
      } else if (isVisible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      const interactive = target.closest(
        'a, button, [role="button"], .cursor-pointer, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        isHovered = true;
        currentBadgeText = interactive.getAttribute('data-cursor') || '';
      } else {
        isHovered = false;
        currentBadgeText = '';
      }

      updateVisualState();
    };

    // Ultra-fluid 120/144+ FPS render loop with smooth interpolation & subpixel stability
    const render = () => {
      if (isVisible) {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;

        // Snappy, silky-smooth lerp (0.35 factor) - zero lag feeling
        if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
          ringX = mouseX;
          ringY = mouseY;
        } else {
          ringX += dx * 0.35;
          ringY += dy * 0.35;
        }

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      style={{ contain: 'layout style paint' }}
      aria-hidden="true"
    >
      {/* Outer Follower Ring - Smooth Lerp Glide */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 -ml-4 -mt-4 w-8 h-8 pointer-events-none will-change-transform"
      >
        <div
          ref={ringInnerRef}
          className="w-full h-full rounded-full border border-[#c59b5f]/45 bg-[#c59b5f]/[0.04] flex items-center justify-center transition-[transform,border-color,background-color] duration-150 ease-out will-change-transform"
        >
          <span
            ref={badgeRef}
            className="text-[8px] uppercase tracking-widest font-semibold text-[#c59b5f] select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Center Precision Dot - 0ms instant hardware tracking */}
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 -ml-1 -mt-1 w-2 h-2 pointer-events-none will-change-transform"
      >
        <div
          ref={dotInnerRef}
          className="w-full h-full rounded-full bg-[#c59b5f] shadow-[0_0_8px_rgba(197,155,95,0.7)] transition-transform duration-100 ease-out will-change-transform"
        />
      </div>
    </div>
  );
}
