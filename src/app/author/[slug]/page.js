import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  if (slug === 'abdulazeez' || slug === 'abdulazeez-mubarak-ozovehe') {
    return {
      title: 'Abdulazeez Mubarak Ozovehe | Skillz Download',
      description: 'Abdulazeez Mubarak Ozovehe is a dedicated technologist, digital creator, and strategist.',
    };
  }

  return { title: 'Author Profile | Skillz Download' };
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  
  // Default author logic
  let authorName = 'Author';
  let authorBio = 'No biography available.';
  let authorImage = '/img/placeholder.svg';
  let searchName = '';

  if (slug === 'abdulazeez' || slug === 'abdulazeez-mubarak-ozovehe') {
    authorName = 'Abdulazeez Mubarak Ozovehe';
    authorBio = `**Abdulazeez Mubarak Ozovehe** is a dedicated technologist, digital creator, and strategist. Currently in his final year as a Computer Science student, he brings a strong academic background to his practical work in the tech space. His current focus bridges theory and real-world application, notably through his ongoing development of a machine learning-based fake news detection system.

Professionally, Abdulazeez is a versatile web developer, SEO content strategist, and professional blogger. With technical expertise spanning WordPress, Elementor Pro, React, and Python, he builds and scales modern digital experiences. His portfolio includes a diverse range of work, from designing modern aesthetic websites for local businesses to architecting structured informational hubs. His technical execution is paired with a strong focus on digital growth, specializing in keyword gap analysis, backlink strategy, and search-optimized content creation.

Beyond software and web development, Abdulazeez is an engaging digital storyteller. He channels his creative energy into developing specialized content, video concepts, and scripts for platforms like YouTube and TikTok, exploring varied themes such as horror aesthetics. By blending his technical proficiency with multimedia creation, he consistently builds compelling, viral-ready narratives for digital audiences.`;
    authorImage = '/img/abdulazeez.jpg';
    searchName = authorName;
  } else {
    // If we want to support other authors, we'd fetch them here, but for now we fallback or 404
    notFound();
  }

  // Fetch recent posts by this author if possible (we do a fuzzy match or exact match on author name)
  const posts = await prisma.post.findMany({
    where: { 
      status: 'published',
      author: {
        name: {
          contains: 'Abdulazeez'
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />

      <main style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--gray-400)', textDecoration: 'none' }} className="hover-text-primary">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" style={{ color: 'var(--gray-400)', textDecoration: 'none' }} className="hover-text-primary">Blog</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--primary-500)' }}>Author Profile</span>
        </div>

        {/* Author Bio Section */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '40px', padding: '40px', borderRadius: '16px', marginBottom: '60px', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--gray-800)' }}>
            <img 
              src={authorImage} 
              alt={authorName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div style={{ flexGrow: 1 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              {authorName}
            </h1>
            <div style={{ color: 'var(--primary-500)', fontWeight: 600, fontSize: '1rem', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Technologist, Developer & SEO Strategist
            </div>
            
            <div className="prose" style={{ color: 'var(--gray-300)', lineHeight: 1.8, fontSize: '1.05rem' }}>
              {authorBio.split('\n\n').map((paragraph, i) => {
                // simple markdown bold parsing for the first paragraph
                const parts = paragraph.split('**');
                return (
                  <p key={i} style={{ marginBottom: '1.5em' }}>
                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'white', fontWeight: 700 }}>{part}</strong> : part)}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Author's Posts Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '4px', height: '24px', background: 'var(--primary-500)', display: 'inline-block', borderRadius: '2px' }}></span>
            Articles by {authorName.split(' ')[0]}
          </h2>
          
          {posts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card-glass hover-scale" style={{ borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.3s ease' }}>
                    <div style={{ position: 'relative', height: '180px', width: '100%', background: 'var(--gray-800)', overflow: 'hidden' }}>
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="hover-img" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)' }}>No Image</div>
                      )}
                    </div>
                    <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: '0.8rem', marginBottom: '12px' }}>
                        <Calendar size={14} />
                        {formatDate(post.createdAt)}
                      </div>
                      <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '12px', lineHeight: 1.4 }}>{post.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-glass" style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
              No articles published yet by this author.
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale:hover .hover-img {
          transform: scale(1.05);
        }
        .hover-scale:hover {
          border-color: var(--primary-500);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .hover-text-primary:hover {
          color: var(--primary-500) !important;
        }
      `}} />
    </div>
  );
}
