import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/courses', async (req: Request, res: Response) => {
    try {
      const { level } = req.query;
      
      if (level && typeof level === 'string') {
        const courses = await storage.getCoursesByLevel(level);
        return res.json(courses);
      } else {
        const courses = await storage.getCourses();
        return res.json(courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ message: 'Failed to fetch courses' });
    }
  });

  app.get('/api/courses/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }
      
      const course = await storage.getCourse(id);
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      return res.json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      return res.status(500).json({ message: 'Failed to fetch course' });
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // In a real app, we would generate a JWT token here
      return res.json({ 
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const { username, email } = result.data;
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const user = await storage.createUser(result.data);
      
      return res.status(201).json({ 
        message: 'User registered successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Registration failed' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
