// lib/cosmos/news.ts
import type { NewsItem } from '@/types/types';
import { CosmosClient, SqlQuerySpec } from '@azure/cosmos';
import { v4 as uuid } from 'uuid';

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const db = client.database(process.env.COSMOS_DATABASE_NAME!);
const container = db.container(process.env.COSMOS_CONTAINER_NAME_NEWS!);

// 取得 -------------------------------------------------
export async function listNews(): Promise<NewsItem[]> {
  const query: SqlQuerySpec = { query: 'SELECT * FROM c ORDER BY c.date DESC' };
  const { resources } = await container.items.query<NewsItem>(query).fetchAll();
  return resources;
}

// 追加 -------------------------------------------------
export async function createNews(
  payload: Omit<NewsItem, 'id'>
): Promise<NewsItem> {
  // id は UUID でも Date.now() でも OK
  const item: NewsItem = { ...payload, id: uuid() };
  const { resource } = await container.items.create(item);
  return resource as NewsItem;
}

// 更新 -------------------------------------------------
export async function updateNews(
  id: string,
  fields: Partial<Omit<NewsItem, 'id'>>
): Promise<NewsItem> {
  const item = container.item(id, id);
  const { resource: current } = await item.read<NewsItem>();

  if (!current) throw new Error(`News ${id} not found`);

  const updated = {
    ...current,
    ...fields,
    updatedAt: new Date().toISOString(),
  };
  const { resource } = await item.replace<NewsItem>(updated);
  return resource as NewsItem;
}

// 削除 -------------------------------------------------
export async function deleteNews(id: string): Promise<void> {
  await container.item(id, id).delete();
}
