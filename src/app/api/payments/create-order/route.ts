import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/services/order.service';
import { AuthService } from '@/services/auth.service';
import { handleApiError } from '@/lib/errors';
import { PaymentGateway } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    let userId: string | undefined = undefined;
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || req.cookies.get('aadhya_session_token')?.value;
    if (token) {
      try {
        const decoded = AuthService.verifyToken(token);
        userId = decoded.userId;
      } catch {
        // Guest mode
      }
    }

    const result = await OrderService.initiateCheckout({
      userId,
      customerName: json.shippingAddress.fullName,
      customerEmail: json.email || `${json.shippingAddress.phone}@aadhya.local`,
      customerPhone: json.shippingAddress.phone,
      shippingAddress: json.shippingAddress,
      items: json.items.map((i: any) => ({
        variantId: i.productVariantId || i.variantId,
        quantity: i.quantity,
      })),
      couponCode: json.couponCode,
      paymentGateway: PaymentGateway.RAZORPAY,
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: result.order.id,
        orderNumber: result.order.orderNumber,
        razorpayOrderId: result.razorpayOrderId,
        amount: result.amountInPaise,
        currency: 'INR',
        keyId: result.keyId,
        order: result.order,
      },
    });
  } catch (error) {
    const err = handleApiError(error);
    return NextResponse.json(err.body, { status: err.status });
  }
}
