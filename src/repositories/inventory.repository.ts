// ==============================================================================
// INVENTORY & LEDGER REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import { InventoryChangeReason, InventoryLedger, ProductVariant } from '@/types';
import { StockUnavailableError } from '@/lib/errors';

export class InventoryRepository {
  public static async getVariantStock(variantId: string): Promise<number> {
    const v = db.productVariants.get(variantId);
    return v ? v.stockQuantity : 0;
  }

  public static async listLedger(variantId?: string): Promise<InventoryLedger[]> {
    const list = Array.from(db.inventoryLedgers.values());
    if (variantId) {
      return list.filter((l) => l.variantId === variantId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public static async listLowStock(): Promise<Array<ProductVariant & { productName: string }>> {
    const results: Array<ProductVariant & { productName: string }> = [];
    for (const v of db.productVariants.values()) {
      if (v.isActive && v.stockQuantity <= v.lowStockThreshold) {
        const product = db.products.get(v.productId);
        results.push({
          ...v,
          productName: product?.name || 'Unknown Ayurvedic Product',
        });
      }
    }
    return results;
  }

  /**
   * Atomic Transactional Stock Adjustment
   * Prevents negative stock, updates variant balance, and records immutable ledger entry.
   */
  public static async adjustStock(
    variantId: string,
    changeQty: number,
    reason: InventoryChangeReason,
    referenceId?: string | null,
    notes?: string | null
  ): Promise<{ variant: ProductVariant; ledger: InventoryLedger }> {
    const variant = db.productVariants.get(variantId);
    if (!variant) {
      throw new Error(`Variant ${variantId} not found`);
    }

    const newStock = variant.stockQuantity + changeQty;
    if (newStock < 0) {
      throw new StockUnavailableError(variant.sku, Math.abs(changeQty), variant.stockQuantity);
    }

    const now = new Date().toISOString();
    const updatedVariant: ProductVariant = {
      ...variant,
      stockQuantity: newStock,
      updatedAt: now,
    };
    db.productVariants.set(variantId, updatedVariant);

    const ledgerId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const ledgerEntry: InventoryLedger = {
      id: ledgerId,
      variantId,
      changeQty,
      resultingQty: newStock,
      reason,
      referenceId,
      notes,
      createdAt: now,
    };
    db.inventoryLedgers.set(ledgerId, ledgerEntry);

    return {
      variant: { ...updatedVariant },
      ledger: { ...ledgerEntry },
    };
  }

  /**
   * Atomic Batch Decrement for Order Purchases
   */
  public static async decrementForOrder(
    items: Array<{ variantId: string; quantity: number; sku: string }>,
    orderNumber: string
  ): Promise<void> {
    // 1. Dry run validation to ensure ALL items have sufficient stock
    for (const item of items) {
      const v = db.productVariants.get(item.variantId);
      if (!v || v.stockQuantity < item.quantity) {
        throw new StockUnavailableError(item.sku, item.quantity, v ? v.stockQuantity : 0);
      }
    }

    // 2. Perform atomic decrements & ledger records
    for (const item of items) {
      await this.adjustStock(
        item.variantId,
        -item.quantity,
        InventoryChangeReason.SALE,
        orderNumber,
        `Purchased under Order #${orderNumber}`
      );
    }
  }

  /**
   * Atomic Batch Restoration for Order Cancellations / Returns
   */
  public static async restoreForOrder(
    items: Array<{ variantId: string; quantity: number }>,
    orderNumber: string,
    reason: InventoryChangeReason = InventoryChangeReason.ORDER_CANCELLATION
  ): Promise<void> {
    for (const item of items) {
      await this.adjustStock(
        item.variantId,
        item.quantity,
        reason,
        orderNumber,
        `Restocked from Order #${orderNumber}`
      );
    }
  }

  // Aliases & Instance Methods
  public static async getLowStockItems() { return this.listLowStock(); }

  public getVariantStock(variantId: string) { return InventoryRepository.getVariantStock(variantId); }
  public listLedger(variantId?: string) { return InventoryRepository.listLedger(variantId); }
  public listLowStock() { return InventoryRepository.listLowStock(); }
  public getLowStockItems() { return InventoryRepository.getLowStockItems(); }
  public adjustStock(variantId: string, changeQty: number, reason: any, ref?: string, notes?: string) { return InventoryRepository.adjustStock(variantId, changeQty, reason, ref, notes); }
  public decrementForOrder(items: any[], orderNumber: string) { return InventoryRepository.decrementForOrder(items, orderNumber); }
  public restoreForOrder(items: any[], orderNumber: string, reason?: any) { return InventoryRepository.restoreForOrder(items, orderNumber, reason); }
}

export const inventoryRepository = new InventoryRepository();

