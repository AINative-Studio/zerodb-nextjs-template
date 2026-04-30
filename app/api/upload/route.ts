import { NextRequest, NextResponse } from 'next/server';
import { files } from '@/lib/zerodb';

/**
 * POST /api/upload
 * multipart/form-data: { file: File }
 * Returns: { url, key, bucket }
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'Max file size is 50MB' }, { status: 413 });
    }
    const result = await files.upload(file, `uploads/${Date.now()}-${file.name}`);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[/api/upload]', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
