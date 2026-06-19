import PostEditor from '@/components/PostEditor';

export const metadata = {
  title: 'Add New Post - Skillz Download Admin',
};

export default function NewPostPage() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-800)' }}>
          Create New Blog Post
        </h1>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', marginTop: '2px' }}>
          Compose a new article and check your SEO optimization indicators.
        </p>
      </div>
      
      <PostEditor />
    </div>
  );
}
