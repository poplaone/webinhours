
import React from 'react';
import { SendIcon, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
};

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  handleKeyDown, 
  isLoading 
}: ChatInputProps) => {
  return (
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
  );
};

export default ChatInput;
