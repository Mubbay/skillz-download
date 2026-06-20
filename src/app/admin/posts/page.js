'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
  },
  filtersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    minWidth: '260px',
    maxWidth: '400px',
  },
  searchInput: {
    paddingLeft: '44px',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--gray-400)',
    pointerEvents: 'none',
  },
  filterGroup: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  select: {
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--gray-200)',
    fontSize: '0.9rem',
    outline: 'none',
    background: 'white',
    cursor: 'pointer',
    color: 'var(--gray-700)',
  },
  tableWrapper: {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--gray-100)',
    boxShadow: 'var(--shadow-sm)',
    overflowX: 'auto',
    marginBottom: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px',
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
    textAlign: 'left',
  },
  td: {
    padding: '16px 24px',
    fontSize: '0.9rem',
    color: 'var(--gray-700)',
    borderBottom: '1px solid var(--gray-100)',
  },
  actionBtn: {
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
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
    };
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--gray-100)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 0',
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

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch posts
  const fetchPosts = () => {
    setLoading(true);
    let url = `/api/admin/posts?page=${page}&limit=10`;
    if (debouncedSearch) url += `&search=${encodeURIComponent(debouncedSearch)}`;
    if (status) url += `&status=${status}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setPagination(data.pagination);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [page, debouncedSearch, status]);

  // Handle post delete
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete post');
      }

      // Refresh list
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="spinner" size={40} style={{ color: 'var(--primary-600)' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Posts</h1>
        <Link href="/admin/posts/new" className="btn btn-primary" style={{ display: 'inline-flex', gap: '8px' }}>
          <Plus size={18} /> Add New Post
        </Link>
      </div>

      {/* Filters & Search */}
      <div style={styles.filtersRow}>
        <div style={styles.searchWrapper}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <Filter size={16} style={{ color: 'var(--gray-400)' }} />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            style={styles.select}
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {error && (
        <div style={{ ...styles.errorContainer, marginBottom: '24px' }}>
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {/* Posts Table */}
      <div style={styles.tableWrapper}>
        {posts.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center', color: 'var(--gray-400)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>No posts found</p>
            <p style={{ fontSize: '0.9rem' }}>Try adjusting your search criteria or create a new blog post.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Categories</th>
                <th style={styles.th}>Tags</th>
                <th style={styles.th}>SEO Score</th>
                <th style={styles.th}>Date</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ ...styles.td, fontWeight: 600, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(post.status)}>{post.status}</span>
                  </td>
                  <td style={styles.td}>
                    {post.categories.map((c) => c.category.name).join(', ') || <span style={{ color: 'var(--gray-300)' }}>—</span>}
                  </td>
                  <td style={styles.td}>
                    {post.tags.map((t) => t.tag.name).join(', ') || <span style={{ color: 'var(--gray-300)' }}>—</span>}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.seoBadge(post.seoScore)}>{post.seoScore}/100</span>
                  </td>
                  <td style={{ ...styles.td, color: 'var(--gray-400)', fontSize: '0.8rem' }}>
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="btn-ghost"
                        style={{ ...styles.actionBtn, color: 'var(--info-600)' }}
                        title="View post on frontend"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="btn-ghost"
                        style={{ ...styles.actionBtn, color: 'var(--primary-600)' }}
                        title="Edit post"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="btn-ghost"
                        style={{ ...styles.actionBtn, color: 'var(--accent-600)' }}
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={styles.pagination}>
          <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>
            Showing page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} posts total)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
              disabled={page === pagination.totalPages}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
