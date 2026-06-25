import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/wordpress';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const after = searchParams.get('after');

  const data = await getPosts(6, after);

  return NextResponse.json({
    nodes: data.posts,
    pageInfo: data.pageInfo,
  });
}