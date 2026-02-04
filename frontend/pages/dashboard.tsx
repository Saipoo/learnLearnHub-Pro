import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { authAPI, profileAPI, dashboardAPI } from '../lib/api';
import { DashboardStats } from '../lib/types';
import { getInitials, formatDate } from '../lib/utils';
import styles from '../styles/Dashboard.module.css';
import {
  FiBook,
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiTarget,
} from 'react-icons/fi';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [userRes, profileRes, statsRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
        dashboardAPI.getStats(),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setStats(statsRes.data);

      if (!userRes.data.profile_completed) {
        router.push('/complete-profile');
      }
    } catch (error: any) {
      toast.error('Failed to load dashboard');
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - LearnHub Pro</title>
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.dashboard}>
          {/* Welcome Section */}
          <div className={styles.welcome}>
            <div>
              <h1>Welcome back, {profile?.name?.split(' ')[0]}! 👋</h1>
              <p>Continue your learning journey</p>
            </div>
            <div className={`avatar avatar-xl ${styles.avatar}`}>
              {profile?.profile_picture ? (
                <img src={profile.profile_picture} alt={profile.name} />
              ) : (
                getInitials(profile?.name || '')
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#6366f1' }}>
                <FiBook size={24} />
              </div>
              <div>
                <div className={styles.statValue}>{stats?.enrolled_courses || 0}</div>
                <div className={styles.statLabel}>Enrolled Courses</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#10b981' }}>
                <FiCheckCircle size={24} />
              </div>
              <div>
                <div className={styles.statValue}>{stats?.completed_courses || 0}</div>
                <div className={styles.statLabel}>Completed</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#f59e0b' }}>
                <FiAward size={24} />
              </div>
              <div>
                <div className={styles.statValue}>{stats?.attempted_quizzes || 0}</div>
                <div className={styles.statLabel}>Quizzes Taken</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: '#8b5cf6' }}>
                <FiTrendingUp size={24} />
              </div>
              <div>
                <div className={styles.statValue}>{stats?.average_score.toFixed(1) || 0}%</div>
                <div className={styles.statLabel}>Average Score</div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className={styles.progressSection}>
            <div className={styles.progressCard}>
              <h3>
                <FiTarget /> Learning Progress
              </h3>
              <div className={styles.progressItem}>
                <div className={styles.progressInfo}>
                  <span>Total Courses Available</span>
                  <span>{stats?.total_courses || 0}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        stats?.total_courses
                          ? (stats.enrolled_courses / stats.total_courses) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className={styles.progressItem}>
                <div className={styles.progressInfo}>
                  <span>Course Completion Rate</span>
                  <span>
                    {stats?.enrolled_courses
                      ? Math.round(
                          (stats.completed_courses / stats.enrolled_courses) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        stats?.enrolled_courses
                          ? (stats.completed_courses / stats.enrolled_courses) * 100
                          : 0
                      }%`,
                      background: '#10b981',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={styles.activitySection}>
            {/* Recent Enrollments */}
            <div className="card">
              <h3 className={styles.sectionTitle}>
                <FiBook /> Recent Enrollments
              </h3>
              {stats?.recent_enrollments && stats.recent_enrollments.length > 0 ? (
                <div className={styles.activityList}>
                  {stats.recent_enrollments.map((enrollment: any, index: number) => (
                    <div key={index} className={styles.activityItem}>
                      <div>
                        <div className={styles.activityTitle}>
                          {enrollment.course_title}
                        </div>
                        <div className={styles.activityDate}>
                          <FiClock size={14} />
                          {formatDate(enrollment.enrolled_at)}
                        </div>
                      </div>
                      <div className={styles.progressBadge}>
                        {enrollment.progress}% Complete
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>
                  No enrollments yet.{' '}
                  <Link href="/courses" className={styles.link}>
                    Explore courses
                  </Link>
                </p>
              )}
            </div>

            {/* Recent Quiz Results */}
            <div className="card">
              <h3 className={styles.sectionTitle}>
                <FiAward /> Recent Quiz Results
              </h3>
              {stats?.recent_quiz_results && stats.recent_quiz_results.length > 0 ? (
                <div className={styles.activityList}>
                  {stats.recent_quiz_results.map((result: any, index: number) => (
                    <div key={index} className={styles.activityItem}>
                      <div>
                        <div className={styles.activityTitle}>{result.quiz_title}</div>
                        <div className={styles.activityDate}>
                          <FiClock size={14} />
                          {formatDate(result.attempted_at)}
                        </div>
                      </div>
                      <div
                        className={`badge ${
                          result.passed ? 'badge-success' : 'badge-danger'
                        }`}
                      >
                        {result.score.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>
                  No quiz attempts yet.{' '}
                  <Link href="/courses" className={styles.link}>
                    Start learning
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <Link href="/courses" className="btn btn-primary">
              <FiBook /> Browse Courses
            </Link>
            <Link href="/quizzes" className="btn btn-secondary">
              <FiAward /> Take Quiz
            </Link>
            <Link href="/profile" className="btn btn-outline">
              Edit Profile
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
