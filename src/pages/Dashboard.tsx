
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import ChatSidebar from '@/components/ai/ChatSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import IdeasTabs from '@/components/ideas/IdeasTabs';
import InnovationPipeline from '@/components/ideas/InnovationPipeline';
import { industryIdeaCards, myIdeasInitial, allCategories } from '@/data/ideaData';

const Dashboard = () => {
  const [myIdeas, setMyIdeas] = useState(myIdeasInitial);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategories);
  const [activeTab, setActiveTab] = useState("recommended");
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
          tags: newIdea.tags ? newIdea.tags.split(',').map((tag: string) => tag.trim()) : ["FMCG"],
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

  // Filter ideas based on selected categories
  const filteredIndustryIdeas = industryIdeaCards.filter(idea => 
    selectedCategories.includes(idea.category)
  );
  
  const filteredMyIdeas = myIdeas.filter(idea => 
    selectedCategories.includes(idea.category)
  );

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      if (selectedCategories.length > 1) { // Prevent removing all categories
        setSelectedCategories(prev => prev.filter(cat => cat !== category));
      }
    } else {
      // Add category if not selected
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  // Toggle AI insights sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* AI Chat Sidebar - only shown when sidebarVisible is true */}
      {sidebarVisible && (
        <div className="w-72 shrink-0">
          <ChatSidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <DashboardHeader toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="container py-6 flex-1">
          {/* Tabs Structure */}
          <IdeasTabs 
            myIdeas={myIdeas}
            industryIdeas={industryIdeaCards}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            allCategories={allCategories}
            selectedCategories={selectedCategories}
            handleCategoryClick={handleCategoryClick}
            filteredMyIdeas={filteredMyIdeas}
            filteredIndustryIdeas={filteredIndustryIdeas}
          />

          {/* Innovation Pipeline Section */}
          <InnovationPipeline />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
