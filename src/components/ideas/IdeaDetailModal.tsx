
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, Lightbulb, TrendingUp, Users, Radio, BarChart, BookOpen, Brain } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  timestamp: string;
  trendAnalysis: { score: number; trend: 'up' | 'down' | 'stable' };
  consumerDemandScore: number;
  industryRelevance: string;
  image: string;
}

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

// Sample data for charts
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

const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({ idea, isOpen, onClose }) => {
  if (!idea) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{idea.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Added {idea.timestamp}
          </DialogDescription>
        </DialogHeader>

        {/* Hero Image */}
        <div className="w-full h-60 overflow-hidden rounded-md mb-6">
          <img 
            src={idea.image} 
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {idea.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20">
              {tag}
            </Badge>
          ))}
        </div>

        {/* AI Generated Summary */}
        <Card className="mb-6 bg-[#8B5CF6]/5 border-[#8B5CF6]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                <Brain className="h-5 w-5 text-[#8B5CF6]" />
              </div>
              <h3 className="font-semibold">AI-Generated Summary</h3>
            </div>
            <p className="text-muted-foreground">
              {idea.title === "Plant-Based Protein Snack" ? 
                "This plant-based protein snack concept addresses three converging market trends: rising plant-based diets, increased protein consumption, and demand for convenient, healthy snacking options. Market analysis indicates significant growth potential with 37% CAGR in the plant-based snack category through 2028, driven by health-conscious millennials and Gen Z consumers seeking sustainable food options." :
                "This innovative product concept shows strong alignment with current market trends and consumer demands. Analysis of market data shows considerable growth potential in this segment, with increasing consumer interest across multiple demographics. The concept addresses key pain points and offers a differentiated solution in an expanding market."}
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">{idea.description}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Trend Analysis</h3>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                idea.trendAnalysis.trend === "up" ? "text-emerald-500" : 
                idea.trendAnalysis.trend === "down" ? "text-red-500" : "text-amber-500"
              )}>
                {idea.trendAnalysis.score}%
                {idea.trendAnalysis.trend === "up" && " ↑"}
                {idea.trendAnalysis.trend === "down" && " ↓"}
                {idea.trendAnalysis.trend === "stable" && " →"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {idea.trendAnalysis.trend === "up" 
                  ? "Trending upward in market interest" 
                  : idea.trendAnalysis.trend === "down" 
                    ? "Declining in market interest" 
                    : "Maintaining stable market interest"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <Users className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Consumer Demand</h3>
              </div>
              <div className="text-2xl font-bold">
                {idea.consumerDemandScore}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {idea.consumerDemandScore > 80 ? "Very high consumer interest" :
                 idea.consumerDemandScore > 60 ? "Strong consumer interest" :
                 idea.consumerDemandScore > 40 ? "Moderate consumer interest" : "Low consumer interest"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#8B5CF6]/10 rounded-full">
                  <Radio className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="font-medium">Industry Relevance</h3>
              </div>
              <div className="text-2xl font-bold">
                {idea.industryRelevance}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Alignment with current industry priorities and trends
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Market Growth Trend */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#8B5CF6]" />
            Market Growth Trend
          </h3>
          <Card className="p-4">
            <div className="h-72">
              <ChartContainer
                config={{
                  area: {
                    theme: {
                      light: "#8B5CF6",
                      dark: "#8B5CF6",
                    },
                  },
                }}
              >
                <AreaChart data={marketTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: '#888888' }} />
                  <YAxis tick={{ fill: '#888888' }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ChartContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Growth trajectory shows accelerating market demand over the past 6 months, with particularly strong momentum in the most recent quarter. Projections indicate continued expansion as consumer adoption increases.
            </p>
          </Card>
        </div>

        {/* Target Demographics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#8B5CF6]" />
            Target Demographics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
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
            </Card>
            <Card className="p-4">
              <h4 className="font-medium mb-3">Key Demographics</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Characteristics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Millennials</TableCell>
                    <TableCell>Health-conscious, willing to pay premium for quality, values sustainability</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gen Z</TableCell>
                    <TableCell>Environmentally aware, social media savvy, looks for authentic brands</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gen X</TableCell>
                    <TableCell>Practical, value-oriented, increasing health awareness</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>

        {/* Consumer Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#8B5CF6]" />
            Consumer Preferences
          </h3>
          <Card className="p-4">
            <div className="h-72">
              <ChartContainer
                config={{
                  bar: {
                    theme: {
                      light: "#8B5CF6",
                      dark: "#8B5CF6",
                    },
                  },
                }}
              >
                <RechartsBarChart data={consumerPreferenceData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fill: '#888888' }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#888888' }} width={70} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </RechartsBarChart>
              </ChartContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Analysis of consumer preferences shows strong prioritization of eco-friendly features and health benefits. The data suggests product development should emphasize these attributes while ensuring reasonable pricing to capture the broader market potential.
            </p>
          </Card>
        </div>

        {/* Detailed Market Analysis */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
            Detailed Market Analysis
          </h3>
          <Card className="p-4">
            <p className="text-muted-foreground mb-4">
              {idea.title === "Plant-Based Protein Snack" ?
                "The plant-based protein snack market is experiencing rapid growth driven by increasing health consciousness and sustainability concerns. With a projected CAGR of 12.8% from 2023-2028, this category is outpacing traditional snack segments by more than 3x." :
                "Market analysis reveals significant growth potential in this product category. Current market size is estimated at $4.2B with projected annual growth of 8.7% over the next five years, outperforming the broader industry average of 3.2%."}
            </p>
            
            <h4 className="font-medium mb-2">Key Insights:</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2 mb-4">
              <li>Market penetration in urban centers is 2.3x higher than in suburban areas</li>
              <li>Early adopters show 78% repeat purchase rates within the first 3 months</li>
              <li>DTC channel growth outpacing traditional retail by 15% in this category</li>
              <li>Social media engagement drives 42% higher conversion compared to other marketing channels</li>
            </ul>
            
            <h4 className="font-medium mb-2">Competitive Landscape:</h4>
            <p className="text-muted-foreground">
              Market competition analysis indicates 14 major players with no clear dominant leader, suggesting opportunity for innovative new entrants to capture significant market share through differentiated positioning and strong branding strategies.
            </p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Lightbulb className="mr-2 h-4 w-4" />
            Develop Idea
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaDetailModal;
