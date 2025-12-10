import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Helmet } from 'react-helmet-async';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  linkedIn?: string;
  datePublished: string;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechVenture Inc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "WebInHours transformed our online presence in just 24 hours. The quality exceeded our expectations, and our conversion rates increased by 40% within the first month.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-11-15"
  },
  {
    id: "testimonial-2",
    name: "Michael Rodriguez",
    role: "Founder & CEO",
    company: "StartupLaunch",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "As a startup founder, time is money. WebInHours delivered a professional website faster than I thought possible. The SEO optimization was already built-in, saving us thousands.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-10-28"
  },
  {
    id: "testimonial-3",
    name: "Emily Watson",
    role: "E-commerce Manager",
    company: "StyleBoutique",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The template quality is outstanding. Our customers love the new design, and mobile sales have doubled since launching our WebInHours site.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-12-01"
  },
  {
    id: "testimonial-4",
    name: "David Park",
    role: "Creative Director",
    company: "DesignStudio Pro",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "I was skeptical about a 24-hour turnaround, but the results speak for themselves. Clean code, beautiful design, and excellent performance scores.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-09-20"
  },
  {
    id: "testimonial-5",
    name: "Jessica Thompson",
    role: "Small Business Owner",
    company: "Local Bakery Co",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "Getting a free professional website was a game-changer for my bakery. The premium branding upgrade was worth every penny. Highly recommend!",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-11-05"
  },
  {
    id: "testimonial-6",
    name: "James Anderson",
    role: "CTO",
    company: "FinTech Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "Enterprise-grade security and blazing fast performance. Our compliance team was impressed with the security features built into the WebInHours platform.",
    rating: 5,
    linkedIn: "https://linkedin.com/in/",
    datePublished: "2024-10-10"
  }
];

// Generate Person schema for each testimonial author
const generatePersonSchema = (testimonial: Testimonial) => ({
  "@type": "Person",
  "name": testimonial.name,
  "jobTitle": testimonial.role,
  "worksFor": {
    "@type": "Organization",
    "name": testimonial.company
  },
  "image": testimonial.image,
  ...(testimonial.linkedIn && { "sameAs": [testimonial.linkedIn] })
});

// Generate Review schema
const generateReviewSchema = (testimonial: Testimonial) => ({
  "@type": "Review",
  "@id": `https://webinhours.com/#${testimonial.id}`,
  "author": generatePersonSchema(testimonial),
  "reviewBody": testimonial.content,
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": testimonial.rating,
    "bestRating": 5,
    "worstRating": 1
  },
  "datePublished": testimonial.datePublished,
  "itemReviewed": {
    "@type": "Product",
    "name": "WebInHours Website Services",
    "brand": {
      "@type": "Brand",
      "name": "WebInHours"
    }
  }
});

// Generate aggregate rating schema
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WebInHours Website Services",
  "description": "Professional website development and template marketplace",
  "brand": {
    "@type": "Brand",
    "name": "WebInHours"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": testimonials.length.toString(),
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": testimonials.map(generateReviewSchema)
};

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      itemScope
      itemType="https://schema.org/Review"
    >
      <Card className="h-full bg-card/60 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        <CardContent className="p-6">
          {/* Quote Icon */}
          <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />

          {/* Rating */}
          <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
            <meta itemProp="reviewRating" content={testimonial.rating.toString()} />
          </div>

          {/* Review Content */}
          <p
            className="text-foreground/80 text-sm md:text-base leading-relaxed mb-6"
            itemProp="reviewBody"
          >
            "{testimonial.content}"
          </p>

          {/* Author Info with Person Schema */}
          <div
            className="flex items-center gap-4"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div>
              <h4 className="font-semibold text-foreground" itemProp="name">
                {testimonial.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                <span itemProp="jobTitle">{testimonial.role}</span>
                {" at "}
                <span
                  itemProp="worksFor"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <span itemProp="name">{testimonial.company}</span>
                </span>
              </p>
            </div>
          </div>

          <meta itemProp="datePublished" content={testimonial.datePublished} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function PremiumTestimonials() {
  return (
    <section
      className="py-12 md:py-24 px-4 md:px-8"
      aria-labelledby="testimonials-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Structured Data for Reviews */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >


          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-foreground">What Our </span>
            <span className="text-primary">Clients Say</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Join hundreds of satisfied businesses who transformed their online presence with WebInHours
          </p>


        </motion.div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} role="listitem" itemProp="itemListElement">
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Ready to join our satisfied clients?
          </p>
          <a
            href="/websites"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Your Free Website Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}