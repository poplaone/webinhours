
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp?: string;
};

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "flex-row-reverse" : "flex-row",
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
        isUser ? "bg-[#8B5CF6] text-white" : "bg-background"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn(
        "flex flex-col gap-1 rounded-lg p-3 text-sm",
        isUser ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/20" : "bg-muted/40 border border-border/60"
      )}>
        <div className="prose-sm max-w-none">
          {message}
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
