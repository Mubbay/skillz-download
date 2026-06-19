'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
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

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f8f9fc',
  },

  /* ── Sidebar ── */
  sidebar: {
    width: 'var(--sidebar-width)',
    minWidth: 'var(--sidebar-width)',
    background: 'linear-gradient(180deg, #4c1d95 0%, #5b21b6 20%, #6d28d9 45%, #7c3aed 70%, #8b5cf6 100%)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 200,
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 24px rgba(76, 29, 149, 0.3)',
  },
  sidebarHidden: {
    transform: 'translateX(-100%)',
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 24px 20px',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    marginBottom: '8px',
  },
  brandIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fbbf24',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  },
  brandText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.15rem',
    color: 'white',
    letterSpacing: '-0.02em',
  },
  brandSub: {
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.55)',
    display: 'block',
    marginTop: '1px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  navSection: {
    flex: 1,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navSectionLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.65rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '16px 12px 8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 16px',
    borderRadius: 'var(--radius-md)',
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontFamily: 'var(--font-heading)',
    fontWeight: 500,
    fontSize: '0.9rem',
    transition: 'all 200ms ease',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left',
  },
  navItemHover: {
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
  },
  navItemActive: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontWeight: 600,
    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
  },
  navItemActiveDot: {
    position: 'absolute',
    right: '12px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#fbbf24',
    boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
  },
  navIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },
  separator: {
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    margin: '8px 16px',
  },
  sidebarFooter: {
    padding: '12px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },

  /* ── Overlay ── */
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 190,
    transition: 'opacity 300ms ease',
  },

  /* ── Main Area ── */
  mainArea: {
    flex: 1,
    marginLeft: 'var(--sidebar-width)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'margin-left 300ms ease',
  },

  /* ── Top Bar ── */
  topbar: {
    height: '64px',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: '2px solid var(--gray-200)',
    borderRadius: 'var(--radius-md)',
    padding: '8px',
    cursor: 'pointer',
    color: 'var(--gray-600)',
    transition: 'all 200ms ease',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--gray-100)',
    borderRadius: 'var(--radius-full)',
    padding: '8px 16px',
    color: 'var(--gray-400)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-body)',
    minWidth: '220px',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  notifBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: 'var(--radius-md)',
    color: 'var(--gray-500)',
    transition: 'all 200ms ease',
  },
  notifDot: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--accent-500)',
    border: '2px solid white',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '6px 12px 6px 6px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--gray-50)',
    border: '1px solid var(--gray-200)',
    cursor: 'default',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'var(--gradient-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '0.8rem',
    flexShrink: 0,
  },
  userName: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: '0.85rem',
    color: 'var(--gray-800)',
    lineHeight: 1.2,
  },
  userRole: {
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: '0.7rem',
    color: 'var(--gray-400)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },

  /* ── Content ── */
  content: {
    flex: 1,
    padding: '28px',
  },
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch user info
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // Track screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    <div style={styles.wrapper}>
      {/* ── Mobile Overlay ── */}
      {isMobile && sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          ...styles.sidebar,
          ...(isMobile && !sidebarOpen ? styles.sidebarHidden : {}),
        }}
      >
        {/* Brand */}
        <Link href="/admin" style={styles.sidebarBrand}>
          <div style={styles.brandIcon}>
            <Zap size={20} />
          </div>
          <div>
            <span style={styles.brandText}>Skillz Download</span>
            <span style={styles.brandSub}>Admin Panel</span>
          </div>
        </Link>

        {/* Nav Items */}
        <nav style={styles.navSection}>
          <div style={styles.navSectionLabel}>Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const hovered = hoveredNav === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  ...styles.navItem,
                  ...(active ? styles.navItemActive : {}),
                  ...(!active && hovered ? styles.navItemHover : {}),
                }}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Icon style={styles.navIcon} />
                <span>{item.label}</span>
                {active && <span style={styles.navItemActiveDot} />}
              </Link>
            );
          })}

          <div style={styles.separator} />

          <div style={styles.navSectionLabel}>Quick Links</div>
          <Link
            href="/"
            target="_blank"
            style={{
              ...styles.navItem,
              ...(hoveredNav === 'viewsite' ? styles.navItemHover : {}),
            }}
            onMouseEnter={() => setHoveredNav('viewsite')}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <ExternalLink style={styles.navIcon} />
            <span>View Site</span>
            <ChevronRight
              size={14}
              style={{ marginLeft: 'auto', opacity: 0.4 }}
            />
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div style={styles.sidebarFooter}>
          <button
            onClick={handleLogout}
            style={{
              ...styles.navItem,
              ...(hoveredNav === 'logout' ? { ...styles.navItemHover, background: 'rgba(244,63,94,0.2)' } : {}),
            }}
            onMouseEnter={() => setHoveredNav('logout')}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <LogOut style={styles.navIcon} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div
        style={{
          ...styles.mainArea,
          ...(isMobile ? { marginLeft: 0 } : {}),
        }}
      >
        {/* Top Bar */}
        <header style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                ...styles.hamburger,
                display: isMobile ? 'flex' : 'none',
              }}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div style={{
              ...styles.searchBox,
              ...(isMobile ? { display: 'none' } : {}),
            }}>
              <Search size={16} />
              <span>Search anything…</span>
            </div>
          </div>

          <div style={styles.topbarRight}>
            <button style={styles.notifBtn} aria-label="Notifications">
              <Bell size={20} />
              <span style={styles.notifDot} />
            </button>
            <div style={styles.userInfo}>
              <div style={{ ...styles.avatar, overflow: 'hidden' }}>
                {(user?.name?.includes('Abdulazeez') || !user?.name || user?.name === 'Admin') ? (
                  <img src="/img/abdulazeez.jpg" alt="Admin Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <div style={{ display: isMobile ? 'none' : 'block' }}>
                <div style={styles.userName}>{user?.name || 'Admin'}</div>
                <div style={styles.userRole}>{user?.role || 'Administrator'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={styles.content}>{children}</main>
      </div>
    </div>
  );
}
