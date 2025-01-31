import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type MarkdownRendererProps = {
  children: string;
};

export function MarkdownRenderer({ children: markdown }: MarkdownRendererProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the 'copied' state after 2 seconds
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'plaintext';
          
          // Title sesuai dengan bahasa pemrogramannya
          const title = `${language.toLowerCase()}`;

          return !inline && match ? (
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              {/* Header Style untuk Title */}
              <div
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '8px 16px',
                  fontSize: '16px',
                  borderRadius: '8px 8px 0 0',
                  marginTop: "8px",
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{title.toLowerCase()}</span>
                <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={handleCopy}>
                  <button
                    style={{
                      backgroundColor: '#444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      opacity: copied ? 0.7 : 1,
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>
              {/* Syntax Highlighter */}
              <SyntaxHighlighter style={dracula} PreTag="div" language={language} {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
