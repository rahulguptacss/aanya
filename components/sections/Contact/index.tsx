'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Check,
} from 'lucide-react';
import type { ContactSectionData } from '../../types';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Strict Phone Number Input Handlers: ONLY allow numbers (and optional leading +)
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation, editing, and shortcut keys
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Allow '+' ONLY as the very first character if not already present
    if (e.key === '+') {
      const input = e.currentTarget;
      if (input.selectionStart === 0 && !input.value.includes('+')) {
        return;
      }
      e.preventDefault();
      return;
    }

    // Block any non-digit character completely
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let cleaned = '';
    if (raw.startsWith('+')) {
      cleaned = '+' + raw.slice(1).replace(/\D/g, '');
    } else {
      cleaned = raw.replace(/\D/g, '');
    }
    // Limit to max 16 characters (+ and up to 15 digits)
    if (cleaned.length > 16) {
      cleaned = cleaned.slice(0, 16);
    }
    setFormData((prev) => ({ ...prev, phone: cleaned }));
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    let cleaned = '';
    if (paste.startsWith('+')) {
      cleaned = '+' + paste.slice(1).replace(/\D/g, '');
    } else {
      cleaned = paste.replace(/\D/g, '');
    }
    setFormData((prev) => ({ ...prev, phone: cleaned.slice(0, 16) }));
  };

  const handleSelectSubject = (option: string) => {
    setFormData((prev) => ({ ...prev, subject: option }));
    setSubjectError(false);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate subject selection
    if (!formData.subject) {
      setSubjectError(true);
      setIsDropdownOpen(true);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setSubjectError(false);
    }, 4500);
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'map-pin':
      case 'location':
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
            />
          </svg>
        );
      case 'phone':
      case 'call':
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'mail':
      case 'email':
      default:
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z"
              fill="currentColor"
            />
            <path
              d="M4 6.5L12 12.5L20 6.5"
              stroke="#a37145"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-white text-[#111111] overflow-x-hidden">
      {/* 1. Form Section with Model Image */}
      <section className="relative w-full pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Portrait Model Image with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 w-full"
            >
              <div className="group relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-h-[460px] sm:max-h-[540px] lg:max-h-none w-full mx-auto overflow-hidden bg-[#e8e2d8] shadow-sm rounded-[3px]">
                <Image
                  src={data.image}
                  alt={data.image_alt || data.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Right Column: Contact Form with Motion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Eyebrow with animated gold accent line */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-9 h-[1.5px] bg-[#b89569] origin-left"
                />
                <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#2a2723]">
                  {data.eyebrow}
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-normal text-[#1a1a1a] mb-2.5 leading-tight sm:leading-tight">
                {data.title}
              </h2>

              {/* Description Paragraphs */}
              <div className="text-xs sm:text-[13.5px] text-[#6b665f] leading-relaxed mb-6 space-y-1">
                {data.description_paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#1e1b18] mb-1.5">
                      {data.form.name_label}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#a07442] stroke-[1.75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={data.form.name_placeholder}
                        className="w-full pl-10 pr-3.5 h-[48px] sm:h-[46px] bg-white border border-[#e2ded9] rounded-[3px] text-[15px] sm:text-sm text-[#1e1b18] placeholder-[#a39d94] focus:outline-none focus:border-[#a07442] focus:ring-2 focus:ring-[#a07442]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#1e1b18] mb-1.5">
                      {data.form.email_label}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#a07442] stroke-[1.75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={data.form.email_placeholder}
                        className="w-full pl-10 pr-3.5 h-[48px] sm:h-[46px] bg-white border border-[#e2ded9] rounded-[3px] text-[15px] sm:text-sm text-[#1e1b18] placeholder-[#a39d94] focus:outline-none focus:border-[#a07442] focus:ring-2 focus:ring-[#a07442]/15 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone Number & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Phone Number: ONLY NUMBERS ALLOWED */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#1e1b18] mb-1.5">
                      {data.form.phone_label}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#a07442] stroke-[1.75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9+]*"
                        value={formData.phone}
                        onKeyDown={handlePhoneKeyDown}
                        onChange={handlePhoneChange}
                        onPaste={handlePhonePaste}
                        placeholder={data.form.phone_placeholder}
                        className="w-full pl-10 pr-3.5 h-[48px] sm:h-[46px] bg-white border border-[#e2ded9] rounded-[3px] text-[15px] sm:text-sm text-[#1e1b18] placeholder-[#a39d94] focus:outline-none focus:border-[#a07442] focus:ring-2 focus:ring-[#a07442]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Custom Dropdown matching screenshot */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#1e1b18] mb-1.5">
                      {data.form.subject_label}
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full pl-10 pr-9 h-[48px] sm:h-[46px] bg-white border ${subjectError ? 'border-red-400' : 'border-[#e2ded9]'
                          } rounded-[3px] text-[15px] sm:text-sm text-left flex items-center justify-between focus:outline-none focus:border-[#a07442] focus:ring-2 focus:ring-[#a07442]/15 transition-all cursor-pointer`}
                      >
                        <FileText className="w-4 h-4 text-[#a07442] stroke-[1.75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <span
                          className={`truncate ${formData.subject ? 'text-[#1e1b18] font-normal' : 'text-[#a39d94]'
                            }`}
                        >
                          {formData.subject || data.form.subject_placeholder}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#736e67] absolute right-3.5 top-1/2 -translate-y-1/2 transition-transform duration-200 pointer-events-none ${isDropdownOpen ? 'rotate-180 text-[#a07442]' : ''
                            }`}
                        />
                      </button>

                      {/* Custom Animated Dropdown Menu */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#e2ded9] rounded-[4px] shadow-xl py-1.5 z-50 max-h-60 overflow-y-auto"
                          >
                            {data.form.subject_options.map((option, idx) => {
                              const isSelected = formData.subject === option;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => handleSelectSubject(option)}
                                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors duration-150 cursor-pointer ${isSelected
                                      ? 'bg-[#fbf9f5] text-[#a07442] font-medium'
                                      : 'text-[#2b2723] hover:bg-[#fbf9f5] hover:text-[#a07442]'
                                    }`}
                                >
                                  <span>{option}</span>
                                  {isSelected && <Check className="w-4 h-4 text-[#a07442] shrink-0" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {subjectError && !formData.subject && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {data.form.subject_error_message || 'Please select a subject'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#1e1b18] mb-1.5">
                    {data.form.message_label}
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#a07442] stroke-[1.75] absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={data.form.message_placeholder}
                      className="w-full pl-10 pr-3.5 py-3 min-h-[110px] bg-white border border-[#e2ded9] rounded-[3px] text-[15px] sm:text-sm text-[#1e1b18] placeholder-[#a39d94] focus:outline-none focus:border-[#a07442] focus:ring-2 focus:ring-[#a07442]/15 resize-y transition-all"
                    />
                  </div>
                </div>

                {/* Submit Feedback */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 rounded-[3px]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {data.form.success_message ||
                          'Thank you! Your message has been sent successfully. We will get back to you soon.'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button with Hover & Tap Micro-animations */}
                <div className="pt-1">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 bg-[#a07442] hover:bg-[#8c6233] text-white font-medium text-xs sm:text-[13px] uppercase tracking-wider rounded-[3px] transition-colors duration-200 shadow-sm cursor-pointer"
                  >
                    <span>{data.form.submit_text}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Contact Info Cards (3 Columns) with Stagger & Hover Animation */}
      <section className="relative w-full bg-[#f6f2ec] py-10 sm:py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {data.info_cards.map((card, idx) => {
              const CardContent = (
                <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 w-full">
                  {/* Round Icon Badge with subtle scale on hover */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] rounded-full bg-[#a37145] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#8f5f33]">
                    {getCardIcon(card.icon)}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-[19px] sm:text-[20px] lg:text-[22px] font-normal text-[#1a1a1a] mb-1.5 leading-snug">
                      {card.title}
                    </h3>
                    <div className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#736e67] leading-[1.6] break-words">
                      {card.lines.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group bg-white py-6 px-5 sm:py-8 sm:px-7 lg:py-9 lg:px-8 rounded-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex items-center"
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-full block text-inherit no-underline"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Google Map matching screenshot */}
      {data.map?.embed_url && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[220px] sm:h-[260px] bg-[#e5e0d8] overflow-hidden"
        >
          <iframe
            src={data.map.embed_url}
            title={data.map.title}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[0.05] contrast-[1.02]"
          />
        </motion.section>
      )}
    </div>
  );
}
