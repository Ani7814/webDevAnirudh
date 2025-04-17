import { Link } from 'wouter';
import { Logo } from '../ui/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo className="h-12 mb-6 brightness-0 invert" />
            <p className="text-gray-300 mb-6">
              Empowering individuals with the digital skills needed to thrive in today's connected world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-montserrat font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/#services">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Courses</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-montserrat font-bold mb-6">Course Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/courses?level=beginner">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Digital Literacy</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Cybersecurity</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Web Development</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Data Analytics</a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-primary transition-colors duration-300">Digital Marketing</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-montserrat font-bold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full rounded-r-none focus:ring-2 focus:ring-primary text-gray-800" 
                />
                <Button type="submit" className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-l-none">
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </form>
            <p className="text-sm text-gray-400">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} InnovateED. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
