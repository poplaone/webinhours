import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string | null;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

const SupportTickets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchTickets();
  }, [user, navigate]);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <MessageSquare className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Support Tickets</h1>
            <p className="text-muted-foreground mt-2">
              Manage your support requests and track their status
            </p>
          </div>
          <Button onClick={() => navigate('/contact')}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {tickets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
              <p className="text-muted-foreground text-center mb-6">
                You don't have any support tickets. Create one to get help from our team.
              </p>
              <Button onClick={() => navigate('/contact')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{ticket.title}</CardTitle>
                        {ticket.ai_generated && (
                          <Badge variant="outline" className="text-xs">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {ticket.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <Badge variant={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize">{ticket.status}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {ticket.category && (
                        <span className="px-2 py-1 bg-muted rounded">
                          {ticket.category}
                        </span>
                      )}
                      <span>
                        Created: {new Date(ticket.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {ticket.resolved_at && (
                      <span className="text-success">
                        Resolved: {new Date(ticket.resolved_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SupportTickets;