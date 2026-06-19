'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PostEditor from '@/components/PostEditor';
import { Loader2, AlertCircle } from 'lucide-react';

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 0',
    color: 'var(--gray-500)',
    gap: '12px',
  },
  errorContainer: {
    background: 'var(--accent-50)',
    border: '1px solid var(--accent-200)',
    color: 'var(--accent-700)',
    padding: '24px',
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '500px',
    margin: '40px auto 0',
  },
};

export default function EditPostPage() {
  const params = useParams();
  const { id } = params;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    fetch(`/api/admin/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found or failed to load');
        return res.json();
      })
      .then((data) => {
        setPost(data.post);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="spinner" size={40} style={{ color: 'var(--primary-600)' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Loading post content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={32} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: '4px', fontSize: '1.05rem' }}>Error Loading Post</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-800)' }}>
          Edit Blog Post
        </h1>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginTop: '2px' }}>
          Update your article content, modify tags, or adjust SEO settings.
        </p>
      </div>

      <PostEditor post={post} />
    </div>
  );
}
