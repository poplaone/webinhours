import React, { useState } from 'react';
import { Search, Bell, User, Sparkles, TrendingUp, Lightbulb, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ChatSidebar from '@/components/ai/ChatSidebar';
import IdeaDetailModal, { Idea } from '@/components/ideas/IdeaDetailModal';

// Sample data for idea cards
const ideaCards: Idea[] = [
  {
    id: 1,
    title: "Smart Home Assistant",
    description: "AI-powered home management system with voice control and energy optimization.",
    tags: ["IoT", "AI"],
    timestamp: "2d ago",
    trendAnalysis: { score: 87, trend: "up" as const },
    consumerDemandScore: 76,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 2,
    title: "Health Monitoring Wearable",
    description: "Continuous health tracking device with personalized wellness recommendations.",
    tags: ["Health", "Wearable"],
    timestamp: "3d ago", 
    trendAnalysis: { score: 92, trend: "up" as const },
    consumerDemandScore: 85,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 3,
    title: "Sustainable Packaging Solution",
    description: "Biodegradable packaging materials made from agricultural waste.",
    tags: ["Green", "Manufacturing"],
    timestamp: "1w ago",
    trendAnalysis: { score: 72, trend: "stable" as const },
    consumerDemandScore: 63,
    industryRelevance: "Medium",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 4,
    title: "AR Shopping Experience",
    description: "Augmented reality platform for virtual try-on and immersive shopping experiences.",
    tags: ["AR", "Retail"],
    timestamp: "4d ago",
    trendAnalysis: { score: 81, trend: "up" as const },
    consumerDemandScore: 78,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 5,
    title: "Personalized Learning Platform",
    description: "AI-driven education system that adapts to individual learning styles and progress.",
    tags: ["EdTech", "AI"],
    timestamp: "6d ago",
    trendAnalysis: { score: 76, trend: "stable" as const },
    consumerDemandScore: 82,
    industryRelevance: "Medium-High",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 6,
    title: "Urban Vertical Farming",
    description: "Automated vertical farming solution for urban areas with AI-optimized growing conditions.",
    tags: ["AgTech", "Sustainability"],
    timestamp: "1d ago",
    trendAnalysis: { score: 89, trend: "up" as const },
    consumerDemandScore: 74,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 7,
    title: "Blockchain Supply Chain",
    description: "Transparent supply chain tracking using blockchain technology for product authenticity.",
    tags: ["Blockchain", "Logistics"],
    timestamp: "5d ago",
    trendAnalysis: { score: 79, trend: "stable" as const },
    consumerDemandScore: 68,
    industryRelevance: "Medium-High",
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 8,
    title: "Autonomous Delivery Drones",
    description: "Self-flying drones for last-mile delivery with smart obstacle avoidance and efficient routing.",
    tags: ["Robotics", "Logistics"],
    timestamp: "3d ago",
    trendAnalysis: { score: 91, trend: "up" as const },
    consumerDemandScore: 79,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 9,
    title: "Personalized Nutrition App",
    description: "Mobile platform that creates custom meal plans based on health data, preferences, and goals.",
    tags: ["HealthTech", "Mobile"],
    timestamp: "2d ago",
    trendAnalysis: { score: 84, trend: "up" as const },
    consumerDemandScore: 86,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80"
  }
];

const Dashboard = () => {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openIdeaDetail = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* AI Chat Sidebar */}
      <ChatSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                <span className="ml-2 text-xl font-semibold">Pulse Vision.AI</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 items-center justify-center px-4">
              <div className="w-full max-w-sm relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ideas, projects..."
                  className="w-full bg-background pl-8 rounded-full border-muted-foreground/20"
                />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 flex-1">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">AI Ideation Engine</h1>
              <p className="text-muted-foreground mt-1">Generate and refine product ideas with AI assistance</p>
            </div>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Lightbulb className="mr-2 h-4 w-4" />
              New Idea
            </Button>
          </div>

          {/* Main content grid with AI Insights panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Ideas Grid - Now spans 3 columns on large screens */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideaCards.map((idea) => (
                <Card 
                  key={idea.id} 
                  className="border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative"
                >
                  {/* Image container with hover overlay */}
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={idea.image} 
                      alt={idea.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    {/* View Detail overlay that appears on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        onClick={() => openIdeaDetail(idea)} 
                        variant="secondary" 
                        className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Detail
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{idea.title}</h3>
                      <span className="text-xs text-muted-foreground">{idea.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{idea.description}</p>
                    
                    {/* Metrics section with improved visuals */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs border-t border-border/40 pt-2">
                      <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <TrendingUp className="h-3 w-3 text-[#8B5CF6]" />
                          <span>Trend</span>
                        </div>
                        <div className={cn(
                          "font-medium text-sm",
                          idea.trendAnalysis.trend === "up" ? "text-emerald-500" : 
                          idea.trendAnalysis.trend === "down" ? "text-red-500" : "text-amber-500"
                        )}>
                          {idea.trendAnalysis.score}%
                          {idea.trendAnalysis.trend === "up" && " ↑"}
                          {idea.trendAnalysis.trend === "down" && " ↓"}
                          {idea.trendAnalysis.trend === "stable" && " →"}
                        </div>
                      </div>
                      
                      <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Users className="h-3 w-3 text-[#8B5CF6]" />
                          <span>Demand</span>
                        </div>
                        <div className="font-medium text-sm">
                          {idea.consumerDemandScore}%
                        </div>
                      </div>
                      
                      <div className="flex flex-col bg-[#8B5CF6]/5 p-2 rounded-md">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Radio className="h-3 w-3 text-[#8B5CF6]" />
                          <span>Relevance</span>
                        </div>
                        <div className="font-medium text-sm">
                          {idea.industryRelevance}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* AI Insights Panel - 1 column */}
            <div className="lg:col-span-1">
              <Card className="border border-border/40 bg-card/50 backdrop-blur h-full">
                <div className="p-5 border-b border-border/40 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  <h3 className="font-semibold">AI Insights</h3>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    {/* Trend Insights */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                        Market Trends
                      </h4>
                      <p className="text-xs text-muted-foreground">Wearable health tech showing 18% growth in consumer adoption over the last quarter, suggesting strong market potential.</p>
                    </div>
                    
                    {/* Competitive Analysis */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                        Competitive Analysis
                      </h4>
                      <p className="text-xs text-muted-foreground">Smart home ecosystem fragmentation presents opportunity for unified platform with better interoperability.</p>
                    </div>
                    
                    {/* Research Insights */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                        Research Insights
                      </h4>
                      <p className="text-xs text-muted-foreground">Recent studies show 76% of consumers willing to pay premium for sustainable packaging if clearly communicated.</p>
                    </div>
                    
                    {/* Suggested Actions */}
                    <div className="pt-2 border-t border-border/40">
                      <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
                      <ul className="space-y-2">
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Lightbulb className="h-3 w-3" />
                          </span>
                          <span>Explore integration partnerships for Smart Home Assistant</span>
                        </li>
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Lightbulb className="h-3 w-3" />
                          </span>
                          <span>Develop consumer education strategy for sustainable packaging</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-8">
            <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Development Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Ideation</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">4 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Early stage concept development and market research</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Prototyping</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">2 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Building proof of concepts and initial prototypes</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Launch Ready</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">1 Project</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Final preparations before market introduction</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Idea Detail Modal */}
      <IdeaDetailModal 
        idea={selectedIdea} 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
