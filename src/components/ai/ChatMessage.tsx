import React from 'react';
import { Bot, User, Headphones, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isSupport?: boolean;
};

// Parse special tags from AI responses
const parseSpecialTags = (content: string) => {
  const textParts: Array<{ type: 'text' | 'navigate'; content: string; path?: string }> = [];
  const websiteSuggestions: Array<{ id: string; name: string }> = [];
  
  // Extract website names and IDs - look for pattern like **name** or *name* before [VIEW:website:id]
  const viewPattern = /\*{1,2}([^*]+)\*{1,2}[^[]*\[VIEW:website:([a-zA-Z0-9-]+)\]/g;
  let viewMatch;
  while ((viewMatch = viewPattern.exec(content)) !== null) {
    const name = viewMatch[1].split('(')[0].trim(); // Remove category like "(Landing Page)"
    websiteSuggestions.push({
      id: viewMatch[2],
      name: name,
    });
  }
  
  // Remove VIEW tags from content for cleaner text display
  let cleanContent = content.replace(/\s*\[VIEW:website:[a-zA-Z0-9-]+\]/g, '');
  
  // Parse remaining content for NAVIGATE tags
  const navigatePattern = /\[NAVIGATE:([^\]]+)\]/g;
  let lastIndex = 0;
  let match;
  
  while ((match = navigatePattern.exec(cleanContent)) !== null) {
    if (match.index > lastIndex) {
      textParts.push({
        type: 'text',
        content: cleanContent.slice(lastIndex, match.index),
      });
    }
    
    const path = match[1];
    const label = path === '/websites' ? 'Go to Websites' 
      : path === '/contact' ? 'Contact Us'
      : path === '/pricing' ? 'View Pricing'
      : path === '/calculator' ? 'Try Calculator'
      : `Go to ${path}`;
    textParts.push({
      type: 'navigate',
      content: label,
      path: path,
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < cleanContent.length) {
    textParts.push({
      type: 'text',
      content: cleanContent.slice(lastIndex),
    });
  }
  
  return {
    textParts: textParts.length > 0 ? textParts : [{ type: 'text' as const, content: cleanContent }],
    websiteSuggestions,
  };
};

const ChatMessage = ({ message, isUser, timestamp, isSupport }: ChatMessageProps) => {
  const navigate = useNavigate();
  const { textParts, websiteSuggestions } = parseSpecialTags(message);
  
  const handleViewWebsite = (id: string) => {
    navigate(`/site/${id}`);
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "flex-row-reverse" : "flex-row",
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
        isUser ? "bg-[#8B5CF6] text-white" : isSupport ? "bg-green-500 text-white" : "bg-background"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : isSupport ? (
          <Headphones className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className={cn(
        "flex flex-col gap-2 rounded-lg p-3 text-sm max-w-[85%]",
        isUser ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/20" : 
        isSupport ? "bg-green-500/10 border border-green-500/20" :
        "bg-muted/40 border border-border/60"
      )}>
        <div className="prose-sm max-w-none">
          {textParts.map((part, index) => {
            if (part.type === 'text') {
              return (
                <ReactMarkdown key={index}>
                  {part.content}
                </ReactMarkdown>
              );
            }
            
            if (part.type === 'navigate' && part.path) {
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate(part.path!)}
                  className="inline-flex items-center gap-2 my-2 bg-secondary/50 hover:bg-secondary"
                >
                  <ArrowRight className="h-3 w-3" />
                  {part.content}
                </Button>
              );
            }
            
            return null;
          })}
        </div>
        
        {/* Website Suggestions as Clickable Chips */}
        {websiteSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
            {websiteSuggestions.map((site, index) => (
              <button
                key={index}
                onClick={() => handleViewWebsite(site.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer"
              >
                <ExternalLink className="h-3 w-3" />
                {site.name}
              </button>
            ))}
          </div>
        )}
        
        {timestamp && (
          <div className="mt-1 text-xs text-muted-foreground">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
