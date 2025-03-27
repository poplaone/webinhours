
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IdeaCard from './IdeaCard';
import CategoryFilter from './CategoryFilter';

interface IdeaType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  timestamp: string;
  trendAnalysis: { score: number; trend: string };
  consumerDemandScore: number;
  industryRelevance: string;
  image: string;
  category: string;
}

interface IdeasTabsProps {
  myIdeas: IdeaType[];
  industryIdeas: IdeaType[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  allCategories: string[];
  selectedCategories: string[];
  handleCategoryClick: (category: string) => void;
  filteredMyIdeas: IdeaType[];
  filteredIndustryIdeas: IdeaType[];
}

const IdeasTabs: React.FC<IdeasTabsProps> = ({
  myIdeas,
  industryIdeas,
  activeTab,
  setActiveTab,
  allCategories,
  selectedCategories,
  handleCategoryClick,
  filteredMyIdeas,
  filteredIndustryIdeas
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Ideas</h2>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={() => navigate('/idea/new')}>
          <Lightbulb className="mr-2 h-4 w-4" />
          New Idea
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="recommended" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
          {myIdeas.length > 0 && (
            <TabsTrigger value="my-ideas">My Ideas</TabsTrigger>
          )}
          <TabsTrigger value="recommended" className={myIdeas.length === 0 ? "col-span-2" : ""}>
            Recommended Ideas
          </TabsTrigger>
        </TabsList>
        
        {/* Category filter chips - below tabs */}
        <CategoryFilter 
          allCategories={allCategories}
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
        />
        
        {/* My Ideas Tab Content */}
        {myIdeas.length > 0 && (
          <TabsContent value="my-ideas" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMyIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
            </div>
            
            {filteredMyIdeas.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No ideas found with the selected categories.</p>
              </div>
            )}
          </TabsContent>
        )}
        
        {/* Recommended Ideas Tab Content */}
        <TabsContent value="recommended" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIndustryIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
          </div>
          
          {filteredIndustryIdeas.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No recommended ideas found with the selected categories.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IdeasTabs;
