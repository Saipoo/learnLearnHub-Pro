import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { authAPI } from '../lib/api';
import styles from '../styles/Auth.module.css';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(formData.email, formData.password);
      const { access_token } = response.data;

      Cookies.set('token', access_token, { expires: 7 });
      toast.success('Registration successful!');
      router.push('/complete-profile');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - LearnHub Pro</title>
        <meta name="description" content="Create your LearnHub Pro account" />
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
            <h1>Create Account</h1>
            <p>Start your learning journey today</p>
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
                  placeholder="Create a password (min 6 characters)"
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

            <div className="form-group">
              <label className="form-label">
                <FiLock /> Confirm Password
              </label>
              <div className={styles.passwordInputWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Creating account...' : (
                <>
                  Create Account
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className={styles.formFooter}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles.link}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
