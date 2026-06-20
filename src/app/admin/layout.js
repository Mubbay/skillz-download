'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './admin.css'; // Import the new responsive CSS
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Image,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronRight,
  Bell,
  Search,
  Users,
  BarChart3,
  Code,
  User,
  Bot
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/autoblog', label: 'Auto-Blogger', icon: Bot },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/tags', label: 'Tags', icon: Tags },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/seo', label: 'SEO', icon: Code },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/profile', label: 'Profile', icon: User },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user info
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-wrapper">
      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <Link href="/admin" className="admin-brand">
          <div className="admin-brand-icon">
            <Zap size={20} />
          </div>
          <div>
            <span className="admin-brand-text">Skillz Download</span>
            <span className="admin-brand-sub">Admin Panel</span>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="admin-nav-section">
          <div className="admin-nav-label">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${active ? 'active' : ''}`}
              >
                <Icon className="admin-nav-icon" />
                <span>{item.label}</span>
                {active && <span className="admin-nav-dot" />}
              </Link>
            );
          })}

          <div className="admin-sidebar-sep" />

          <div className="admin-nav-label">Quick Links</div>
          <Link
            href="/"
            target="_blank"
            className="admin-nav-item viewsite"
          >
            <ExternalLink className="admin-nav-icon" />
            <span>View Site</span>
            <ChevronRight
              size={14}
              style={{ marginLeft: 'auto', opacity: 0.4 }}
            />
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <button
            onClick={handleLogout}
            className="admin-nav-item logout"
          >
            <LogOut className="admin-nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-hamburger"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="admin-search">
              <Search size={16} />
              <span>Search anything…</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <button className="admin-notif" aria-label="Notifications">
              <Bell size={20} />
              <span className="admin-notif-dot" />
            </button>
            <div className="admin-user">
              <div className="admin-avatar">
                {(user?.name?.includes('Abdulazeez') || !user?.name || user?.name === 'Admin') ? (
                  <img src="/img/abdulazeez.jpg" alt="Admin Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <div className="admin-user-info">
                <div className="admin-username">{user?.name || 'Admin'}</div>
                <div className="admin-userrole">{user?.role || 'Administrator'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
