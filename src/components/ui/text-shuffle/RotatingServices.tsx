import { useState, useEffect } from 'react';

const services = [
  'Content Creation',
  'PR & Media Outreach',
  'Social Media Management',
  'Website Management',
  'SEO Optimization',
  'Custom Design & Branding'
];

export const RotatingServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentService = services[currentIndex];
    const typingSpeed = isDeleting ? 30 : 50;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentService) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        // Finished deleting, move to next service
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % services.length);
      } else if (isDeleting) {
        // Delete character
        setDisplayText(currentService.substring(0, displayText.length - 1));
      } else {
        // Type character
        setDisplayText(currentService.substring(0, displayText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="inline-block font-mono font-medium text-foreground tracking-wide">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};
