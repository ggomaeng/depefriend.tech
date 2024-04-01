/* eslint-disable @next/next/no-img-element */

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#using-external-data
import { generate } from '@/utils/depepefy';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) {
  const { id } = params;

  const buffer = await generate(Number(id));

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'cache-control': 'no-store, max-age=0',
    },
  });
}
