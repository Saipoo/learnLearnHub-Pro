import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { authAPI, profileAPI, courseAPI, enrollmentAPI } from '../lib/api';
import { Course } from '../lib/types';
import styles from '../styles/Courses.module.css';
import { FiBook, FiClock, FiAward, FiPlay, FiCheck } from 'react-icons/fi';

export default function Courses() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
      const [userRes, profileRes, coursesRes, enrollmentsRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
        courseAPI.getAll(),
        enrollmentAPI.getAll(),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setCourses(coursesRes.data);
      setEnrollments(enrollmentsRes.data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.course_id === courseId);
  };

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(c => isEnrolled(c.id));

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
        <title>Courses - LearnHub Pro</title>
        <meta name="description" content="Browse and enroll in professional courses" />
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.courses}>
          <div className={styles.header}>
            <div>
              <h1>Explore Courses</h1>
              <p>Master new skills with our comprehensive course library</p>
            </div>
            <div className={styles.filters}>
              <button
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setFilter('all')}
              >
                All Courses ({courses.length})
              </button>
              <button
                className={`btn ${filter === 'enrolled' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setFilter('enrolled')}
              >
                My Courses ({enrollments.length})
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            {filteredCourses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <div className={styles.courseCard}>
                  {course.thumbnail && (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className={styles.thumbnail}
                    />
                  )}
                  <div className={styles.content}>
                    <div className={styles.badges}>
                      <span className="badge badge-primary">{course.level}</span>
                      {isEnrolled(course.id) && (
                        <span className="badge badge-success">
                          <FiCheck size={12} /> Enrolled
                        </span>
                      )}
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className={styles.meta}>
                      <span>
                        <FiBook size={14} /> {course.lessons.length} Lessons
                      </span>
                      {course.duration && (
                        <span>
                          <FiClock size={14} /> {course.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className={styles.empty}>
              <FiBook size={64} />
              <h2>No courses found</h2>
              <p>
                {filter === 'enrolled' 
                  ? 'You haven\'t enrolled in any courses yet.' 
                  : 'No courses available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
