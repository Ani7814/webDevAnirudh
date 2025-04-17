import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { CourseCard } from '@/components/ui/course-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Course } from '@shared/schema';

export default function Courses() {
  // Get level from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const urlLevel = urlParams.get('level') || 'all';
  
  const [activeTab, setActiveTab] = useState(urlLevel);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: allCourses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });
  
  // Update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTab === 'all') {
      url.searchParams.delete('level');
    } else {
      url.searchParams.set('level', activeTab);
    }
    window.history.pushState({}, '', url);
  }, [activeTab]);
  
  const filteredCourses = allCourses.filter(course => {
    const matchesTab = activeTab === 'all' || course.level.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20">
      <div className="bg-gradient-to-r from-primary to-blue-500 py-16 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Browse Our Courses
            </motion.h1>
            <motion.p 
              className="text-lg text-white opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Expand your knowledge and skills with our comprehensive selection of courses designed to help you succeed in the digital world.
            </motion.p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-0">
            <Button 
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'all' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              All Courses
            </Button>
            <Button 
              onClick={() => setActiveTab('beginner')}
              variant={activeTab === 'beginner' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'beginner' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              For Beginners
            </Button>
            <Button 
              onClick={() => setActiveTab('intermediate')}
              variant={activeTab === 'intermediate' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'intermediate' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              Intermediate
            </Button>
            <Button 
              onClick={() => setActiveTab('advanced')}
              variant={activeTab === 'advanced' ? 'default' : 'outline'}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'advanced' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              Advanced
            </Button>
          </div>
          
          <div className="w-full md:w-64">
            <Input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-secondary mr-3">
                {activeTab === 'all' ? 'All Courses' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Courses`}
              </h2>
              <Badge className="bg-primary text-white">{filteredCourses.length}</Badge>
            </div>
            
            {searchTerm && (
              <div className="text-sm text-gray-500">
                Search results for: "{searchTerm}"
              </div>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4"><i className="fas fa-search text-gray-300"></i></div>
            <h3 className="text-2xl font-bold text-secondary mb-2">No courses found</h3>
            <p className="text-gray-500">
              We couldn't find any courses matching your current filters.
            </p>
            <Button 
              onClick={() => {
                setActiveTab('all');
                setSearchTerm('');
              }}
              className="mt-6 bg-primary text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
