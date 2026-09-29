// ==============================================================================
// ORDER & PAYMENT REPOSITORY — AADHYA ENTERPRISES
// ==============================================================================

import { db } from '@/lib/db';
import {
  Order,
  OrderItem,
  OrderStatus,
  Payment,
  PaymentGateway,
  PaymentStatus,
  Shipment,
  ShipmentStatus,
} from '@/types';

export interface OrderFilterOptions {
  userId?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  searchQuery?: string;
  page?: number;
  limit?: number;
}

export class OrderRepository {
  public static generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const count = db.orders.size + 10001;
    return `AE-${year}-${count}`;
  }

  public static async createOrder(
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'items' | 'payment' | 'shipment'>,
    itemsData: Array<Omit<OrderItem, 'id' | 'orderId'>>
  ): Promise<Order> {
    const id = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const orderNumber = this.generateOrderNumber();
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: now,
      updatedAt: now,
      items: [],
    };

    // Save Order Items
    const items: OrderItem[] = [];
    for (let i = 0; i < itemsData.length; i++) {
      const item = itemsData[i];
      const itemId = `item_${id}_${i + 1}`;
      const newOrderItem: OrderItem = {
        ...item,
        id: itemId,
        orderId: id,
      };
      db.orderItems.set(itemId, newOrderItem);
      items.push(newOrderItem);
    }

    newOrder.items = items;
    db.orders.set(id, newOrder);

    // Initial Payment Record
    const paymentId = `pay_${id}`;
    const paymentRecord: Payment = {
      id: paymentId,
      orderId: id,
      gateway: orderData.paymentGateway,
      amount: orderData.totalPayableAmount,
      currency: 'INR',
      status: orderData.paymentGateway === PaymentGateway.CASH_ON_DELIVERY ? PaymentStatus.PENDING : PaymentStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };
    db.payments.set(paymentId, paymentRecord);
    newOrder.payment = paymentRecord;

    return { ...newOrder };
  }

  public static async findById(id: string): Promise<Order | null> {
    const order = db.orders.get(id);
    if (!order) return null;
    return this.populateOrder(order);
  }

  public static async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const orders = Array.from(db.orders.values());
    for (const order of orders) {
      if (order.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase()) {
        return this.populateOrder(order);
      }
    }
    return null;
  }

  public static async listOrders(options: OrderFilterOptions = {}): Promise<{
    orders: Order[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    let list = Array.from(db.orders.values());

    if (options.userId) {
      list = list.filter((o) => o.userId === options.userId);
    }
    if (options.orderStatus) {
      list = list.filter((o) => o.orderStatus === options.orderStatus);
    }
    if (options.paymentStatus) {
      list = list.filter((o) => o.paymentStatus === options.paymentStatus);
    }
    if (options.searchQuery) {
      const q = options.searchQuery.toLowerCase().trim();
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.includes(q)
      );
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = list.length;
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 20);
    const totalPages = Math.ceil(total / limit) || 1;
    const paginated = list.slice((page - 1) * limit, page * limit).map((o) => this.populateOrder(o));

    return {
      orders: paginated,
      total,
      page,
      totalPages,
    };
  }

  public static async updateOrderStatus(
    orderId: string,
    orderStatus: OrderStatus,
    adminNotes?: string | null
  ): Promise<Order | null> {
    const order = db.orders.get(orderId);
    if (!order) return null;

    const now = new Date().toISOString();
    const updated: Order = {
      ...order,
      orderStatus,
      adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
      updatedAt: now,
    };
    db.orders.set(orderId, updated);
    return this.populateOrder(updated);
  }

  public static async updatePayment(
    orderId: string,
    updates: Partial<Payment>
  ): Promise<Payment | null> {
    let paymentRecord: Payment | null = null;
    const payments = Array.from(db.payments.values());
    for (const p of payments) {
      if (p.orderId === orderId) {
        paymentRecord = p;
        break;
      }
    }

    const now = new Date().toISOString();
    if (!paymentRecord) {
      paymentRecord = {
        id: `pay_${orderId}`,
        orderId,
        gateway: PaymentGateway.RAZORPAY,
        amount: updates.amount || 0,
        currency: 'INR',
        status: PaymentStatus.PENDING,
        createdAt: now,
        updatedAt: now,
        ...updates,
      };
      db.payments.set(paymentRecord.id, paymentRecord);
    } else {
      paymentRecord = {
        ...paymentRecord,
        ...updates,
        updatedAt: now,
      };
      db.payments.set(paymentRecord.id, paymentRecord);
    }

    // Sync order payment status
    if (updates.status) {
      const order = db.orders.get(orderId);
      if (order) {
        db.orders.set(orderId, {
          ...order,
          paymentStatus: updates.status,
          updatedAt: now,
        });
      }
    }

    return { ...paymentRecord };
  }

  public static async updateShipment(
    orderId: string,
    carrierName: string,
    trackingNumber: string,
    status: ShipmentStatus = ShipmentStatus.IN_TRANSIT
  ): Promise<Shipment> {
    const now = new Date().toISOString();
    let shipment: Shipment | null = null;
    const shipments = Array.from(db.shipments.values());
    for (const s of shipments) {
      if (s.orderId === orderId) {
        shipment = s;
        break;
      }
    }

    if (!shipment) {
      shipment = {
        id: `shp_${orderId}`,
        orderId,
        carrierName,
        trackingNumber,
        status,
        dispatchedAt: now,
        createdAt: now,
        updatedAt: now,
      };
    } else {
      shipment = {
        ...shipment,
        carrierName,
        trackingNumber,
        status,
        updatedAt: now,
      };
    }
    db.shipments.set(shipment.id, shipment);

    // Sync order status to SHIPPED if not already
    const order = db.orders.get(orderId);
    if (order && order.orderStatus !== OrderStatus.DELIVERED) {
      db.orders.set(orderId, {
        ...order,
        orderStatus: status === ShipmentStatus.DELIVERED ? OrderStatus.DELIVERED : OrderStatus.SHIPPED,
        updatedAt: now,
      });
    }

    return { ...shipment };
  }

  public static async hasUserPurchasedProduct(userId: string, productId: string): Promise<boolean> {
    const orders = Array.from(db.orders.values());
    for (const order of orders) {
      if (order.userId === userId && order.paymentStatus === PaymentStatus.PAID) {
        const orderItems = Array.from(db.orderItems.values()).filter((i) => i.orderId === order.id);
        for (const item of orderItems) {
          const variant = db.productVariants.get(item.variantId);
          if (variant && variant.productId === productId) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private static populateOrder(order: Order): Order {
    const rawItems = Array.from(db.orderItems.values()).filter((i) => i.orderId === order.id);
    const items = rawItems.map((item) => ({
      ...item,
      productName: item.productNameSnapshot,
      variantLabel: item.variantSizeSnapshot,
      sku: item.skuSnapshot,
      totalPrice: item.lineTotal,
    }));

    let payment: Payment | null = null;
    const payments = Array.from(db.payments.values());
    for (const p of payments) {
      if (p.orderId === order.id) {
        payment = p;
        break;
      }
    }
    let shipment: Shipment | null = null;
    const shipments = Array.from(db.shipments.values());
    for (const s of shipments) {
      if (s.orderId === order.id) {
        shipment = s;
        break;
      }
    }

    return {
      ...order,
      status: order.orderStatus,
      subtotal: order.subtotalAmount,
      totalAmount: order.totalPayableAmount,
      paymentMethod: order.paymentGateway,
      carrier: shipment?.carrier || shipment?.carrierName || null,
      trackingNumber: shipment?.trackingNumber || null,
      trackingUrl: shipment?.trackingUrl || null,
      items,
      payment,
      shipment,
    };
  }

  // Aliases & Instance Methods
  public static async findMany(options?: OrderFilterOptions) { return this.listOrders(options); }

  public findMany(options?: OrderFilterOptions) { return OrderRepository.findMany(options); }
  public findById(id: string) { return OrderRepository.findById(id); }
  public findByOrderNumber(orderNumber: string) { return OrderRepository.findByOrderNumber(orderNumber); }
  public listOrders(options?: OrderFilterOptions) { return OrderRepository.listOrders(options); }
  public createOrder(orderData: any, itemsData: any[]) { return OrderRepository.createOrder(orderData, itemsData); }
  public updateStatus(id: string, status: any) { return OrderRepository.updateOrderStatus(id, status); }
  public updateOrderStatus(id: string, status: any, notes?: string) { return OrderRepository.updateOrderStatus(id, status, notes); }
  public updatePayment(orderId: string, updates: any) { return OrderRepository.updatePayment(orderId, updates); }
  public updateShipment(orderId: string, carrier: string, trackingNumber: string, status?: any) { return OrderRepository.updateShipment(orderId, carrier, trackingNumber, status); }
  public hasUserPurchasedProduct(userId: string, productId: string) { return OrderRepository.hasUserPurchasedProduct(userId, productId); }
}

export const orderRepository = new OrderRepository();

