// ==============================================================================
// COUPON & DISCOUNT REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import { Coupon, CouponUsage } from '@/types';

export class CouponRepository {
  public static async findByCode(code: string): Promise<Coupon | null> {
    const clean = code.trim().toUpperCase();
    const coupons = Array.from(db.coupons.values());
    for (const c of coupons) {
      if (c.code.toUpperCase() === clean) {
        return { ...c };
      }
    }
    return null;
  }

  public static async findById(id: string): Promise<Coupon | null> {
    const c = db.coupons.get(id);
    return c ? { ...c } : null;
  }

  public static async listAll(): Promise<Coupon[]> {
    return Array.from(db.coupons.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public static async getUserUsageCount(couponId: string, userId: string): Promise<number> {
    let count = 0;
    const usages = Array.from(db.couponUsages.values());
    for (const usage of usages) {
      if (usage.couponId === couponId && usage.userId === userId) {
        count++;
      }
    }
    return count;
  }

  public static async recordUsage(couponId: string, userId: string, orderId: string): Promise<CouponUsage> {
    const usageId = `usg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const usage: CouponUsage = {
      id: usageId,
      couponId,
      userId,
      orderId,
      createdAt: new Date().toISOString(),
    };
    db.couponUsages.set(usageId, usage);

    const coupon = db.coupons.get(couponId);
    if (coupon) {
      db.coupons.set(couponId, {
        ...coupon,
        usedCount: coupon.usedCount + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    return { ...usage };
  }

  public static async create(couponData: Omit<Coupon, 'id' | 'usedCount' | 'createdAt' | 'updatedAt'>): Promise<Coupon> {
    const id = `cpn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    const newCoupon: Coupon = {
      ...couponData,
      id,
      code: couponData.code.trim().toUpperCase(),
      usedCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    db.coupons.set(id, newCoupon);
    return { ...newCoupon };
  }

  public static async update(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
    const c = db.coupons.get(id);
    if (!c) return null;
    const updated: Coupon = {
      ...c,
      ...updates,
      code: updates.code ? updates.code.trim().toUpperCase() : c.code,
      updatedAt: new Date().toISOString(),
    };
    db.coupons.set(id, updated);
    return { ...updated };
  }

  public static async delete(id: string): Promise<boolean> {
    return db.coupons.delete(id);
  }

  public findByCode(code: string) { return CouponRepository.findByCode(code); }
  public findById(id: string) { return CouponRepository.findById(id); }
  public listAll() { return CouponRepository.listAll(); }
  public create(data: any) { return CouponRepository.create(data); }
  public update(id: string, updates: any) { return CouponRepository.update(id, updates); }
  public delete(id: string) { return CouponRepository.delete(id); }
}

export const couponRepository = new CouponRepository();

