import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, BarChart, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideNavbar from '@/components/layout/SideNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const surveyData = {
  id: 1,
  name: "Eco-Friendly Packaging Test",
  totalResponses: 65,
  targetResponses: 100,
  completionRate: 65,
  averageRating: 4.2,
  questions: [
    {
      id: 1,
      question: "How likely are you to purchase a product with eco-friendly packaging?",
      responses: [
        { answer: "Very Likely", count: 30 },
        { answer: "Somewhat Likely", count: 20 },
        { answer: "Neutral", count: 8 },
        { answer: "Somewhat Unlikely", count: 5 },
        { answer: "Very Unlikely", count: 2 }
      ]
    },
    {
      id: 2,
      question: "Would you pay more for products with sustainable packaging?",
      responses: [
        { answer: "Yes, definitely", count: 25 },
        { answer: "Yes, to some extent", count: 22 },
        { answer: "Not sure", count: 10 },
        { answer: "Probably not", count: 5 },
        { answer: "Definitely not", count: 3 }
      ]
    }
  ],
  demographics: {
    age: [
      { name: "18-24", value: 15 },
      { name: "25-34", value: 25 },
      { name: "35-44", value: 15 },
      { name: "45-54", value: 7 },
      { name: "55+", value: 3 }
    ],
    gender: [
      { name: "Male", value: 28 },
      { name: "Female", value: 35 },
      { name: "Non-binary", value: 2 }
    ]
  }
};

const benchmarkData = [
  { name: 'Interest', product: 75, category: 65 },
  { name: 'Engagement', product: 62, category: 57 },
  { name: 'Purchase Intent', product: 41, category: 35 },
  { name: 'Conversion', product: 23, category: 18 },
];

const COLORS = ['#9b87f5', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'];

const ConceptTestingResults = () => {
  const navigate = useNavigate();
  const [launchDialogOpen, setLaunchDialogOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/concept-testing');
  };

  const handleLaunchClick = () => {
    setLaunchDialogOpen(true);
  };

  const handleLaunchConfirm = () => {
    toast({
      title: "Trial Launch Initiated",
      description: "Your product has been scheduled for a trial launch on Smytten.",
    });
    setLaunchDialogOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar />
      <div className="flex-1 overflow-auto">
        <div className="container p-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-4 p-0 h-auto"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{surveyData.name}</h1>
              <p className="text-muted-foreground">Results and analytics</p>
            </div>
            <Dialog open={launchDialogOpen} onOpenChange={setLaunchDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                  onClick={handleLaunchClick}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Trial on Smytten
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Launch as Trial Product on Smytten</DialogTitle>
                  <DialogDescription>
                    This will create a trial campaign for your product on the Smytten platform, allowing real users to try and provide feedback.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h4 className="font-medium mb-2">This trial launch will include:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#9b87f5]" />
                      <span>Real user engagement tracking</span>
                    </li>
                    <li className="flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-[#9b87f5]" />
                      <span>Funnel performance analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-[#9b87f5]" />
                      <span>Pricing and positioning experiments</span>
                    </li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setLaunchDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]" onClick={handleLaunchConfirm}>Confirm Launch</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{surveyData.totalResponses}/{surveyData.targetResponses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{surveyData.completionRate}%</div>
                <Progress value={surveyData.completionRate} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{surveyData.averageRating}/5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">In Progress</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="responses" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="responses">Response Analysis</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="trial">Trial Launch</TabsTrigger>
            </TabsList>

            <TabsContent value="responses" className="space-y-6">
              {surveyData.questions.map((question) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle>{question.question}</CardTitle>
                    <CardDescription>{question.responses.reduce((sum, item) => sum + item.count, 0)} responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={question.responses}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="answer" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#9b87f5" name="Responses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={surveyData.demographics.age}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {surveyData.demographics.age.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Gender Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={surveyData.demographics.gender}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {surveyData.demographics.gender.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>User Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">No comments available for this test.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trial">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Smytten Trial Launch</CardTitle>
                    <CardDescription>
                      Launch your product as a trial on Smytten to collect real user feedback and refine your offering
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">What is a Smytten Trial?</h3>
                      <p className="text-muted-foreground">
                        Smytten is India's largest product discovery and trial platform. Launching a trial on Smytten
                        allows you to put your product in the hands of real consumers, gather authentic feedback,
                        and measure actual market performance before a full-scale launch.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Benchmark Comparison</h3>
                      <p className="text-muted-foreground mb-4">
                        Based on concept testing results, here's how your product is projected to perform against category benchmarks:
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart
                          data={benchmarkData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="product" name="Your Product" fill="#9b87f5" />
                          <Bar dataKey="category" name="Category Average" fill="#d1d5db" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Benefits of Trial Launch</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">User Engagement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Track how real users interact with your product across the entire user journey
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">Funnel Analysis</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Compare your product's conversion funnel against category benchmarks
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md">A/B Testing</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Run controlled experiments on pricing, positioning, and messaging
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]">
                          <Rocket className="mr-2 h-4 w-4" />
                          Set Up Smytten Trial
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Launch on Smytten</DialogTitle>
                          <DialogDescription>
                            Set up your trial campaign on the Smytten platform
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <h4 className="font-medium mb-4">Trial Details</h4>
                          <div className="space-y-4">
                            <div>
                              <Badge className="mb-2">Pricing Experiment</Badge>
                              <p className="text-sm text-muted-foreground">
                                Test different price points to find the optimal pricing strategy
                              </p>
                            </div>
                            <div>
                              <Badge className="mb-2">Positioning Test</Badge>
                              <p className="text-sm text-muted-foreground">
                                Compare different value propositions to see which resonates best
                              </p>
                            </div>
                            <div>
                              <Badge className="mb-2">Messaging Optimization</Badge>
                              <p className="text-sm text-muted-foreground">
                                Evaluate different messaging frameworks to maximize conversion
                              </p>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6]" onClick={handleLaunchConfirm}>
                            Launch Trial
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ConceptTestingResults;
