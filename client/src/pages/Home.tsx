import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CourseCard } from '@/components/ui/course-card';
import { LoginModal } from '@/components/ui/login-modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { Course } from '@shared/schema';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });
  
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.level.toLowerCase() === activeTab;
  }).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-28 md:pt-32 pb-20 bg-gradient-to-br from-white to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-[#FFBF43] bg-opacity-20 text-secondary px-4 py-1 rounded-full font-medium mb-4">
                  Be Internet Ready
                </Badge>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-foreground leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Transform Your <span className="text-animated from-primary to-accent to-70% font-extrabold">Digital Skills</span> With <span className="text-highlight">InnovateED</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="fade-in-up delay-1 inline-block">Gain the knowledge and expertise needed to thrive</span> <span className="fade-in-up delay-2 inline-block">in today's digital world with our specialized courses</span> <span className="fade-in-up delay-3 inline-block">and expert-led training programs.</span>
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/courses">
                  <Button className="bg-primary hover:bg-opacity-90 text-white py-3 px-8 transition-all duration-300 transform hover:scale-105">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-8 transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFBF43] rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-20 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Digital Education" 
                  className="rounded-lg shadow-xl relative z-10 max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              className="scroll-animation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary bg-opacity-20 text-primary px-4 py-1 rounded-full font-medium mb-4">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">Who <span className="text-highlight">We Are</span></h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-muted-foreground">
                InnovateED was founded with a mission to <span className="text-primary font-medium">bridge the digital divide</span> and empower individuals with the skills needed to navigate the modern digital landscape.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">Our <span className="text-primary">Story</span></h3>
              <p className="text-muted-foreground mb-6">
                Founded in 2018 by a team of tech educators and industry professionals, InnovateED has grown from a small workshop series to a comprehensive educational platform serving learners worldwide.
              </p>
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">Our <span className="text-primary">Mission</span></h3>
              <p className="text-muted-foreground mb-6">
                We believe that digital literacy is a <span className="text-highlight">fundamental right</span>. Our mission is to make quality digital education accessible to everyone, regardless of their background or previous experience.
              </p>
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">5000+</span>
                  <span className="text-gray-500">Students</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">25+</span>
                  <span className="text-gray-500">Courses</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">15+</span>
                  <span className="text-gray-500">Expert Instructors</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Team collaboration" className="rounded-lg shadow-md h-40 w-full object-cover" />
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Digital workshop" className="rounded-lg shadow-md h-56 w-full object-cover" />
                  </div>
                  <div className="space-y-4 mt-8">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Team meeting" className="rounded-lg shadow-md h-56 w-full object-cover" />
                    <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Student learning" className="rounded-lg shadow-md h-40 w-full object-cover" />
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary bg-opacity-10 rounded-full"></div>
                <div className="absolute -z-10 -top-6 -left-6 w-40 h-40 bg-[#FFBF43] bg-opacity-10 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary bg-opacity-20 text-primary px-4 py-1 rounded-full font-medium mb-4">Our Services</Badge>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-secondary mb-4">What We Do</h2>
              <div className="w-20 h-1 bg-[#FFBF43] mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600">
                We offer a comprehensive range of educational services designed to enhance digital literacy and technological proficiency.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-laptop-code text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">Online Courses</h3>
              <p className="text-gray-600 mb-6">
                Self-paced digital courses covering a wide range of topics from basic computer skills to advanced programming.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">24/7 access to course materials</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Expert-created content</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Interactive learning exercises</span>
                </li>
              </ul>
              <Link href="/courses">
                <a className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Link>
            </motion.div>
            
            {/* Service 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">Live Workshops</h3>
              <p className="text-gray-600 mb-6">
                Interactive sessions led by industry professionals, providing hands-on experience and real-time feedback.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Real-time interaction with experts</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Collaborative learning environment</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Practical, hands-on activities</span>
                </li>
              </ul>
              <Link href="/courses">
                <a className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Link>
            </motion.div>
            
            {/* Service 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-certificate text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">Certification Programs</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive programs designed to prepare you for industry-recognized certifications and career advancement.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Industry-recognized credentials</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Career-focused curriculum</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-[#FFBF43] mr-2"></i>
                  <span className="text-gray-600">Job placement assistance</span>
                </li>
              </ul>
              <Link href="/courses">
                <a className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-300">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Link>
            </motion.div>
          </div>
          
          {/* Key Features */}
          <div className="mt-20">
            <motion.h3 
              className="text-2xl font-montserrat font-bold text-secondary text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              Our Approach
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-bullseye text-2xl text-[#FFBF43]"></i>
                </div>
                <h4 className="text-lg font-montserrat font-bold text-secondary mb-2">Goal-Oriented Learning</h4>
                <p className="text-gray-600">
                  Curriculum designed with clear learning objectives and practical outcomes.
                </p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-hands-helping text-2xl text-[#FFBF43]"></i>
                </div>
                <h4 className="text-lg font-montserrat font-bold text-secondary mb-2">Personalized Support</h4>
                <p className="text-gray-600">
                  Dedicated mentors and community support throughout your learning journey.
                </p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-sync-alt text-2xl text-[#FFBF43]"></i>
                </div>
                <h4 className="text-lg font-montserrat font-bold text-secondary mb-2">Up-to-Date Content</h4>
                <p className="text-gray-600">
                  Regularly updated materials to reflect current industry standards and practices.
                </p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-hand-holding-usd text-2xl text-[#FFBF43]"></i>
                </div>
                <h4 className="text-lg font-montserrat font-bold text-secondary mb-2">Affordable Access</h4>
                <p className="text-gray-600">
                  Flexible pricing options and scholarship opportunities for eligible learners.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary bg-opacity-20 text-primary px-4 py-1 rounded-full font-medium mb-4">Our Courses</Badge>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-secondary mb-4">Featured Courses</h2>
              <div className="w-20 h-1 bg-[#FFBF43] mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600">
                Discover our wide range of courses designed to help you develop essential digital skills for today's connected world.
              </p>
            </motion.div>
          </div>
          
          {/* Course Categories Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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
          </div>
          
          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button className="inline-flex items-center bg-secondary hover:bg-opacity-90 text-white py-3 px-8 transition-all duration-300 transform hover:scale-105">
                <span>View All Courses</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary bg-opacity-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-secondary mb-6">Ready to transform your digital skills?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of learners who have already taken the first step toward digital literacy and professional growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/courses">
                <Button className="bg-primary hover:bg-opacity-90 text-white py-3 px-8 transition-all duration-300 transform hover:scale-105">
                  Browse Courses
                </Button>
              </Link>
              <Button 
                onClick={() => setIsLoginModalOpen(true)}
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-8 transition-all duration-300"
              >
                Sign Up Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-primary bg-opacity-20 text-primary px-4 py-1 rounded-full font-medium mb-4">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-secondary mb-4">Get in Touch</h2>
              <div className="w-20 h-1 bg-[#FFBF43] mx-auto mb-8"></div>
              <p className="max-w-3xl mx-auto text-gray-600">
                Have questions about our courses or services? Our team is here to help you on your learning journey.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-gray-700 mb-2">Full Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                      placeholder="Your name" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-gray-700 mb-2">Email Address</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                      placeholder="Your email" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="block text-gray-700 mb-2">Subject</Label>
                    <Select>
                      <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">Course Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="business">Business Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-gray-700 mb-2">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" 
                      placeholder="Your message" 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-3 px-6 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12">
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary mb-1">Our Location</h4>
                      <p className="text-gray-600">123 Innovation Street, Tech Hub, San Francisco, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <i className="fas fa-envelope text-primary"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary mb-1">Email Us</h4>
                      <p className="text-gray-600">info@innovateed.com</p>
                      <p className="text-gray-600">support@innovateed.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                        <i className="fas fa-phone-alt text-primary"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-secondary mb-1">Call Us</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
