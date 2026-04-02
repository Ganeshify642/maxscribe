import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Header from './components/Header'; // Import our new interactive header

// Function to safely fetch the latest 3 blog posts
function getRecentPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (err) {
    return [];
  }
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: filename.replace('.md', ''),
      title: data.title || "Untitled",
      date: data.date || "No date",
      excerpt: data.excerpt || "",
    };
  });

  // Return only the top 3 most recent posts
  return posts.slice(0, 3);
}

export default function Home() {
  const recentPosts = getRecentPosts();

  return (
    <>
      <Header />

      <section className="hero">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        
        <div className="container">
          <div className="hero-content">
            <span className="new-pill">✨ Version 1.0 Launched</span>
            <h1>Your AI Medical Scribe<br /><span>in Your Pocket</span></h1>
            <p>Stop typing late at night. MaxScribe AI listens to your patient visits and generates accurate, secure SOAP notes instantly.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Link href="https://apps.apple.com/in/app/maxscribe-ai/id6744329793" className="app-store-btn">
                <svg viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.3c14.2 40.2 40.8 90.4 71.2 134.1 12.3 17.9 27.5 37.3 47.6 37.3 18.2 0 25.5-11.8 55.6-11.8 32 0 39.4 11.8 55.6 11.8 21.3 0 38.6-23.4 52.6-43.7 15.3-21.6 24.2-47.1 25.2-48-56.5-23.5-56-86.2-7.5-113.9zm-79.7-179c16-19.6 27.2-46.3 23.7-77.9-23.8 1.4-52 16.4-67.9 34.9-14 15.9-25.6 43.5-22.3 73.8 27.1 2.2 55.5-12.8 66.5-30.8z"/>
                </svg>
                <div className="store-text">
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="mockup-stage">
            <div className="phone-card phone-1"><div className="screen-img" style={{ backgroundImage: "url('https://file.garden/ZdiH-Zzmo3pLm3VM/MaxScribe_AI_-_3.jpg')" }}></div></div>
            <div className="phone-card phone-2"><div className="screen-img" style={{ backgroundImage: "url('https://file.garden/ZdiH-Zzmo3pLm3VM/MaxScribe_AI_-_4.jpg')" }}></div></div>
            <div className="phone-card phone-3"><div className="screen-img" style={{ backgroundImage: "url('https://file.garden/ZdiH-Zzmo3pLm3VM/MaxScribe_AI_-_1.jpg')" }}></div></div>
            <div className="phone-card phone-4"><div className="screen-img" style={{ backgroundImage: "url('https://file.garden/ZdiH-Zzmo3pLm3VM/MaxScribe_AI_-_2.jpg')" }}></div></div>
            <div className="phone-card phone-5"><div className="screen-img" style={{ backgroundImage: "url('https://file.garden/ZdiH-Zzmo3pLm3VM/MaxScribe_AI_-_5.jpg')" }}></div></div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', lineHeight: '1.2' }}>Why Clinicians Love MaxScribe</h2>
            <p style={{ color: 'var(--text-muted)' }}>We combine advanced speech recognition with medical-grade intelligence.</p>
          </div>

          <div className="feature-grid">
            <div className="feature-item">
              <div className="f-icon">🎙️</div>
              <h3>Ambient Listening</h3>
              <p>No wake words needed. MaxScribe quietly listens to your natural conversation and filters out small talk.</p>
            </div>
            <div className="feature-item">
              <div className="f-icon">⚡</div>
              <h3>Instant Notes</h3>
              <p>SOAP notes are generated within seconds of finishing the visit, ready for your EMR.</p>
            </div>
            <div className="feature-item">
              <div className="f-icon">🛡️</div>
              <h3>HIPAA Compliant</h3>
              <p>Data security is our priority. We use end-to-end encryption to keep patient data safe.</p>
            </div>
            <div className="feature-item">
              <div className="f-icon">📝</div>
              <h3>Custom Templates</h3>
              <p>Whether you are in Primary Care, Cardio, or Psych, our AI adapts to your specialty&apos;s format.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section bg-gray">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>How It Works</h2>
          </div>
          <div className="steps-wrapper">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h3>Hit Record</h3>
              <p>Open the app and tap the microphone button when you enter the room.</p>
            </div>
            <div className="step-card">
              <div className="step-badge">2</div>
              <h3>Speak Naturally</h3>
              <p>Focus on the patient. The AI captures history, symptoms, and plan.</p>
            </div>
            <div className="step-card">
              <div className="step-badge">3</div>
              <h3>Done</h3>
              <p>Review the generated SOAP note and export it to your computer or EHR.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW RECENT BLOGS SECTION --- */}
      {recentPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Latest Insights</h2>
              <p style={{ color: 'var(--text-muted)' }}>Read our latest articles on AI in healthcare.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {recentPosts.map((post) => (
                <div key={post.slug} style={{ 
                  background: 'var(--bg-white)', padding: '30px', borderRadius: 'var(--radius-lg)', 
                  border: '1px solid rgba(0,0,0,0.05)', transition: 'transform 0.3s'
                }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '10px' }}>{post.date}</p>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', lineHeight: '1.3' }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: 'inherit' }}>{post.title}</Link>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>Read Article →</Link>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/blog" className="btn btn-primary" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid #ccc', boxShadow: 'none' }}>
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="cta-box">
            <h2>Reclaim Your Time Today</h2>
            <p>Join thousands of providers who are leaving work on time. Try MaxScribe AI now.</p>
            <Link href="https://apps.apple.com/in/app/maxscribe-ai/id6744329793" className="app-store-btn btn-white">
              <svg viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 79.3c14.2 40.2 40.8 90.4 71.2 134.1 12.3 17.9 27.5 37.3 47.6 37.3 18.2 0 25.5-11.8 55.6-11.8 32 0 39.4 11.8 55.6 11.8 21.3 0 38.6-23.4 52.6-43.7 15.3-21.6 24.2-47.1 25.2-48-56.5-23.5-56-86.2-7.5-113.9zm-79.7-179c16-19.6 27.2-46.3 23.7-77.9-23.8 1.4-52 16.4-67.9 34.9-14 15.9-25.6 43.5-22.3 73.8 27.1 2.2 55.5-12.8 66.5-30.8z"/>
              </svg>
              <div className="store-text">
                <span>Download on the</span>
                <span>App Store</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <footer id="privacy">
        <div className="container">
          <div className="footer-top">
            <div className="f-col" style={{ flex: 2, minWidth: '250px' }}>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '15px' }}>maxscribe<span style={{ color: 'var(--primary)' }}>.ai</span></h3>
              <p style={{ maxWidth: '300px', fontSize: '0.9rem' }}>The AI scribe that puts patient care back at the center of medicine.</p>
            </div>
            <div className="f-col" style={{ flex: 1, minWidth: '150px' }}>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <a href="mailto:avaiya.kashyap@gmail.com">Contact Support</a>
            </div>
          </div>
          <div className="copyright">
            &copy; 2026 MaxScribe AI. All rights reserved. | HIPAA & GDPR Compliant.
          </div>
        </div>
      </footer>
    </>
  );
}