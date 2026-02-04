export interface User {
  id: string;
  email: string;
  profile_completed: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  mobile_number: string;
  dob?: string;
  bio?: string;
  profile_picture?: string;
  profile_completed: boolean;
}

export interface Lesson {
  title: string;
  youtube_url: string;
  description?: string;
  duration?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons: Lesson[];
  duration?: string;
  level?: string;
  category?: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  total_questions: number;
  passing_score: number;
  time_limit?: number;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
}

export interface QuizResult {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  passed: boolean;
  attempted_at: string;
}

export interface DashboardStats {
  total_courses: number;
  enrolled_courses: number;
  completed_courses: number;
  total_quizzes: number;
  attempted_quizzes: number;
  average_score: number;
  recent_enrollments: any[];
  recent_quiz_results: any[];
}
