import { MarkdownContent } from '@/components/markdown/MarkdownContent';
import { ALLOWED } from '@/lib/config';
import { currentUser } from '@clerk/nextjs/server';
import { promises as fs } from 'fs';
import path from 'path';

export default async function MoneyPage() {
  const filePath = path.join(process.cwd(), 'src/content', 'money.md');
  const content = await fs.readFile(filePath, 'utf8');
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {ALLOWED.includes(user?.emailAddresses[0].emailAddress as string) ? (
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MarkdownContent content={content} />
          </article>
        ) : (
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h1>特定のユーザーでしかログイン出来ないページです。</h1>
          </article>
        )}
      </div>
    </div>
  );
}
