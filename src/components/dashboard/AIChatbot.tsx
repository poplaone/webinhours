import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}
interface AIChatbotProps {
  onTemplateRecommend?: (templateId: string) => void;
}
export const AIChatbot: React.FC<AIChatbotProps> = ({
  onTemplateRecommend
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: "Hi! I'm your AI assistant. I can help you find the perfect template, answer questions about our services, or recommend products based on your needs. What can I help you with today?",
    timestamp: new Date(),
    suggestions: ["Find e-commerce templates", "What's trending?", "Budget-friendly options", "Portfolio templates"]
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
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
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };
  if (isMinimized) {
    return <motion.div initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsMinimized(false)} className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </Button>
      </motion.div>;
  }
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} className={`${isExpanded ? 'fixed inset-4 z-50' : 'w-full'}`}>
      <Card className={`${isExpanded ? 'h-full' : 'min-h-[600px]'} flex flex-col bg-transparent border-0 shadow-none`}>
        <CardHeader className="pb-3 border-b border-purple-200/20">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-white" />
              </div>
              AI Assistant
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by AI • Always here to help
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col items-center space-y-4">
              {messages.map(message => <motion.div key={message.id} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                  <div className={`max-w-[340px] w-full ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-4 rounded-2xl ${message.type === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/90 text-primary shadow-md'}`}>
                      <p className="text-base leading-relaxed">{message.content}</p>
                    </div>
                    {message.suggestions && <div className="mt-2 flex flex-col items-center w-full space-y-2">
                        {message.suggestions.map((suggestion, index) => <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="bg-transparent border border-primary text-primary rounded-full px-4 py-2 w-full text-left hover:bg-primary/10 transition text-sm">
                            {suggestion}
                          </button>)}
                      </div>}
                    <div className="text-xs text-muted-foreground w-full text-left mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                    </div>
                  </div>
                </motion.div>)}
              {isTyping && <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="flex justify-start w-full">
                  <div className="bg-white/90 p-4 rounded-2xl shadow-md max-w-[340px] w-full">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.1s'
                  }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                    </div>
                  </div>
                </motion.div>}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="pt-4 pb-2 border-t border-muted flex items-center w-full max-w-[340px] mx-auto my-[369px]">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Ask me anything..." onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-transparent border border-primary rounded-full px-4 py-2 text-primary placeholder:text-muted-foreground focus:outline-none" />
            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} className="ml-2 bg-primary text-white rounded-full p-3 shadow-md hover:bg-primary/80 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};