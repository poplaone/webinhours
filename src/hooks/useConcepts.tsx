
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Concept = Tables<'concepts'>;
type ConceptInsert = TablesInsert<'concepts'>;
type ConceptUpdate = TablesUpdate<'concepts'>;

export const useConcepts = (ideaId?: string) => {
  return useQuery({
    queryKey: ['concepts', ideaId],
    queryFn: async () => {
      let query = supabase
        .from('concepts')
        .select('*')
        .order('created_at', { ascending: false });

      if (ideaId) {
        query = query.eq('idea_id', ideaId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Concept[];
    },
  });
};

export const useCreateConcept = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (concept: Omit<ConceptInsert, 'user_id'>) => {
      const { data, error } = await supabase
        .from('concepts')
        .insert([{ ...concept, user_id: (await supabase.auth.getUser()).data.user!.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
      toast({
        title: "Success",
        description: "Concept created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
