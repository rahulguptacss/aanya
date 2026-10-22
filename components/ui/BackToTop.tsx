'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import type { BackToTopData } from '../types';

interface BackToTopProps {
  data: BackToTopData;
}

export default function BackToTop({ data }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={data.aria_label}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#c59b5f] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#a67d44] hover:scale-110 active:scale-95 cursor-pointer"
    >
      <ArrowUp className="h-5 w-5 stroke-[2.5]" />
    </button>
  );
}
