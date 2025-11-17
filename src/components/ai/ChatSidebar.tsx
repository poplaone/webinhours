import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import { Message, ChatSidebarProps } from './types';
import { useAIAssistant } from '@/hooks/useAIAssistant';

const ChatSidebar = ({ isMaximized = false, onToggleMaximize, onClose, className }: ChatSidebarProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages: aiMessages, isLoading, sendMessage } = useAIAssistant();
  
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(aiMessages.map(msg => ({
      content: msg.content,
      isUser: msg.role === 'user',
      timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })));
  }, [aiMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    await sendMessage(action);
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