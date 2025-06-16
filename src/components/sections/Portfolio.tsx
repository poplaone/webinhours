import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = [{
    id: 'all',
    name: 'All Projects',
    count: 24
  }, {
    id: 'ecommerce',
    name: 'E-commerce',
    count: 8
  }, {
    id: 'business',
    name: 'Business',
    count: 10
  }, {
    id: 'landing',
    name: 'Landing Pages',
    count: 6
  }];
  const projects = [{
    id: 1,
    title: "TechStore Pro",
    category: "ecommerce",
    description: "Modern e-commerce platform with advanced filtering and payment integration",
    image: "/placeholder.svg",
    tags: ["React", "Stripe", "SEO", "Mobile"],
    liveUrl: "#",
    githubUrl: "#",
    metrics: {
      conversion: "+180%",
      speed: "98/100",
      revenue: "$50K+"
    },
    testimonial: "Increased our online sales by 180% in just 3 months!"
  }, {
    id: 2,
    title: "Legal Associates",
    category: "business",
    description: "Professional law firm website with client portal and case tracking",
    image: "/placeholder.svg",
    tags: ["Next.js", "CMS", "Security", "Portal"],
    liveUrl: "#",
    githubUrl: "#",
    metrics: {
      leads: "+250%",
      traffic: "+120%",
      ranking: "Top 3"
    },
    testimonial: "Professional design that truly represents our firm's values."
  }, {
    id: 3,
    title: "FitLife Landing",
    category: "landing",
    description: "High-converting landing page for fitness coaching program",
    image: "/placeholder.svg",
    tags: ["React", "Optimization", "A/B Testing", "Analytics"],
    liveUrl: "#",
    githubUrl: "#",
    metrics: {
      conversion: "+320%",
      ctr: "12.5%",
      leads: "500+"
    },
    testimonial: "Best investment we made - ROI was incredible!"
  }];
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  return <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6" initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
            <span className="text-sm font-medium text-[#8B5CF6]">🎨 Our Portfolio</span>
          </motion.div>

          <h2 className="text-4xl font-bold mb-4">500+ Successful Projects Delivered</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm">
            See real results from real businesses. Every project showcases our commitment to quality, 
            performance, and measurable success metrics.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => <Button key={category.id} variant={activeFilter === category.id ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(category.id)} className={`${activeFilter === category.id ? "bg-[#8B5CF6] hover:bg-[#7C3AED]" : "hover:bg-[#8B5CF6] hover:text-white"} transition-all duration-300`}>
                <Filter className="h-4 w-4 mr-2" />
                {category.name} ({category.count})
              </Button>)}
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter + searchTerm} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.5
        }}>
            {filteredProjects.map((project, index) => <motion.div key={project.id} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="group">
                <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-500 hover:border-[#8B5CF6]/30 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>)}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#8B5CF6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      {Object.entries(project.metrics).map(([key, value]) => <div key={key} className="bg-[#8B5CF6]/10 rounded-lg p-2">
                          <div className="text-sm font-bold text-[#8B5CF6]">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>)}
                    </div>
                    
                    {/* Testimonial */}
                    <blockquote className="text-sm italic text-muted-foreground border-l-2 border-[#8B5CF6] pl-3">
                      "{project.testimonial}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>)}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div className="text-center mt-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 py-4 transition-all duration-300 hover:scale-105">
            Start Your Success Story
          </Button>
        </motion.div>
      </div>
    </section>;
};