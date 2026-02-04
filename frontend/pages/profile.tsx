import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { authAPI, profileAPI } from '../lib/api';
import { getInitials } from '../lib/utils';
import styles from '../styles/Profile.module.css';
import { FiUser, FiPhone, FiCalendar, FiFileText, FiImage, FiSave, FiUpload } from 'react-icons/fi';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    dob: '',
    bio: '',
    profile_picture: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

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
      const [userRes, profileRes] = await Promise.all([
        authAPI.getMe(),
        profileAPI.get(),
      ]);

      setUser(userRes.data);
      setProfile(profileRes.data);
      setFormData({
        name: profileRes.data.name || '',
        mobile_number: profileRes.data.mobile_number || '',
        dob: profileRes.data.dob || '',
        bio: profileRes.data.bio || '',
        profile_picture: profileRes.data.profile_picture || '',
      });
      setImagePreview(profileRes.data.profile_picture || '');
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

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
    setSaving(true);

    try {
      await profileAPI.update(formData);
      toast.success('Profile updated successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
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
        <title>Edit Profile - LearnHub Pro</title>
      </Head>

      <Layout user={user} profile={profile}>
        <div className={styles.profile}>
          <h1>Edit Profile</h1>

          <div className={styles.profileHeader}>
            <div className={`avatar avatar-xl`}>
              {profile?.profile_picture ? (
                <img src={profile.profile_picture} alt={profile.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                getInitials(profile?.name || '')
              )}
            </div>
            <div>
              <h2>{profile?.name}</h2>
              <p>{profile?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label className="form-label">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiPhone /> Mobile Number
              </label>
              <input
                type="tel"
                className="form-input"
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
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiImage /> Profile Picture
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
                      <FiUpload /> Change Image
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
              disabled={saving}
            >
              {saving ? 'Saving...' : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
