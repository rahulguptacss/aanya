'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import type { FooterData } from '../../types';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const getSocialIcon = (iconName?: string, name?: string) => {
    const key = (iconName || name || '').toLowerCase();
    if (key.includes('insta')) {
      return (
        <svg className="w-[22px] h-[22px] block shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.5" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.3" fill="#FFFFFF" />
        </svg>
      );
    }
    if (key === 'x' || key.includes('twitter')) {
      return (
        <svg className="w-5 h-5 block shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="#FFFFFF"
          />
        </svg>
      );
    }
    if (key.includes('face') || key === 'fb') {
      return (
        <svg className="w-[22px] h-[22px] block shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
          <path
            d="M15.1 8h-1.8c-.4 0-.8.3-.8.8v1.9h2.6l-.3 2.7h-2.3v7.6h-3.1v-7.6H7.4V10.7h2v-2.2c0-2.2 1.4-3.5 3.5-3.5 1 0 1.9.1 2.2.1V8z"
            fill="#000000"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <footer id="contact" className="relative w-full bg-[#000000] text-white pt-8 sm:pt-10 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Left Column: Big Gold Luxury Logo */}
          <div className="md:col-span-7 flex items-center">
            <div className="relative w-80 sm:w-[420px] md:w-[480px] lg:w-[540px] h-28 sm:h-36 md:h-40 lg:h-44">
              <Image
                src={data.logo}
                alt={data.logo_text}
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Right Column: Contact Details & Socials matching screenshot */}
          <div className="md:col-span-5 flex flex-col space-y-4 sm:space-y-5 text-sm sm:text-[15px] text-white">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-6 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#d4af37] stroke-[1.8]" />
              </div>
              <div className="leading-snug">
                <p className="font-normal text-white">{data.agency}</p>
                <p className="text-white whitespace-pre-line mt-1">
                  {data.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-6 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#d4af37] stroke-[1.8]" />
              </div>
              <a
                href={`tel:${data.phone.replace(/[^+\d]/g, '')}`}
                className="text-white hover:text-[#d4af37] transition-colors tracking-wide"
              >
                {data.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-6 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#d4af37] stroke-[1.8]" />
              </div>
              <a
                href={`mailto:${data.email}`}
                className="text-white hover:text-[#d4af37] transition-colors uppercase tracking-wide"
              >
                {data.email}
              </a>
            </div>

            {/* Social Icons matching screenshot - Only Instagram, X, Facebook */}
            <div className="flex items-center gap-6 pt-3 sm:pt-4">
              {data.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.aria_label}
                  className="inline-flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                >
                  {getSocialIcon(social.icon, social.name)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section with Divider Line */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col space-y-3">
          {/* Navigation Links Row matching screenshot */}
          <nav className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2 text-[11px] sm:text-xs tracking-[0.16em] uppercase font-medium text-white/85">
            {data.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#c59b5f] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright Line underneath links */}
          <div className="text-[11px] tracking-normal text-[#888888] font-light">
            <p>{data.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
