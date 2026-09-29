import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository } from '@/repositories/order.repository';
import { AuthService } from '@/services/auth.service';
import { AuthenticationError, handleApiError } from '@/lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || req.cookies.get('aadhya_session_token')?.value;

    if (!token) {
      throw new AuthenticationError();
    }

    const user = await AuthService.getCurrentUser(token);
    const orders = await OrderRepository.listOrders({ userId: user.id });

    return NextResponse.json({
      success: true,
      data: orders.orders,
    });
  } catch (error) {
    const err = handleApiError(error);
    return NextResponse.json(err.body, { status: err.status });
  }
}
