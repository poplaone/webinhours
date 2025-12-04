import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bot, Send, Sparkles, Headphones, Lock, Search, Plus, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMarketplaceAI } from '@/hooks/useMarketplaceAI';
import { useLiveSupport } from '@/hooks/useLiveSupport';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type ChatMode = 'ai' | 'live';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  onTemplateRecommend?: (templateId: string) => void;
  onSearch?: (query: string) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  onTemplateRecommend,
  onSearch
}) => {
  const [chatMode, setChatMode] = useState<ChatMode>('ai');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: "Hi! I'm your AI assistant. I can help you find the perfect template, answer questions about our services, or recommend products based on your needs. What can I help you with today?",
    timestamp: new Date(),
    suggestions: ["Find e-commerce templates", "What's trending?", "Budget-friendly options", "Portfolio templates"]
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // AI Chat hook
  const { 
    messages: aiMessages, 
    isLoading: aiLoading, 
    sendMessage: sendAIMessage,
    remainingCredits,
    dailyLimit,
    isAuthenticated 
  } = useMarketplaceAI();
  
  // Live Support hook
  const {
    messages: liveMessages,
    isLoading: liveLoading,
    sendMessage: sendLiveMessage,
  } = useLiveSupport();

  const isLoading = chatMode === 'ai' ? (aiLoading || isTyping) : liveLoading;

  // Update messages based on mode
  useEffect(() => {
    if (chatMode === 'live') {
      if (liveMessages.length === 0 && user) {
        setMessages([{
          id: 'welcome',
          type: 'bot',
          content: "👋 Welcome to live support! Send a message and our team will respond as soon as possible.",
          timestamp: new Date(),
        }]);
      } else {
        setMessages(liveMessages.map(msg => ({
          id: msg.id,
          type: msg.role === 'user' ? 'user' : 'bot',
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        })));
      }
    } else {
      // Reset to initial AI message when switching back
      if (aiMessages.length === 0) {
        setMessages([{
          id: '1',
          type: 'bot',
          content: "Hi! I'm your AI assistant. I can help you find the perfect template, answer questions about our services, or recommend products based on your needs. What can I help you with today?",
          timestamp: new Date(),
          suggestions: ["Find e-commerce templates", "What's trending?", "Budget-friendly options", "Portfolio templates"]
        }]);
      }
    }
  }, [chatMode, liveMessages, user, aiMessages.length]);

  const scrollToBottom = () => {
    const viewport = scrollAreaRootRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null;
    if (viewport) {
      requestAnimationFrame(() => {
        if (viewport) {
          const scrollHeight = viewport.scrollHeight;
          requestAnimationFrame(() => {
            viewport.scrollTo({ top: scrollHeight, behavior: 'auto' });
          });
        }
      });
    }
  };

  useEffect(() => {
    const raf = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(raf);
  }, [messages]);

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    if (input.includes('ecommerce') || input.includes('e-commerce') || input.includes('shop')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Great! I found some excellent e-commerce templates for you. Here are my top recommendations based on features and user ratings:",
        timestamp: new Date(),
        suggestions: ["TechStore - Modern E-commerce", "FashionHub - Clothing Store", "GadgetWorld - Electronics", "Show all e-commerce templates"]
      };
    }
    if (input.includes('portfolio') || input.includes('creative')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Perfect! Portfolio templates are great for showcasing your work. I recommend these based on your creative needs:",
        timestamp: new Date(),
        suggestions: ["CreativeStudio - Portfolio", "DesignPro - Agency Website", "ArtistSpace - Creative Portfolio", "Browse all portfolio templates"]
      };
    }
    if (input.includes('budget') || input.includes('cheap') || input.includes('affordable')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I understand budget is important! Here are some excellent affordable options that don't compromise on quality:",
        timestamp: new Date(),
        suggestions: ["Templates under $50", "Free templates", "Best value templates", "Payment plans available"]
      };
    }
    if (input.includes('trending') || input.includes('popular')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Here's what's trending right now! These templates are popular among our users:",
        timestamp: new Date(),
        suggestions: ["AI-powered websites", "Minimalist designs", "Dark mode templates", "Mobile-first designs"]
      };
    }
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "I'd be happy to help you with that! Could you tell me more about what type of website you're looking to create? This will help me provide better recommendations.",
      timestamp: new Date(),
      suggestions: ["Business website", "Personal portfolio", "E-commerce store", "Blog or content site"]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');

    if (chatMode === 'live') {
      await sendLiveMessage(messageText);
    } else {
      // Trigger marketplace search if provided
      onSearch?.(messageText);
      setIsTyping(true);
      
      // For AI mode, use the AI hook if authenticated, otherwise use mock response
      if (isAuthenticated) {
        await sendAIMessage(messageText);
        setIsTyping(false);
      } else {
        // Mock AI response for non-authenticated users
        setTimeout(() => {
          const botResponse = generateBotResponse(messageText);
          setMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
        }, 1500);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    const msg: Message = { id: Date.now().toString(), type: 'user', content: suggestion, timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
    onSearch?.(suggestion);
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(suggestion);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = async (action: string) => {
    if (chatMode === 'ai' && isAuthenticated) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: action,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      onSearch?.(action);
      await sendAIMessage(action);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setSearchQuery('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="w-full h-full"
    >
      <Card className="relative h-full flex flex-col bg-transparent border-0 shadow-none overflow-hidden">
        <CardHeader className="pb-2 border-b border-purple-200/20">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center text-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                chatMode === 'ai' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}>
                {chatMode === 'ai' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <Headphones className="w-4 h-4 text-white" />
                )}
              </div>
              {chatMode === 'ai' ? 'AI Assistant' : 'Live Support'}
              <div className={`w-2 h-2 rounded-full ml-2 animate-pulse ${
                chatMode === 'ai' ? 'bg-purple-500' : 'bg-green-500'
              }`}></div>
            </CardTitle>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <Bot className={`h-4 w-4 transition-colors ${chatMode === 'ai' ? 'text-purple-500' : 'text-gray-400'}`} />
              <Label htmlFor="chat-mode-toggle" className="text-xs text-muted-foreground cursor-pointer">AI</Label>
            </div>
            
            <Switch
              id="chat-mode-toggle"
              checked={chatMode === 'live'}
              onCheckedChange={(checked) => setChatMode(checked ? 'live' : 'ai')}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-purple-500"
            />
            
            <div className="flex items-center gap-2">
              <Label htmlFor="chat-mode-toggle" className="text-xs text-muted-foreground cursor-pointer">Live</Label>
              <Headphones className={`h-4 w-4 transition-colors ${chatMode === 'live' ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          </div>

          {/* Credits indicator for AI mode */}
          {chatMode === 'ai' && isAuthenticated && remainingCredits !== null && (
            <div className="mt-2 flex items-center justify-center">
              <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-500">
                <Sparkles className="h-3 w-3 mr-1" />
                {remainingCredits}/{dailyLimit} credits remaining
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
          {/* Non-authenticated AI mode view */}
          {chatMode === 'ai' && !isAuthenticated && (
            <div className="flex-1 flex flex-col">
              {/* Search interface for non-authenticated users */}
              <div className="flex-none p-4 border-b border-purple-200/20">
                <div className="text-center mb-4">
                  <Lock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Sign in to use AI-powered search</p>
                  <Button 
                    size="sm" 
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In to Ask AI
                  </Button>
                </div>
                
                <div className="relative mt-4">
                  <p className="text-xs text-muted-foreground mb-2 text-center">Or search the marketplace:</p>
                  <div className="flex gap-2">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search templates, categories..."
                      className="bg-muted/30 border-purple-500/30"
                    />
                    <Button 
                      size="icon"
                      variant="outline"
                      className="border-purple-500/30 text-purple-500 hover:bg-purple-500/10"
                      onClick={handleSearch}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Quick filters for non-authenticated */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-xs text-muted-foreground mb-3">Quick filters:</p>
                <div className="flex flex-wrap gap-2">
                  {['E-commerce', 'Portfolio', 'SaaS', 'Blog', 'Landing Page', 'AI Chatbot'].map((filter) => (
                    <Button
                      key={filter}
                      variant="outline"
                      size="sm"
                      className="text-xs border-purple-500/30 text-muted-foreground hover:text-foreground hover:bg-purple-500/10"
                      onClick={() => onSearch?.(filter.toLowerCase())}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Non-authenticated live support view */}
          {chatMode === 'live' && !user && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Lock className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-muted-foreground text-center mb-4">Sign in to chat with our support team</p>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => navigate('/auth')}
              >
                Sign In for Live Support
              </Button>
            </div>
          )}

          {/* Authenticated chat view */}
          {((chatMode === 'ai' && isAuthenticated) || (chatMode === 'live' && user)) && (
            <>
              <div ref={scrollAreaRootRef} className="relative flex-1 min-h-0 ai-chat z-0">
                <ScrollArea className="h-full w-full">
                  <div className="p-4 pb-24">
                    <div className="flex flex-col items-center space-y-4">
                      {messages.map(message => (
                        <motion.div 
                          key={message.id} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                        >
                          <div className={`max-w-[340px] w-full ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`p-4 rounded-2xl ${
                              message.type === 'user' 
                                ? chatMode === 'ai'
                                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                : 'bg-white/90 text-primary shadow-md'
                            }`}>
                              <p className="text-base leading-relaxed">{message.content}</p>
                            </div>
                            {message.suggestions && chatMode === 'ai' && (
                              <div className="mt-2 flex flex-col items-center w-full space-y-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button 
                                    key={index} 
                                    onClick={() => handleSuggestionClick(suggestion)} 
                                    className="bg-transparent border border-primary text-primary rounded-full px-4 py-2 w-full text-left hover:bg-primary/10 transition text-sm"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground w-full text-left mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isLoading && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="flex justify-start w-full"
                        >
                          <div className="bg-white/90 p-4 rounded-2xl shadow-md max-w-[340px] w-full">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div className="h-0" />
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <div className="p-4 border-t border-muted absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
                <div className="relative max-w-[340px] mx-auto w-full">
                  <input 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)} 
                    placeholder={chatMode === 'ai' ? "Ask me anything..." : "Type your message..."} 
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()} 
                    className={`w-full bg-transparent border rounded-full px-4 py-3 pr-12 placeholder:text-muted-foreground focus:outline-none ${
                      chatMode === 'ai' 
                        ? 'border-purple-500 text-primary' 
                        : 'border-green-500 text-primary'
                    }`}
                  />
                  <button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isLoading} 
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full p-2 shadow-md transition disabled:opacity-50 ${
                      chatMode === 'ai'
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Quick Actions for AI mode */}
                {chatMode === 'ai' && (
                  <div className="flex gap-2 mt-2 flex-wrap justify-center max-w-[340px] mx-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 bg-muted/30 border-purple-500/30 hover:bg-purple-500/20"
                      onClick={() => handleQuickAction("Find me an e-commerce website template")}
                      disabled={isLoading}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      E-commerce
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 bg-muted/30 border-purple-500/30 hover:bg-purple-500/20"
                      onClick={() => handleQuickAction("Show me AI chatbot agents for customer support")}
                      disabled={isLoading}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      AI Agents
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-7 bg-muted/30 border-purple-500/30 hover:bg-purple-500/20"
                      onClick={() => handleQuickAction("Compare your best portfolio templates")}
                      disabled={isLoading}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Portfolio
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
