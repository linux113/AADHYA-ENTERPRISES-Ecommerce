import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository } from '@/repositories/order.repository';
import { NotFoundError, handleApiError } from '@/lib/errors';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const order = await OrderRepository.findByOrderNumber(params.orderNumber);
    if (!order) {
      throw new NotFoundError(`Order #${params.orderNumber}`);
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    const err = handleApiError(error);
    return NextResponse.json(err.body, { status: err.status });
  }
}
