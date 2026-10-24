import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import ServiceDetail from '../../../components/sections/ServiceDetail';
import { common, pages, sections, type PageComponent, type ServiceDetailSectionData } from '../../../components/types';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const serviceItems = sections.services.items;
  return serviceItems.map((item) => ({
    slug: item.slug || item.id,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceDetails = (sections.service_details ?? {}) as Record<string, ServiceDetailSectionData>;
  const serviceItem = sections.services.items.find((item) => item.slug === slug || item.id === slug);
  const detailData = serviceDetails[slug] ?? (serviceItem ? { title: serviceItem.title, description: '' } : null);

  if (!detailData) {
    return {
      title: 'Service | Aanya Sharma',
      description: 'Explore professional modeling services by Aanya Sharma.',
    };
  }

  return {
    title: `${detailData.title} | Aanya Sharma`,
    description:
      detailData.description ||
      `Explore ${detailData.title} modeling services, campaigns, and high-fashion portfolio of Aanya Sharma.`,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const serviceDetails = (sections.service_details ?? {}) as Record<string, ServiceDetailSectionData>;
  const serviceItem = sections.services.items.find((item) => item.slug === slug || item.id === slug);
  const detailData =
    serviceDetails[slug] ??
    (serviceItem?.slug ? serviceDetails[serviceItem.slug] : null);

  if (!detailData) {
    notFound();
  }

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: detailData.title || serviceItem?.title || 'Service Detail', href: '#' },
        ]}
      />
    ),
    ServiceDetail: <ServiceDetail data={detailData} />,
    ServiceDetailGrid: <ServiceDetail data={detailData} />,
    PortfolioGrid: <ServiceDetail data={detailData} />,
  };

  const pageConfig = pages.service_detail ?? {
    components: [
      { key: 'BreadcrumbSection', component: 'Breadcrumb' },
      { key: 'ServiceDetailGridSection', component: 'ServiceDetail' },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-[#c59b5f] selection:text-white text-[#111111]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageConfig.components.map((block: PageComponent) => (
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
