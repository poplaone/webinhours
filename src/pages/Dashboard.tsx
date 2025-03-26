
import React from 'react';
import { Search, Bell, User, Sparkles, Settings, PlusCircle, Zap, TrendingUp, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
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
      <main className="container py-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Ideation Engine</h1>
            <p className="text-muted-foreground mt-1">Generate and refine product ideas with AI assistance</p>
          </div>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-[#8B5CF6]" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left">
                <Lightbulb className="mr-2 h-4 w-4 text-[#8B5CF6]" />
                Generate new idea
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <TrendingUp className="mr-2 h-4 w-4 text-[#8B5CF6]" />
                Analyze market trends
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Settings className="mr-2 h-4 w-4 text-[#8B5CF6]" />
                Configure AI preferences
              </Button>
            </div>
          </Card>

          {/* Recent Ideas Card */}
          <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">Recent Ideas</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn(
                  "p-3 rounded-lg border border-border/60",
                  "hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-colors cursor-pointer"
                )}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">Smart Home Assistant</h3>
                    <span className="text-xs text-muted-foreground">2d ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">AI-powered home management system with voice control and energy optimization.</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">IoT</span>
                    <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs px-2 py-1 rounded-full">AI</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights Card */}
          <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            <div className="space-y-4">
              <div className="p-3 bg-[#8B5CF6]/5 rounded-lg border border-[#8B5CF6]/20">
                <h3 className="font-medium text-[#8B5CF6]">Trending: Sustainable Tech</h3>
                <p className="text-sm mt-1">Products focusing on sustainability are gaining 43% more traction in the current market.</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border/60">
                <h3 className="font-medium">Market Gap Identified</h3>
                <p className="text-sm text-muted-foreground mt-1">Analysis shows opportunity in accessible smart home devices for elderly users.</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border/60">
                <h3 className="font-medium">Competitive Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">Your recent ideas have 28% uniqueness score compared to market offerings.</p>
              </div>
            </div>
          </Card>
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
  );
};

export default Dashboard;
