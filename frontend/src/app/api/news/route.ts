// app/api/news/route.ts
import { createNews, listNews } from '@/lib/cosmos/news';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await listNews();
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await createNews(body);
  return NextResponse.json(created, { status: 201 });
}
