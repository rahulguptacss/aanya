import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Services from '../../components/sections/Services';
import Testimonials from '../../components/sections/Testimonials';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.services;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function ServicesPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
      />
    ),
    Services: <Services data={sections.services} />,
    Testimonials: (
      <Testimonials
        data={sections.testimonials}
        className="pt-2 sm:pt-4 lg:pt-6 pb-14 sm:pb-20 lg:pb-24"
      />
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#c59b5f] selection:text-white text-[#111111]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>
            {sectionMap[block.component] ?? null}
          </React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
