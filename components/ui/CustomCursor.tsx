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
    let hasCustomText = false;
    let rafId: number;

    const updateVisualState = () => {
      if (isClicked) {
        ringInner.style.transform = hasCustomText ? 'scale(1.5)' : isHovered ? 'scale(1.2)' : 'scale(0.85)';
        dotInner.style.transform = 'scale(0.5)';
      } else if (hasCustomText) {
        ringInner.style.transform = 'scale(1.8)';
        ringInner.style.borderColor = '#c59b5f';
        ringInner.style.backgroundColor = 'rgba(197, 155, 95, 0.18)';
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
        const customText = interactive.getAttribute('data-cursor');
        if (customText && badge) {
          hasCustomText = true;
          badge.textContent = customText;
        } else {
          hasCustomText = false;
          if (badge) badge.textContent = '';
        }
      } else {
        isHovered = false;
        hasCustomText = false;
        if (badge) badge.textContent = '';
      }

      updateVisualState();
    };

    // 120/144 FPS Hardware-accelerated GPU render loop
    const render = () => {
      if (isVisible) {
        // Dot tracks instant 1:1 with hardware pointer (zero delay)
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Ring follows smoothly with 0.25 Lerp factor (fast, snappy, responsive)
        ringX += (mouseX - ringX) * 0.25;
        ringY += (mouseY - ringY) * 0.25;
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
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="fixed top-[-16px] left-[-16px] w-[32px] h-[32px] pointer-events-none will-change-transform"
      >
        <div
          ref={ringInnerRef}
          className="w-full h-full rounded-full border border-[#c59b5f]/45 bg-[#c59b5f]/[0.04] flex items-center justify-center transition-all duration-150 ease-out will-change-transform"
        >
          <span
            ref={badgeRef}
            className="text-[8px] uppercase tracking-widest font-semibold text-[#c59b5f] select-none"
          />
        </div>
      </div>

      {/* Center Precision Dot - 0ms instant tracking */}
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="fixed top-[-4px] left-[-4px] w-2 h-2 pointer-events-none will-change-transform"
      >
        <div
          ref={dotInnerRef}
          className="w-full h-full rounded-full bg-[#c59b5f] shadow-[0_0_8px_rgba(197,155,95,0.7)] transition-transform duration-100 ease-out will-change-transform"
        />
      </div>
    </div>
  );
}
