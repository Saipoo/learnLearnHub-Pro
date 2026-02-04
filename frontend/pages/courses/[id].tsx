import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import { authAPI, profileAPI, courseAPI, enrollmentAPI, quizAPI } from '../../lib/api';
import { Course, Quiz } from '../../lib/types';
import { getYouTubeEmbedUrl } from '../../lib/utils';
import styles from '../../styles/CourseDetail.module.css';
import { FiBook, FiClock, FiAward, FiPlay, FiCheck, FiArrowLeft } from 'react-icons/fi';

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (id) {
      fetchData();
    }
  }, [router, id]);

  const fetchData = async () => {
    try {
      const [userRes, profileRes, courseRes, statusRes, quizzesRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
        courseAPI.getById(id as string),
        enrollmentAPI.checkStatus(id as string),
        quizAPI.getByCourse(id as string),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setCourse(courseRes.data);
      setIsEnrolled(statusRes.data.enrolled);
      setQuizzes(quizzesRes.data);
    } catch (error) {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollmentAPI.enroll(id as string);
      toast.success('Successfully enrolled in course!');
      setIsEnrolled(true);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <Head>
        <title>{course.title} - LearnHub Pro</title>
        <meta name="description" content={course.description} />
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.courseDetail}>
          <Link href="/courses" className={styles.backLink}>
            <FiArrowLeft /> Back to Courses
          </Link>

          <div className={styles.hero}>
            {course.thumbnail && (
              <img src={course.thumbnail} alt={course.title} className={styles.heroImage} />
            )}
            <div className={styles.heroContent}>
              <div className={styles.badges}>
                <span className="badge badge-primary">{course.level}</span>
                <span className="badge badge-warning">{course.category}</span>
                {isEnrolled && (
                  <span className="badge badge-success">
                    <FiCheck size={12} /> Enrolled
                  </span>
                )}
              </div>
              <h1>{course.title}</h1>
              <p>{course.description}</p>
              <div className={styles.meta}>
                <span>
                  <FiBook /> {course.lessons.length} Lessons
                </span>
                {course.duration && (
                  <span>
                    <FiClock /> {course.duration}
                  </span>
                )}
                <span>
                  <FiAward /> {quizzes.length} Quizzes
                </span>
              </div>
              {!isEnrolled && (
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary btn-lg"
                  disabled={enrolling}
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>

          {isEnrolled && (
            <>
              <section className={styles.section}>
                <h2>
                  <FiPlay /> Course Lessons
                </h2>
                <div className={styles.lessons}>
                  {course.lessons.map((lesson, index) => (
                    <div key={index} className={styles.lesson}>
                      <div className={styles.lessonHeader}>
                        <h3>
                          {index + 1}. {lesson.title}
                        </h3>
                        {lesson.duration && (
                          <span className={styles.duration}>
                            <FiClock size={14} /> {lesson.duration}
                          </span>
                        )}
                      </div>
                      {lesson.description && <p>{lesson.description}</p>}
                      <div className={styles.videoContainer}>
                        <iframe
                          src={getYouTubeEmbedUrl(lesson.youtube_url)}
                          title={lesson.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {quizzes.length > 0 && (
                <section className={styles.section}>
                  <h2>
                    <FiAward /> Course Quizzes
                  </h2>
                  <div className={styles.quizzes}>
                    {quizzes.map((quiz) => (
                      <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
                        <div className={styles.quizCard}>
                          <h3>{quiz.title}</h3>
                          {quiz.description && <p>{quiz.description}</p>}
                          <div className={styles.quizMeta}>
                            <span>{quiz.total_questions} Questions</span>
                            <span>Passing: {quiz.passing_score}%</span>
                            {quiz.time_limit && <span>{quiz.time_limit} minutes</span>}
                          </div>
                          <button className="btn btn-primary">
                            Take Quiz <FiPlay />
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
