'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

import { calculateSeoScore } from '@/lib/seo-scorer';
import {
  Save,
  Eye,
  ArrowLeft,
  Check,
  AlertTriangle,
  Info,
  Loader2,
  FolderPlus,
  Plus,
  Compass,
  FileCheck,
  Globe,
  Settings,
  PenSquare
} from 'lucide-react';
import Link from 'next/link';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 1.2fr',
    gap: '32px',
    alignItems: 'start',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    position: 'sticky',
    top: '92px',
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--gray-500)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color var(--transition-fast)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--gray-700)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTitle: {
    fontSize: '1.75rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    padding: '16px 20px',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    outline: 'none',
    width: '100%',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
  },
  inputSlug: {
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    padding: '8px 12px',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-md)',
    width: '100%',
    background: 'var(--gray-50)',
    color: 'var(--gray-600)',
  },
  textareaContent: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    lineHeight: '1.7',
    padding: '24px',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    outline: 'none',
    width: '100%',
    minHeight: '400px',
    resize: 'vertical',
  },
  textareaExcerpt: {
    fontSize: '0.9rem',
    padding: '12px 16px',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    minHeight: '80px',
  },
  card: {
    background: 'white',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
    marginBottom: '16px',
    borderBottom: '1px solid var(--gray-100)',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  seoWidgetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  scoreGauge: (score) => {
    let color = 'var(--success-500)';
    if (score < 50) color = 'var(--accent-500)';
    else if (score < 80) color = 'var(--warning-500)';
    return {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: `radial-gradient(circle, white 55%, transparent 56%), conic-gradient(${color} 0% ${score}%, var(--gray-200) ${score}% 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '1.1rem',
      color: 'var(--gray-800)',
      flexShrink: 0,
    };
  },
  checkItem: (passed) => ({
    display: 'flex',
    gap: '10px',
    alignItems: 'start',
    fontSize: '0.85rem',
    marginBottom: '12px',
    lineHeight: '1.4',
    color: passed ? 'var(--gray-700)' : 'var(--gray-500)',
  }),
  checkIcon: (passed) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: passed ? '#ecfdf5' : '#fffbeb',
    color: passed ? 'var(--success-600)' : 'var(--warning-600)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
  }),
  checkboxList: {
    maxHeight: '160px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '4px',
    marginBottom: '12px',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: 'var(--gray-700)',
  },
  tagsInputWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '8px 12px',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-md)',
    background: 'white',
    alignItems: 'center',
  },
  tagBadge: {
    background: 'var(--primary-50)',
    color: 'var(--primary-700)',
    border: '1px solid var(--primary-100)',
    borderRadius: 'var(--radius-sm)',
    padding: '2px 8px',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  tagDeleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-500)',
    cursor: 'pointer',
    padding: 0,
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  quillWrapper: {
    backgroundColor: '#fff',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    border: '1px solid var(--gray-200)',
  }
};

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export default function PostEditor({ post = null }) {
  const router = useRouter();
  const isEdit = !!post;

  // Editor core state
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [status, setStatus] = useState(post?.status || 'draft');

  // SEO details
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(post?.focusKeyword || '');

  // Relations & metadata list
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(
    post?.categories?.map((c) => c.categoryId) || []
  );

  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState(
    post?.tags?.map((t) => t.tagId) || []
  );
  
  const [newTagName, setNewTagName] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);

  // Status flags
  const [saving, setSaving] = useState(false);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [error, setError] = useState('');

  // Live SEO scoring
  const [seoAnalysis, setSeoAnalysis] = useState({ score: 0, checks: [], wordCount: 0 });

  // Fetch categories and tags
  useEffect(() => {
    // Categories
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingCats(false));

    // Tags
    fetch('/api/admin/tags')
      .then((res) => res.json())
      .then((data) => {
        setTags(data.tags || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingTags(false));
  }, []);

  // Update SEO score dynamically as values change
  useEffect(() => {
    const analysis = calculateSeoScore({
      title,
      slug,
      content,
      seoTitle,
      seoDescription,
      focusKeyword,
    });
    setSeoAnalysis(analysis);
  }, [title, slug, content, seoTitle, seoDescription, focusKeyword]);

  // Handle auto slug generation
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!post) {
      // Auto generate slug if creating a new post
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  // Add Category inline
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create category');

      setCategories((prev) => [...prev, data.category].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedCategoryIds((prev) => [...prev, data.category.id]);
      setNewCatName('');
      setShowAddCat(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Add Tag inline
  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create tag');

      setTags((prev) => [...prev, data.tag].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedTagIds((prev) => [...prev, data.tag.id]);
      setNewTagName('');
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle Category Selection
  const handleCategoryToggle = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  // Toggle Tag Selection
  const handleTagToggle = (id) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  // Form Submit
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and Content are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status,
      seoTitle,
      seoDescription,
      focusKeyword,
      categoryIds: selectedCategoryIds,
      tagIds: selectedTagIds,
    };

    try {
      const url = isEdit ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save post');

      router.push('/admin/posts');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      {/* Top action bar */}
      <div style={styles.editorHeader}>
        <Link href="/admin/posts" style={styles.backLink}>
          <ArrowLeft size={16} /> Back to Posts
        </Link>

        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gray-200)',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="draft">Save as Draft</option>
            <option value="published">Publish Immediately</option>
          </select>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ display: 'inline-flex', gap: '8px' }}>
            {saving ? (
              <>
                <Loader2 className="spinner" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdit ? 'Update Post' : 'Publish Post'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', color: 'var(--accent-700)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <span style={{ fontSize: '0.9rem' }}>{error}</span>
        </div>
      )}

      {/* Editor Main Content Grid */}
      <div style={styles.container}>
        {/* Left Column - Core Fields */}
        <div style={styles.leftColumn}>
          {/* Post Title */}
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Add post title..."
              value={title}
              onChange={handleTitleChange}
              style={styles.inputTitle}
              required
            />
          </div>

          {/* Slug */}
          <div style={styles.formGroup}>
            <span style={styles.label}>Permalink URL slug</span>
            <input
              type="text"
              placeholder="post-url-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              style={styles.inputSlug}
              required
            />
          </div>

          {/* Post Body (Gutenberg Content editor) */}
          <div style={styles.formGroup}>
            <span style={styles.label}>
              Post content (HTML or plain text supported)
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 400 }}>
                {seoAnalysis.wordCount} words | {seoAnalysis.readingTime} min read
              </span>
            </span>
            <div style={styles.quillWrapper}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                style={{ height: '400px', paddingBottom: '42px' }}
                placeholder="Start writing your beautiful SEO-rich article with headings, images, and formatting..."
              />
            </div>
          </div>

          {/* Excerpt */}
          <div style={styles.formGroup}>
            <span style={styles.label}>Post excerpt (SEO Snippet text)</span>
            <textarea
              placeholder="Write a short summary (excerpt) for listing cards..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              style={styles.textareaExcerpt}
            />
          </div>

          {/* Featured Image */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Featured Image URL</h3>
            <div style={styles.formGroup}>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or upload image"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                Paste the URL of an image that will appear as the card background header.
              </span>
              {featuredImage && (
                <div style={{ marginTop: '12px', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '6px', width: 'fit-content' }}>
                  <img
                    src={featuredImage}
                    alt="Featured Image Preview"
                    style={{ maxHeight: '120px', borderRadius: 'var(--radius-sm)', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* RankMath Advanced SEO Box */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>RankMath SEO Meta Configuration</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={styles.formGroup}>
                <span style={styles.label}>Focus Keyword</span>
                <input
                  type="text"
                  placeholder="e.g. download youtube videos"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={styles.formGroup}>
                <span style={styles.label}>SEO Title tag</span>
                <input
                  type="text"
                  placeholder="Leave empty to use main title"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={styles.formGroup}>
                <span style={styles.label}>SEO Meta Description tag</span>
                <textarea
                  placeholder="Short, keyword-rich paragraph (120-160 chars)"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  style={styles.textareaExcerpt}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sideboxes & RankMath Widget */}
        <div style={styles.rightColumn}>
          {/* RankMath Widget */}
          <div style={styles.card}>
            <div style={styles.seoWidgetHeader}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={18} style={{ color: 'var(--primary-500)' }} />
                  RankMath SEO
                </h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Live Assistant</span>
              </div>
              <div style={styles.scoreGauge(seoAnalysis.score)}>
                {seoAnalysis.score}
              </div>
            </div>

            {/* Keyword validation notice */}
            {!focusKeyword.trim() ? (
              <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 'var(--radius-md)', padding: '12px', color: '#b45309', display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Enter a Focus Keyword to trigger the live SEO checklist analysis.</span>
              </div>
            ) : (
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '12px' }}>
                  {seoAnalysis.message}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {seoAnalysis.checks.map((chk, index) => (
                    <div key={index} style={styles.checkItem(chk.passed)}>
                      <span style={styles.checkIcon(chk.passed)}>
                        {chk.passed ? <Check size={12} /> : <AlertTriangle size={12} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: chk.passed ? 600 : 500 }}>{chk.name}</div>
                        {!chk.passed && chk.tip && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '2px' }}>
                            {chk.tip}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Categories card */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Categories</h3>
            
            {loadingCats ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                <Loader2 className="spinner" size={14} />
                <span>Loading categories...</span>
              </div>
            ) : (
              <div>
                <div style={styles.checkboxList}>
                  {categories.map((cat) => (
                    <label key={cat.id} style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={selectedCategoryIds.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>

                {!showAddCat ? (
                  <button
                    type="button"
                    onClick={() => setShowAddCat(true)}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.8rem', display: 'flex', gap: '4px', alignItems: 'center' }}
                  >
                    <Plus size={14} /> Add New Category
                  </button>
                ) : (
                  <div style={{ marginTop: '12px', borderTop: '1px solid var(--gray-100)', paddingTop: '12px' }}>
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.85rem', marginBottom: '8px' }}
                    />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      >
                        Add Category
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCat(false)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags card */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Tags Selection</h3>

            {loadingTags ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                <Loader2 className="spinner" size={14} />
                <span>Loading tags...</span>
              </div>
            ) : (
              <div>
                <div style={{ ...styles.checkboxList, maxHeight: '120px' }}>
                  {tags.map((tag) => (
                    <label key={tag.id} style={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={selectedTagIds.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                      />
                      <span>#{tag.name.toLowerCase()}</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', borderTop: '1px solid var(--gray-100)', paddingTop: '12px' }}>
                  <input
                    type="text"
                    placeholder="New tag (e.g. guide)"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    style={{ flex: 1, padding: '6px 10px', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', padding: '6px 10px', fontSize: '0.8rem' }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
