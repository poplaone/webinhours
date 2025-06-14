
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import { getAIResponse, getInitialMessage } from './chatUtils';
import { Message, ChatSidebarProps } from './types';

const ChatSidebar = ({ isMaximized = false, onToggleMaximize, onClose, className }: ChatSidebarProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [isLoading, setIsLoading] = useState(false);

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
      <ChatHeader 
        isMaximized={isMaximized} 
        onToggleMaximize={onToggleMaximize} 
        onClose={onClose} 
      />
      
      <MessagesList messages={messages} isLoading={isLoading} />
      
      <div className="flex-none p-4 bg-[#121212] border-t border-[#8B5CF6]/10">
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          isLoading={isLoading}
        />
        <QuickActions handleQuickAction={handleQuickAction} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatSidebar;
