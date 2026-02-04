import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { authAPI, profileAPI, quizAPI } from '../lib/api';
import { QuizResult } from '../lib/types';
import { formatDate } from '../lib/utils';
import styles from '../styles/Quizzes.module.css';
import { FiAward, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function Quizzes() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
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
      const [userRes, profileRes, resultsRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
        quizAPI.getResults(),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setResults(resultsRes.data);
    } catch (error) {
      toast.error('Failed to load quiz results');
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
        <title>My Quiz Results - LearnHub Pro</title>
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.quizzes}>
          <h1>My Quiz Results</h1>
          <p className={styles.subtitle}>Track your quiz performance and progress</p>

          {results.length > 0 ? (
            <div className={styles.results}>
              {results.map((result) => (
                <div key={result.id} className={styles.resultCard}>
                  <div className={styles.resultHeader}>
                    <div>
                      <h3>Quiz Result</h3>
                      <div className={styles.date}>
                        <FiClock size={14} />
                        {formatDate(result.attempted_at)}
                      </div>
                    </div>
                    <div
                      className={`${styles.scoreCircle} ${
                        result.passed ? styles.passed : styles.failed
                      }`}
                    >
                      <div className={styles.scoreValue}>{result.score.toFixed(0)}%</div>
                      <div className={styles.scoreLabel}>
                        {result.passed ? 'Passed' : 'Failed'}
                      </div>
                    </div>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <FiAward size={20} />
                      <div>
                        <div className={styles.statValue}>
                          {result.correct_answers}/{result.total_questions}
                        </div>
                        <div className={styles.statLabel}>Correct Answers</div>
                      </div>
                    </div>
                    <div className={styles.stat}>
                      {result.passed ? (
                        <FiCheckCircle size={20} color="#10b981" />
                      ) : (
                        <FiXCircle size={20} color="#ef4444" />
                      )}
                      <div>
                        <div className={styles.statValue}>
                          {result.passed ? 'Passed' : 'Failed'}
                        </div>
                        <div className={styles.statLabel}>Status</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <FiAward size={64} />
              <h2>No quiz results yet</h2>
              <p>Start learning and take quizzes to see your results here</p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
