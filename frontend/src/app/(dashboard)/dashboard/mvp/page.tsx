import { MarkdownContent } from '@/components/markdown/MarkdownContent';
import { promises as fs } from 'fs';
import path from 'path';

export default async function MvpPage() {
  const filePath = path.join(process.cwd(), 'src/content', 'mvp.md');
  const content = await fs.readFile(filePath, 'utf8');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </article>
      </div>
    </div>
  );
}
