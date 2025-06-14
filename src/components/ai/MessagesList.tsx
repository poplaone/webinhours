
import React from 'react';
import ChatMessage from './ChatMessage';
import { Message } from './types';

type MessagesListProps = {
  messages: Message[];
  isLoading: boolean;
};

const MessagesList = ({ messages, isLoading }: MessagesListProps) => {
  return (
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
  );
};

export default MessagesList;
