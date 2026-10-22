import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import BackToTop from '../../components/ui/BackToTop';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import Mission from '../../components/sections/Mission';
import Vision from '../../components/sections/Vision';
import Brands from '../../components/sections/Brands';
import Skills from '../../components/sections/Skills';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.about;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function AboutPage() {
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
      />
    ),
    About: <About data={sections.about} />,
    Mission: <Mission data={sections.mission} />,
    Vision: <Vision data={sections.vision} />,
    Brands: <Brands data={sections.brands} />,
    Skills: <Skills data={sections.skills} />,
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
