
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
  isFormValid: boolean;
  isAdmin: boolean;
}

export function FormActions({ onClose, isSubmitting, isFormValid, isAdmin }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || !isFormValid}
        className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
      >
        {isSubmitting ? 'Uploading...' : `Upload Website${isAdmin ? ' (Auto-Approve)' : ''}`}
      </Button>
    </div>
  );
}
