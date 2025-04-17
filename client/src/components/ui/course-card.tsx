import { Link } from 'wouter';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Course } from '@shared/schema';

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const getRandomInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0].substring(0, 2).toUpperCase();
  };

  const getLevelColor = (level: string) => {
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

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={`${course.imageUrl}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
              {course.level}
            </Badge>
            <div className="flex items-center">
              <i className="fas fa-star text-[#FFBF43] mr-1"></i>
              <span className="text-gray-600">{formatRating(course.rating || 0)}</span>
            </div>
          </div>
          <h3 className="text-xl font-montserrat font-bold text-secondary mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`} />
                <AvatarFallback>{getRandomInitials(course.instructor)}</AvatarFallback>
              </Avatar>
              <span className="text-gray-600">{course.instructor}</span>
            </div>
            <span className="text-primary font-bold">${course.price}</span>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link href={`/course/${course.id}`}>
            <Button className="w-full bg-primary hover:bg-opacity-90 text-white">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
