// app/api/news/[id]/route.ts
import { deleteNews, updateNews } from '@/lib/cosmos/news';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await updateNews(params.id, body);
  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await deleteNews(params.id);
  return NextResponse.json({}, { status: 204 });
}
