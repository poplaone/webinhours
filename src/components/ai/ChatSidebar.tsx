import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bot, Headphones, Sparkles, Lock, Search } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import { Message, ChatSidebarProps } from './types';
import { useMarketplaceAI } from '@/hooks/useMarketplaceAI';
import { useLiveSupport } from '@/hooks/useLiveSupport';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

type ChatMode = 'ai' | 'live';

const ChatSidebar = ({ isMaximized = false, onToggleMaximize, onClose, className }: ChatSidebarProps) => {
  const [chatMode, setChatMode] = useState<ChatMode>('ai');
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  
  const isLoading = chatMode === 'ai' ? aiLoading : liveLoading;

  // Update display messages based on mode
  useEffect(() => {
    if (chatMode === 'ai') {
      setDisplayMessages(aiMessages.map(msg => ({
        content: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })));
    } else {
      if (liveMessages.length === 0 && user) {
        setDisplayMessages([{
          content: "👋 Welcome to live support! Send a message and our team will respond as soon as possible.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      } else {
        setDisplayMessages(liveMessages.map(msg => ({
          content: msg.content,
          isUser: msg.role === 'user',
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })));
      }
    }
  }, [chatMode, aiMessages, liveMessages, user]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    
    if (chatMode === 'ai') {
      await sendAIMessage(message);
    } else {
      await sendLiveMessage(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    if (chatMode === 'ai' && isAuthenticated) {
      await sendAIMessage(action);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full overflow-hidden", 
      isMaximized ? "w-full" : "w-full",
      className
    )}>
      <ChatHeader 
        isMaximized={isMaximized} 
        onToggleMaximize={onToggleMaximize} 
        onClose={onClose} 
      />
      
      {/* Mode Toggle */}
      <div className="flex-none px-4 py-3 bg-[#1A1F2C] border-b border-[#8B5CF6]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className={cn("h-4 w-4 transition-colors", chatMode === 'ai' ? "text-[#8B5CF6]" : "text-gray-500")} />
            <Label htmlFor="chat-mode" className="text-xs text-gray-400">AI Chat</Label>
          </div>
          
          <Switch
            id="chat-mode"
            checked={chatMode === 'live'}
            onCheckedChange={(checked) => setChatMode(checked ? 'live' : 'ai')}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-[#8B5CF6]"
          />
          
          <div className="flex items-center gap-2">
            <Label htmlFor="chat-mode" className="text-xs text-gray-400">Live Support</Label>
            <Headphones className={cn("h-4 w-4 transition-colors", chatMode === 'live' ? "text-green-500" : "text-gray-500")} />
          </div>
        </div>

        {/* Credits indicator for AI mode */}
        {chatMode === 'ai' && isAuthenticated && remainingCredits !== null && (
          <div className="mt-2 flex items-center justify-center">
            <Badge variant="outline" className="text-xs bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-[#8B5CF6]">
              <Sparkles className="h-3 w-3 mr-1" />
              {remainingCredits}/{dailyLimit} credits remaining
            </Badge>
          </div>
        )}
      </div>

      {/* Non-authenticated user view for AI mode */}
      {chatMode === 'ai' && !isAuthenticated && (
        <div className="flex-1 flex flex-col">
          {/* Search interface for non-authenticated users */}
          <div className="flex-none p-4 bg-[#121212] border-b border-[#8B5CF6]/10">
            <div className="text-center mb-4">
              <Lock className="h-8 w-8 text-[#8B5CF6] mx-auto mb-2" />
              <p className="text-sm text-gray-400 mb-2">Sign in to use AI-powered search</p>
              <Button 
                size="sm" 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                onClick={() => navigate('/auth')}
              >
                Sign In to Ask AI
              </Button>
            </div>
            
            <div className="relative mt-4">
              <p className="text-xs text-gray-500 mb-2 text-center">Or search the marketplace:</p>
              <div className="flex gap-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search templates, categories..."
                  className="bg-[#1A1F2C] border-[#8B5CF6]/30 text-white placeholder:text-gray-500"
                />
                <Button 
                  size="icon"
                  variant="outline"
                  className="border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick filters for non-authenticated */}
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-xs text-gray-500 mb-3">Quick filters:</p>
            <div className="flex flex-wrap gap-2">
              {['E-commerce', 'Portfolio', 'SaaS', 'Blog', 'Landing Page', 'AI Chatbot'].map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#8B5CF6]/30 text-gray-400 hover:text-white hover:bg-[#8B5CF6]/10"
                  onClick={() => navigate(`/marketplace?category=${encodeURIComponent(filter.toLowerCase())}`)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live support non-authenticated view */}
      {chatMode === 'live' && !isAuthenticated && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <Lock className="h-12 w-12 text-green-500 mb-4" />
          <p className="text-gray-400 text-center mb-4">Sign in to chat with our support team</p>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => navigate('/auth')}
          >
            Sign In for Live Support
          </Button>
        </div>
      )}

      {/* Authenticated chat view */}
      {((chatMode === 'ai' && isAuthenticated) || (chatMode === 'live' && isAuthenticated)) && (
        <>
          <MessagesList messages={displayMessages} isLoading={isLoading} />
          
          <div className="flex-none p-4 bg-[#121212] border-t border-[#8B5CF6]/10">
            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              handleKeyDown={handleKeyDown}
              isLoading={isLoading}
            />
            {chatMode === 'ai' && (
              <QuickActions handleQuickAction={handleQuickAction} isLoading={isLoading} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
