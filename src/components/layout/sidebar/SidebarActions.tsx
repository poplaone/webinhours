
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn, UserPlus, MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfiles';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDropdown } from "@/components/ui/user-dropdown";

interface SidebarActionsProps {
  isAuthenticated: boolean;
}

export const SidebarActions = ({ isAuthenticated }: SidebarActionsProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, isUser: boolean, timestamp: string}[]>([]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { text: message, isUser: true, timestamp };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate support response
    setTimeout(() => {
      const supportMessage = { 
        text: "Thank you for contacting support! We've received your message and will get back to you shortly.", 
        isUser: false, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, supportMessage]);
    }, 1000);
    
    setMessage('');
    toast({
      title: "Message sent",
      description: "Your support message has been sent successfully.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isAuthenticated) {
    return (
      <div className="border-t border-border/40">
        {/* Live Chat Support Interface */}
        <div className="p-4 border-b border-border/40">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 mb-3"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageCircle className="h-4 w-4" />
            Live Chat Support
          </Button>
          
          {isChatOpen && (
            <Card className="w-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Support Chat</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setIsChatOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-h-32 overflow-y-auto space-y-2 bg-muted/20 p-2 rounded">
                  {chatMessages.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Start a conversation with our support team</p>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div key={index} className={`text-xs ${msg.isUser ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded max-w-[80%] ${
                          msg.isUser ? 'bg-[#8B5CF6] text-white' : 'bg-background border'
                        }`}>
                          {msg.text}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {msg.timestamp}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="relative">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-16 resize-none pr-12"
                    rows={2}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 bottom-2 h-8 w-8"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* User Info and Sign Out */}
        <div className="p-4 flex items-center justify-between gap-3">
          <UserDropdown profile={profile} />
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border/40 space-y-2">
      <Button
        variant="outline"
        className="w-full justify-start gap-3"
        onClick={() => navigate('/auth')}
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <Button
        className="w-full justify-start gap-3 bg-[#8B5CF6] hover:bg-[#7C3AED]"
        onClick={() => navigate('/auth')}
      >
        <UserPlus className="h-4 w-4" />
        Sign Up
      </Button>
    </div>
  );
};
