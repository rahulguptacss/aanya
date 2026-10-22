import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/sections/Header';
import { common, pages } from '../components/types';

const notFoundData = pages.not_found;

export const metadata: Metadata = {
  title: `${notFoundData.code} - ${notFoundData.title}`,
  description: notFoundData.description,
};

export default function NotFound() {
  return (
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white">
      <Header data={common.Header} />

      {/* Decorative Gold Ambient Glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c59b5f]/15 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto flex flex-1 w-full max-w-[640px] flex-col items-center justify-center px-6 text-center">
        {/* Giant Serif 404 */}
        <p
          className="font-serif leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#f6e7b9] via-[#c59b5f] to-[#7a5726] text-[110px] sm:text-[160px] md:text-[190px] select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          aria-hidden="true"
        >
          {notFoundData.code}
        </p>

        {/* Badge */}
        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#c59b5f]/40 bg-[#c59b5f]/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#ecd5a5]">
          {notFoundData.badge}
        </span>

        {/* Title */}
        <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
          {notFoundData.title}
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-white/70 max-w-md font-light leading-relaxed">
          {notFoundData.description}
        </p>

        {/* Return Button */}
        <div className="mt-8">
          <Link
            href={notFoundData.back_home.href}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#c59b5f] hover:bg-[#a67d44] text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#c59b5f]/20 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{notFoundData.back_home.text}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
