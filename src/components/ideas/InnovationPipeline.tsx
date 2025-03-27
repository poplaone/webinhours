
import React from 'react';
import { Card } from "@/components/ui/card";

const InnovationPipeline: React.FC = () => {
  return (
    <div className="mt-8">
      <Card className="p-6 border border-border/40 bg-card/50 backdrop-blur">
        <h2 className="text-xl font-semibold mb-4">FMCG Innovation Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-background rounded-lg border border-border/60">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Research Phase</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#8B5CF6] text-white">2 Projects</span>
            </div>
            <p className="text-sm text-muted-foreground">Consumer research and concept development</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border/60">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Product Development</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white">1 Project</span>
            </div>
            <p className="text-sm text-muted-foreground">Creating and testing prototypes with focus groups</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border/60">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Market Introduction</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500 text-white">0 Projects</span>
            </div>
            <p className="text-sm text-muted-foreground">Final preparations for retail channel distribution</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InnovationPipeline;
