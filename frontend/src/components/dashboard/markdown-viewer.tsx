'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
  content: string;
}

interface MessageBlockProps {
  children: ReactNode;
  type?: string;
}

const MessageBlock = ({ children, type = 'info' }: MessageBlockProps) => {
  const icon =
    type === 'alert' ? (
      <AlertTriangle className="h-4 w-4" />
    ) : (
      <InfoIcon className="h-4 w-4" />
    );
  const bgColor =
    type === 'alert'
      ? 'bg-yellow-50 dark:bg-yellow-950'
      : 'bg-blue-50 dark:bg-blue-950';
  const borderColor =
    type === 'alert'
      ? 'border-yellow-200 dark:border-yellow-800'
      : 'border-blue-200 dark:border-blue-800';

  return (
    <Alert className={`my-4 ${bgColor} ${borderColor}`}>
      <AlertDescription className="flex items-start gap-2">
        {icon}
        <div>{children}</div>
      </AlertDescription>
    </Alert>
  );
};

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800">
      <ScrollArea className="h-[80vh] p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 text-primary border-b pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mt-8 mb-4 text-primary">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-medium mt-6 mb-3 text-primary">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="my-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-4 space-y-2">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 dark:text-gray-300">{children}</li>
              ),
              table: ({ children }) => (
                <div className="my-6 w-full overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-200 dark:border-gray-700 p-2">
                  {children}
                </td>
              ),
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-4"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              ':::message': ({ children }) => (
                <MessageBlock>{children}</MessageBlock>
              ),
              ':::message alert': ({ children }) => (
                <MessageBlock type="alert">{children}</MessageBlock>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </Card>
  );
}
