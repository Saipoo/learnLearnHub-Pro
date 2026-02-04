import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { FiHome, FiUser, FiBook, FiAward, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  user?: any;
  profile?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, user, profile }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const navItems = [
    { href: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { href: '/profile', icon: FiUser, label: 'Profile' },
    { href: '/courses', icon: FiBook, label: 'Courses' },
    { href: '/quizzes', icon: FiAward, label: 'Quizzes' },
  ];

  return (
    <div className={styles.layout}>
      {/* Desktop Sidebar */}
      <aside className={`${styles.sidebar} mobile-hidden`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logoLink}>
            <h1 className={styles.logo}>🎓 LearnHub Pro</h1>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                router.pathname === item.href ? styles.navItemActive : ''
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          {profile && (
            <div className={styles.userInfo}>
              <div className={`avatar ${styles.avatar}`}>
                {getInitials(profile.name)}
              </div>
              <div>
                <div className={styles.userName}>{profile.name}</div>
                <div className={styles.userEmail}>{profile.email}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className={`${styles.mobileHeader} desktop-hidden`}>
        <Link href="/" className={styles.mobileLogoLink}>
          <h1 className={styles.mobileLogo}>🎓 LearnHub Pro</h1>
        </Link>
        <button
          className={styles.menuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} desktop-hidden`}>
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavItem} ${
                  router.pathname === item.href ? styles.mobileNavItemActive : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className={styles.main}>{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className={`${styles.bottomNav} desktop-hidden`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomNavItem} ${
              router.pathname === item.href ? styles.bottomNavItemActive : ''
            }`}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
