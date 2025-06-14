
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type ConceptTest = Tables<'concept_tests'>;
type ConceptTestInsert = TablesInsert<'concept_tests'>;
type ConceptTestUpdate = TablesUpdate<'concept_tests'>;

export const useConceptTests = (conceptId?: string) => {
  return useQuery({
    queryKey: ['concept-tests', conceptId],
    queryFn: async () => {
      let query = supabase
        .from('concept_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (conceptId) {
        query = query.eq('concept_id', conceptId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ConceptTest[];
    },
  });
};

export const useCreateConceptTest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (conceptTest: Omit<ConceptTestInsert, 'user_id'>) => {
      const { data, error } = await supabase
        .from('concept_tests')
        .insert([{ ...conceptTest, user_id: (await supabase.auth.getUser()).data.user!.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concept-tests'] });
      toast({
        title: "Success",
        description: "Concept test created successfully!",
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

export const useUpdateConceptTest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ConceptTestUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('concept_tests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concept-tests'] });
      toast({
        title: "Success",
        description: "Concept test updated successfully!",
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

export const useDeleteConceptTest = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('concept_tests')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concept-tests'] });
      toast({
        title: "Success",
        description: "Concept test deleted successfully!",
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
