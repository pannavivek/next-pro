import { NextResponse } from 'next/server';
import { getCaseStudiesPage } from '@/lib/wordpress';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const after = searchParams.get('after');

  const data = await getCaseStudiesPage(
    6,
    after
  );

  return NextResponse.json({
    nodes: data.casestudies,
    pageInfo: data.pageInfo,
  });
}