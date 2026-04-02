import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogIndex() {
  // 1. Point to the content/posts directory
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // 2. Safely read all the .md files (fallback to empty array if folder is missing)
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (err) {
    console.log("No posts folder found yet.");
  }
  
  // 3. Extract the metadata from each file
  const blogPosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug: filename.replace('.md', ''), 
      title: data.title || "Untitled",
      date: data.date || "No date",
      excerpt: data.excerpt || "No excerpt provided.",
    };
  });

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>MaxScribe Blog</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Insights on AI, healthcare, and reclaiming your time.</p>

      {blogPosts.length === 0 ? (
        <p>No blog posts found. Add some .md files to the content/posts folder!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {blogPosts.map((post) => (
            <div key={post.slug} style={{ 
              background: 'var(--bg-white)', padding: '30px', borderRadius: 'var(--radius-lg)', 
              border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '10px' }}>{post.date}</p>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '15px', lineHeight: '1.3' }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit' }}>{post.title}</Link>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>Read Article →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}