'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer luxury follower
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if client device has a fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let hasInitialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasInitialized) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        hasInitialized = true;
        setIsVisible(true);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Inputs and textareas keep native cursor
      if (target.closest('input, textarea, select')) {
        setIsOverInput(true);
        return;
      }
      setIsOverInput(false);

      // Check if element or ancestor is interactive
      const interactiveEl = target.closest(
        'a, button, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, smoothX, smoothY, isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="fixed top-0 left-0 pointer-events-none"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center backdrop-blur-[0.5px] transition-colors duration-200"
          animate={{
            width: isHovered ? (cursorText ? 64 : 46) : 34,
            height: isHovered ? (cursorText ? 64 : 46) : 34,
            scale: isOverInput ? 0 : isClicked ? 0.85 : 1,
            opacity: isOverInput ? 0 : 1,
            borderColor: isHovered ? '#c59b5f' : 'rgba(197, 155, 95, 0.45)',
            backgroundColor: isHovered ? 'rgba(197, 155, 95, 0.12)' : 'rgba(197, 155, 95, 0.03)',
          }}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 300,
            mass: 0.4,
          }}
        >
          {cursorText && (
            <span className="text-[9px] uppercase tracking-widest font-semibold text-[#c59b5f] select-none">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 pointer-events-none"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c59b5f] shadow-[0_0_8px_rgba(197,155,95,0.7)]"
          animate={{
            scale: isOverInput ? 0 : isClicked ? 0.6 : isHovered ? 0.5 : 1,
            opacity: isOverInput || cursorText ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
