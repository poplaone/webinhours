import { useState, useEffect } from 'react';
import Shuffle from './Shuffle';

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
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
      setKey((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Shuffle
      key={key}
      text={services[currentIndex]}
      shuffleDirection="right"
      duration={0.35}
      animationMode="evenodd"
      shuffleTimes={1}
      ease="power3.out"
      stagger={0.03}
      threshold={0.1}
      triggerOnce={false}
      triggerOnHover={false}
      respectReducedMotion={true}
      tag="span"
      className="inline-block font-semibold text-primary"
    />
  );
};
