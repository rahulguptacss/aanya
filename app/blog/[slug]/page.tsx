import React from 'react';
import type { Metadata } from 'next';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import BackToTop from '../../../components/ui/BackToTop';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetail from '../../../components/sections/BlogDetail';
import { common, pages, sections, type PageComponent, type BlogDetailSectionData } from '../../../components/types';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const pageData = pages.blog_detail;

export async function generateStaticParams() {
  return sections.blog_list.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogDetails = sections.blog_details as Record<string, BlogDetailSectionData>;
  const detailData =
    blogDetails[slug] ??
    Object.values(blogDetails)[0];

  return {
    title: `${detailData.title} | Aanya Sharma`,
    description: detailData.intro || pageData.metadata.description,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blogDetails = sections.blog_details as Record<string, BlogDetailSectionData>;
  const detailData =
    blogDetails[slug] ??
    Object.values(blogDetails)[0];

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
      />
    ),
    BlogDetail: <BlogDetail data={detailData} />,
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
