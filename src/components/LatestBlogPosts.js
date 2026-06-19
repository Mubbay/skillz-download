import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function LatestBlogPosts() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  if (posts.length === 0) return null;

  return (
    <section className="section" style={{ padding: '100px 24px', background: '#111111' }}>
      <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
        <h2 className="animate-fade-in-up" style={{ fontSize: '3rem', letterSpacing: '-0.02em', color: 'white' }}>Our Blog</h2>
        <p className="animate-fade-in-up delay-1" style={{ color: 'var(--gray-400)', fontSize: '1.2rem', marginTop: '16px' }}>Latest news, tutorials, and updates</p>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {posts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none' }}>
            <div className="card-glass hover-scale" style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.3s ease' }}>
              <div style={{ position: 'relative', height: '200px', width: '100%', background: 'var(--gray-800)', overflow: 'hidden' }}>
                {post.featuredImage ? (
                  <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="hover-img" />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)' }}>No Image</div>
                )}
              </div>
              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <Calendar size={14} />
                  {formatDate(post.createdAt)}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>
                  {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}
                </p>
                <div style={{ color: 'var(--primary-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', marginTop: 'auto' }}>
                  Read More <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Link href="/blog" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '8px', letterSpacing: '0.5px' }}>
          View All Posts
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale:hover .hover-img {
          transform: scale(1.05);
        }
        .hover-scale:hover {
          border-color: var(--primary-500);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
      `}} />
    </section>
  );
}
