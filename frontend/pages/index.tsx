import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { FiBook, FiAward, FiTrendingUp, FiUsers, FiArrowRight, FiCheck, FiPlay, FiClock, FiTarget, FiStar } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in, redirect to dashboard
    const token = document.cookie.includes('token=');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>LearnHub Pro - Master Skills with Professional Courses</title>
        <meta name="description" content="LearnHub Pro offers comprehensive online courses in programming, design, marketing, and more. Start your learning journey today!" />
      </Head>

      <div className={styles.container}>
        {/* Navigation */}
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logoLink}>
              <h1 className={styles.navLogo}>🎓 LearnHub Pro</h1>
            </Link>
            <div className={styles.navButtons}>
              <button 
                onClick={() => router.push('/login')}
                className={styles.navBtn}
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/register')}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.badge}>
                <FiStar /> #1 Learning Platform 2026
              </div>
              <h1 className={styles.heroTitle}>
                Transform Your Career with
                <span className={styles.gradient}> World-Class Learning</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Join thousands of professionals mastering in-demand skills through our comprehensive 
                courses, interactive quizzes, and personalized learning paths.
              </p>
              <div className={styles.heroButtons}>
                <button 
                  onClick={() => router.push('/register')}
                  className="btn btn-primary btn-lg"
                >
                  Start Learning Free
                  <FiArrowRight />
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="btn btn-outline btn-lg"
                >
                  <FiPlay /> Watch Demo
                </button>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <strong>10+</strong>
                  <span>Expert Courses</span>
                </div>
                <div className={styles.stat}>
                  <strong>1000+</strong>
                  <span>Active Learners</span>
                </div>
                <div className={styles.stat}>
                  <strong>95%</strong>
                  <span>Success Rate</span>
                </div>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImage}>
                <div className={styles.floatingCard} style={{ top: '20%', left: '-10%' }}>
                  <FiBook className={styles.cardIcon} />
                  <span>Python Programming</span>
                </div>
                <div className={styles.floatingCard} style={{ top: '10%', right: '-5%' }}>
                  <FiAward className={styles.cardIcon} />
                  <span>Certificate Ready</span>
                </div>
                <div className={styles.floatingCard} style={{ bottom: '25%', left: '-5%' }}>
                  <FiTrendingUp className={styles.cardIcon} />
                  <span>Track Progress</span>
                </div>
                <div className={styles.heroImageCircle}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why LearnHub Pro Stands Out</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to master new skills and advance your career
            </p>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiBook size={40} />
              </div>
              <h3>Expert-Curated Courses</h3>
              <p>
                Access 10+ premium courses covering programming, web development, 
                machine learning, digital marketing, and more.
              </p>
              <ul className={styles.featureList}>
                <li><FiCheck /> Video lessons</li>
                <li><FiCheck /> Hands-on projects</li>
                <li><FiCheck /> Lifetime access</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiAward size={40} />
              </div>
              <h3>Interactive Assessments</h3>
              <p>
                Test your knowledge with comprehensive quizzes designed to 
                reinforce learning and measure progress.
              </p>
              <ul className={styles.featureList}>
                <li><FiCheck /> MCQ quizzes</li>
                <li><FiCheck /> Instant feedback</li>
                <li><FiCheck /> Performance analytics</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiTrendingUp size={40} />
              </div>
              <h3>Progress Tracking</h3>
              <p>
                Monitor your learning journey with detailed analytics and 
                insights to stay motivated and on track.
              </p>
              <ul className={styles.featureList}>
                <li><FiCheck /> Personal dashboard</li>
                <li><FiCheck /> Achievement system</li>
                <li><FiCheck /> Learning streaks</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FiUsers size={40} />
              </div>
              <h3>Career Growth</h3>
              <p>
                Build industry-relevant skills that employers value and 
                accelerate your professional development.
              </p>
              <ul className={styles.featureList}>
                <li><FiCheck /> Industry-relevant</li>
                <li><FiCheck /> Practical skills</li>
                <li><FiCheck /> Portfolio projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <FiUsers className={styles.statIcon} />
              <h3>5,000+</h3>
              <p>Happy Students</p>
            </div>
            <div className={styles.statCard}>
              <FiBook className={styles.statIcon} />
              <h3>10+</h3>
              <p>Premium Courses</p>
            </div>
            <div className={styles.statCard}>
              <FiClock className={styles.statIcon} />
              <h3>150+</h3>
              <p>Hours of Content</p>
            </div>
            <div className={styles.statCard}>
              <FiTarget className={styles.statIcon} />
              <h3>95%</h3>
              <p>Completion Rate</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Future?</h2>
            <p>Join thousands of learners who are already advancing their careers with LearnHub Pro</p>
            <div className={styles.ctaButtons}>
              <button 
                onClick={() => router.push('/register')}
                className="btn btn-primary btn-lg"
              >
                Create Free Account
                <FiArrowRight />
              </button>
              <button 
                onClick={() => router.push('/login')}
                className="btn btn-outline btn-lg"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Sign In Instead
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerLogo}>🎓 LearnHub Pro</h3>
              <p>Empowering learners worldwide with quality education.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Platform</h4>
                <Link href="/courses">Courses</Link>
                <Link href="/quizzes">Quizzes</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
              <div className={styles.footerColumn}>
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Contact</a>
                <a href="#">Careers</a>
              </div>
              <div className={styles.footerColumn}>
                <h4>Legal</h4>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 LearnHub Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
