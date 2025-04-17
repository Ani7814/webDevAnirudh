import { useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Course } from '@shared/schema';

export default function CourseDetail() {
  const [match, params] = useRoute('/course/:id');
  const courseId = params?.id ? parseInt(params.id) : undefined;
  
  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ['/api/courses', courseId],
    enabled: !!courseId,
  });
  
  useEffect(() => {
    if (course) {
      document.title = `${course.title} - InnovateED`;
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [course]);
  
  const getRandomInitials = (name: string = '') => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0]?.substring(0, 2).toUpperCase() || 'IN';
  };
  
  const getLevelColor = (level: string = '') => {
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
  };
  
  if (isLoading) {
    return (
      <div className="pt-28 pb-20 flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !course) {
    return (
      <div className="pt-28 pb-20 flex flex-col justify-center items-center min-h-[70vh]">
        <div className="text-5xl mb-4 text-red-500"><i className="fas fa-exclamation-circle"></i></div>
        <h2 className="text-2xl font-bold text-secondary mb-3">Course Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't find the course you're looking for.</p>
        <Link href="/courses">
          <Button className="bg-primary text-white">
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }
  
  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  return (
    <div className="pt-28 pb-20">
      {/* Course Hero */}
      <div className="bg-gradient-to-r from-primary to-blue-500 py-16 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${getLevelColor(course.level)}`}>
                {course.level}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-6">
                {course.title}
              </h1>
              <p className="text-lg text-white opacity-90 max-w-3xl mx-auto mb-8">
                {course.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                <div className="flex items-center text-white">
                  <i className="fas fa-clock mr-2"></i>
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center text-white">
                  <i className="fas fa-star mr-2"></i>
                  <span>Rating: {formatRating(course.rating || 0)}/5</span>
                </div>
                <div className="flex items-center text-white">
                  <i className="fas fa-tag mr-2"></i>
                  <span>Price: ${course.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-montserrat font-bold text-secondary mb-6">Course Overview</h2>
              
              <div className="bg-white rounded-lg shadow-md p-8 mb-10">
                <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">What You'll Learn</h3>
                
                <ul className="space-y-4 mb-6">
                  {course.bullets?.map((bullet, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    >
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                          <i className="fas fa-check text-sm text-primary"></i>
                        </div>
                      </div>
                      <p className="text-gray-700">{bullet}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 mb-10">
                <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">Course Content</h3>
                
                <div className="mb-6">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-secondary">Module 1: Introduction</h4>
                      <Badge className="bg-[#FFBF43] text-white">Free Preview</Badge>
                    </div>
                    <Separator className="my-3" />
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-play-circle text-primary mr-3"></i>
                          <span>Welcome to the Course</span>
                        </div>
                        <span className="text-sm text-gray-500">10:25</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-file-alt text-primary mr-3"></i>
                          <span>Course Resources</span>
                        </div>
                        <span className="text-sm text-gray-500">5 mins</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-secondary">Module 2: Core Concepts</h4>
                      <span className="text-sm text-gray-500">4 lessons</span>
                    </div>
                    <Separator className="my-3" />
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-lock text-gray-400 mr-3"></i>
                          <span className="text-gray-600">Understanding the Basics</span>
                        </div>
                        <span className="text-sm text-gray-500">15:45</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-lock text-gray-400 mr-3"></i>
                          <span className="text-gray-600">Practical Applications</span>
                        </div>
                        <span className="text-sm text-gray-500">22:10</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-secondary">Module 3: Advanced Techniques</h4>
                      <span className="text-sm text-gray-500">5 lessons</span>
                    </div>
                    <Separator className="my-3" />
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-lock text-gray-400 mr-3"></i>
                          <span className="text-gray-600">Professional Workflows</span>
                        </div>
                        <span className="text-sm text-gray-500">18:30</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className="fas fa-lock text-gray-400 mr-3"></i>
                          <span className="text-gray-600">Case Studies</span>
                        </div>
                        <span className="text-sm text-gray-500">25:15</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">Student Reviews</h3>
                
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-primary">{formatRating(course.rating || 0)}</div>
                      <div className="flex text-[#FFBF43] mt-1">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-28 flex-shrink-0">
                          <div className="flex items-center">
                            <span className="mr-2">5 stars</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFBF43] h-2.5 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-500">75%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-28 flex-shrink-0">
                          <div className="flex items-center">
                            <span className="mr-2">4 stars</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFBF43] h-2.5 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-500">20%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-28 flex-shrink-0">
                          <div className="flex items-center">
                            <span className="mr-2">3 stars</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFBF43] h-2.5 rounded-full" style={{ width: '5%' }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-500">5%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-28 flex-shrink-0">
                          <div className="flex items-center">
                            <span className="mr-2">2 stars</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFBF43] h-2.5 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-500">0%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-28 flex-shrink-0">
                          <div className="flex items-center">
                            <span className="mr-2">1 star</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFBF43] h-2.5 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-500">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start mb-4">
                      <Avatar className="mr-4">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah W." />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-secondary">Sarah W.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex text-[#FFBF43]">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">2 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      This course exceeded my expectations! The content was well-structured and the instructor explained complex concepts in a way that was easy to understand. I've already started applying what I learned in my day-to-day work.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start mb-4">
                      <Avatar className="mr-4">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/54.jpg" alt="Michael T." />
                        <AvatarFallback>MT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-secondary">Michael T.</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex text-[#FFBF43]">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">1 month ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Great course with practical examples and clear explanations. The hands-on projects really helped solidify my understanding. Would have liked a bit more depth in the advanced section, but overall very satisfied with what I learned.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-32"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="relative h-48">
                  <img 
                    src={`${course.imageUrl}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center cursor-pointer">
                      <i className="fas fa-play text-2xl text-primary"></i>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold text-secondary">${course.price}</div>
                    <Badge className="bg-red-500 text-white">30% OFF</Badge>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-opacity-90 text-white py-3 mb-4">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white py-3 mb-6">
                    Add to Wishlist
                  </Button>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-graduation-cap text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Instructor</div>
                        <div className="font-medium">{course.instructor}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-signal text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Level</div>
                        <div className="font-medium">{course.level}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-clock text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{course.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-language text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Language</div>
                        <div className="font-medium">English</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-certificate text-primary"></i>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Certificate</div>
                        <div className="font-medium">Yes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h4 className="font-montserrat font-bold text-secondary mb-4">Share This Course</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#1da1f2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
