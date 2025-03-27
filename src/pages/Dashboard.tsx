
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sparkles, TrendingUp, Lightbulb, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ChatSidebar from '@/components/ai/ChatSidebar';

// Sample data for idea cards (filtered for FMCG brands)
const industryIdeaCards = [
  {
    id: 1,
    title: "Plant-Based Protein Snack",
    description: "Innovative plant-based protein snacks targeting health-conscious consumers with eco-friendly packaging and clean ingredient profiles.",
    tags: ["Plant-Based", "FMCG", "Health"],
    timestamp: "5d ago",
    trendAnalysis: { score: 94, trend: "up" },
    consumerDemandScore: 92,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Food & Beverages"
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
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Health & Wellness"
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
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Technology"
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
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Sustainability"
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
    image: "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Retail"
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
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Food & Beverages"
  }
];

// Sample data for my ideas
const myIdeasInitial = [
  {
    id: 101,
    title: "Biodegradable Food Packaging",
    description: "Innovative food packaging made from biodegradable materials that decompose naturally within 30 days, reducing environmental impact.",
    tags: ["Eco-friendly", "FMCG", "Packaging"],
    timestamp: "Just now",
    trendAnalysis: { score: 89, trend: "up" },
    consumerDemandScore: 88,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Sustainability"
  }
];

// Define all available categories
const allCategories = [
  "Food & Beverages",
  "Health & Wellness",
  "Technology",
  "Sustainability",
  "Retail",
  "Personal Care",
  "Home Goods"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [myIdeas, setMyIdeas] = useState(myIdeasInitial);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("recommended");

  // Check for newly created idea in sessionStorage
  useEffect(() => {
    const newIdeaData = sessionStorage.getItem('newIdea');
    if (newIdeaData) {
      try {
        const newIdea = JSON.parse(newIdeaData);
        
        // Create a proper idea object
        const ideaToAdd = {
          id: Date.now(), // Generate a unique ID based on timestamp
          title: newIdea.title || "New Idea",
          description: newIdea.description || "No description provided",
          tags: newIdea.tags ? newIdea.tags.split(',').map(tag => tag.trim()) : ["FMCG"],
          timestamp: "Just now",
          trendAnalysis: { score: 85, trend: "up" },
          consumerDemandScore: 80,
          industryRelevance: "Medium",
          image: newIdea.imageUrl || "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=300&h=170&q=80",
          category: newIdea.category || "Food & Beverages"
        };
        
        // Add the new idea to the list
        setMyIdeas(prevIdeas => [ideaToAdd, ...prevIdeas]);
        
        // If this is the first idea, set active tab to "my-ideas"
        if (myIdeasInitial.length === 0) {
          setActiveTab("my-ideas");
        }
        
        // Show toast notification
        toast.success("New idea added to your dashboard!");
        
        // Remove the item from sessionStorage
        sessionStorage.removeItem('newIdea');
      } catch (error) {
        console.error("Error parsing new idea data:", error);
      }
    }
  }, []);

  // Filter ideas based on selected category
  const filteredIndustryIdeas = selectedCategory
    ? industryIdeaCards.filter(idea => idea.category === selectedCategory)
    : industryIdeaCards;
  
  const filteredMyIdeas = selectedCategory
    ? myIdeas.filter(idea => idea.category === selectedCategory)
    : myIdeas;

  const viewIdeaDetail = (ideaId: number) => {
    navigate(`/idea/${ideaId}`);
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  // Render an idea card
  const renderIdeaCard = (idea: any) => (
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
          {idea.tags.map((tag: string, index: number) => (
            <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );

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
          {/* Tabs Structure */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Product Ideas</h2>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => navigate('/idea/new')}>
                <Lightbulb className="mr-2 h-4 w-4" />
                New Idea
              </Button>
            </div>
            
            {/* Category filter chips */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              <div className="flex items-center text-muted-foreground text-sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter:
              </div>
              
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors",
                    selectedCategory === category 
                      ? "bg-[#8B5CF6] text-white" 
                      : "bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs 
              defaultValue="recommended" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                {myIdeas.length > 0 && (
                  <TabsTrigger value="my-ideas">My Ideas</TabsTrigger>
                )}
                <TabsTrigger value="recommended" className={myIdeas.length === 0 ? "col-span-2" : ""}>
                  Recommended Ideas
                </TabsTrigger>
              </TabsList>
              
              {/* My Ideas Tab Content */}
              {myIdeas.length > 0 && (
                <TabsContent value="my-ideas" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredMyIdeas.map(idea => renderIdeaCard(idea))}
                  </div>
                  
                  {filteredMyIdeas.length === 0 && selectedCategory && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No ideas found in the "{selectedCategory}" category.</p>
                    </div>
                  )}
                </TabsContent>
              )}
              
              {/* Recommended Ideas Tab Content */}
              <TabsContent value="recommended" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredIndustryIdeas.map(idea => renderIdeaCard(idea))}
                </div>
                
                {filteredIndustryIdeas.length === 0 && selectedCategory && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No recommended ideas found in the "{selectedCategory}" category.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Innovation Pipeline Section */}
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
