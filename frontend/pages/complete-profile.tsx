import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { profileAPI } from '../lib/api';
import styles from '../styles/Auth.module.css';
import { FiUser, FiPhone, FiCalendar, FiFileText, FiImage, FiCheck, FiUpload } from 'react-icons/fi';

export default function CompleteProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    dob: '',
    bio: '',
    profile_picture: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, profile_picture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile_number) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await profileAPI.create(formData);
      toast.success('Profile completed successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Complete Your Profile - LearnHub Pro</title>
      </Head>

      <div className={styles.profileContainer}>
        <div className={styles.profileWrapper}>
          <div className={styles.formHeader}>
            <h1>Complete Your Profile</h1>
            <p>Tell us a bit about yourself to get started</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label">
                <FiUser /> Full Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiPhone /> Mobile Number <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter your mobile number"
                value={formData.mobile_number}
                onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiCalendar /> Date of Birth
              </label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiFileText /> Bio
              </label>
              <textarea
                className="form-input"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiImage /> Profile Picture (optional)
              </label>
              <div className={styles.uploadArea}>
                {imagePreview ? (
                  <div className={styles.imagePreviewContainer}>
                    <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                    <button
                      type="button"
                      className={styles.changeImageBtn}
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, profile_picture: '' });
                      }}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.uploadIcon}>
                      <FiUpload size={32} />
                    </div>
                    <p className={styles.uploadText}>Click to upload image</p>
                    <p className={styles.uploadHint}>PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Saving...' : (
                <>
                  Complete Profile
                  <FiCheck />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
