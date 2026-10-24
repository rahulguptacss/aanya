import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  aria_label: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  agency: string;
  address: string;
  phone: string;
  email: string;
  socials: FooterSocialItem[];
  links: LinkType[];
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  title_first: string;
  title_last: string;
  subtitle: string;
  background_image: string;
  background_alt: string;
  cta_link: string;
  cta_text: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSectionData {
  title: string;
  background_image: string;
  background_alt: string;
  items: BreadcrumbItem[];
}
export type BreadcrumbData = BreadcrumbSectionData;

export interface AboutStatItem {
  value: string;
  label: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  description_paragraphs?: string[];
  image: string;
  image_alt: string;
  stats?: AboutStatItem[];
}

export interface StatsSectionData {
  items: AboutStatItem[];
}

export interface MissionSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
}

export interface VisionSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
}

export interface BrandItem {
  id: string;
  name: string;
  image: string;
  subtext?: string;
}

export interface BrandsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  items: BrandItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  icon: string;
}

export interface SkillsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  items: SkillItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  image_alt: string;
  tag: string;
  href: string;
}

export interface PortfolioSectionData {
  title: string;
  subtitle: string;
  all_category_label: string;
  categories: string[];
  items: PortfolioItem[];
  read_more_text?: string;
  lightbox_modal_title?: string;
  lightbox_close_label?: string;
  lightbox_prev_label?: string;
  lightbox_next_label?: string;
  homepage_count?: number;
  portfolio_page_count?: number;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  image_alt: string;
}

export interface TestimonialsSectionData {
  title_lines: string[];
  scroll_hint?: string;
  items: TestimonialItem[];
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface GallerySectionData {
  title: string;
  items: GalleryItem[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface NotFoundData {
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
}

export interface ServiceDetailItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export interface ServiceDetailSectionData {
  id?: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  items: ServiceDetailItem[];
}

export type PortfolioGridItem = ServiceDetailItem;
export type PortfolioGridSectionData = ServiceDetailSectionData;

export interface ServiceCardItem {
  id: string;
  slug?: string;
  title: string;
  image: string;
  alt: string;
  href?: string;
  description?: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  title: string;
  items: ServiceCardItem[];
}

export interface BlogDetailSectionItem {
  number: string;
  title: string;
  paragraph: string;
  images?: string[];
  layout?: 'two-columns' | 'full-width' | string;
}

export interface BlogDetailSectionData {
  category: string;
  date: string;
  title: string;
  hero_image: string;
  hero_alt: string;
  intro: string;
  sections: BlogDetailSectionItem[];
}
export type BlogDetailSection = BlogDetailSectionItem;

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  excerpt: string;
}

export interface BlogListSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  read_more_text?: string;
  posts: BlogPostItem[];
}

export interface ContactFormFields {
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  subject_label: string;
  subject_placeholder: string;
  subject_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  subject_error_message?: string;
  success_message?: string;
}

export interface ContactInfoCard {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  href?: string;
}

export interface ContactMapData {
  title: string;
  embed_url: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title: string;
  description_paragraphs: string[];
  image: string;
  image_alt: string;
  form: ContactFormFields;
  info_cards: ContactInfoCard[];
  map: ContactMapData;
}

export interface SiteSections {
  hero: HeroSectionData;
  breadcrumb: BreadcrumbSectionData;
  about: AboutSectionData;
  stats: StatsSectionData;
  mission: MissionSectionData;
  vision: VisionSectionData;
  brands: BrandsSectionData;
  skills: SkillsSectionData;
  portfolio: PortfolioSectionData;
  portfolio_grid?: PortfolioGridSectionData;
  services: ServicesSectionData;
  service_details?: Record<string, ServiceDetailSectionData>;
  testimonials: TestimonialsSectionData;
  gallery: GallerySectionData;
  blog_list: BlogListSectionData;
  blog_details: Record<string, BlogDetailSectionData>;
  contact: ContactSectionData;
}

export interface SitePages {
  home: PageMeta;
  not_found: NotFoundData;
  about: PageMeta;
  portfolio: PageMeta;
  services: PageMeta;
  service_detail?: PageMeta;
  blog: PageMeta;
  blog_detail: PageMeta;
  contact: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    FashionModel: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data;
export const common = data.common;
export const template = data.categories.FashionModel.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
