
import React from 'react';
import SideNavbar from '@/components/layout/SideNavbar';

const ConceptTestingResults = () => {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Concept Testing Results</h1>
        <p>Results content will appear here.</p>
      </div>
    </div>
  );
};

export default ConceptTestingResults;
