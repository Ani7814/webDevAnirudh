import { Course } from '@shared/schema';
import { apiRequest } from './queryClient';

// Function to fetch all courses
export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

// Function to fetch courses by level
export async function fetchCoursesByLevel(level: string): Promise<Course[]> {
  try {
    const response = await fetch(`/api/courses?level=${encodeURIComponent(level)}`);
    if (!response.ok) {
      throw new Error(`Error fetching courses by level: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${level} courses:`, error);
    throw error;
  }
}

// Function to fetch a single course by ID
export async function fetchCourseById(id: number): Promise<Course> {
  try {
    const response = await fetch(`/api/courses/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching course details: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch course with ID ${id}:`, error);
    throw error;
  }
}

// User authentication functions
export async function loginUser(email: string, password: string) {
  try {
    const response = await apiRequest('POST', '/api/auth/login', { username: email, password });
    return await response.json();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}) {
  try {
    const response = await apiRequest('POST', '/api/auth/register', userData);
    return await response.json();
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Helper function to format course data
export function formatCourseData(course: Course) {
  return {
    ...course,
    formattedRating: course.rating ? (course.rating / 10).toFixed(1) : '0.0',
    levelColor: getLevelColor(course.level),
  };
}

// Helper function to get level-specific styling
export function getLevelColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'beginner':
      return 'bg-[#FFBF43] bg-opacity-20 text-[#FFBF43]';
    case 'intermediate':
      return 'bg-primary bg-opacity-20 text-primary';
    case 'advanced':
      return 'bg-red-400 bg-opacity-20 text-red-400';
    default:
      return 'bg-gray-400 bg-opacity-20 text-gray-400';
  }
}

// Data for about us section
export const companyStats = [
  { number: '5000+', label: 'Students' },
  { number: '25+', label: 'Courses' },
  { number: '15+', label: 'Expert Instructors' },
];

// Data for services section
export const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Online Courses',
    description: 'Self-paced digital courses covering a wide range of topics from basic computer skills to advanced programming.',
    features: [
      '24/7 access to course materials',
      'Expert-created content',
      'Interactive learning exercises',
    ]
  },
  {
    icon: 'fas fa-users',
    title: 'Live Workshops',
    description: 'Interactive sessions led by industry professionals, providing hands-on experience and real-time feedback.',
    features: [
      'Real-time interaction with experts',
      'Collaborative learning environment',
      'Practical, hands-on activities',
    ]
  },
  {
    icon: 'fas fa-certificate',
    title: 'Certification Programs',
    description: 'Comprehensive programs designed to prepare you for industry-recognized certifications and career advancement.',
    features: [
      'Industry-recognized credentials',
      'Career-focused curriculum',
      'Job placement assistance',
    ]
  }
];

// Data for approach features
export const approachFeatures = [
  {
    icon: 'fas fa-bullseye',
    title: 'Goal-Oriented Learning',
    description: 'Curriculum designed with clear learning objectives and practical outcomes.',
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'Personalized Support',
    description: 'Dedicated mentors and community support throughout your learning journey.',
  },
  {
    icon: 'fas fa-sync-alt',
    title: 'Up-to-Date Content',
    description: 'Regularly updated materials to reflect current industry standards and practices.',
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Affordable Access',
    description: 'Flexible pricing options and scholarship opportunities for eligible learners.',
  }
];

// Contact information
export const contactInfo = {
  address: '123 Innovation Street, Tech Hub, San Francisco, CA 94107',
  email: {
    general: 'info@innovateed.com',
    support: 'support@innovateed.com',
  },
  phone: {
    primary: '+1 (555) 123-4567',
    secondary: '+1 (555) 987-6543',
  },
  socialMedia: [
    { platform: 'facebook', url: 'https://facebook.com/innovateed' },
    { platform: 'twitter', url: 'https://twitter.com/innovateed' },
    { platform: 'instagram', url: 'https://instagram.com/innovateed' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/innovateed' },
    { platform: 'youtube', url: 'https://youtube.com/c/innovateed' },
  ]
};

// Footer quick links
export const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Contact', path: '/#contact' },
  ],
  courseCategories: [
    { name: 'Digital Literacy', path: '/courses?level=beginner' },
    { name: 'Cybersecurity', path: '/courses' },
    { name: 'Web Development', path: '/courses' },
    { name: 'Data Analytics', path: '/courses' },
    { name: 'Digital Marketing', path: '/courses' },
  ],
  legal: [
    { name: 'Terms of Service', path: '#' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Cookie Policy', path: '#' },
  ]
};
