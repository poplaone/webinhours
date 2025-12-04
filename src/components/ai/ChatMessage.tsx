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
  const parts: Array<{ type: 'text' | 'view' | 'navigate'; content: string; id?: string; path?: string }> = [];
  
  // Regex patterns for special tags
  const viewPattern = /\[VIEW:website:([a-zA-Z0-9-]+)\]/g;
  const navigatePattern = /\[NAVIGATE:([^\]]+)\]/g;
  
  let lastIndex = 0;
  let match;
  
  // Combined pattern to find all tags
  const combinedPattern = /\[VIEW:website:([a-zA-Z0-9-]+)\]|\[NAVIGATE:([^\]]+)\]/g;
  
  while ((match = combinedPattern.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }
    
    if (match[1]) {
      // VIEW tag
      parts.push({
        type: 'view',
        content: 'View Website',
        id: match[1],
      });
    } else if (match[2]) {
      // NAVIGATE tag
      const path = match[2];
      const label = path === '/marketplace' ? 'Go to Marketplace' 
        : path === '/contact' ? 'Contact Us'
        : path === '/pricing' ? 'View Pricing'
        : path === '/calculator' ? 'Try Calculator'
        : `Go to ${path}`;
      parts.push({
        type: 'navigate',
        content: label,
        path: path,
      });
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }
  
  return parts.length > 0 ? parts : [{ type: 'text' as const, content }];
};

const ChatMessage = ({ message, isUser, timestamp, isSupport }: ChatMessageProps) => {
  const navigate = useNavigate();
  const parsedParts = parseSpecialTags(message);
  
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
        "flex flex-col gap-1 rounded-lg p-3 text-sm max-w-[85%]",
        isUser ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/20" : 
        isSupport ? "bg-green-500/10 border border-green-500/20" :
        "bg-muted/40 border border-border/60"
      )}>
        <div className="prose-sm max-w-none">
          {parsedParts.map((part, index) => {
            if (part.type === 'text') {
              return (
                <ReactMarkdown key={index}>
                  {part.content}
                </ReactMarkdown>
              );
            }
            
            if (part.type === 'view' && part.id) {
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewWebsite(part.id!)}
                  className="inline-flex items-center gap-2 my-2 bg-primary/10 border-primary/30 hover:bg-primary/20"
                >
                  <ExternalLink className="h-3 w-3" />
                  {part.content}
                </Button>
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
