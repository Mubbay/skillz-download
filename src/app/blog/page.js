import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Clock, PlayCircle } from 'lucide-react';

export const metadata = {
  title: 'Blog | Skillz Download',
  description: 'Read our latest articles, tutorials, and news about video downloading, content creation, and more.',
};

export const dynamic = 'force-dynamic';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } },
    },
  });

  if (posts.length === 0) {
    return (
      <div className="page-wrapper">
        <Header />
        <main style={{ minHeight: '80vh', padding: '60px 20px', background: 'var(--bg-primary)' }}>
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--gray-700)' }}>No posts found</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Segment posts for the layout
  const heroPost = posts[0];
  const trendingPosts = posts.slice(1, 4);
  const breakingSidebarPosts = posts.slice(4, 8);
  
  const breakingLargePost = posts[8] || posts[0]; // fallback
  const popularPosts = posts.slice(9, 13);
  
  const editorPosts = posts.slice(13, 16);
  const worthReadingPosts = posts.slice(16, 18);

  return (
    <div className="page-wrapper" style={{ background: '#f8fafc' }}>
      <Header />

      <style dangerouslySetInnerHTML={{__html: `
        .mag-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .mag-hero-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }

        .mag-trending-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .mag-middle-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 40px;
        }

        .mag-popular-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .mag-bottom-grid {
          display: grid;
          grid-template-columns: 8fr 4fr;
          gap: 40px;
        }

        .mag-editor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .mag-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Hover effects */
        .hover-scale img {
          transition: transform 0.4s ease;
        }
        .hover-scale:hover img {
          transform: scale(1.05);
        }
        .hover-text-primary:hover {
          color: var(--primary-500) !important;
        }
        .hover-text-primary-light:hover {
          color: var(--primary-300) !important;
        }

        @media (max-width: 1024px) {
          .mag-hero-grid, .mag-middle-grid, .mag-bottom-grid {
            grid-template-columns: 1fr;
          }
          .mag-banner {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .mag-trending-grid, .mag-popular-grid, .mag-editor-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />

      <main>
        {/* --- HERO SECTION --- */}
        <section style={{ 
          background: 'linear-gradient(135deg, #0a0f1d 0%, #151b2d 100%)', 
          color: 'white',
          padding: '60px 0 40px 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Faint Background image overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: heroPost?.featuredImage ? `url(${heroPost.featuredImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0
          }}></div>

          <div className="mag-container" style={{ position: 'relative', zIndex: 10 }}>
            
            <div className="mag-hero-grid">
              
              {/* Left Side: Hero Post & Trending */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                
                {/* Hero Featured Post */}
                <div style={{ marginBottom: '40px' }}>
                  <span style={{ 
                    background: '#f43f5e', 
                    color: 'white', 
                    padding: '6px 14px', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '24px',
                    letterSpacing: '1px'
                  }}>
                    Hot Now
                  </span>
                  <Link href={`/blog/${heroPost.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-text-primary-light">
                    <h1 style={{ 
                      fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', 
                      fontWeight: 800, 
                      lineHeight: 1.15, 
                      marginBottom: '20px',
                      color: '#ffffff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                      {heroPost.title}
                    </h1>
                  </Link>
                  <p style={{ 
                    fontSize: '1.15rem', 
                    color: 'rgba(255,255,255,0.7)', 
                    maxWidth: '85%',
                    marginBottom: '24px',
                    lineHeight: 1.6
                  }}>
                    {heroPost.excerpt || heroPost.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}
                  </p>
                </div>

                {/* Trending Now Row */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                    Trending Now
                  </div>
                  
                  <div className="mag-trending-grid">
                    {trendingPosts.map(post => (
                      <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-scale hover-text-primary-light">
                        <div style={{ position: 'relative', height: '140px', marginBottom: '12px', overflow: 'hidden', borderRadius: '4px' }}>
                          <img 
                            src={post.featuredImage || '/img/placeholder.svg'} 
                            alt={post.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, color: 'white', margin: 0, transition: 'color 0.2s' }}>
                          {post.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Breaking News List */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <span style={{ width: '4px', height: '16px', background: '#f43f5e' }}></span>
                  Breaking News
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {breakingSidebarPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', textDecoration: 'none' }} className="hover-scale hover-text-primary-light">
                      <div style={{ flexShrink: 0, width: '110px', height: '90px', overflow: 'hidden', borderRadius: '4px' }}>
                        <img 
                          src={post.featuredImage || '/img/placeholder.svg'} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '8px', color: 'white', margin: 0, transition: 'color 0.2s' }}>
                          {post.title}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '6px', display: 'block' }}>
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- MIDDLE SECTION --- */}
        <section style={{ padding: '60px 0', background: 'white' }}>
          <div className="mag-container">
            <div className="mag-middle-grid">
              
              {/* Breaking News Large Left */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  <span style={{ width: '4px', height: '20px', background: 'var(--primary-500)' }}></span>
                  Breaking News
                </div>
                
                {breakingLargePost && (
                  <Link href={`/blog/${breakingLargePost.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-scale hover-text-primary-light">
                    <div style={{ position: 'relative', height: '420px', overflow: 'hidden', borderRadius: '6px' }}>
                      <img 
                        src={breakingLargePost.featuredImage || '/img/placeholder.svg'} 
                        alt={breakingLargePost.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {breakingLargePost.categories?.[0] && (
                        <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#f43f5e', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '6px 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {breakingLargePost.categories[0].category.name}
                        </div>
                      )}
                      
                      {/* Gradient Overlay for text */}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}></div>
                      
                      <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                          {breakingLargePost.categories?.[0]?.category.name || 'NEWS'}
                        </span>
                        <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
                          {breakingLargePost.title}
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '8px' }}>
                          {formatDate(breakingLargePost.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Popular Now Grid Right */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  <span style={{ width: '4px', height: '20px', background: '#0f172a' }}></span>
                  Popular Now
                </div>

                <div className="mag-popular-grid">
                  {popularPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-scale hover-text-primary">
                      <div style={{ position: 'relative', height: '200px', marginBottom: '16px', overflow: 'hidden', borderRadius: '6px' }}>
                        <img 
                          src={post.featuredImage || '/img/placeholder.svg'} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {post.categories?.[0] && (
                          <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: '#000', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {post.categories[0].category.name}
                          </div>
                        )}
                      </div>
                      <h4 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 8px 0', transition: 'color 0.2s' }}>
                        {post.title}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- BANNER AD SECTION --- */}
        <section style={{ padding: '40px 0', background: '#f1f5f9', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
          <div className="mag-container">
            <div style={{ 
              background: 'linear-gradient(to right, #2563eb, #4338ca)', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              position: 'relative',
              padding: '40px 48px'
            }}>
              {/* Background Pattern */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              <div className="mag-banner" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ color: 'white', maxWidth: '600px' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Download Skillz Download App</h3>
                  <p style={{ color: '#e0e7ff', fontSize: '1.1rem', lineHeight: 1.6 }}>Get our official app to download videos on the go. Fast, secure, and completely free. Available now on all platforms.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="#" style={{ background: '#000', color: 'white', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', border: '1px solid #334155' }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.8 3.59-.8 1.58.05 2.81.71 3.63 1.89-3.05 1.71-2.54 5.56.36 6.84-.71 1.74-1.62 3.39-2.66 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.65rem', lineHeight: 1, textTransform: 'uppercase', color: '#cbd5e1' }}>Download on the</span>
                      <span style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1, marginTop: '4px' }}>App Store</span>
                    </div>
                  </a>
                  <a href="#" style={{ background: '#000', color: 'white', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', border: '1px solid #334155' }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186c-.165-.121-.296-.282-.383-.466-.088-.183-.133-.385-.133-.591V2.871c0-.206.045-.408.133-.591.087-.184.218-.345.382-.466z"/><path d="M14.498 12.707l3.655 3.655c.34.34.524.787.525 1.267v.039c0 .48-.186.927-.525 1.267l-.767.767c-.206.206-.474.32-.767.32-.292 0-.56-.114-.766-.32L4.316 8.16l10.182 4.547z"/><path d="M14.498 11.293L4.316 15.84l11.537-11.537c.206-.206.474-.32.766-.32.293 0 .561.114.767.32l.767.767c.339.34.525.787.525 1.267v.039c-.001.48-.185.927-.525 1.267l-3.655 3.655z"/></svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.65rem', lineHeight: 1, textTransform: 'uppercase', color: '#cbd5e1' }}>GET IT ON</span>
                      <span style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1, marginTop: '4px' }}>Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BOTTOM SECTION --- */}
        <section style={{ padding: '60px 0', background: 'white' }}>
          <div className="mag-container">
            <div className="mag-bottom-grid">
              
              {/* Editor Choice 3-cols */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  <span style={{ width: '4px', height: '20px', background: '#0f172a' }}></span>
                  Editor Choice
                </div>
                
                <div className="mag-editor-grid">
                  {editorPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-scale hover-text-primary">
                      <div style={{ position: 'relative', height: '180px', marginBottom: '16px', overflow: 'hidden', borderRadius: '6px' }}>
                        <img 
                          src={post.featuredImage || '/img/placeholder.svg'} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {post.categories?.[0] && (
                          <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: '#000', color: 'white', fontSize: '0.65rem', fontWeight: 'bold', padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {post.categories[0].category.name}
                          </div>
                        )}
                      </div>
                      <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 8px 0', transition: 'color 0.2s' }}>
                        {post.title}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Worth Reading Sidebar */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  <span style={{ width: '4px', height: '20px', background: '#0f172a' }}></span>
                  Worth Reading
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {worthReadingPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }} className="hover-scale hover-text-primary">
                      <div style={{ position: 'relative', height: '200px', marginBottom: '16px', overflow: 'hidden', borderRadius: '6px' }}>
                        <img 
                          src={post.featuredImage || '/img/placeholder.svg'} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
                          <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <PlayCircle size={24} />
                          </div>
                        </div>
                      </div>
                      <h4 style={{ color: '#0f172a', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, margin: '0 0 8px 0', transition: 'color 0.2s' }}>
                        {post.title}
                      </h4>
                      <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {formatDate(post.createdAt)} / {post.categories?.[0]?.category.name || 'Blog'}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
