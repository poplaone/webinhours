import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, BarChart as BarChartIcon, Users, Tag, ArrowRight, Package, DollarSign, Truck, Image, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SideNavbar from '@/components/layout/SideNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const productFormSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  size: z.string().min(1, { message: "Size is required" }),
  mrp: z.string().min(1, { message: "MRP is required" }),
  sellingPrice: z.string().min(1, { message: "Selling price is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  packagingType: z.string().min(1, { message: "Packaging type is required" }),
  ingredients: z.string().optional(),
  shelfLife: z.string().optional(),
  targetAudience: z.string().min(1, { message: "Target audience is required" }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const defaultValues: Partial<ProductFormValues> = {
  productName: "Eco-Friendly Packaging Product",
  description: "A sustainable product with eco-friendly packaging that appeals to environmentally conscious consumers.",
  size: "100ml",
  mrp: "599",
  sellingPrice: "499",
  category: "Personal Care",
  packagingType: "Recyclable Plastic",
  ingredients: "Natural ingredients, sustainably sourced",
  shelfLife: "12 months",
  targetAudience: "Eco-conscious consumers, 25-45 age group",
};

const ConceptTestingResults = () => {
  const navigate = useNavigate();
  const [launchDialogOpen, setLaunchDialogOpen] = useState(false);
  const [trialFlowStep, setTrialFlowStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const handleBackClick = () => {
    navigate('/concept-testing');
  };

  const handleLaunchClick = () => {
    setLaunchDialogOpen(true);
    setTrialFlowStep(0);
  };

  const handleLaunchConfirm = () => {
    toast({
      title: "Trial Launch Initiated",
      description: "Your product has been scheduled for a trial launch on Smytten.",
    });
    setLaunchDialogOpen(false);
    setTrialFlowStep(0);
  };

  const handleNextStep = () => {
    setTrialFlowStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setTrialFlowStep(prev => Math.max(prev - 1, 0));
  };

  const handleFormSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data);
    handleNextStep();
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const dummyImages = [
    '/placeholder.svg',
    'https://via.placeholder.com/200x200?text=Packaging+Option+1',
    'https://via.placeholder.com/200x200?text=Packaging+Option+2',
  ];

  const renderTrialFlowStep = () => {
    switch (trialFlowStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Launch a Trial on Smytten</h3>
            <p className="text-muted-foreground">
              Ready to get real-world feedback on your product? Launch a trial on Smytten to collect authentic user data
              and refine your product before a full market launch.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <Card className="border-[#9b87f5]/20">
                <CardHeader className="pb-2">
                  <Users className="h-6 w-6 text-[#9b87f5] mb-2" />
                  <CardTitle className="text-base">Real User Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get your product in the hands of real target consumers and collect authentic feedback.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#9b87f5]/20">
                <CardHeader className="pb-2">
                  <BarChartIcon className="h-6 w-6 text-[#9b87f5] mb-2" />
                  <CardTitle className="text-base">Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track how your product performs against category benchmarks in a real marketplace.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#9b87f5]/20">
                <CardHeader className="pb-2">
                  <Tag className="h-6 w-6 text-[#9b87f5] mb-2" />
                  <CardTitle className="text-base">Price Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Test different price points and positioning to optimize your go-to-market strategy.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="pt-4">
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={handleNextStep}
              >
                Start Trial Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-lg font-medium mb-4">Product Details</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide detailed information about your product for the Smytten trial. This information will be visible to users on the platform.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Personal Care">Personal Care</SelectItem>
                            <SelectItem value="Skin Care">Skin Care</SelectItem>
                            <SelectItem value="Hair Care">Hair Care</SelectItem>
                            <SelectItem value="Home Care">Home Care</SelectItem>
                            <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter detailed product description" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size/Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 100ml, 250g" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MRP (₹)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 599" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sellingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price (₹)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 499" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="packagingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Packaging Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select packaging type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Recyclable Plastic">Recyclable Plastic</SelectItem>
                            <SelectItem value="Glass">Glass</SelectItem>
                            <SelectItem value="Paper/Cardboard">Paper/Cardboard</SelectItem>
                            <SelectItem value="Biodegradable">Biodegradable</SelectItem>
                            <SelectItem value="Aluminum">Aluminum</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Women, 25-45 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Ingredients/Materials</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List main ingredients or materials" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shelfLife"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shelf Life</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 12 months" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="pt-4 flex justify-between">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                  >
                    Next: Product Packaging
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Packaging</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload or select packaging designs for your product. This is how your product will appear to users on Smytten.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              {dummyImages.map((image, index) => (
                <div 
                  key={index}
                  className={`border rounded-md p-2 cursor-pointer transition-all ${selectedImage === image ? 'ring-2 ring-[#9b87f5]' : 'hover:border-[#9b87f5]/50'}`}
                  onClick={() => handleImageSelect(image)}
                >
                  <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                    <img 
                      src={image} 
                      alt={`Packaging option ${index + 1}`} 
                      className="object-cover w-full h-full"
                    />
                    {selectedImage === image && (
                      <div className="absolute top-2 right-2 bg-[#9b87f5] rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center mt-2">Option {index + 1}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-md p-4 mt-4">
              <div className="flex items-center mb-2">
                <Label htmlFor="image-upload" className="text-sm font-medium">
                  Upload custom packaging design
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="flex-1"
                />
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: JPG, PNG, SVG. Max size: 5MB
              </p>
            </div>
            <div className="pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={handleNextStep}
                disabled={!selectedImage}
              >
                Next: Review & Launch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review & Launch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Review your product details before launching the trial on Smytten.
            </p>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <h4 className="font-medium">Product Summary</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreviewOpen}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {selectedImage && (
                      <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100 mb-4">
                        <img 
                          src={selectedImage} 
                          alt="Selected packaging" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{form.getValues("productName")}</h3>
                      <Badge variant="outline" className="mt-1">{form.getValues("category")}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{form.getValues("size")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MRP:</span>
                        <span className="font-medium">₹{form.getValues("mrp")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Selling Price:</span>
                        <span className="font-medium text-green-600">₹{form.getValues("sellingPrice")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Packaging:</span>
                        <span className="font-medium">{form.getValues("packagingType")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target Audience:</span>
                        <span className="font-medium">{form.getValues("targetAudience")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{form.getValues("description")}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">Key Ingredients/Materials</h4>
                    <p className="text-sm text-muted-foreground">{form.getValues("ingredients")}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shelf Life</h4>
                    <p className="text-sm text-muted-foreground">{form.getValues("shelfLife")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#9b87f5]/10 rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2 flex items-center">
                <Rocket className="h-4 w-4 mr-2 text-[#9b87f5]" />
                Trial Launch Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Users className="h-4 w-4 mr-2 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p>Your product will be available to a targeted audience of 500-1000 users in the initial phase.</p>
                </div>
                <div className="flex items-start">
                  <Truck className="h-4 w-4 mr-2 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p>You'll need to provide 100 product samples for the trial (in final packaging).</p>
                </div>
                <div className="flex items-start">
                  <BarChartIcon className="h-4 w-4 mr-2 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p>You'll receive detailed analytics and user feedback within 2 weeks of the trial launch.</p>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 mr-2 text-[#9b87f5] mt-1 flex-shrink-0" />
                  <p>Price testing will be conducted with three variants: ₹{parseInt(form.getValues("sellingPrice")) - 50}, ₹{form.getValues("sellingPrice")}, and ₹{parseInt(form.getValues("sellingPrice")) + 50}.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button 
                className="bg-[#9b87f5] hover:bg-[#8B5CF6]"
                onClick={handleLaunchConfirm}
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch Trial on Smytten
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
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
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Launch as Trial Product on Smytten</DialogTitle>
                  <DialogDescription>
                    Follow the steps below to set up your trial campaign on Smytten.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trialFlowStep >= 0 ? 'bg-[#9b87f5] text-white' : 'bg-gray-200'}`}>1</div>
                      <div className={`h-1 w-16 ${trialFlowStep > 0 ? 'bg-[#9b87f5]' : 'bg-gray-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trialFlowStep >= 1 ? 'bg-[#9b87f5] text-white' : 'bg-gray-200'}`}>2</div>
                      <div className={`h-1 w-16 ${trialFlowStep > 1 ? 'bg-[#9b87f5]' : 'bg-gray-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trialFlowStep >= 2 ? 'bg-[#9b87f5] text-white' : 'bg-gray-200'}`}>3</div>
                      <div className={`h-1 w-16 ${trialFlowStep > 2 ? 'bg-[#9b87f5]' : 'bg-gray-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trialFlowStep >= 3 ? 'bg-[#9b87f5] text-white' : 'bg-gray-200'}`}>4</div>
                    </div>
                  </div>
                  {renderTrialFlowStep()}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Product Preview</DialogTitle>
                  <DialogDescription>
                    Preview how your product will appear on Smytten
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6">
                      {selectedImage && (
                        <div className="md:w-1/2">
                          <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                            <img 
                              src={selectedImage} 
                              alt="Product packaging" 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      )}
                      <div className="md:w-1/2">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-xl font-bold">{form.getValues("productName")}</h2>
                                <p className="text-sm text-muted-foreground">{form.getValues("size")}</p>
                              </div>
                              <Badge>{form.getValues("category")}</Badge>
                            </div>
                            
                            <div className="mt-4">
                              <p className="text-sm">{form.getValues("description")}</p>
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex items-center text-sm">
                                <span className="line-through text-muted-foreground">MRP: ₹{form.getValues("mrp")}</span>
                                <span className="ml-2 text-green-600 font-medium">₹{form.getValues("sellingPrice")}</span>
                                <span className="ml-2 text-green-600 text-xs">
                                  ({Math.round((1 - parseInt(form.getValues("sellingPrice")) / parseInt(form.getValues("mrp"))) * 100)}% off)
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4 text-sm">
                              <h4 className="font-medium">Key Features:</h4>
                              <ul className="list-disc list-inside mt-1 text-muted-foreground">
                                <li>{form.getValues("packagingType")} packaging</li>
                                <li>Shelf life: {form.getValues("shelfLife")}</li>
                                <li>Ideal for: {form.getValues("targetAudience")}</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <Button className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]">
                              Try for Free
                            </Button>
                            <p className="text-xs text-center mt-2 text-muted-foreground">
                              Limited samples available. Trial ends in 14 days.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close Preview</Button>
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
                        <BarChart
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
                        </BarChart>
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
