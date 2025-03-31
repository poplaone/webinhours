import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Sparkles, TrendingUp, Lightbulb, Users, Radio, BookOpen, BarChart3, Brain, ExternalLink, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SideNavbar from '@/components/layout/SideNavbar';
import CategoryFilter from '@/components/filters/CategoryFilter';
import ConceptCardsList from '@/components/concepts/ConceptCardsList';

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
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&h=170&q=80",
    category: "Food & Snacks"
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
    category: "Household Products"
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
    category: "Household Products"
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
    category: "Food & Snacks"
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
    category: "Beverages"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<number | null>(null);

  const viewIdeaDetail = (ideaId: number) => {
    navigate(`/idea/${ideaId}`);
  };

  const viewConceptTesting = (ideaId: number) => {
    navigate(`/concept-testing/${ideaId}`);
  };

  const selectIdea = (ideaId: number) => {
    setSelectedIdeaId(ideaId === selectedIdeaId ? null : ideaId);
  };

  const filteredIdeas = selectedCategories.length === 0
    ? ideaCards
    : ideaCards.filter(idea => selectedCategories.includes(idea.category));

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

        <main className="flex-1 overflow-y-auto flex">
          <div className="w-1/4 border-r border-border/40 p-6 overflow-y-auto">
            <Card className="border border-border/40 bg-card/50 backdrop-blur h-full">
              <div className="p-5 border-b border-border/40 flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#8B5CF6]" />
                <h3 className="font-semibold">FMCG Market Insights</h3>
              </div>
              
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                      Market Trends
                    </h4>
                    <p className="text-xs text-muted-foreground">Sustainability in packaging is showing 32% growth in consumer preference, with 78% of shoppers considering eco-friendliness when making purchase decisions.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4 text-[#8B5CF6]" />
                      Competitive Analysis
                    </h4>
                    <p className="text-xs text-muted-foreground">Leading FMCG brands are investing heavily in digital experiences connected to physical products, creating unique differentiation opportunities.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                      Research Insights
                    </h4>
                    <p className="text-xs text-muted-foreground">91% of consumers indicate interest in personalized nutrition recommendations for food and beverage products they regularly purchase.</p>
                  </div>
                  
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
                  
                  <div className="mt-8 pt-4 border-t border-border/40">
                    <h2 className="text-base font-semibold mb-4">FMCG Innovation Pipeline</h2>
                    <div className="space-y-3">
                      <div className="p-3 bg-background rounded-lg border border-border/60">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-sm">Research Phase</h3>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">2</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Consumer research and concept development</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border border-border/60">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-sm">Product Development</h3>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">1</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Creating and testing prototypes</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg border border-border/60">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-sm">Market Introduction</h3>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Final preparations for retail distribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-2/5 p-6 overflow-y-auto">
            <div className="flex flex-col mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold">Product Ideas</h1>
                <p className="text-muted-foreground mt-1">High-potential product concepts for fast-moving consumer goods brands</p>
              </div>
              <div className="flex items-center justify-between">
                <CategoryFilter 
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                />
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => navigate('/idea/new')}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  New Idea
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredIdeas.map((idea) => (
                <Card 
                  key={idea.id} 
                  className={cn(
                    "border border-border/40 bg-card/50 backdrop-blur overflow-hidden flex flex-col hover:shadow-lg transition-shadow group relative cursor-pointer",
                    selectedIdeaId === idea.id && "border-[#8B5CF6] ring-1 ring-[#8B5CF6] bg-[#8B5CF6]/5"
                  )}
                  onClick={() => selectIdea(idea.id)}
                >
                  <div className="flex">
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden relative">
                      <img 
                        src={idea.image} 
                        alt={idea.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{idea.title}</h3>
                        <span className="text-xs text-muted-foreground">{idea.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{idea.description}</p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {idea.tags.length > 2 && (
                            <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">
                              +{idea.tags.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild onClick={(e) => { e.stopPropagation(); viewIdeaDetail(idea.id); }}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View idea details</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="w-1/3 border-l border-border/40 overflow-y-auto">
            <ConceptCardsList ideaId={selectedIdeaId ?? undefined} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
