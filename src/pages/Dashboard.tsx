import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sparkles, TrendingUp, Code, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SideNavbar from '@/components/layout/SideNavbar';
import CategoryFilter from '@/components/filters/CategoryFilter';

const projectCards = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    description: "Modern React-based e-commerce solution with advanced shopping cart functionality and mobile-optimized checkout process.",
    tags: ["React", "E-commerce", "Mobile"],
    timestamp: "5d ago",
    trendAnalysis: { score: 94, trend: "up" },
    clientSatisfaction: 92,
    projectComplexity: "High",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&h=170&q=80",
    category: "E-commerce"
  },
  {
    id: 9,
    title: "Corporate Website Development",
    description: "Professional corporate website with content management system, SEO optimization, and responsive design for all devices.",
    tags: ["CMS", "SEO", "Corporate"],
    timestamp: "2d ago",
    trendAnalysis: { score: 89, trend: "up" },
    clientSatisfaction: 86,
    projectComplexity: "Medium",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Corporate"
  },
  {
    id: 10,
    title: "Progressive Web Application",
    description: "Fast-loading PWA with offline capabilities, push notifications, and native app-like experience across all platforms.",
    tags: ["PWA", "Performance", "Mobile"],
    timestamp: "3d ago",
    trendAnalysis: { score: 87, trend: "up" },
    clientSatisfaction: 82,
    projectComplexity: "High",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Web Apps"
  },
  {
    id: 11,
    title: "Landing Page Optimization",
    description: "High-converting landing pages with A/B testing, analytics integration, and conversion rate optimization strategies.",
    tags: ["Landing", "CRO", "Analytics"],
    timestamp: "1w ago",
    trendAnalysis: { score: 92, trend: "up" },
    clientSatisfaction: 88,
    projectComplexity: "Low",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Marketing"
  },
  {
    id: 12,
    title: "SaaS Dashboard Interface",
    description: "Comprehensive dashboard with real-time data visualization, user management, and API integration for SaaS platforms.",
    tags: ["Dashboard", "SaaS", "API"],
    timestamp: "4d ago",
    trendAnalysis: { score: 85, trend: "up" },
    clientSatisfaction: 79,
    projectComplexity: "High",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=170&q=80",
    category: "SaaS"
  },
  {
    id: 13,
    title: "Portfolio Website Creation",
    description: "Creative portfolio websites with interactive galleries, smooth animations, and optimized performance for creative professionals.",
    tags: ["Portfolio", "Creative", "Animation"],
    timestamp: "6d ago",
    trendAnalysis: { score: 91, trend: "up" },
    clientSatisfaction: 84,
    projectComplexity: "Medium",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Portfolio"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const viewProjectDetail = (projectId: number) => {
    navigate(`/idea/${projectId}`);
  };

  const viewClientReview = (projectId: number) => {
    navigate(`/concept-testing/${projectId}`);
  };

  const filteredProjects = selectedCategories.length === 0
    ? projectCards
    : projectCards.filter(project => selectedCategories.includes(project.category));

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
      <SideNavbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex-1 items-center justify-center px-4">
              <div className="w-full max-w-sm relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ideas, projects..."
                  className="w-full bg-background pl-8 rounded-full border-muted-foreground/20"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Web Development Projects</h1>
              <p className="text-muted-foreground mt-1">Manage and track your ongoing web development projects</p>
            </div>
            <div className="flex items-center">
              <CategoryFilter 
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
              />
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] ml-4" onClick={() => navigate('/idea/new')}>
                <Code className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative h-full"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              onClick={() => viewProjectDetail(project.id)} 
                              variant="secondary" 
                              className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View project details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg cursor-pointer hover:text-[#8B5CF6] transition-colors" onClick={() => viewProjectDetail(project.id)}>{project.title}</h3>
                      <span className="text-xs text-muted-foreground">{project.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="grid grid-cols-3 gap-2 text-xs border-t border-border/40 pt-2 mb-2">
                        <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                          <div className="flex items-center gap-1 text-muted-foreground mb-1">
                            <TrendingUp className="h-3 w-3 text-[#8B5CF6]" />
                            <span>Progress</span>
                          </div>
                          <div className={cn(
                            "font-medium text-sm",
                            project.trendAnalysis.trend === "up" ? "text-emerald-500" : 
                            project.trendAnalysis.trend === "down" ? "text-red-500" : "text-amber-500"
                          )}>
                            {project.trendAnalysis.score}%
                            {project.trendAnalysis.trend === "up" && " ↑"}
                            {project.trendAnalysis.trend === "down" && " ↓"}
                            {project.trendAnalysis.trend === "stable" && " →"}
                          </div>
                        </div>
                        
                        <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                          <div className="flex items-center gap-1 text-muted-foreground mb-1">
                            <Users className="h-3 w-3 text-[#8B5CF6]" />
                            <span>Client</span>
                          </div>
                          <div className="font-medium text-sm">
                            {project.clientSatisfaction}%
                          </div>
                        </div>
                        
                        <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                          <div className="flex items-center gap-1 text-muted-foreground mb-1">
                            <Radio className="h-3 w-3 text-[#8B5CF6]" />
                            <span>Complexity</span>
                          </div>
                          <div className="font-medium text-sm">
                            {project.projectComplexity}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border border-border/40 bg-card/50 backdrop-blur h-full">
                <div className="p-5 border-b border-border/40 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  <h3 className="font-semibold">Development Insights</h3>
                </div>
                
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                        Technology Trends
                      </h4>
                      <p className="text-xs text-muted-foreground">React and Next.js continue to dominate frontend development, with 85% of new projects choosing these frameworks for better performance and SEO.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                        Performance Metrics
                      </h4>
                      <p className="text-xs text-muted-foreground">Mobile-first development has improved client satisfaction by 40%, with faster loading times and better user engagement across all devices.</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                        Best Practices
                      </h4>
                      <p className="text-xs text-muted-foreground">Progressive Web Apps (PWAs) are becoming essential for client projects, offering native app experiences with web accessibility.</p>
                    </div>
                    
                    <div className="pt-2 border-t border-border/40">
                      <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
                      <ul className="space-y-2">
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Code className="h-3 w-3" />
                          </span>
                          <span>Implement TypeScript for better code quality</span>
                        </li>
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Code className="h-3 w-3" />
                          </span>
                          <span>Adopt headless CMS for flexible content management</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Development Pipeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Planning & Design</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">3 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Requirements gathering and UI/UX design phase</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Development</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">4 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active coding and feature implementation</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Testing & Deployment</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">2 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Quality assurance and production deployment</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
