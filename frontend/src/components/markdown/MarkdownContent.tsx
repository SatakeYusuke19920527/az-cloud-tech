'use client';

import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ className, ...props }) => (
          <h1
            className={cn(
              'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8',
              className
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6',
              className
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              'scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4',
              className
            )}
            {...props}
          />
        ),
        p: ({ className, ...props }) => (
          <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
          />
        ),
        ul: ({ className, ...props }) => (
          <ul
            className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
            {...props}
          />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn(
              'mt-6 border-l-2 border-primary pl-6 italic text-primary',
              className
            )}
            {...props}
          />
        ),
        table: ({ className, ...props }) => (
          <div className="my-6 w-full overflow-y-auto">
            <table
              className={cn('w-full border-collapse text-sm', className)}
              {...props}
            />
          </div>
        ),
        th: ({ className, ...props }) => (
          <th
            className={cn(
              'border border-muted px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
              className
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={cn(
              'border border-muted px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
              className
            )}
            {...props}
          />
        ),
        code: ({ node, className, children, ...props }) => {
          console.log('🚀 ~ MarkdownContent ~ node:', node);
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              style={materialDark}
              language={match[1]}
              PreTag="div"
              className="rounded-md"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={cn(
                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
