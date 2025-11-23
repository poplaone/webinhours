import React from 'react';
import FlowingMenu from '@/components/ui/FlowingMenu';

const menuItems = [
  { 
    link: '#', 
    text: 'Custom Design', 
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80'
  },
  { 
    link: '#', 
    text: 'SEO Optimization', 
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&auto=format&fit=crop&q=80'
  },
  { 
    link: '#', 
    text: 'E-commerce', 
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80'
  },
  { 
    link: '#', 
    text: 'Content Creation', 
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80'
  }
];

export const FlowingMenuSection = () => {
  return (
    <section className="relative w-full" style={{ height: '600px' }}>
      <FlowingMenu items={menuItems} />
    </section>
  );
};
