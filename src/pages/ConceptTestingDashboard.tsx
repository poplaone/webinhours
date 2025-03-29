
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, 
  MoreVertical, 
  Clock, 
  Check, 
  Filter, 
  Plus, 
  Search 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import SideNavbar from '@/components/layout/SideNavbar';

// Mock data for concept tests
const mockOngoingTests = [
  { 
    id: 1, 
    name: "Eco-Friendly Packaging Test", 
    createdDate: "2023-11-15", 
    status: "In Progress", 
    progress: 65,
    responses: 65,
    targetResponses: 100,
    category: "Packaging",
    daysLeft: 3
  },
  { 
    id: 2, 
    name: "New Product Line Feedback", 
    createdDate: "2023-11-10", 
    status: "In Progress", 
    progress: 42,
    responses: 42,
    targetResponses: 100,
    category: "Product Development",
    daysLeft: 5
  },
  { 
    id: 3, 
    name: "Customer Experience Survey", 
    createdDate: "2023-11-05", 
    status: "In Progress", 
    progress: 90,
    responses: 90,
    targetResponses: 100,
    category: "Customer Experience",
    daysLeft: 1
  }
];

const mockCompletedTests = [
  { 
    id: 4, 
    name: "Brand Perception Study", 
    createdDate: "2023-10-15", 
    completedDate: "2023-10-30",
    status: "Completed", 
    responses: 150,
    targetResponses: 100,
    category: "Branding",
    score: 78
  },
  { 
    id: 5, 
    name: "Product Feature Validation", 
    createdDate: "2023-09-20", 
    completedDate: "2023-10-05",
    status: "Completed", 
    responses: 120,
    targetResponses: 100,
    category: "Product Features",
    score: 92
  },
  { 
    id: 6, 
    name: "Pricing Strategy Test", 
    createdDate: "2023-08-10", 
    completedDate: "2023-08-25",
    status: "Completed", 
    responses: 110,
    targetResponses: 100,
    category: "Pricing",
    score: 65
  }
];

const ConceptTestingDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing');

  const filteredOngoingTests = mockOngoingTests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTests = mockCompletedTests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: number) => {
    navigate(`/concept-testing/${id}`);
  };

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex-1 overflow-auto">
        <div className="container p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Concept Testing</h1>
              <p className="text-muted-foreground">Manage and track your concept testing surveys</p>
            </div>
            <Button 
              onClick={() => navigate('/concept-details/1')} 
              className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Test
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests by name or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Testing Overview moved to top, just below search bar */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Testing Overview</h2>
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{mockOngoingTests.length + mockCompletedTests.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tests in Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{mockOngoingTests.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{mockCompletedTests.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ongoing">Ongoing Tests</TabsTrigger>
              <TabsTrigger value="completed">Completed Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              {filteredOngoingTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOngoingTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-[#9b87f5] hover:bg-[#8B5CF6]">
                            {test.category}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(test.id)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Test</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-xl mt-2">{test.name}</CardTitle>
                        <CardDescription>Created on {test.createdDate}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{test.progress}%</span>
                          </div>
                          <Progress value={test.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Responses</p>
                            <p className="font-medium">{test.responses}/{test.targetResponses}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time Left</p>
                            <div className="flex items-center gap-1 font-medium">
                              <Clock className="h-3 w-3" />
                              <span>{test.daysLeft} days</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleViewDetails(test.id)}
                        >
                          View Results
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-10 bg-gray-50 rounded-lg">
                  <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No ongoing tests found</h3>
                  <p className="text-muted-foreground">Create a new test or adjust your search criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompletedTests.length > 0 ? (
                      filteredCompletedTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.name}</TableCell>
                          <TableCell>{test.category}</TableCell>
                          <TableCell>{test.completedDate}</TableCell>
                          <TableCell>{test.responses}/{test.targetResponses}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{test.score}%</span>
                              <Badge className={
                                test.score >= 80 ? "bg-green-500" : 
                                test.score >= 60 ? "bg-amber-500" : 
                                "bg-red-500"
                              }>
                                {test.score >= 80 ? "High" : 
                                 test.score >= 60 ? "Medium" : 
                                 "Low"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center gap-1">
                              <Check className="h-3 w-3" /> Completed
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewDetails(test.id)}
                            >
                              View Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-10">
                          <ClipboardCheck className="mx-auto h-8 w-8 text-muted-foreground" />
                          <h3 className="mt-2 text-lg font-semibold">No completed tests found</h3>
                          <p className="text-muted-foreground">Complete an ongoing test to see results here</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ConceptTestingDashboard;
