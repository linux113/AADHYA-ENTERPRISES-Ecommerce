// ==============================================================================
// PRODUCT & CATALOG REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import {
  AyurvedicFormulation,
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from '@/types';

export interface ProductFilterOptions {
  categoryId?: string;
  categorySlug?: string;
  formulation?: AyurvedicFormulation;
  searchQuery?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export type VariantInput = Partial<ProductVariant> & {
  sku: string;
  sizeLabel: string;
  mrp: number;
  sellingPrice: number;
  costPrice?: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
  weightInGrams?: number;
  isDefault?: boolean;
  isActive?: boolean;
};

export type ImageInput = {
  imageUrl: string;
  altText?: string | null;
  sortOrder?: number;
  isPrimary?: boolean;
};

export class ProductRepository {
  // ----------------------------------------------------------------------------
  // CATEGORIES
  // ----------------------------------------------------------------------------

  public static async listCategories(activeOnly = true): Promise<Category[]> {
    return Array.from(db.categories.values())
      .filter((c) => !activeOnly || c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public static async findCategoryBySlug(slug: string): Promise<Category | null> {
    for (const cat of db.categories.values()) {
      if (cat.slug === slug.toLowerCase()) return { ...cat };
    }
    return null;
  }

  public static async findCategoryById(id: string): Promise<Category | null> {
    const cat = db.categories.get(id);
    return cat ? { ...cat } : null;
  }

  public static async createCategory(catData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const id = `cat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const newCategory: Category = {
      ...catData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.categories.set(id, newCategory);
    return { ...newCategory };
  }

  public static async updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    const cat = db.categories.get(id);
    if (!cat) return null;
    const updated: Category = {
      ...cat,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    db.categories.set(id, updated);
    return { ...updated };
  }

  public static async deleteCategory(id: string): Promise<boolean> {
    return db.categories.delete(id);
  }

  // ----------------------------------------------------------------------------
  // PRODUCTS & VARIANTS
  // ----------------------------------------------------------------------------

  public static async listProducts(options: ProductFilterOptions = {}): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let result = Array.from(db.products.values()).filter((p) => p.isActive);

    // Filter by Category Slug or ID
    if (options.categorySlug) {
      const cat = await this.findCategoryBySlug(options.categorySlug);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    } else if (options.categoryId) {
      result = result.filter((p) => p.categoryId === options.categoryId);
    }

    // Filter by Formulation
    if (options.formulation) {
      result = result.filter((p) => p.ayurvedicFormulation === options.formulation);
    }

    // Filter by Feature / Bestseller / New Arrival
    if (options.isFeatured !== undefined) {
      result = result.filter((p) => p.isFeatured === options.isFeatured);
    }
    if (options.isBestseller !== undefined) {
      result = result.filter((p) => p.isBestseller === options.isBestseller);
    }
    if (options.isNewArrival !== undefined) {
      result = result.filter((p) => p.isNewArrival === options.isNewArrival);
    }

    // Filter by Search Query
    const searchString = options.searchQuery || options.search;
    if (searchString) {
      const q = searchString.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q) ||
          p.benefits.toLowerCase().includes(q)
      );
    }

    // Enrich with Variants, Images & Ratings for Filtering and Output
    const populated = result.map((p) => this.populateProduct(p));

    // Filter by In-Stock Only
    let filtered = populated;
    if (options.inStockOnly) {
      filtered = filtered.filter((p) => p.variants && p.variants.some((v) => v.stockQuantity > 0));
    }

    // Filter by Price Range
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      filtered = filtered.filter((p) => {
        if (!p.variants || p.variants.length === 0) return true;
        const prices = p.variants.map((v) => v.sellingPrice);
        const minP = Math.min(...prices);
        const maxP = Math.max(...prices);
        if (options.minPrice !== undefined && maxP < options.minPrice) return false;
        if (options.maxPrice !== undefined && minP > options.maxPrice) return false;
        return true;
      });
    }

    // Sorting
    switch (options.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const aMin = Math.min(...(a.variants?.map((v) => v.sellingPrice) || [0]));
          const bMin = Math.min(...(b.variants?.map((v) => v.sellingPrice) || [0]));
          return aMin - bMin;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const aMax = Math.max(...(a.variants?.map((v) => v.sellingPrice) || [0]));
          const bMax = Math.max(...(b.variants?.map((v) => v.sellingPrice) || [0]));
          return bMax - aMax;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    const total = filtered.length;
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 24);
    const totalPages = Math.ceil(total / limit) || 1;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      products: paginated,
      total,
      page,
      totalPages,
    };
  }

  public static async findProductBySlug(slug: string): Promise<Product | null> {
    for (const p of db.products.values()) {
      if (p.slug === slug.toLowerCase()) {
        return this.populateProduct(p);
      }
    }
    return null;
  }

  public static async findProductById(id: string): Promise<Product | null> {
    const p = db.products.get(id);
    return p ? this.populateProduct(p) : null;
  }

  public static async findVariantById(variantId: string): Promise<ProductVariant | null> {
    const v = db.productVariants.get(variantId);
    return v ? { ...v } : null;
  }

  public static async listAllVariants(): Promise<ProductVariant[]> {
    return Array.from(db.productVariants.values());
  }

  public static async createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category' | 'variants' | 'images' | 'reviews'>,
    variants: VariantInput[],
    images: ImageInput[] = []
  ): Promise<Product> {
    const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const newProduct: Product = {
      ...productData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.products.set(id, newProduct);

    // Save Variants
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const variantId = v.id || `var_${id}_${i + 1}`;
      const newVariant: ProductVariant = {
        id: variantId,
        productId: id,
        sku: v.sku,
        sizeLabel: v.sizeLabel,
        mrp: v.mrp,
        sellingPrice: v.sellingPrice,
        costPrice: v.costPrice ?? 0,
        stockQuantity: v.stockQuantity ?? 0,
        reservedQuantity: v.reservedQuantity ?? 0,
        lowStockThreshold: v.lowStockThreshold ?? 5,
        weightInGrams: v.weightInGrams ?? 0,
        isDefault: v.isDefault ?? (i === 0),
        isActive: v.isActive ?? true,
        createdAt: now,
        updatedAt: now,
      };
      db.productVariants.set(variantId, newVariant);
    }

    // Save Images
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const imgId = `img_${id}_${i + 1}`;
      const newImg: ProductImage = {
        id: imgId,
        productId: id,
        imageUrl: img.imageUrl,
        altText: img.altText || `${newProduct.name} - Aadhya Enterprises`,
        sortOrder: img.sortOrder ?? i,
        isPrimary: img.isPrimary ?? (i === 0),
        createdAt: now,
      };
      db.productImages.set(imgId, newImg);
    }

    return this.populateProduct(newProduct);
  }

  public static async updateProduct(
    id: string,
    updates: Partial<Product>,
    variants?: VariantInput[],
    images?: ImageInput[]
  ): Promise<Product | null> {
    const existing = db.products.get(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updatedProd: Product = {
      ...existing,
      ...updates,
      updatedAt: now,
    };
    db.products.set(id, updatedProd);

    // Update variants if supplied
    if (variants && variants.length > 0) {
      for (const [vKey, v] of db.productVariants.entries()) {
        if (v.productId === id) db.productVariants.delete(vKey);
      }
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        const vId = v.id || `var_${id}_${i + 1}`;
        db.productVariants.set(vId, {
          id: vId,
          productId: id,
          sku: v.sku,
          sizeLabel: v.sizeLabel,
          mrp: v.mrp,
          sellingPrice: v.sellingPrice,
          costPrice: v.costPrice ?? 0,
          stockQuantity: v.stockQuantity ?? 0,
          reservedQuantity: v.reservedQuantity ?? 0,
          lowStockThreshold: v.lowStockThreshold ?? 5,
          weightInGrams: v.weightInGrams ?? 0,
          isDefault: v.isDefault ?? false,
          isActive: v.isActive ?? true,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // Update images if supplied
    if (images && images.length > 0) {
      for (const [imgKey, img] of db.productImages.entries()) {
        if (img.productId === id) db.productImages.delete(imgKey);
      }
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imgId = (img as any).id || `img_${id}_${i + 1}`;
        db.productImages.set(imgId, {
          id: imgId,
          productId: id,
          imageUrl: img.imageUrl,
          altText: img.altText || `${updatedProd.name} - Aadhya Enterprises`,
          sortOrder: img.sortOrder ?? i,
          isPrimary: img.isPrimary ?? (i === 0),
          createdAt: now,
        });
      }
    }

    return this.populateProduct(updatedProd);
  }

  public static async deleteProduct(id: string): Promise<boolean> {
    for (const [vKey, v] of db.productVariants.entries()) {
      if (v.productId === id) db.productVariants.delete(vKey);
    }
    for (const [imgKey, img] of db.productImages.entries()) {
      if (img.productId === id) db.productImages.delete(imgKey);
    }
    return db.products.delete(id);
  }

  private static populateProduct(product: Product): Product {
    const category = db.categories.get(product.categoryId);
    const variants = Array.from(db.productVariants.values()).filter((v) => v.productId === product.id && v.isActive);
    const images = Array.from(db.productImages.values())
      .filter((img) => img.productId === product.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    const reviews = Array.from(db.reviews.values()).filter((r) => r.productId === product.id && r.isApproved);

    const ratingCount = reviews.length;
    const ratingSum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const ratingAverage = ratingCount > 0 ? Number((ratingSum / ratingCount).toFixed(1)) : 5.0;

    return {
      ...product,
      category,
      variants,
      images,
      reviews,
      ratingCount: ratingCount || 1,
      ratingAverage: ratingCount > 0 ? ratingAverage : 5.0,
    };
  }

  // Aliases & Instance Methods
  public static async findMany(options?: ProductFilterOptions) { return this.listProducts(options); }
  public static async findBySlug(slug: string) { return this.findProductBySlug(slug); }
  public static async findById(id: string) { return this.findProductById(id); }
  public static async getAllCategories(activeOnly?: boolean) { return this.listCategories(activeOnly); }

  public findMany(options?: ProductFilterOptions) { return ProductRepository.findMany(options); }
  public findBySlug(slug: string) { return ProductRepository.findBySlug(slug); }
  public findById(id: string) { return ProductRepository.findById(id); }
  public getAllCategories(activeOnly?: boolean) { return ProductRepository.getAllCategories(activeOnly); }
  public listProducts(options?: ProductFilterOptions) { return ProductRepository.listProducts(options); }
  public findProductBySlug(slug: string) { return ProductRepository.findProductBySlug(slug); }
  public findProductById(id: string) { return ProductRepository.findProductById(id); }
  public listCategories(activeOnly?: boolean) { return ProductRepository.listCategories(activeOnly); }
  public findCategoryBySlug(slug: string) { return ProductRepository.findCategoryBySlug(slug); }
  public findCategoryById(id: string) { return ProductRepository.findCategoryById(id); }
  public createProduct(data: any, variants: any[], images: any[] = []) { return ProductRepository.createProduct(data, variants, images); }
  public updateProduct(id: string, updates: any, variants?: any[], images: any[] = []) { return ProductRepository.updateProduct(id, updates, variants, images); }
  public deleteProduct(id: string) { return ProductRepository.deleteProduct(id); }
}

export const productRepository = new ProductRepository();

