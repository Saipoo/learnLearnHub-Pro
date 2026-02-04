import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import { authAPI, profileAPI, quizAPI } from '../../lib/api';
import styles from '../../styles/QuizTake.module.css';
import { FiArrowLeft, FiClock, FiCheck, FiX } from 'react-icons/fi';

export default function TakeQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
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
      const [userRes, profileRes, quizRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
        quizAPI.getById(id as string),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setQuiz(quizRes.data);
      setAnswers(new Array(quizRes.data.questions.length).fill(-1));
    } catch (error) {
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const response = await quizAPI.submit(id as string, answers);
      setResult(response.data);
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (result) {
    return (
      <>
        <Head>
          <title>Quiz Result - LearnHub Pro</title>
        </Head>

        <Layout user={user} profile={profile}>
          <div className={styles.result}>
            <div className={styles.resultCard}>
              <div className={`${styles.resultIcon} ${result.passed ? styles.passed : styles.failed}`}>
                {result.passed ? <FiCheck size={64} /> : <FiX size={64} />}
              </div>
              <h1>{result.passed ? 'Congratulations!' : 'Keep Practicing!'}</h1>
              <p className={styles.resultMessage}>
                {result.passed
                  ? 'You have successfully passed the quiz!'
                  : 'You need more practice to pass this quiz.'}
              </p>

              <div className={styles.scoreDisplay}>
                <div className={styles.scoreValue}>{result.score.toFixed(1)}%</div>
                <div className={styles.scoreLabel}>Your Score</div>
              </div>

              <div className={styles.resultStats}>
                <div className={styles.resultStat}>
                  <div className={styles.resultStatValue}>{result.correct_answers}</div>
                  <div className={styles.resultStatLabel}>Correct</div>
                </div>
                <div className={styles.resultStat}>
                  <div className={styles.resultStatValue}>
                    {result.total_questions - result.correct_answers}
                  </div>
                  <div className={styles.resultStatLabel}>Incorrect</div>
                </div>
                <div className={styles.resultStat}>
                  <div className={styles.resultStatValue}>{result.total_questions}</div>
                  <div className={styles.resultStatLabel}>Total</div>
                </div>
              </div>

              <div className={styles.resultActions}>
                <Link href="/quizzes" className="btn btn-primary">
                  View All Results
                </Link>
                <Link href="/courses" className="btn btn-outline">
                  Browse More Courses
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <>
      <Head>
        <title>{quiz.title} - LearnHub Pro</title>
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.quiz}>
          <Link href={`/courses/${quiz.course_id}`} className={styles.backLink}>
            <FiArrowLeft /> Back to Course
          </Link>

          <div className={styles.quizHeader}>
            <div>
              <h1>{quiz.title}</h1>
              <p>{quiz.description}</p>
            </div>
            {quiz.time_limit && (
              <div className={styles.timer}>
                <FiClock size={20} />
                <span>{quiz.time_limit} min</span>
              </div>
            )}
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${progress}%` }} />
          </div>

          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionNumber}>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
            </div>

            <h2 className={styles.questionText}>{question.question}</h2>

            <div className={styles.options}>
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`${styles.option} ${
                    answers[currentQuestion] === index ? styles.selected : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className={styles.optionRadio}>
                    {answers[currentQuestion] === index && <div className={styles.optionRadioInner} />}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navigation}>
            <button
              className="btn btn-outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            <div className={styles.questionIndicators}>
              {quiz.questions.map((_: any, index: number) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentQuestion ? styles.indicatorActive : ''
                  } ${answers[index] !== -1 ? styles.indicatorAnswered : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
