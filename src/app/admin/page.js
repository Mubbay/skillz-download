'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  FolderTree,
  PenSquare,
  Globe,
  Settings as SettingsIcon,
  TrendingUp,
  FileCheck,
  FileEdit,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  Plus
} from 'lucide-react';
import './admin.css';

const styles = {
  welcomeCard: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    borderRadius: 'var(--radius-2xl)',
    padding: '36px',
    color: 'white',
    marginBottom: '32px',
    boxShadow: 'var(--shadow-lg)',
    position: 'relative',
    overflow: 'hidden',
  },
  welcomeOrb: {
    position: 'absolute',
    right: '-10%',
    top: '-20%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    pointerEvents: 'none',
  },
  statCard: {
    padding: '24px',
    borderRadius: 'var(--radius-xl)',
    background: 'white',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-100)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
    cursor: 'default',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  actionCard: {
    padding: '20px',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--gray-200)',
    background: 'white',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 200ms ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    minWidth: '600px', /* Ensure it doesn't squish too much before scrolling */
  },
  th: {
    background: 'var(--gray-50)',
    padding: '16px 24px',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--gray-500)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--gray-100)',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '16px 24px',
    fontSize: '0.9rem',
    color: 'var(--gray-700)',
    borderBottom: '1px solid var(--gray-100)',
  },
  seoBadge: (score) => {
    let bg = '#ecfdf5';
    let color = '#10b981';
    if (score < 50) {
      bg = '#fff1f3';
      color = '#f43f5e';
    } else if (score < 80) {
      bg = '#fffbeb';
      color = '#f59e0b';
    }
    return {
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      background: bg,
      color: color,
      fontWeight: 600,
      fontSize: '0.75rem',
      display: 'inline-block',
    };
  },
  statusBadge: (status) => {
    const isPublished = status === 'published';
    return {
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      background: isPublished ? '#ecfdf5' : '#f3f4f6',
      color: isPublished ? '#10b981' : '#4b5563',
      fontWeight: 500,
      fontSize: '0.75rem',
      textTransform: 'capitalize',
      display: 'inline-block',
    };
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 0',
    color: 'var(--gray-500)',
    gap: '12px',
  },
  errorContainer: {
    background: 'var(--accent-50)',
    border: '1px solid var(--accent-200)',
    color: 'var(--accent-700)',
    padding: '20px',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load stats');
        return res.json();
      })
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="spinner" size={40} style={{ color: 'var(--primary-600)' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Loading dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={24} />
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>Error Loading Stats</h4>
          <p style={{ fontSize: '0.9rem' }}>{error}</p>
        </div>
      </div>
    );
  }

  const statCardsData = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: <FileText size={24} />,
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: <FileCheck size={24} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: <FileEdit size={24} />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: <FolderTree size={24} />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    },
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Welcome Card */}
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeOrb} />
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
          Welcome back to Skillz Download!
        </h1>
        <p style={{ opacity: 0.9, maxWidth: '600px', lineHeight: 1.6 }}>
          Manage download statistics, categories, blog posts, and boost your SEO using the live RankMath assistant widget. Ready to publish another SEO-optimized guide?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statCardsData.map((card, idx) => (
          <div
            key={idx}
            style={{
              ...styles.statCard,
              ...(hoveredCard === `stat-${idx}` ? { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-md)' } : {}),
            }}
            onMouseEnter={() => setHoveredCard(`stat-${idx}`)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ ...styles.statIcon, background: card.gradient }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)', fontWeight: 500 }}>{card.title}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-800)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Content */}
      <div className="admin-split-grid">
        {/* Left Side: Recent Posts */}
        <div>
          <h2 style={styles.sectionTitle}>
            <FileText size={20} style={{ color: 'var(--primary-600)' }} />
            Recent Blog Posts
          </h2>

          <div className="table-responsive">
            {stats.recentPosts.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-400)' }}>
                <FileText size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                <p style={{ fontWeight: 500 }}>No posts found. Start by creating one!</p>
                <Link href="/admin/posts/new" className="btn btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>
                  <Plus size={14} /> Create Post
                </Link>
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Title</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Categories</th>
                    <th style={styles.th}>SEO Score</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPosts.map((post) => (
                    <tr key={post.id}>
                      <td style={{ ...styles.td, fontWeight: 600 }}>
                        <Link href={`/admin/posts/edit/${post.id}`} style={{ color: 'var(--gray-800)', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.statusBadge(post.status)}>{post.status}</span>
                      </td>
                      <td style={styles.td}>
                        {post.categories.map((c) => c.category.name).join(', ') || 'Uncategorized'}
                      </td>
                      <td style={styles.td}>
                        <span style={styles.seoBadge(post.seoScore)}>{post.seoScore}/100</span>
                      </td>
                      <td style={{ ...styles.td, color: 'var(--gray-400)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Side: Quick Actions & SEO Health */}
        <div>
          <h2 style={styles.sectionTitle}>
            <PenSquare size={20} style={{ color: 'var(--success-600)' }} />
            Quick Actions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <Link
              href="/admin/posts/new"
              style={{
                ...styles.actionCard,
                ...(hoveredCard === 'action-new' ? { transform: 'translateY(-2px)', borderColor: 'var(--primary-300)', boxShadow: 'var(--shadow-sm)' } : {}),
              }}
              onMouseEnter={() => setHoveredCard('action-new')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f3ff', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-800)' }}>New Post</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '2px' }}>Gutenberg-style editor</div>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              style={{
                ...styles.actionCard,
                ...(hoveredCard === 'action-view' ? { transform: 'translateY(-2px)', borderColor: 'var(--success-300)', boxShadow: 'var(--shadow-sm)' } : {}),
              }}
              onMouseEnter={() => setHoveredCard('action-view')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: 'var(--success-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-800)' }}>View Site</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '2px' }}>Open user frontend</div>
              </div>
            </Link>
          </div>

          <h2 style={styles.sectionTitle}>
            <TrendingUp size={20} style={{ color: 'var(--info-600)' }} />
            SEO Performance
          </h2>

          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'radial-gradient(circle, white 55%, transparent 56%), conic-gradient(var(--success-500) 0% ' + (stats.averageSeoScore || 0) + '%, var(--gray-200) ' + (stats.averageSeoScore || 0) + '% 100%)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-800)', fontFamily: 'var(--font-heading)' }}>
                  {stats.averageSeoScore || 0}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase' }}>Avg Score</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>RankMath Integration</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', lineHeight: '1.5' }}>
              Your average SEO Score is based on title keywords, text density, internal link checks, and outline structures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
