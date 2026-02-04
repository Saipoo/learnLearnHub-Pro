import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { authAPI } from '../lib/api';
import styles from '../styles/Auth.module.css';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      const { access_token, user } = response.data;

      Cookies.set('token', access_token, { expires: 7 });
      toast.success('Login successful!');

      if (!user.profile_completed) {
        router.push('/complete-profile');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - LearnHub Pro</title>
        <meta name="description" content="Login to your LearnHub Pro account" />
      </Head>

      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.authHeader}>
            <Link href="/" className={styles.backButton}>
              <FiArrowLeft /> Back to Home
            </Link>
            <Link href="/" className={styles.logoLink}>
              <h2 className={styles.logoText}>🎓 LearnHub Pro</h2>
            </Link>
          </div>

          <div className={styles.formHeader}>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label">
                <FiMail /> Email Address
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiLock /> Password
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className={styles.formFooter}>
            <p>
              Don't have an account?{' '}
              <Link href="/register" className={styles.link}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
