import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrackView from '@/components/TrackView';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  });

  if (!post || post.status !== 'published') {
    return { title: 'Post Not Found | Skillz Download' };
  }

  return {
    title: post.seoTitle || `${post.title} | Skillz Download`,
    description: post.seoDescription || post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: { select: { name: true } },
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    }
  });

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: [{
      '@type': 'Person',
      name: post.author?.name || 'Abdulazeez Mubarak Ozovehe',
      url: `https://skillzdownload.com/author/abdulazeez`
    }],
    description: post.seoDescription || post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160),
  };

  const authorName = post.author?.name || 'Abdulazeez Mubarak Ozovehe';
  const authorSlug = authorName.toLowerCase().includes('abdulazeez') ? 'abdulazeez' : authorName.toLowerCase().replace(/\s+/g, '-');
  const authorInitial = authorName.charAt(0).toUpperCase();
  const dateStr = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
  const catName = post.categories?.[0]?.category.name.toUpperCase() || 'NEWS';

  return (
    <div className="page-wrapper" style={{ background: '#ffffff' }}>
      <Header />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackView type="postView" id={post.slug} />

      <style dangerouslySetInnerHTML={{__html: `
        .post-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 60px 20px 100px;
        }

        .post-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 40px;
        }

        .post-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 24px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          flex-wrap: wrap;
        }

        .meta-avatar {
          width: 24px;
          height: 24px;
          background: #2563eb;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .meta-separator {
          color: #cbd5e1;
        }

        .post-image-container {
          width: 100%;
          margin-bottom: 50px;
        }

        .post-image-container img {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
          border-radius: 4px;
        }

        .post-content {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #334155;
        }

        .post-content p {
          margin-bottom: 1.5em;
        }

        .post-content h2, .post-content h3 {
          color: #0f172a;
          margin-top: 2em;
          margin-bottom: 1em;
          font-weight: 700;
        }

        .comment-section {
          max-width: 800px;
          margin: 80px auto 0;
          border-top: 1px solid #e2e8f0;
          padding-top: 60px;
        }

        .comment-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .comment-subtitle {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 24px;
        }

        .required-star {
          color: #ef4444;
        }

        .comment-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #334155;
          background: #ffffff;
          transition: border-color 0.2s;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #2563eb;
        }

        .form-textarea {
          resize: vertical;
          min-height: 200px;
          margin-bottom: 20px;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          color: #64748b;
        }

        .checkbox-row input[type="checkbox"] {
          width: 16px;
          height: 16px;
          border: 1px solid #cbd5e1;
          border-radius: 3px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .comment-form-grid {
            grid-template-columns: 1fr;
          }
          .post-title {
            font-size: 2rem;
          }
        }
      `}} />

      <main className="post-container">
        
        {/* Header */}
        <header className="post-header">
          <h1 className="post-title">
            {post.title}
          </h1>

          <div className="post-meta">
            {authorSlug === 'abdulazeez' ? (
              <img src="/img/abdulazeez.jpg" alt={authorName} className="meta-avatar" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="meta-avatar">{authorInitial}</div>
            )}
            <Link href={`/author/${authorSlug}`} style={{ textDecoration: 'none', color: 'inherit' }} className="hover-text-primary">
              {authorName}
            </Link>
            <span className="meta-separator">/</span>
            <span>{dateStr}</span>
            <span className="meta-separator">/</span>
            <span style={{ color: '#0f172a' }}>{catName}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="post-image-container">
          <img 
            src={post.featuredImage || '/img/placeholder.svg'} 
            alt={post.title} 
          />
        </div>

        {/* Content */}
        <article className="post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ maxWidth: '800px', margin: '40px auto 0', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Tags:</span>
            {post.tags.map(pt => (
              <Link 
                key={pt.tagId} 
                href={`/blog/tag/${pt.tag.slug}`}
                style={{ 
                  padding: '6px 14px', 
                  background: '#f1f5f9', 
                  color: '#475569', 
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600'
                }}
              >
                #{pt.tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Comment Section Mockup */}
        <section className="comment-section">
          <h3 className="comment-title">Leave a Reply</h3>
          <p className="comment-subtitle">
            Your email address will not be published. Required fields are marked <span className="required-star">*</span>
          </p>

          <form>
            <div className="comment-form-grid">
              <input type="text" placeholder="Name *" className="form-input" required />
              <input type="email" placeholder="Email *" className="form-input" required />
              <input type="url" placeholder="Website" className="form-input" />
            </div>
            
            <textarea placeholder="Add Comment *" className="form-textarea" required></textarea>
            
            <div className="checkbox-row">
              <input type="checkbox" id="save-info" />
              <label htmlFor="save-info">Save my name, email and website in this browser for the next time I comment.</label>
            </div>
            
            {/* Note: The submit button wasn't fully visible in the screenshot, but providing one completes the form properly */}
            <button type="button" style={{ 
              marginTop: '24px', 
              background: '#0f172a', 
              color: 'white', 
              padding: '14px 32px', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}>
              Post Comment
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
