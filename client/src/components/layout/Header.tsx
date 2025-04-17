import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '../ui/logo';
import { LoginModal } from '../ui/login-modal';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'What We Do', href: '/#services' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/#contact' },
  ];

  // Use CSS variables for theme-aware styling
  const headerClasses = `fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
    isScrolled ? 'shadow-md' : ''
  }`;

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center">
                  <Logo className="h-12" />
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div className="font-poppins font-medium text-foreground hover:text-primary transition-colors duration-300">
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Button
                onClick={openLoginModal}
                className="hidden md:block bg-primary hover:bg-opacity-90 text-white transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Button>
              
              <div 
                className={`md:hidden hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background shadow-lg absolute w-full border-b border-border"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <div className="font-poppins font-medium text-foreground hover:text-primary py-2 transition-colors duration-300">
                        {item.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.1 }}
                >
                  <Button 
                    onClick={openLoginModal}
                    className="bg-primary hover:bg-opacity-90 text-white transition-all duration-300 w-full"
                  >
                    Login
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginModal isOpen={isModalOpen} onClose={closeLoginModal} />
    </>
  );
}
