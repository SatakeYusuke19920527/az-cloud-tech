// ※ src/app/api/news/[id]/route.ts
import { deleteNews, updateNews } from '@/lib/cosmos/news';
import { NextResponse } from 'next/server';

/* ---------- 更新 (PATCH) ---------- */
export async function PATCH(
  request: Request, // ← Request に変更
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any } //   context はそのまま
) {
  const body = await request.json();
  const updated = await updateNews(params.id, body);
  return NextResponse.json(updated, { status: 200 });
}

/* ---------- 削除 (DELETE) ---------- */
export async function DELETE(
  request: Request, // ← Request に変更
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  await deleteNews(params.id);
  // 204 No Content
  return NextResponse.json(null, { status: 204 });
}
