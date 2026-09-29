// ==============================================================================
// CMS, BLOG & REVIEW REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import {
  Banner,
  BlogPost,
  FaqItem,
  HomepageSection,
  Review,
  StaticPage,
  Testimonial,
} from '@/types';

export class CMSRepository {
  // ----------------------------------------------------------------------------
  // BANNERS
  // ----------------------------------------------------------------------------

  public static async listBanners(activeOnly = true): Promise<Banner[]> {
    return Array.from(db.banners.values())
      .filter((b) => !activeOnly || b.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static async createBanner(data: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Banner> {
    const id = `ban_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const banner: Banner = { ...data, id, createdAt: now, updatedAt: now };
    db.banners.set(id, banner);
    return { ...banner };
  }

  public static async updateBanner(id: string, updates: Partial<Banner>): Promise<Banner | null> {
    const banner = db.banners.get(id);
    if (!banner) return null;
    const updated: Banner = { ...banner, ...updates, updatedAt: new Date().toISOString() };
    db.banners.set(id, updated);
    return { ...updated };
  }

  public static async deleteBanner(id: string): Promise<boolean> {
    return db.banners.delete(id);
  }

  // ----------------------------------------------------------------------------
  // HOMEPAGE SECTIONS
  // ----------------------------------------------------------------------------

  public static async listHomepageSections(): Promise<HomepageSection[]> {
    return Array.from(db.homepageSections.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static async updateHomepageSection(
    sectionKey: string,
    updates: Partial<HomepageSection>
  ): Promise<HomepageSection> {
    const existing = db.homepageSections.get(sectionKey) || {
      id: `sec_${sectionKey.toLowerCase()}`,
      sectionKey,
      title: sectionKey,
      sortOrder: 0,
      isActive: true,
      updatedAt: new Date().toISOString(),
    };

    const updated: HomepageSection = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.homepageSections.set(sectionKey, updated);
    return { ...updated };
  }

  // ----------------------------------------------------------------------------
  // TESTIMONIALS & FAQS
  // ----------------------------------------------------------------------------

  public static async listTestimonials(activeOnly = true): Promise<Testimonial[]> {
    return Array.from(db.testimonials.values())
      .filter((t) => !activeOnly || t.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static async createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> {
    const id = `test_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const testimonial: Testimonial = { ...data, id, createdAt: new Date().toISOString() };
    db.testimonials.set(id, testimonial);
    return { ...testimonial };
  }

  public static async listFaqs(category?: string, activeOnly = true): Promise<FaqItem[]> {
    let list = Array.from(db.faqItems.values()).filter((f) => !activeOnly || f.isActive);
    if (category) {
      list = list.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public static async createFaq(data: Omit<FaqItem, 'id' | 'createdAt'>): Promise<FaqItem> {
    const id = `faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const faq: FaqItem = { ...data, id, createdAt: new Date().toISOString() };
    db.faqItems.set(id, faq);
    return { ...faq };
  }

  // ----------------------------------------------------------------------------
  // BLOG & ARTICLES
  // ----------------------------------------------------------------------------

  public static async listBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    return Array.from(db.blogPosts.values())
      .filter((b) => !publishedOnly || b.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public static async findBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = Array.from(db.blogPosts.values());
    for (const b of posts) {
      if (b.slug === slug.toLowerCase()) return { ...b };
    }
    return null;
  }

  public static async createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const id = `blog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const blog: BlogPost = {
      ...data,
      id,
      publishedAt: data.isPublished ? now : null,
      createdAt: now,
      updatedAt: now,
    };
    db.blogPosts.set(id, blog);
    return { ...blog };
  }

  public static async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const blog = db.blogPosts.get(id);
    if (!blog) return null;
    const now = new Date().toISOString();
    const updated: BlogPost = {
      ...blog,
      ...updates,
      publishedAt: updates.isPublished && !blog.publishedAt ? now : blog.publishedAt,
      updatedAt: now,
    };
    db.blogPosts.set(id, updated);
    return { ...updated };
  }

  public static async deleteBlogPost(id: string): Promise<boolean> {
    return db.blogPosts.delete(id);
  }

  // ----------------------------------------------------------------------------
  // STATIC PAGES
  // ----------------------------------------------------------------------------

  public static async findStaticPageBySlug(slug: string): Promise<StaticPage | null> {
    const page = db.staticPages.get(slug.toLowerCase());
    return page ? { ...page } : null;
  }

  public static async listStaticPages(): Promise<StaticPage[]> {
    return Array.from(db.staticPages.values());
  }

  public static async updateStaticPage(slug: string, updates: Partial<StaticPage>): Promise<StaticPage> {
    const existing = db.staticPages.get(slug.toLowerCase()) || {
      id: `page_${slug}`,
      slug,
      title: slug,
      content: '',
      updatedAt: new Date().toISOString(),
    };
    const updated: StaticPage = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.staticPages.set(slug.toLowerCase(), updated);
    return { ...updated };
  }

  // ----------------------------------------------------------------------------
  // REVIEWS & MODERATION
  // ----------------------------------------------------------------------------

  public static async listReviews(productId?: string, approvedOnly = true): Promise<Review[]> {
    let list = Array.from(db.reviews.values());
    if (productId) list = list.filter((r) => r.productId === productId);
    if (approvedOnly) list = list.filter((r) => r.isApproved);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public static async createReview(data: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'isApproved' | 'adminReply'>): Promise<Review> {
    const id = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const review: Review = {
      ...data,
      id,
      isApproved: false,
      adminReply: null,
      createdAt: now,
      updatedAt: now,
    };
    db.reviews.set(id, review);
    return { ...review };
  }

  public static async moderateReview(
    id: string,
    isApproved: boolean,
    adminReply?: string | null
  ): Promise<Review | null> {
    const rev = db.reviews.get(id);
    if (!rev) return null;
    const updated: Review = {
      ...rev,
      isApproved,
      adminReply: adminReply !== undefined ? adminReply : rev.adminReply,
      updatedAt: new Date().toISOString(),
    };
    db.reviews.set(id, updated);
    return { ...updated };
  }

  public static async deleteReview(id: string): Promise<boolean> {
    return db.reviews.delete(id);
  }

  // Aliases & Instance Methods
  public static async getActiveBanners() { return this.listBanners(true); }

  public listBanners(activeOnly?: boolean) { return CMSRepository.listBanners(activeOnly); }
  public getActiveBanners() { return CMSRepository.getActiveBanners(); }
  public createBanner(data: any) { return CMSRepository.createBanner(data); }
  public updateBanner(id: string, updates: any) { return CMSRepository.updateBanner(id, updates); }
  public deleteBanner(id: string) { return CMSRepository.deleteBanner(id); }
  public listHomepageSections() { return CMSRepository.listHomepageSections(); }
  public updateHomepageSection(key: string, updates: any) { return CMSRepository.updateHomepageSection(key, updates); }
  public listTestimonials(activeOnly?: boolean) { return CMSRepository.listTestimonials(activeOnly); }
  public createTestimonial(data: any) { return CMSRepository.createTestimonial(data); }
  public listFaqs(cat?: string, activeOnly?: boolean) { return CMSRepository.listFaqs(cat, activeOnly); }
  public listBlogPosts(publishedOnly?: boolean) { return CMSRepository.listBlogPosts(publishedOnly); }
  public findBlogPostBySlug(slug: string) { return CMSRepository.findBlogPostBySlug(slug); }
  public getStaticPage(slug: string) { return CMSRepository.findStaticPageBySlug(slug); }
  public findStaticPageBySlug(slug: string) { return CMSRepository.findStaticPageBySlug(slug); }
  public updateStaticPage(slug: string, updates: any) { return CMSRepository.updateStaticPage(slug, updates); }
  public listReviews(prodId?: string, approvedOnly?: boolean) { return CMSRepository.listReviews(prodId, approvedOnly); }
  public createReview(data: any) { return CMSRepository.createReview(data); }
  public moderateReview(id: string, isApproved: boolean, reply?: string) { return CMSRepository.moderateReview(id, isApproved, reply); }
  public deleteReview(id: string) { return CMSRepository.deleteReview(id); }
}

export const cmsRepository = new CMSRepository();

