
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GenerateImageButtonProps {
  title: string;
  description: string;
  onImageGenerated: (imageUrl: string) => void;
  disabled?: boolean;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  title,
  description,
  onImageGenerated,
  disabled = false
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerateImage = async () => {
    if (!title || !description) {
      toast.error("Please enter a title and description first");
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call an AI image generation API
      // For now, we'll simulate it with a timeout and placeholder images
      const prompt = `${title}: ${description.substring(0, 100)}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use placeholder images for demonstration
      const placeholders = [
        "/placeholder-idea-1.jpg",
        "/placeholder-idea-2.jpg",
        "/placeholder-idea-3.jpg",
        "/placeholder-idea-4.jpg",
        "/placeholder.svg"
      ];
      
      const randomImage = placeholders[Math.floor(Math.random() * placeholders.length)];
      
      toast.success("Image generated successfully!");
      onImageGenerated(randomImage);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      variant="outline"
      type="button"
      onClick={handleGenerateImage}
      disabled={disabled || isGenerating}
      className="gap-2"
    >
      <Sparkles className="h-4 w-4" />
      {isGenerating ? "Generating..." : "Generate with AI"}
    </Button>
  );
};

export default GenerateImageButton;
