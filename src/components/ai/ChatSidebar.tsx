
import React, { useState } from 'react';
import { SendIcon, Sparkles, Zap, Plus, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from './ChatMessage';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: string;
};

const ChatSidebar = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI ideation assistant. How can I help you create or refine product ideas today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIdea, setActiveIdea] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let aiResponse;
      
      if (inputMessage.toLowerCase().includes('new idea') || inputMessage.toLowerCase().includes('create')) {
        aiResponse = {
          content: "Great! Let's create a new idea. Could you tell me what problem you're trying to solve or what industry you're interested in?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setActiveIdea("New idea");
      } else if (inputMessage.toLowerCase().includes('edit') || inputMessage.toLowerCase().includes('modify')) {
        aiResponse = {
          content: "I'd be happy to help you refine an existing idea. Which aspect would you like to focus on? Market fit, technical requirements, or user experience?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        aiResponse = {
          content: "I can help you brainstorm new product ideas or refine existing ones. Would you like to create a new concept or work on something you already have?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn(
      "h-full border-r transition-all duration-300 flex flex-col bg-background/95",
      isExpanded ? "w-80" : "w-16"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn(
          "flex items-center gap-2",
          !isExpanded && "hidden"
        )}>
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
          <span className="font-medium">AI Ideation Chat</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full"
        >
          <ChevronRight className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            !isExpanded && "rotate-180"
          )} />
        </Button>
      </div>
      
      {activeIdea && isExpanded && (
        <div className="bg-[#8B5CF6]/5 border-b border-[#8B5CF6]/10 px-4 py-2 flex items-center">
          <Zap className="h-4 w-4 text-[#8B5CF6] mr-2" />
          <span className="text-sm font-medium">{activeIdea}</span>
        </div>
      )}
      
      {isExpanded ? (
        <>
          <ScrollArea className="flex-1">
            <div className="p-2 flex flex-col">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="relative">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask AI to create or edit an idea..."
                className="min-h-10 resize-none pr-12 py-2"
                rows={2}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 bottom-1 h-8 w-8 text-[#8B5CF6]"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-xs h-7">
                <Plus className="h-3 w-3 mr-1" />
                New Idea
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-7">
                <Zap className="h-3 w-3 mr-1" />
                Suggestions
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-4 space-y-4">
          <Button variant="ghost" size="icon" className="text-[#8B5CF6]">
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#8B5CF6]">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#8B5CF6]">
            <Zap className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
