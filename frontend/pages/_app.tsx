import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LearnHub Pro - Professional Learning Management System</title>
        <meta name="description" content="LearnHub Pro is a comprehensive learning management system offering courses, quizzes, and progress tracking for professional skill development." />
        <meta name="keywords" content="LMS, online learning, courses, education, e-learning, professional development, skill building" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LearnHub Pro - Professional Learning Management System" />
        <meta property="og:description" content="Master new skills with our comprehensive courses and interactive quizzes" />
        <meta property="og:site_name" content="LearnHub Pro" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LearnHub Pro - Professional LMS" />
        <meta name="twitter:description" content="Master new skills with comprehensive courses" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
