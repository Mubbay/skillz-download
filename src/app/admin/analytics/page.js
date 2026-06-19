'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Activity, Eye, Play, List, Globe, Loader2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Loader2 className="spinner" size={40} /></div>;
  }

  return (
    <div className="card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <BarChart3 size={32} style={{ color: 'var(--primary-600)' }} />
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Analytics Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ padding: '24px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '1px solid #ddd6fe' }}>
          <div style={{ color: 'var(--primary-700)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} /> Global Page Views
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-900)' }}>
            {data.globalViews.toLocaleString()}
          </div>
        </div>
        
        <div style={{ padding: '24px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #a7f3d0' }}>
          <div style={{ color: 'var(--success-700)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={18} /> Total Tool Uses
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--success-900)' }}>
            {data.toolStats.reduce((acc, curr) => acc + curr.usageCount, 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Tool Stats */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} /> Tool Usage Stats
          </h2>
          <div className="table-wrapper" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                  <th style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Tool Name</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Uses</th>
                </tr>
              </thead>
              <tbody>
                {data.toolStats.map(tool => (
                  <tr key={tool.toolId} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{tool.name}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--primary-600)', fontWeight: 700 }}>{tool.usageCount.toLocaleString()}</td>
                  </tr>
                ))}
                {data.toolStats.length === 0 && (
                  <tr><td colSpan="2" style={{ padding: '16px', textAlign: 'center', color: 'var(--gray-500)' }}>No tool usage recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Posts */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={20} /> Popular Blog Posts
          </h2>
          <div className="table-wrapper" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                  <th style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Post Title</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {data.popularPosts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <Link href={`/blog/${post.slug}`} target="_blank" style={{ color: 'var(--gray-800)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {post.title} <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--success-600)', fontWeight: 700 }}>{post.views.toLocaleString()}</td>
                  </tr>
                ))}
                {data.popularPosts.length === 0 && (
                  <tr><td colSpan="2" style={{ padding: '16px', textAlign: 'center', color: 'var(--gray-500)' }}>No views recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <List size={20} /> Recent Tool History
        </h2>
        <div style={{ background: 'var(--gray-50)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', maxHeight: '300px', overflowY: 'auto' }}>
          {data.recentHistory.length === 0 ? (
            <p style={{ color: 'var(--gray-500)', textAlign: 'center', margin: 0 }}>No recent history.</p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.recentHistory.map(hist => (
                <li key={hist.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-500)' }} />
                    <span style={{ fontWeight: 600 }}>{hist.toolId}</span>
                    <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{hist.action}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>{new Date(hist.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
