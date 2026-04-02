import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const filePath = path.join(process.cwd(), 'content/posts', `${resolvedParams.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { title: `${data.title} | MaxScribe AI`, description: data.excerpt };
  } catch (err) {
    return { title: 'Blog | MaxScribe AI' };
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), 'content/posts', `${resolvedParams.slug}.md`);

  let fileContents;
  try {
    fileContents = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    notFound(); // If the markdown file doesn't exist, it throws the 404
  }

  const { data, content } = matter(fileContents);

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px', maxWidth: '800px', minHeight: '100vh' }}>
      <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '30px', display: 'inline-block' }}>
        ← Back to Blog
      </Link>
      <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>{data.date}</p>
      <h1 style={{ fontSize: '3rem', marginBottom: '30px', lineHeight: '1.2' }}>{data.title}</h1>
      <div style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}