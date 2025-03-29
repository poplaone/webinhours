
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Lightbulb, BookOpen, FileText, Brain, Star, BarChart3, Users, TrendingUp, GripVertical, Save } from 'lucide-react';
import { toast } from "sonner";
import ChatSidebar from '@/components/ai/ChatSidebar';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Define the idea type
export interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  timestamp: string;
  trendAnalysis: { score: number; trend: "up" | "down" | "stable" };
  consumerDemandScore: number;
  industryRelevance: string;
  image: string;
  problemStatement: string;
  targetAudience: string;
  uniqueSellingProposition: string;
  solutionOutline: string;
  revenueModel: string;
  potentialChallenges: string;
}

// Sample idea data
const sampleIdeas: Idea[] = [
  {
    id: 1,
    title: "AI-Powered Personalized Nutrition App",
    description: "A mobile app that provides personalized nutrition recommendations based on user's dietary preferences, health goals, and real-time data analysis.",
    tags: ["AI", "HealthTech", "Mobile"],
    timestamp: "2d ago",
    trendAnalysis: { score: 92, trend: "up" },
    consumerDemandScore: 88,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&h=170&q=80",
    problemStatement: "Consumers struggle to maintain a healthy diet due to lack of personalized guidance.",
    targetAudience: "Health-conscious individuals, fitness enthusiasts, and people with specific dietary needs.",
    uniqueSellingProposition: "AI-driven personalization, real-time data analysis, and integration with wearable devices.",
    solutionOutline: "Develop a mobile app with AI algorithms, user profile creation, data tracking, and personalized recommendations.",
    revenueModel: "Subscription fees, premium features, and partnerships with food and supplement brands.",
    potentialChallenges: "Data privacy concerns, accuracy of AI algorithms, and competition from existing nutrition apps."
  },
  {
    id: 2,
    title: "Sustainable Packaging Solution for FMCG",
    description: "Biodegradable packaging materials made from agricultural waste, perfect for FMCG products with high environmental concerns.",
    tags: ["Green", "FMCG", "Packaging"],
    timestamp: "1w ago",
    trendAnalysis: { score: 95, trend: "up" },
    consumerDemandScore: 90,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=300&h=170&q=80",
    problemStatement: "FMCG companies face increasing pressure to reduce plastic waste and adopt sustainable packaging solutions.",
    targetAudience: "FMCG brands, retailers, and environmentally conscious consumers.",
    uniqueSellingProposition: "Biodegradable materials, reduced carbon footprint, and compliance with environmental regulations.",
    solutionOutline: "Develop biodegradable packaging materials from agricultural waste, optimize production processes, and establish partnerships with FMCG brands.",
    revenueModel: "Sales of packaging materials, licensing agreements, and consulting services.",
    potentialChallenges: "Scalability of production, cost competitiveness, and acceptance by consumers."
  },
  {
    id: 3,
    title: "Smart Home Energy Management System",
    description: "An IoT-based system that optimizes energy consumption in homes by analyzing usage patterns and automating energy-saving measures.",
    tags: ["IoT", "Energy", "Home Automation"],
    timestamp: "3d ago",
    trendAnalysis: { score: 88, trend: "up" },
    consumerDemandScore: 85,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=300&h=170&q=80",
    problemStatement: "Homeowners struggle to manage energy consumption and reduce utility bills.",
    targetAudience: "Homeowners, apartment dwellers, and property managers.",
    uniqueSellingProposition: "Real-time energy monitoring, automated energy-saving measures, and integration with smart home devices.",
    solutionOutline: "Develop an IoT-based system with smart sensors, data analytics, and mobile app control.",
    revenueModel: "Sales of hardware, subscription fees for premium features, and partnerships with utility companies.",
    potentialChallenges: "Data security concerns, compatibility with existing home appliances, and competition from established smart home brands."
  },
  {
    id: 4,
    title: "AI-Powered Chatbot for Customer Support",
    description: "A chatbot that provides instant customer support using natural language processing and machine learning.",
    tags: ["AI", "Customer Service", "Chatbot"],
    timestamp: "5d ago",
    trendAnalysis: { score: 90, trend: "up" },
    consumerDemandScore: 87,
    industryRelevance: "Very High",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=300&h=170&q=80",
    problemStatement: "Businesses struggle to provide timely and efficient customer support.",
    targetAudience: "Businesses of all sizes, customer service teams, and online retailers.",
    uniqueSellingProposition: "24/7 availability, natural language processing, and integration with CRM systems.",
    solutionOutline: "Develop a chatbot using NLP and machine learning, integrate with customer service platforms, and provide training data.",
    revenueModel: "Subscription fees, usage-based pricing, and customization services.",
    potentialChallenges: "Accuracy of chatbot responses, handling complex customer inquiries, and integration with legacy systems."
  },
  {
    id: 5,
    title: "AR-Based Virtual Try-On for E-commerce",
    description: "An augmented reality app that allows customers to virtually try on clothing and accessories before making a purchase.",
    tags: ["AR", "E-commerce", "Fashion"],
    timestamp: "4d ago",
    trendAnalysis: { score: 85, trend: "up" },
    consumerDemandScore: 82,
    industryRelevance: "High",
    image: "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=300&h=170&q=80",
    problemStatement: "Customers hesitate to purchase clothing and accessories online due to uncertainty about fit and appearance.",
    targetAudience: "Online shoppers, fashion retailers, and apparel brands.",
    uniqueSellingProposition: "Realistic virtual try-on experience, improved purchase confidence, and reduced return rates.",
    solutionOutline: "Develop an AR app with 3D modeling, image recognition, and virtual try-on capabilities.",
    revenueModel: "Licensing fees, usage-based pricing, and partnerships with e-commerce platforms.",
    potentialChallenges: "Accuracy of virtual try-on, compatibility with different devices, and integration with e-commerce websites."
  }
];

// Sample chart data
const marketTrendData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 55 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 85 },
];

const demographicData = [
  { name: 'Gen Z', value: 35 },
  { name: 'Millennials', value: 45 },
  { name: 'Gen X', value: 15 },
  { name: 'Boomers', value: 5 },
];

const consumerPreferenceData = [
  { name: 'Eco-friendly', value: 85 },
  { name: 'Healthy', value: 75 },
  { name: 'Affordable', value: 60 },
  { name: 'Convenient', value: 50 },
  { name: 'Premium', value: 40 },
];

const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the idea based on the ID
  const idea = sampleIdeas.find((idea) => idea.id === Number(id));

  // If idea is not found, you might want to handle this case
  if (!idea) {
    return <div>Idea not found</div>;
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewConceptCreation = () => {
    navigate(`/concept/${id}`);
  };
  
  const handleSaveIdea = () => {
    toast.success("Idea saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* AI Chat Sidebar - now with fixed width */}
      <div className="w-[403px] flex-shrink-0 border-r border-border/30">
        <ChatSidebar />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo and Back button */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToDashboard}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
                <span className="ml-2 text-xl font-semibold">Idea Detail</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                onClick={handleSaveIdea}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Idea
              </Button>
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handleViewConceptCreation}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Concept Creation
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="pr-4 pb-10">
              {/* Idea Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
                <div className="flex gap-2">
                  {idea.tags.map((tag, index) => (
                    <Badge key={index} className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-medium rounded-full px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground mt-2">{idea.description}</p>
              </div>

              {/* AI Generated Summary */}
              <Card className="p-6 border border-border/40 bg-[#8B5CF6]/5 backdrop-blur mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  AI-Generated Summary
                </h2>
                <p className="text-muted-foreground">
                  {idea.title === "AI-Powered Personalized Nutrition App" ? 
                    "This AI-powered nutrition app concept addresses three converging market trends: rising personalized health solutions, increased focus on preventative wellness, and demand for convenient, data-driven lifestyle tools. Market analysis indicates significant growth potential with 32% CAGR in the health-tech app category through 2027, driven by health-conscious millennials and Gen Z consumers seeking tailored nutrition guidance. The integration with wearable devices creates a powerful ecosystem that could disrupt traditional nutrition consultation models." :
                    "This innovative product concept shows strong alignment with current market trends and consumer demands. Analysis of market data shows considerable growth potential in this segment, with increasing consumer interest across multiple demographics. The concept addresses key pain points and offers a differentiated solution in an expanding market."}
                </p>
              </Card>

              {/* Idea Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">Trend Analysis</h3>
                  </div>
                  <div className={cn(
                    "font-medium text-sm",
                    {
                      "text-emerald-500": idea.trendAnalysis.trend === "up",
                      "text-red-500": idea.trendAnalysis.trend === "down",
                      "text-amber-500": idea.trendAnalysis.trend === "stable"
                    }
                  )}>
                    {idea.trendAnalysis.score}%
                    {idea.trendAnalysis.trend === "up" && " ↑"}
                    {idea.trendAnalysis.trend === "down" && " ↓"}
                    {idea.trendAnalysis.trend === "stable" && " →"}
                  </div>
                </Card>
                <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">Consumer Demand</h3>
                  </div>
                  <p className="font-medium text-sm">{idea.consumerDemandScore}%</p>
                </Card>
                <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-[#8B5CF6]" />
                    <h3 className="font-medium">Industry Relevance</h3>
                  </div>
                  <p className="font-medium text-sm">{idea.industryRelevance}</p>
                </Card>
              </div>

              {/* Data Visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Market Growth Trend */}
                <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
                    Market Growth Trend
                  </h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={marketTrendData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fill: '#888888' }} />
                        <YAxis tick={{ fill: '#888888' }} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Growth trajectory shows accelerating market demand over the past 6 months.
                  </p>
                </Card>

                {/* Consumer Preferences */}
                <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#8B5CF6]" />
                    Consumer Preferences
                  </h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={consumerPreferenceData} layout="vertical" margin={{ top: 5, right: 5, left: 60, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" tick={{ fill: '#888888' }} />
                        <YAxis dataKey="name" type="category" tick={{ fill: '#888888' }} width={60} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Consumer preferences show strong prioritization of eco-friendly features and health benefits.
                  </p>
                </Card>
              </div>

              {/* Target Demographics */}
              <Card className="p-4 border border-border/40 bg-card/50 backdrop-blur mb-8">
                <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#8B5CF6]" />
                  Target Demographics
                </h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Millennials and Gen Z make up over 80% of the target audience, indicating strong appeal to younger, tech-savvy demographics.
                  </p>
                </div>
              </Card>

              {/* Core Idea Details */}
              <div className="space-y-6 mb-8">
                <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#8B5CF6]" />
                    Core Idea Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Problem Statement</h3>
                      <p className="text-sm text-muted-foreground">{idea.problemStatement}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Target Audience</h3>
                      <p className="text-sm text-muted-foreground">{idea.targetAudience}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Unique Selling Proposition</h3>
                      <p className="text-sm text-muted-foreground">{idea.uniqueSellingProposition}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Solution Outline</h3>
                      <p className="text-sm text-muted-foreground">{idea.solutionOutline}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Revenue Model</h3>
                      <p className="text-sm text-muted-foreground">{idea.revenueModel}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Potential Challenges</h3>
                      <p className="text-sm text-muted-foreground">{idea.potentialChallenges}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* AI Brainstorming Section */}
              <div className="border-t border-border/30 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-[#8B5CF6]" />
                  <h2 className="text-xl font-semibold">AI Brainstorming</h2>
                </div>
                <p className="text-muted-foreground">Generate new angles and variations for this idea using AI</p>
                
                <div className="mt-4">
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate New Ideas
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default IdeaDetail;
