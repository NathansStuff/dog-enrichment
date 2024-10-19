import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { s3UploadProfilePictureService } from './s3Service';

export async function s3UploadProfilePictureHandler(req: NextRequest): Promise<NextResponse> {
  console.log('here1');
  const data = await req.formData();
  const file = data.get('file') as File | null;
  const id = req.nextUrl.pathname.split('/')[3];
  if (!file || !id) {
    return NextResponse.json({ error: 'No file or userId provided' }, { status: ResponseCode.BAD_REQUEST });
  }
  const result = await s3UploadProfilePictureService(file, id);

  return NextResponse.json(result, { status: ResponseCode.OK });
}
