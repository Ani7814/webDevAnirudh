import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      toast({
        title: "Login attempted",
        description: "This is a demo. No actual login is processed.",
      });
      // In a real app, we would make a fetch request to /api/auth/login
      onClose();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      toast({
        title: "Registration attempted",
        description: "This is a demo. No actual registration is processed.",
      });
      // In a real app, we would make a fetch request to /api/auth/register
      onClose();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Unable to register. Please try again.",
        variant: "destructive",
      });
    }
  };

  const switchToRegister = () => {
    setIsLogin(false);
    loginForm.reset();
  };

  const switchToLogin = () => {
    setIsLogin(true);
    registerForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat font-bold text-secondary">
            {isLogin ? 'Login to InnovateED' : 'Create an Account'}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Join our community of learners today'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="flex justify-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              className="flex-1 bg-[#3b5998] hover:bg-opacity-90 text-white"
              onClick={() => toast({
                title: "Facebook login",
                description: "Social login is not implemented in this demo",
              })}
            >
              <i className="fab fa-facebook-f mr-2"></i> Facebook
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-[#db4437] hover:bg-opacity-90 text-white"
              onClick={() => toast({
                title: "Google login",
                description: "Social login is not implemented in this demo",
              })}
            >
              <i className="fab fa-google mr-2"></i> Google
            </Button>
          </div>
          
          <div className="flex items-center my-6">
            <Separator className="flex-grow" />
            <span className="mx-4 text-gray-500">or</span>
            <Separator className="flex-grow" />
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="flex justify-end mt-2">
                          <a href="#" className="text-sm text-primary hover:text-secondary transition-colors duration-300">
                            Forgot password?
                          </a>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-opacity-90 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account? 
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-secondary"
                    onClick={switchToRegister}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="johndoe" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-opacity-90 text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account? 
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-secondary"
                    onClick={switchToLogin}
                  >
                    Login
                  </Button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
