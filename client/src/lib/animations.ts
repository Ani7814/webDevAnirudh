import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAnimations() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 50,
  });

  // Scroll to the targeted section if hash is present in URL
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  // Add scroll event listener for animations
  const handleScroll = () => {
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    scrollElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;
      
      if (elementPosition < screenPosition) {
        element.classList.add('active');
      }
    });
  };

  // Check for elements in view on initial load
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
}

// Custom animation utility functions
export function fadeIn(element: HTMLElement, duration: number = 300, delay: number = 0) {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 10);
}

export function fadeOut(element: HTMLElement, duration: number = 300) {
  if (!element) return;
  
  element.style.opacity = '1';
  element.style.transition = `opacity ${duration}ms ease-out`;
  
  setTimeout(() => {
    element.style.opacity = '0';
  }, 10);
}

export function slideIn(element: HTMLElement, direction: 'top' | 'right' | 'bottom' | 'left' = 'bottom', distance: number = 20, duration: number = 300, delay: number = 0) {
  if (!element) return;
  
  let transform = '';
  switch (direction) {
    case 'top':
      transform = `translateY(-${distance}px)`;
      break;
    case 'right':
      transform = `translateX(${distance}px)`;
      break;
    case 'bottom':
      transform = `translateY(${distance}px)`;
      break;
    case 'left':
      transform = `translateX(-${distance}px)`;
      break;
  }
  
  element.style.opacity = '0';
  element.style.transform = transform;
  element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translate(0, 0)';
  }, 10);
}
