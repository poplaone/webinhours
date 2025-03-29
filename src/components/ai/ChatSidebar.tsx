
import React, { useState } from 'react';
import { SendIcon, Sparkles, Zap, Plus, Minimize2, Maximize2, X, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from './ChatMessage';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: string;
};

type ChatSidebarProps = {
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onClose?: () => void;
  className?: string;
};

const ChatSidebar = ({ isMaximized = false, onToggleMaximize, onClose, className }: ChatSidebarProps) => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI ideation assistant. How can I help you create or refine product ideas today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
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
        
        // Navigate to idea detail page after a brief delay to show the message
        setTimeout(() => {
          navigate('/idea/1');
        }, 1000);
      } else if (inputMessage.toLowerCase().includes('edit') || inputMessage.toLowerCase().includes('modify')) {
        aiResponse = {
          content: "I'd be happy to help you refine an existing idea. Which aspect would you like to focus on? Market fit, technical requirements, or user experience?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        // Navigate to idea detail page after a brief delay
        setTimeout(() => {
          navigate('/idea/2');
        }, 1000);
      } else {
        aiResponse = {
          content: "I can help you brainstorm new product ideas or refine existing ones. Would you like to create a new concept or work on something you already have?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        // Navigate to a random idea detail page
        setTimeout(() => {
          const randomIdeaId = Math.floor(Math.random() * 5) + 1; // Random ID between 1-5
          navigate(`/idea/${randomIdeaId}`);
        }, 1000);
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

  // Handle quick actions
  const handleNewIdea = () => {
    const newMessage = {
      content: "I'd like to create a new idea.",
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        content: "Excellent! Let's create a new idea together. Could you tell me what problem you're trying to solve or what industry you're interested in?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setActiveIdea("New idea");
      
      // Navigate to idea detail
      setTimeout(() => {
        navigate('/idea/1');
      }, 1000);
    }, 800);
  };

  const handleSuggestions = () => {
    const newMessage = {
      content: "I need some idea suggestions.",
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        content: "Here are some trending areas to consider: AI-powered personalization, sustainable packaging solutions, remote learning tools, contactless service experiences, and digital wellness applications. Would you like to explore any of these?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Navigate to a random idea detail
      setTimeout(() => {
        const randomIdeaId = Math.floor(Math.random() * 5) + 1;
        navigate(`/idea/${randomIdeaId}`);
      }, 1000);
    }, 800);
  };

  return (
    <div className={cn(
      "flex flex-col h-full overflow-hidden", 
      isMaximized ? "w-full" : "w-full",
      className
    )}>
      {/* Chat header */}
      <div className="flex-none items-center justify-between bg-[#1A1F2C] border-b border-[#8B5CF6]/10 px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-[#8B5CF6] mr-2" />
            <span className="text-sm font-medium text-white">AI Ideation Chat</span>
            {activeIdea && (
              <>
                <span className="mx-2 text-muted-foreground">–</span>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 text-[#8B5CF6] mr-1" />
                  <span className="text-xs">{activeIdea}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {onToggleMaximize && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-white hover:bg-[#8B5CF6]/20" 
                onClick={onToggleMaximize}
              >
                {isMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            {onClose && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-white hover:bg-[#8B5CF6]/20" 
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Message display area */}
      <div className="bg-[#121212] flex-grow overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="flex-none p-4 bg-[#121212] border-t border-[#8B5CF6]/10">
        <div className="relative">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to create or edit an idea..."
            className="min-h-16 resize-none pr-20 py-3 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-400"
            rows={2}
          />
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-[#8B5CF6]"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-[#8B5CF6]"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
            onClick={handleNewIdea}
          >
            <Plus className="h-3 w-3 mr-1" />
            New Idea
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
            onClick={handleSuggestions}
          >
            <Zap className="h-3 w-3 mr-1" />
            Suggestions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;

