import { NextRequest, NextResponse } from 'next/server';
import { RegisterSchema } from '@/schemas';
import { AuthService } from '@/services/auth.service';
import { handleApiError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const payload = RegisterSchema.parse(json);
    const result = await AuthService.register(payload);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    const err = handleApiError(error);
    return NextResponse.json(err.body, { status: err.status });
  }
}
