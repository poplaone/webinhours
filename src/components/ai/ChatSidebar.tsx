
import React, { useState } from 'react';
import { SendIcon, Sparkles, Zap, Plus, Minimize2, Maximize2, X, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from './ChatMessage';
import { cn } from '@/lib/utils';

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
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI assistant for **WebInHours**. I can help you:\n\n• Find the perfect website template\n• Understand our services\n• Browse marketplace listings\n• Get development quotes\n\nWhat can I help you with today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('template') || input.includes('website')) {
      return "Great! I can help you find the perfect template. We have categories like:\n\n• **Business & Corporate** - Professional sites\n• **E-commerce** - Online stores\n• **Portfolio** - Creative showcases\n• **Blog & News** - Content sites\n• **Landing Pages** - Marketing focused\n\nWhat type of website are you looking to create?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('quote')) {
      return "Our pricing is transparent and competitive:\n\n• **Template Purchase**: $29-99 (one-time)\n• **Custom Development**: $299-999\n• **Rush Delivery**: +50% (within 24 hours)\n• **Full Package**: Design + Development + Hosting\n\nWould you like a custom quote for your project?";
    }
    
    if (input.includes('marketplace') || input.includes('sell') || input.includes('list')) {
      return "Our marketplace allows developers to list their creations:\n\n• **Easy Listing Process** - Submit your work\n• **Quality Review** - We ensure high standards\n• **Fair Commission** - Keep 70% of sales\n• **Marketing Support** - We help promote your work\n\nAre you interested in selling your websites or browsing existing ones?";
    }
    
    if (input.includes('time') || input.includes('delivery') || input.includes('fast')) {
      return "**WebInHours** delivers fast:\n\n• **Templates**: Instant download\n• **Customization**: 2-24 hours\n• **Custom Sites**: 1-7 days\n• **Rush Orders**: Same day delivery\n\nOur rapid development process ensures you get professional results quickly!";
    }
    
    if (input.includes('help') || input.includes('support')) {
      return "I'm here to help! You can also:\n\n• Browse our **FAQ section**\n• Contact our support team\n• Schedule a consultation\n• Check our **How It Works** guide\n\nWhat specific information do you need?";
    }
    
    return "I'd be happy to help you with that! Could you tell me more about:\n\n• What type of website you need?\n• Your timeline and budget?\n• Any specific features you require?\n\nOr feel free to browse our templates and marketplace listings!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800 + Math.random() * 1200); // 0.8-2 seconds delay
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    // Auto-send after a brief delay
    setTimeout(() => {
      const syntheticEvent = { key: 'Enter', shiftKey: false, preventDefault: () => {} };
      handleKeyDown(syntheticEvent as any);
    }, 100);
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
            <span className="text-sm font-medium text-white">WebInHours AI Assistant</span>
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
          {isLoading && (
            <ChatMessage
              message="Thinking..."
              isUser={false}
              timestamp={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          )}
        </div>
      </div>
      
      {/* Input area */}
      <div className="flex-none p-4 bg-[#121212] border-t border-[#8B5CF6]/10">
        <div className="relative">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about templates, pricing, or marketplace..."
            className="min-h-16 resize-none pr-20 py-3 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-400"
            rows={2}
            disabled={isLoading}
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
              disabled={!inputMessage.trim() || isLoading}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
            onClick={() => handleQuickAction("Show me business templates")}
            disabled={isLoading}
          >
            <Plus className="h-3 w-3 mr-1" />
            Templates
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
            onClick={() => handleQuickAction("What are your prices?")}
            disabled={isLoading}
          >
            <Zap className="h-3 w-3 mr-1" />
            Pricing
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 bg-[#1A1F2C] border-[#8B5CF6]/30 text-white hover:bg-[#8B5CF6]/20"
            onClick={() => handleQuickAction("Tell me about the marketplace")}
            disabled={isLoading}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
