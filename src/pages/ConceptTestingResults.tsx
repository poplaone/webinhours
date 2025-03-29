
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideNavbar from '@/components/layout/SideNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
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

// Mock data for the results
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

// Colors for charts
const COLORS = ['#9b87f5', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'];

const ConceptTestingResults = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/concept-testing');
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
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{surveyData.name}</h1>
            <p className="text-muted-foreground">Results and analytics</p>
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
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="responses">Response Analysis</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ConceptTestingResults;
