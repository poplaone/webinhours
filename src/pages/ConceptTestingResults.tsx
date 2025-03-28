import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, BarChart3, TrendingUp, ThumbsUp, MessageSquare, Heart, BrainCircuit, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const surveyOverviewData = {
  totalResponses: 326,
  completionRate: 87,
  averageTimeSpent: "4m 12s",
  npsScore: 68,
  responseDate: "May 15, 2023"
};

const sentimentData = [
  { name: 'Very Positive', value: 42 },
  { name: 'Positive', value: 35 },
  { name: 'Neutral', value: 15 },
  { name: 'Negative', value: 6 },
  { name: 'Very Negative', value: 2 },
];

const demographicData = [
  { name: 'Gen Z', value: 32 },
  { name: 'Millennials', value: 48 },
  { name: 'Gen X', value: 15 },
  { name: 'Boomers', value: 5 },
];

const SENTIMENT_COLORS = ['#10B981', '#34D399', '#A1A1AA', '#F87171', '#EF4444'];
const DEMOGRAPHIC_COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'];

const purchaseIntentData = [
  { name: 'Definitely Would Buy', value: 38 },
  { name: 'Probably Would Buy', value: 32 },
  { name: 'Might or Might Not Buy', value: 18 },
  { name: 'Probably Would Not Buy', value: 8 },
  { name: 'Definitely Would Not Buy', value: 4 },
];

const featureRatingData = [
  { name: 'Eco-Friendly Packaging', score: 4.7, maxScore: 5 },
  { name: 'Protein Content', score: 4.3, maxScore: 5 },
  { name: 'Plant-Based Ingredients', score: 4.1, maxScore: 5 },
  { name: 'Texture', score: 4.0, maxScore: 5 },
  { name: 'Taste/Flavor', score: 3.7, maxScore: 5 },
];

const weeklyTrendData = [
  { name: 'Week 1', positive: 65, negative: 12, neutral: 23 },
  { name: 'Week 2', positive: 68, negative: 10, neutral: 22 },
  { name: 'Week 3', positive: 72, negative: 8, neutral: 20 },
  { name: 'Week 4', positive: 75, negative: 7, neutral: 18 },
];

const feedbackComments = [
  {
    id: 1,
    comment: "Love the eco-friendly packaging approach. Would definitely purchase if available in my local stores.",
    sentiment: "positive",
    demographic: "Millennial",
    date: "May 14, 2023",
  },
  {
    id: 2,
    comment: "The concept is interesting, but I'm concerned about the price point compared to similar products.",
    sentiment: "neutral",
    demographic: "Gen X",
    date: "May 13, 2023",
  },
  {
    id: 3,
    comment: "Great protein content for a plant-based snack! Would be perfect for post-workout.",
    sentiment: "positive",
    demographic: "Gen Z",
    date: "May 15, 2023",
  },
  {
    id: 4,
    comment: "I'm not convinced the texture would be appealing. Plant-based snacks often miss the mark here.",
    sentiment: "negative",
    demographic: "Boomer",
    date: "May 12, 2023",
  },
  {
    id: 5,
    comment: "The sustainable approach resonates with my values. I'd be interested in seeing the full ingredient list.",
    sentiment: "positive",
    demographic: "Millennial",
    date: "May 14, 2023",
  },
];

const aiInsights = [
  "Strong positive correlation between eco-friendly packaging and purchase intent among millennials (87% probability).",
  "Consumer comments about texture suggest opportunity for improvement in mouthfeel and density.",
  "Price sensitivity appears primarily in 35-44 age demographic with household incomes below $75k annually.",
  "Social media sharing intent is 3.2x higher than industry average for similar product concepts.",
  "Brand alignment score of 92% indicates strong fit with current portfolio and brand values."
];

const ConceptTestingResults = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Plant-Based Protein Snack</h1>
            <p className="text-muted-foreground">Concept Testing Results • Survey launched May 10, 2023</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
              Active
            </Badge>
            <Badge variant="outline" className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border-[#8B5CF6]/20">
              326 Responses
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Responses</p>
                  <p className="text-2xl font-bold">{surveyOverviewData.totalResponses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold">{surveyOverviewData.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">NPS Score</p>
                  <p className="text-2xl font-bold">{surveyOverviewData.npsScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-full">
                  <ThumbsUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Avg. Time Spent</p>
                  <p className="text-2xl font-bold">{surveyOverviewData.averageTimeSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Purchase Intent</CardTitle>
                  <CardDescription>Consumer likelihood to purchase this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={purchaseIntentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {purchaseIntentData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index < 2 ? SENTIMENT_COLORS[0] : 
                                    index === 2 ? SENTIMENT_COLORS[2] : 
                                    SENTIMENT_COLORS[4]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Sentiment Analysis</CardTitle>
                  <CardDescription>Overall consumer sentiment toward the concept</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">Feature Ratings</CardTitle>
                <CardDescription>Average rating of key product features (1-5 scale)</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="h-[350px] mb-8">
                  <ChartContainer
                    config={{
                      bar: {
                        theme: {
                          light: "#2563EB",
                          dark: "#2563EB",
                        },
                      },
                    }}
                  >
                    <BarChart 
                      data={featureRatingData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis 
                        type="number" 
                        domain={[0, 5]} 
                        tick={{ fill: '#888888' }} 
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fill: '#888888' }} 
                        width={120} 
                      />
                      <Tooltip 
                        content={({ payload, label }) => {
                          if (payload && payload.length) {
                            return (
                              <div className="bg-card p-2 border rounded-md shadow-md">
                                <p className="font-semibold">{label}</p>
                                <p className="text-[#2563EB] font-bold">{`${payload[0].value} / 5`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        radius={[0, 0, 0, 0]} 
                        barSize={30}
                        shape={(props) => {
                          const { x, y, width, height, maxScore } = props;
                          return (
                            <g>
                              <rect 
                                x={x} 
                                y={y} 
                                width={width} 
                                height={height} 
                                fill="#1E1E30" 
                                radius={0} 
                              />
                              <rect 
                                x={x} 
                                y={y} 
                                width={(props.value / 5) * width} 
                                height={height} 
                                fill="#2563EB" 
                                radius={0} 
                              />
                            </g>
                          );
                        }}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                  {featureRatingData.map((feature, index) => (
                    <Card key={index} className="overflow-hidden bg-card border-border">
                      <CardContent className="p-4">
                        <div className="flex flex-col h-full">
                          <p className="text-sm font-medium mb-3 line-clamp-2 h-10 flex items-center">{feature.name}</p>
                          <div className="flex items-center gap-1 mt-auto">
                            <Star className="h-4 w-4 fill-[#2563EB] text-[#2563EB]" />
                            <span className="text-xl font-bold text-[#2563EB]">{feature.score}</span>
                            <span className="text-xs text-muted-foreground">/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Sentiment Trend</CardTitle>
                <CardDescription>Weekly sentiment trend during the survey period</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      positive: {
                        theme: {
                          light: "#10B981",
                          dark: "#10B981",
                        },
                      },
                      negative: {
                        theme: {
                          light: "#EF4444",
                          dark: "#EF4444",
                        },
                      },
                      neutral: {
                        theme: {
                          light: "#8B5CF6",
                          dark: "#8B5CF6",
                        },
                      },
                    }}
                  >
                    <LineChart data={weeklyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#888888' }}
                        axisLine={{ stroke: '#E2E8F0' }}
                      />
                      <YAxis 
                        tick={{ fill: '#888888' }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background p-4 border rounded-md shadow-md">
                                <p className="font-semibold mb-2">{label}</p>
                                {payload.map((entry, index) => (
                                  <div key={`item-${index}`} className="flex items-center justify-between gap-4 mb-1">
                                    <div className="flex items-center gap-2">
                                      <div 
                                        className="w-3 h-3 rounded-full" 
                                        style={{ 
                                          backgroundColor: entry.name === 'positive' ? '#10B981' : 
                                                          entry.name === 'negative' ? '#EF4444' : '#8B5CF6' 
                                        }}
                                      />
                                      <span className="capitalize">{entry.name}</span>
                                    </div>
                                    <span className="font-medium">{`${entry.value}%`}</span>
                                  </div>
                                ))}
                                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                                  <span className="text-sm text-muted-foreground">Total</span>
                                  <span className="font-medium">
                                    {payload.reduce((sum, entry) => sum + (entry.value as number), 0)}%
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="positive" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="negative" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#EF4444", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, fill: "#EF4444", strokeWidth: 2, stroke: "#fff" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="neutral" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 8, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value) => <span className="capitalize">{value}</span>}
                        iconType="circle"
                        iconSize={10}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium">Positive</span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-green-500">75%</span>
                        <span className="text-green-500 text-xs ml-1">+10%</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium">Negative</span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-red-500">7%</span>
                        <span className="text-green-500 text-xs ml-1">-5%</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-500/10 border-purple-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
                          <span className="text-sm font-medium">Neutral</span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-[#8B5CF6] rotate-90" />
                      </div>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-[#8B5CF6]">18%</span>
                        <span className="text-red-500 text-xs ml-1">-5%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Age Demographics</CardTitle>
                  <CardDescription>Survey respondents by generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demographicData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {demographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DEMOGRAPHIC_COLORS[index % DEMOGRAPHIC_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Demographic Breakdown</CardTitle>
                  <CardDescription>Detailed demographic information of survey respondents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Segment</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium" rowSpan={4}>Age Group</TableCell>
                        <TableCell>Gen Z (18-26)</TableCell>
                        <TableCell className="text-right">32%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Millennials (27-42)</TableCell>
                        <TableCell className="text-right">48%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gen X (43-58)</TableCell>
                        <TableCell className="text-right">15%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Boomers (59+)</TableCell>
                        <TableCell className="text-right">5%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell className="font-medium" rowSpan={3}>Income Level</TableCell>
                        <TableCell>$0-$50k</TableCell>
                        <TableCell className="text-right">37%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>$50k-$100k</TableCell>
                        <TableCell className="text-right">42%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>$100k+</TableCell>
                        <TableCell className="text-right">21%</TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell className="font-medium" rowSpan={2}>Dietary Preference</TableCell>
                        <TableCell>Plant-Based/Vegan</TableCell>
                        <TableCell className="text-right">28%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Non-Vegan</TableCell>
                        <TableCell className="text-right">72%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Geographic Distribution</CardTitle>
                <CardDescription>Survey responses by region</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead className="text-right">Avg. Purchase Intent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Northeast</TableCell>
                      <TableCell>86</TableCell>
                      <TableCell>26%</TableCell>
                      <TableCell className="text-right">4.2/5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Midwest</TableCell>
                      <TableCell>52</TableCell>
                      <TableCell>16%</TableCell>
                      <TableCell className="text-right">3.8/5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">South</TableCell>
                      <TableCell>68</TableCell>
                      <TableCell>21%</TableCell>
                      <TableCell className="text-right">3.7/5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">West</TableCell>
                      <TableCell>120</TableCell>
                      <TableCell>37%</TableCell>
                      <TableCell className="text-right">4.5/5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consumer Feedback</CardTitle>
                <CardDescription>Selected comments from survey respondents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackComments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={
                            comment.sentiment === "positive" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            comment.sentiment === "negative" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                            "bg-gray-500/10 text-gray-500 border-gray-500/20"
                          }>
                            {comment.sentiment === "positive" ? 
                              <ThumbsUp className="w-3 h-3 mr-1" /> : 
                              comment.sentiment === "negative" ? 
                              <MessageSquare className="w-3 h-3 mr-1" /> : 
                              <MessageSquare className="w-3 h-3 mr-1" />
                            }
                            {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20">
                            {comment.demographic}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentiment by Feature</CardTitle>
                <CardDescription>Consumer sentiment broken down by product feature</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Positive</TableHead>
                      <TableHead>Neutral</TableHead>
                      <TableHead>Negative</TableHead>
                      <TableHead className="text-right">Overall Sentiment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Eco-Friendly Packaging</TableCell>
                      <TableCell className="text-green-500">87%</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell className="text-red-500">3%</TableCell>
                      <TableCell className="text-right text-green-500 font-medium">Strong Positive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Plant-Based Ingredients</TableCell>
                      <TableCell className="text-green-500">76%</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell className="text-red-500">9%</TableCell>
                      <TableCell className="text-right text-green-500 font-medium">Positive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Taste/Flavor Profile</TableCell>
                      <TableCell className="text-green-500">68%</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell className="text-red-500">12%</TableCell>
                      <TableCell className="text-right text-green-500 font-medium">Positive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price Point</TableCell>
                      <TableCell className="text-green-500">42%</TableCell>
                      <TableCell>30%</TableCell>
                      <TableCell className="text-red-500">28%</TableCell>
                      <TableCell className="text-right text-amber-500 font-medium">Mixed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-[#8B5CF6]" />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription>Machine learning analysis of survey responses and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 rounded-lg">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Heart className="h-4 w-4 text-[#8B5CF6]" />
                        </div>
                        <p>{insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                  <CardDescription>AI-suggested next steps based on test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 p-1 rounded-full bg-green-500/10">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Proceed with development</p>
                        <p className="text-sm text-muted-foreground">Strong positive reception (77% overall) supports moving forward with the concept.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 p-1 rounded-full bg-[#8B5CF6]/10">
                        <Users className="h-3 w-3 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <p className="font-medium">Focus on West Coast launch</p>
                        <p className="text-sm text-muted-foreground">Geographic data indicates strongest reception in western regions (4.5/5 purchase intent).</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 p-1 rounded-full bg-amber-500/10">
                        <BarChart3 className="h-3 w-3 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">Review pricing strategy</p>
                        <p className="text-sm text-muted-foreground">Mixed sentiment on price point suggests need for reconsideration or clearer value proposition.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 p-1 rounded-full bg-blue-500/10">
                        <MessageSquare className="h-3 w-3 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Texture improvement</p>
                        <p className="text-sm text-muted-foreground">Consumer feedback indicates refinement needed for texture/mouthfeel aspects.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Fit Analysis</CardTitle>
                  <CardDescription>AI assessment of concept's market potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Market Need Alignment</h4>
                        <span className="text-green-500 font-medium">92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Brand Fit</h4>
                        <span className="text-green-500 font-medium">88%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Competitive Advantage</h4>
                        <span className="text-green-500 font-medium">76%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Scalability Potential</h4>
                        <span className="text-[#8B5CF6] font-medium">84%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-[#8B5CF6] h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Price to Value Perception</h4>
                        <span className="text-amber-500 font-medium">68%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="font-medium mb-2">Executive Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        This concept shows strong overall market potential with 82% aggregate positive indicators. Primary strengths include excellent alignment with current consumer needs and brand identity. The main areas for refinement are price positioning and some aspect-specific improvements in product formulation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptTestingResults;
