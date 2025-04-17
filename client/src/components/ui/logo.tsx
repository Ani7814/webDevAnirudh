import logoSvg from '@assets/Logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-10' }: LogoProps) {
  return (
    <img 
      src={logoSvg} 
      alt="InnovateED Logo" 
      className={className} 
    />
  );
}
