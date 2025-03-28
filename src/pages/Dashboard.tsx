
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sparkles, TrendingUp, Lightbulb, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SideNavbar from '@/components/layout/SideNavbar';

// Sample data for idea cards (filtered for FMCG brands)
const ideaCards = [
  {
    id: 1,
    title: "Plant-Based Protein Snack",
    description: "Innovative plant-based protein snacks targeting health-conscious consumers with eco-friendly packaging and clean ingredient profiles.",
    tags: ["Plant-Based", "FMCG", "Health"],
    timestamp: "5d ago",
    trendAnalysis: { score: 94, trend: "up" },
    consumerDemandScore: 92,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 9,
    title: "Personalized Nutrition App",
    description: "Mobile platform for FMCG brands to offer personalized food & beverage recommendations based on customer preferences and dietary needs.",
    tags: ["HealthTech", "FMCG", "Mobile"],
    timestamp: "2d ago",
    trendAnalysis: { score: 89, trend: "up" },
    consumerDemandScore: 86,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 10,
    title: "Smart Consumer Packaging",
    description: "Interactive packaging with QR codes and AR features that connect FMCG products to digital experiences, recipes, and loyalty programs.",
    tags: ["AR", "FMCG", "Packaging"],
    timestamp: "3d ago",
    trendAnalysis: { score: 87, trend: "up" },
    consumerDemandScore: 82,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 11,
    title: "Sustainable Packaging Solution",
    description: "Biodegradable packaging materials made from agricultural waste, perfect for FMCG products with high environmental concerns.",
    tags: ["Green", "FMCG", "Packaging"],
    timestamp: "1w ago",
    trendAnalysis: { score: 92, trend: "up" },
    consumerDemandScore: 88,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 12,
    title: "Direct-to-Consumer Subscription",
    description: "Monthly subscription box model for curated FMCG products delivered directly to consumers with personalized product selections.",
    tags: ["D2C", "FMCG", "Subscription"],
    timestamp: "4d ago",
    trendAnalysis: { score: 85, trend: "up" },
    consumerDemandScore: 79,
    industryRelevance: "Medium",
    image: "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=300&h=170&q=80"
  },
  {
    id: 13,
    title: "Functional Beverages",
    description: "Innovative drinks with added health benefits like adaptogens, nootropics and immunity-boosting ingredients targeted at health-focused consumers.",
    tags: ["Beverage", "FMCG", "Wellness"],
    timestamp: "6d ago",
    trendAnalysis: { score: 91, trend: "up" },
    consumerDemandScore: 84,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=300&h=170&q=80"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const viewIdeaDetail = (ideaId: number) => {
    navigate(`/idea/${ideaId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* Side Navigation */}
      <SideNavbar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Search Bar */}
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
            
            {/* Actions */}
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

        {/* Main Content */}
        <main className="container py-6 flex-1">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Product Ideas</h1>
              <p className="text-muted-foreground mt-1">High-potential product concepts for fast-moving consumer goods brands</p>
            </div>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => navigate('/idea/new')}>
              <Lightbulb className="mr-2 h-4 w-4" />
              New Idea
            </Button>
          </div>

          {/* Main content grid with AI Insights panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Ideas Grid - Now spans 3 columns on large screens */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                        onClick={() => viewIdeaDetail(idea.id)} 
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
                  <h3 className="font-semibold">FMCG Market Insights</h3>
                </div>
                
                <div className="p-5">
                  <div className="space-y-4">
                    {/* Trend Insights */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                        Market Trends
                      </h4>
                      <p className="text-xs text-muted-foreground">Sustainability in packaging is showing 32% growth in consumer preference, with 78% of shoppers considering eco-friendliness when making purchase decisions.</p>
                    </div>
                    
                    {/* Competitive Analysis */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                        Competitive Analysis
                      </h4>
                      <p className="text-xs text-muted-foreground">Leading FMCG brands are investing heavily in digital experiences connected to physical products, creating unique differentiation opportunities.</p>
                    </div>
                    
                    {/* Research Insights */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                        Research Insights
                      </h4>
                      <p className="text-xs text-muted-foreground">91% of consumers indicate interest in personalized nutrition recommendations for food and beverage products they regularly purchase.</p>
                    </div>
                    
                    {/* Suggested Actions */}
                    <div className="pt-2 border-t border-border/40">
                      <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
                      <ul className="space-y-2">
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Lightbulb className="h-3 w-3" />
                          </span>
                          <span>Develop sustainable packaging pilot program</span>
                        </li>
                        <li className="flex gap-2 items-center text-xs">
                          <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] p-1 rounded-full">
                            <Lightbulb className="h-3 w-3" />
                          </span>
                          <span>Partner with AR developers for interactive packaging solutions</span>
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
              <h2 className="text-xl font-semibold mb-4">FMCG Innovation Pipeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Research Phase</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">2 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Consumer research and concept development</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Product Development</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">1 Project</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Creating and testing prototypes with focus groups</p>
                </div>
                <div className="p-4 bg-background rounded-lg border border-border/60">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Market Introduction</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">0 Projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Final preparations for retail channel distribution</p>
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
