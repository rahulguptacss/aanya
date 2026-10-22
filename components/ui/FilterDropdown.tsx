'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

interface FilterDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  label,
  className = '',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative w-full max-w-[320px] mx-auto ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        className={`w-full flex items-center gap-2.5 rounded-full bg-white border pl-4 pr-3.5 py-2.5 text-left transition-all duration-200 shadow-sm ${isOpen
            ? 'border-[#c59b5f] ring-2 ring-[#c59b5f]/20'
            : 'border-[#e5e0d8] hover:border-[#c59b5f]'
          }`}
      >
        <SlidersHorizontal className="w-4 h-4 text-[#c59b5f] shrink-0" />
        <span className="flex-1 truncate text-[14px] font-medium text-[#111111]">{value}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c59b5f]/10 text-[#c59b5f] shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-40 max-h-[60vh] overflow-y-auto rounded-[16px] bg-white/95 backdrop-blur-md border border-[#c59b5f]/25 shadow-xl p-1.5 space-y-0.5"
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <li key={opt} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-[14px] rounded-[10px] text-left transition-colors duration-150 ${isSelected
                        ? 'bg-[#8d7352] text-white font-semibold'
                        : 'text-[#111111] hover:bg-[#8d7352]/10 active:bg-[#8d7352]/15'
                      }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
