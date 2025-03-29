import { MarkdownViewer } from '@/components/dashboard/markdown-viewer';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Money() {
  const markdownPath = path.join(process.cwd(), 'content', 'money.md');
  const content = await fs.readFile(markdownPath, 'utf8');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <MarkdownViewer content={content} />
      </div>
    </main>
  );
}
