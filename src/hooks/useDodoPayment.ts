import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDodoPayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const initiateCheckout = async (productId: string, currency: string = 'USD') => {
        try {
            setIsLoading(true);
            console.log('Initiating checkout for:', productId, 'currency:', currency);

            const { data, error } = await supabase.functions.invoke('dodo-checkout', {
                body: { productId, currency },
            });

            if (error) {
                throw error;
            }

            if (data?.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error: any) {
            console.error('Payment error:', error);
            toast({
                title: "Payment Error",
                description: error.message || "Failed to initiate checkout. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        initiateCheckout,
        isLoading
    };
};
