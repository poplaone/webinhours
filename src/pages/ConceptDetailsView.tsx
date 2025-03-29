
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Lightbulb, 
  Users, 
  PackagePlus, 
  Fingerprint, 
  Target, 
  DollarSign, 
  ClipboardList, 
  BarChart3, 
  Rocket,
  FileSpreadsheet,
  Star
} from 'lucide-react';
import ChatSidebar from '@/components/ai/ChatSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/components/ui/use-toast';

const conceptDetails = [
  {
    id: 1,
    title: "Premium Edition",
    description: "A high-end version with exclusive features and premium materials targeted at luxury consumers.",
    statement: "Premium Edition offers an elevated experience with exclusive features and premium ingredients, carefully crafted for discerning consumers seeking the very best in quality and presentation.",
    keyBenefits: [
      "Elevated product experience with premium ingredients",
      "Exclusive features not available in standard offerings",
      "Premium packaging that enhances perceived value",
      "Status symbol within product category"
    ],
    targetConsumer: {
      demographics: "Upper-income professionals, ages 35-55",
      psychographics: "Status-conscious, quality-focused, willing to pay premium for exclusivity",
      painPoints: "Dissatisfaction with mass-market options, desire for products that reflect personal success"
    },
    brandFit: {
      alignment: "High alignment with brand's premium positioning strategy",
      differentiation: "Clear premium positioning against competitors with superior ingredients and craftsmanship",
      marketGap: "Addresses underserved luxury segment in this category"
    },
    packaging: {
      description: "Premium rigid box packaging with soft-touch finish, gold foil accents, and magnetic closure",
      materials: "Sustainable premium materials with luxury finish",
      unboxingExperience: "Multi-layered reveal experience with personalized note"
    },
    pricing: {
      suggested: "$89.99",
      comparison: "45% premium over standard version",
      margins: "42% gross margin (vs. 35% for standard products)"
    },
    testing: {
      metrics: ["Purchase intent", "Value perception", "Brand alignment", "Willingness to pay"],
      methodology: "Focus groups with target demographic followed by limited market testing",
      success: "Minimum 70% positive response on premium value perception"
    },
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 2,
    title: "Eco-Conscious Variant",
    description: "Fully sustainable version with biodegradable packaging and ethically sourced materials.",
    statement: "Eco-Conscious Variant reimagines our product with 100% sustainable materials and zero-waste packaging, designed for environmentally conscious consumers without compromising on quality or performance.",
    keyBenefits: [
      "Zero environmental impact with fully biodegradable packaging",
      "Carbon-neutral manufacturing process",
      "Ethically sourced, plant-based materials",
      "Transparent supply chain visible to consumers"
    ],
    targetConsumer: {
      demographics: "Environmentally conscious consumers, ages 25-45",
      psychographics: "Values-driven purchasing, willing to pay premium for sustainable products",
      painPoints: "Concern about environmental impact, desire for guilt-free consumption"
    },
    brandFit: {
      alignment: "Supports brand's sustainability initiatives and CSR goals",
      differentiation: "Industry-leading sustainability credentials with third-party certifications",
      marketGap: "Meets growing demand for truly sustainable options in the category"
    },
    packaging: {
      description: "Minimalist design using recycled and biodegradable materials with seed-embedded components that can be planted",
      materials: "100% biodegradable or recyclable components",
      unboxingExperience: "Educational component about sustainability impact"
    },
    pricing: {
      suggested: "$64.99",
      comparison: "15% premium over standard version",
      margins: "38% gross margin (vs. 35% for standard products)"
    },
    testing: {
      metrics: ["Sustainability credibility", "Value perception", "Purchase intent", "Brand impact"],
      methodology: "Online panel testing with environmental messaging variations",
      success: "80% positive perception of environmental impact claims"
    },
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 3,
    title: "Digital Companion",
    description: "Product with integrated digital experience through mobile app and QR-enabled packaging.",
    statement: "Digital Companion transforms the traditional product experience by seamlessly integrating physical and digital touchpoints through QR-enabled packaging and an intuitive mobile app that enhances product utility and builds community.",
    keyBenefits: [
      "Enhanced product value through digital features",
      "Personalized experiences based on user preferences",
      "Community features connecting like-minded consumers",
      "Ongoing engagement beyond initial purchase"
    ],
    targetConsumer: {
      demographics: "Tech-savvy consumers, ages 18-40",
      psychographics: "Digital natives, experience-seekers, community-oriented",
      painPoints: "Desire for interactive experiences, seeking belonging and connection"
    },
    brandFit: {
      alignment: "Accelerates brand's digital transformation initiatives",
      differentiation: "Pioneering digital integration in a category with limited digital innovation",
      marketGap: "Addresses untapped opportunity for digital engagement in physical products"
    },
    packaging: {
      description: "Smart packaging with embedded NFC chip and QR codes linking to digital experiences",
      materials: "Standard materials with tech enhancements",
      unboxingExperience: "Immediate digital activation during unboxing process"
    },
    pricing: {
      suggested: "$59.99",
      comparison: "Standard pricing with value-add through digital features",
      margins: "32% initial margin with additional revenue through premium digital features"
    },
    testing: {
      metrics: ["App activation rate", "Digital engagement depth", "Feature utilization", "Retention rate"],
      methodology: "Beta testing program with feedback loops and usage analytics",
      success: "Minimum 60% app activation rate among purchasers"
    },
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 4,
    title: "Value Edition",
    description: "Cost-effective version with essential features at an accessible price point.",
    statement: "Value Edition delivers the core benefits and quality our brand is known for at a more accessible price point, making our products available to a wider audience without compromising on essential features.",
    keyBenefits: [
      "Essential functionality at lower price point",
      "Same core quality standards as premium offerings",
      "Simplified design focused on utility",
      "High value-to-price ratio"
    ],
    targetConsumer: {
      demographics: "Budget-conscious consumers, first-time category buyers",
      psychographics: "Practical purchasers, value-oriented, quality-sensitive",
      painPoints: "Price barriers to category entry, need for reliable basics without premium costs"
    },
    brandFit: {
      alignment: "Expands brand accessibility while maintaining quality perception",
      differentiation: "Superior quality compared to other value offerings",
      marketGap: "Captures price-sensitive segment without true budget option"
    },
    packaging: {
      description: "Efficient, minimalist packaging focused on protection and clear communication",
      materials: "Cost-optimized while maintaining sustainability standards",
      unboxingExperience: "Straightforward with focus on product access"
    },
    pricing: {
      suggested: "$39.99",
      comparison: "25% lower than standard offerings",
      margins: "28% gross margin with higher volume expectations"
    },
    testing: {
      metrics: ["Price perception", "Quality perception", "Purchase intent across income segments"],
      methodology: "Price sensitivity testing and competitive comparison studies",
      success: "No negative impact on brand perception while achieving 85% purchase consideration in target segment"
    },
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 5,
    title: "Subscription Model",
    description: "Regular delivery service with personalized product selections and member benefits.",
    statement: "Subscription Model transforms our product into an ongoing service with personalized selections delivered regularly, building lasting customer relationships through convenience, customization, and exclusive membership benefits.",
    keyBenefits: [
      "Convenient regular delivery of products",
      "Personalized selections based on preferences",
      "Exclusive subscriber-only products and content",
      "Cost savings compared to individual purchases"
    ],
    targetConsumer: {
      demographics: "Busy professionals, loyal category users, ages 25-45",
      psychographics: "Convenience-seekers, habitual users, planning-oriented",
      painPoints: "Replenishment hassle, decision fatigue, desire for discovery"
    },
    brandFit: {
      alignment: "Creates predictable revenue stream and deeper customer relationships",
      differentiation: "More personalized and flexible than competing subscription services",
      marketGap: "Limited subscription options currently available in category"
    },
    packaging: {
      description: "Branded subscription box with rotating seasonal designs and personalized elements",
      materials: "Reusable or easily recyclable components",
      unboxingExperience: "Surprise and delight elements with each delivery"
    },
    pricing: {
      suggested: "$49.99/month",
      comparison: "15% savings versus buying products individually",
      margins: "33% gross margin with lower customer acquisition costs over time"
    },
    testing: {
      metrics: ["Conversion rate", "Retention rate", "Customer lifetime value", "Satisfaction scores"],
      methodology: "Limited rollout with cohort analysis and subscription behavior tracking",
      success: "Minimum 6-month average retention with 70% satisfaction rating"
    },
    image: "https://images.unsplash.com/photo-1617644491633-9cc71756fee5?auto=format&fit=crop&w=1200&h=400&q=80"
  },
  {
    id: 6,
    title: "Co-branded Partnership",
    description: "Strategic collaboration with complementary brand to create a unique offering.",
    statement: "Co-branded Partnership combines our expertise with a complementary brand partner to create a unique, limited-edition offering that delivers new value to consumers while expanding audience reach for both brands.",
    keyBenefits: [
      "Unique product attributes from brand collaboration",
      "Appeal to both brand audiences",
      "Expanded feature set through complementary expertise",
      "Collectible, limited-edition status"
    ],
    targetConsumer: {
      demographics: "Existing customers of both brands, new category entrants",
      psychographics: "Brand-conscious, novelty-seekers, influencers and early adopters",
      painPoints: "Desire for unique products, interest in innovation and limited editions"
    },
    brandFit: {
      alignment: "Extends brand reach to new audiences through partner brand",
      differentiation: "Unique attributes impossible for competitors to replicate",
      marketGap: "Creates entirely new subcategory through brand combination"
    },
    packaging: {
      description: "Co-branded design highlighting both brand identities with premium collaborative elements",
      materials: "Best practices from both brands",
      unboxingExperience: "Storytelling elements about the partnership and collaborative process"
    },
    pricing: {
      suggested: "$79.99",
      comparison: "30% premium as limited edition offering",
      margins: "40% gross margin with shared marketing costs"
    },
    testing: {
      metrics: ["Cross-brand appeal", "New customer acquisition", "Social sharing", "Sales velocity"],
      methodology: "Pre-launch waitlist and exclusive access period with metrics tracking",
      success: "30% of sales to new customers with high social engagement metrics"
    },
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&h=400&q=80"
  }
];

const ConceptDetailsView = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const concept = conceptDetails.find(c => c.id === Number(conceptId)) || conceptDetails[0];
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleLaunchSurvey = () => {
    toast({
      title: "Survey Launched Successfully",
      description: "Your concept testing survey has been sent to participants.",
    });
    setTimeout(() => {
      navigate(`/concept-testing/${conceptId}`);
    }, 1500);
  };

  const handleViewResults = () => {
    navigate(`/concept-testing/${conceptId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex">
      {/* Adjust the width of the ChatSidebar to match the Idea Detail screen */}
      <div className="w-80 border-r border-border bg-card">
        <ChatSidebar className="h-screen" />
      </div>
      
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Concepts
              </Button>
              <div className="flex items-center">
                <Lightbulb className="h-5 w-5 text-[#8B5CF6]" />
                <span className="ml-2 text-xl font-semibold">Concept Details</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={handleViewResults}
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Results
              </Button>
              <Button 
                onClick={handleLaunchSurvey}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch Survey
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6 flex-1 overflow-auto">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="pr-4 pb-10">
              <div className="relative rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20">
                  <div className="h-full flex flex-col justify-end p-6 md:p-8">
                    <Badge className="mb-2 bg-[#8B5CF6] w-fit">Concept</Badge>
                    <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{concept.title}</h1>
                    <p className="text-white/90 max-w-2xl">{concept.description}</p>
                  </div>
                </div>
                <img 
                  src={concept.image} 
                  alt={concept.title} 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Full Details</TabsTrigger>
                  <TabsTrigger value="testing">Testing Plan</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-[#8B5CF6]" />
                          Concept Statement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{concept.statement}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-[#8B5CF6]" />
                          Key Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {concept.keyBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-[#8B5CF6]" />
                          Target Consumer
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Demographics</h4>
                          <p className="text-sm text-muted-foreground">{concept.targetConsumer.demographics}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Psychographics</h4>
                          <p className="text-sm text-muted-foreground">{concept.targetConsumer.psychographics}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Fingerprint className="h-5 w-5 text-[#8B5CF6]" />
                          Brand Fit
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Alignment</h4>
                          <p className="text-sm text-muted-foreground">{concept.brandFit.alignment}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Differentiation</h4>
                          <p className="text-sm text-muted-foreground">{concept.brandFit.differentiation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PackagePlus className="h-5 w-5 text-[#8B5CF6]" />
                          Proposed Packaging
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p>{concept.packaging.description}</p>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Materials</h4>
                          <p className="text-sm text-muted-foreground">{concept.packaging.materials}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Unboxing Experience</h4>
                          <p className="text-sm text-muted-foreground">{concept.packaging.unboxingExperience}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-[#8B5CF6]" />
                          Pricing Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center mb-6">
                          <div className="text-center bg-[#8B5CF6]/10 rounded-full p-6">
                            <div className="text-3xl font-bold text-[#8B5CF6]">{concept.pricing.suggested}</div>
                            <div className="text-sm text-muted-foreground mt-1">Suggested Retail</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border rounded-md">
                            <div className="text-sm font-medium">{concept.pricing.comparison}</div>
                            <div className="text-xs text-muted-foreground">vs. Standard</div>
                          </div>
                          <div className="text-center p-3 border rounded-md">
                            <div className="text-sm font-medium">{concept.pricing.margins}</div>
                            <div className="text-xs text-muted-foreground">Margin</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-[#8B5CF6]" />
                        Consumer Testing Plan
                      </CardTitle>
                      <CardDescription>
                        Proposed approach for validating consumer interest and refining the concept
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Key Metrics</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {concept.testing.metrics.map((metric, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="mt-1.5 h-1 w-1 rounded-full bg-[#8B5CF6]" />
                                <span>{metric}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Methodology</h4>
                          <p className="text-sm text-muted-foreground">{concept.testing.methodology}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Success Criteria</h4>
                          <p className="text-sm text-muted-foreground">{concept.testing.success}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button 
                          onClick={handleLaunchSurvey}
                          className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                          size="lg"
                        >
                          <FileSpreadsheet className="mr-2 h-5 w-5" />
                          Launch Consumer Testing Survey
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-[#8B5CF6]" />
                            Complete Concept Description
                          </h3>
                          <p className="mb-4">{concept.statement}</p>
                          <p className="text-muted-foreground">This concept addresses specific market needs while aligning with our brand strategy and values. It creates a distinct position in the market through its unique combination of features, design, and positioning.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Star className="h-5 w-5 text-[#8B5CF6]" />
                              Key Benefits & Features
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Primary Benefits</h4>
                                <ul className="space-y-2">
                                  {concept.keyBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Technical Specifications</h4>
                                <p className="text-sm text-muted-foreground">Detailed specifications would be shown here based on the specific concept type. These would include materials, dimensions, technologies used, etc.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Target className="h-5 w-5 text-[#8B5CF6]" />
                              Comprehensive Target Analysis
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Demographics</h4>
                                <p className="text-sm">{concept.targetConsumer.demographics}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Psychographics</h4>
                                <p className="text-sm">{concept.targetConsumer.psychographics}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Pain Points Addressed</h4>
                                <p className="text-sm">{concept.targetConsumer.painPoints}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Buying Behavior</h4>
                                <p className="text-sm text-muted-foreground">Analysis of purchasing patterns, channels, and decision factors for the target segment would be detailed here.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Fingerprint className="h-5 w-5 text-[#8B5CF6]" />
                            Brand Fit & Differentiation Analysis
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-md">
                              <h4 className="font-medium mb-2">Strategic Alignment</h4>
                              <p className="text-sm">{concept.brandFit.alignment}</p>
                            </div>
                            <div className="p-4 border rounded-md">
                              <h4 className="font-medium mb-2">Competitive Differentiation</h4>
                              <p className="text-sm">{concept.brandFit.differentiation}</p>
                            </div>
                            <div className="p-4 border rounded-md">
                              <h4 className="font-medium mb-2">Market Gap Addressed</h4>
                              <p className="text-sm">{concept.brandFit.marketGap}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <PackagePlus className="h-5 w-5 text-[#8B5CF6]" />
                              Detailed Packaging Specifications
                            </h3>
                            <div className="space-y-3">
                              <p>{concept.packaging.description}</p>
                              <div>
                                <h4 className="font-medium mb-1">Materials & Sustainability</h4>
                                <p className="text-sm">{concept.packaging.materials}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Unboxing Experience</h4>
                                <p className="text-sm">{concept.packaging.unboxingExperience}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Production Considerations</h4>
                                <p className="text-sm text-muted-foreground">Details about packaging production requirements, suppliers, lead times, and minimum order quantities would be provided here.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-[#8B5CF6]" />
                              Complete Pricing & Financial Analysis
                            </h3>
                            <div className="space-y-3">
                              <div className="p-4 bg-[#8B5CF6]/5 rounded-md">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-[#8B5CF6]">{concept.pricing.suggested}</div>
                                  <div className="text-sm text-muted-foreground">Suggested Retail Price</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 border rounded-md">
                                  <h4 className="text-sm font-medium mb-1">Price Positioning</h4>
                                  <p className="text-sm text-muted-foreground">{concept.pricing.comparison}</p>
                                </div>
                                <div className="p-3 border rounded-md">
                                  <h4 className="text-sm font-medium mb-1">Gross Margin</h4>
                                  <p className="text-sm text-muted-foreground">{concept.pricing.margins}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Cost Breakdown</h4>
                                <p className="text-sm text-muted-foreground">Detailed cost analysis including COGS, packaging, labor, and overhead would be shown here.</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Projected ROI</h4>
                                <p className="text-sm text-muted-foreground">Financial projections including break-even analysis and projected returns would be detailed here.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="testing">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-[#8B5CF6]" />
                        Comprehensive Testing Plan
                      </CardTitle>
                      <CardDescription>
                        Complete methodology for validating the concept with consumers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h3 className="font-medium mb-3">Success Metrics</h3>
                            <ul className="space-y-2">
                              {concept.testing.metrics.map((metric, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                                  <span>{metric}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">Testing Methodology</h3>
                            <p className="text-sm">{concept.testing.methodology}</p>
                            <p className="text-sm text-muted-foreground mt-2">Detailed testing approach with specific methods, sample sizes, and protocols would be outlined here.</p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">Success Criteria</h3>
                            <p className="text-sm">{concept.testing.success}</p>
                            <p className="text-sm text-muted-foreground mt-2">Benchmarks against industry standards and internal goals would be provided here.</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-6">
                          <h3 className="text-lg font-semibold mb-4">Testing Schedule & Implementation</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Phase 1: Initial Concept Testing</h4>
                              <p className="text-sm text-muted-foreground">Online survey with 500 target consumers to validate concept appeal, messaging, and pricing (2 weeks)</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Phase 2: In-Depth Focus Groups</h4>
                              <p className="text-sm text-muted-foreground">Four focus groups with 8-10 participants each to deeply explore reactions and gather qualitative feedback (3 weeks)</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Phase 3: Limited Market Test</h4>
                              <p className="text-sm text-muted-foreground">Limited release to 1,000 consumers with follow-up surveys and usage tracking (6 weeks)</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-6">
                          <h3 className="text-lg font-semibold mb-4">Survey Design Framework</h3>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Section 1: Concept Introduction</h4>
                              <p className="text-sm text-muted-foreground">Visual presentation of concept with key benefit statements</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Section 2: Overall Appeal</h4>
                              <p className="text-sm text-muted-foreground">5-point scale measuring initial impression and overall appeal</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Section 3: Benefit Evaluation</h4>
                              <p className="text-sm text-muted-foreground">Rating of individual benefits for importance and credibility</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Section 4: Purchase Intent</h4>
                              <p className="text-sm text-muted-foreground">Likelihood to purchase at various price points</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Section 5: Open Feedback</h4>
                              <p className="text-sm text-muted-foreground">Open-ended questions for improvement suggestions</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <Button 
                            onClick={handleLaunchSurvey}
                            className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                            size="lg"
                          >
                            <Rocket className="mr-2 h-5 w-5" />
                            Launch Consumer Testing Survey
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default ConceptDetailsView;
