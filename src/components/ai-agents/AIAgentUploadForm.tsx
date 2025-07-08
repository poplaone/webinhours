import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useCreateAIAgent } from '@/hooks/useAIAgents';
import { useIsAdmin } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  agent_type: z.enum(['chatbot', 'assistant', 'automation', 'analytics', 'content', 'other']),
  price: z.number().min(0, 'Price must be non-negative'),
  preview_url: z.string().url('Must be a valid URL'),
  demo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  thumbnail_url: z.string().url('Must be a valid URL').optional().or(z.literal(''))
});

interface AIAgentUploadFormProps {
  onClose: () => void;
}

export const AIAgentUploadForm = ({ onClose }: AIAgentUploadFormProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [useCases, setUseCases] = useState<string[]>([]);
  const [useCaseInput, setUseCaseInput] = useState('');

  const { toast } = useToast();
  const createAIAgent = useCreateAIAgent();
  const isAdmin = useIsAdmin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      agent_type: 'chatbot',
      price: 0,
      preview_url: '',
      demo_url: '',
      thumbnail_url: ''
    }
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const addUseCase = () => {
    if (useCaseInput.trim() && !useCases.includes(useCaseInput.trim())) {
      setUseCases([...useCases, useCaseInput.trim()]);
      setUseCaseInput('');
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const agentData = {
        title: values.title,
        description: values.description,
        category: values.category,
        agent_type: values.agent_type,
        price: values.price,
        preview_url: values.preview_url,
        demo_url: values.demo_url || undefined,
        thumbnail_url: values.thumbnail_url || undefined,
        tags: tags.length > 0 ? tags : undefined,
        features: features.length > 0 ? features : undefined,
        technologies: technologies.length > 0 ? technologies : undefined,
        use_cases: useCases.length > 0 ? useCases : undefined,
        // Auto-approve for admin users
        status: isAdmin ? 'approved' as const : 'pending' as const,
        ...(isAdmin && { approved_at: new Date().toISOString() })
      };
      
      await createAIAgent.mutateAsync(agentData);

      toast({
        title: "Success",
        description: isAdmin 
          ? "AI Agent uploaded and automatically approved!" 
          : "AI Agent uploaded successfully and is pending review",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload AI agent",
        variant: "destructive",
      });
    }
  };

  const categories = [
    'customer-service', 'content-creation', 'data-analysis', 'automation',
    'education', 'healthcare', 'finance', 'marketing', 'development', 'other'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Upload AI Agent</h2>
        <p className="text-muted-foreground">Share your AI agent with the community</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Customer Support Bot" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your AI agent and its capabilities..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agent_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="chatbot">Chatbot</SelectItem>
                            <SelectItem value="assistant">Assistant</SelectItem>
                            <SelectItem value="automation">Automation</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          min="0" 
                          step="0.01"
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>URLs & Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="preview_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview URL (Required)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/agent-preview" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/agent-demo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Tags, Features, Technologies, Use Cases sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tags & Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Features</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add feature"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 mt-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{feature}</span>
                        <X className="h-4 w-4 cursor-pointer" onClick={() => setFeatures(features.filter((_, i) => i !== index))} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Technologies</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add technology"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    />
                    <Button type="button" onClick={addTechnology} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        {tech}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setTechnologies(technologies.filter((_, i) => i !== index))} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Use Cases</label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add use case"
                      value={useCaseInput}
                      onChange={(e) => setUseCaseInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUseCase())}
                    />
                    <Button type="button" onClick={addUseCase} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 mt-2">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{useCase}</span>
                        <X className="h-4 w-4 cursor-pointer" onClick={() => setUseCases(useCases.filter((_, i) => i !== index))} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createAIAgent.isPending}>
              {createAIAgent.isPending ? "Uploading..." : "Upload AI Agent"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};