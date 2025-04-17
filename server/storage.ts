import { users, type User, type InsertUser, courses, type Course, type InsertCourse } from "@shared/schema";

// Interface for storage methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCoursesByLevel(level: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  userCurrentId: number;
  courseCurrentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.userCurrentId = 1;
    this.courseCurrentId = 1;
    
    // Initialize with some courses
    this.initCourses();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id, createdAt: new Date().toISOString() };
    this.users.set(id, user);
    return user;
  }
  
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  async getCoursesByLevel(level: string): Promise<Course[]> {
    if (level === 'all') {
      return this.getCourses();
    }
    return Array.from(this.courses.values()).filter(
      (course) => course.level.toLowerCase() === level.toLowerCase(),
    );
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.courseCurrentId++;
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }
  
  private initCourses() {
    const mockCourses: InsertCourse[] = [
      {
        title: 'Digital Literacy Fundamentals',
        description: 'Master the essential skills needed to navigate the digital world confidently and safely.',
        level: 'Beginner',
        price: 49,
        instructor: 'Sarah Johnson',
        rating: 48, // 4.8 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
        duration: '4 weeks',
        bullets: ['Internet safety basics', 'Digital communication skills', 'Finding reliable information online', 'Managing digital identity'],
        category: 'digital-literacy',
      },
      {
        title: 'Cybersecurity Essentials',
        description: 'Learn how to protect yourself and your data from cyber threats in this comprehensive course.',
        level: 'Intermediate',
        price: 79,
        instructor: 'Michael Chen',
        rating: 49, // 4.9 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        duration: '6 weeks',
        bullets: ['Threat identification', 'Password management', 'Safe browsing habits', 'Data protection strategies'],
        category: 'cybersecurity',
      },
      {
        title: 'Web Development Bootcamp',
        description: 'From HTML basics to full-stack applications - become a web developer in 12 weeks.',
        level: 'Advanced',
        price: 129,
        instructor: 'Emily Rodriguez',
        rating: 47, // 4.7 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
        duration: '12 weeks',
        bullets: ['HTML, CSS, JavaScript fundamentals', 'Responsive design principles', 'Backend development with Node.js', 'Database integration'],
        category: 'web-development',
      },
      {
        title: 'Social Media Marketing',
        description: 'Learn to build and manage effective social media campaigns for business growth.',
        level: 'Intermediate',
        price: 69,
        instructor: 'David Wilson',
        rating: 46, // 4.6 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4',
        duration: '8 weeks',
        bullets: ['Platform-specific strategies', 'Content creation', 'Analytics and reporting', 'Paid advertising techniques'],
        category: 'marketing',
      },
      {
        title: 'Data Analytics Fundamentals',
        description: 'Introduction to analyzing and interpreting data for making informed decisions.',
        level: 'Beginner',
        price: 59,
        instructor: 'Priya Sharma',
        rating: 48, // 4.8 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1',
        duration: '5 weeks',
        bullets: ['Data collection methods', 'Basic statistical concepts', 'Data visualization techniques', 'Introduction to data tools'],
        category: 'data-analytics',
      },
      {
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile applications using React Native and modern JavaScript.',
        level: 'Advanced',
        price: 149,
        instructor: 'Alex Thompson',
        rating: 49, // 4.9 out of 5
        imageUrl: 'https://images.unsplash.com/photo-1603575448878-868a20723f5d',
        duration: '10 weeks',
        bullets: ['React Native fundamentals', 'Cross-platform development', 'State management', 'Deployment strategies'],
        category: 'mobile-development',
      }
    ];
    
    mockCourses.forEach(course => {
      this.createCourse(course);
    });
  }
}

export const storage = new MemStorage();
