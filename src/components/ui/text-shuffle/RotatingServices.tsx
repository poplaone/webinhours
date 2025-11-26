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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block font-semibold text-primary transition-all duration-500 animate-pulse">
      {services[currentIndex]}
    </span>
  );
};
