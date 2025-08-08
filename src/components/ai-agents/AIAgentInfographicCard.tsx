import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Tag, Star, ExternalLink, Sparkles, Cpu } from 'lucide-react';
import type { AIAgent } from '@/types/aiAgent';

interface AIAgentInfographicCardProps {
  agent: AIAgent;
  onUse?: (agent: AIAgent) => void;
  onView?: (agent: AIAgent) => void;
}

export const AIAgentInfographicCard: React.FC<AIAgentInfographicCardProps> = ({ agent, onUse, onView }) => {
  const handleUse = (e: React.MouseEvent) => { e.stopPropagation(); onUse?.(agent); };
  const handleView = (e: React.MouseEvent) => { e.stopPropagation(); onView?.(agent); };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border border-border/50 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        {/* Decorative infographic background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-primary/25 to-accent/20 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/15 to-accent/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary))/0.25_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <CardContent className="relative p-4 sm:p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="shrink-0 grid place-items-center rounded-xl border border-border/60 bg-gradient-to-br from-primary/15 to-accent/15 p-3 text-primary shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold leading-tight">{agent.title}</h3>
                {agent.is_featured && (
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Featured
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="border-border/60 text-foreground/80">
                  {agent.agent_type}
                </Badge>
                <Badge variant="outline" className="border-border/60 text-foreground/80">
                  {agent.category}
                </Badge>
                {typeof agent.price === 'number' && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 text-primary" /> {agent.price === 0 ? 'Free' : `$${Number(agent.price).toFixed(2)}`}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Preview / Thumbnail */}
          <div className="mt-4 overflow-hidden rounded-lg border border-border/50">
            <div className="aspect-[16/9] relative bg-muted/40">
              {agent.thumbnail_url ? (
                <img
                  src={agent.thumbnail_url}
                  alt={`${agent.title} thumbnail`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-muted-foreground">
                  <Cpu className="h-8 w-8" />
                </div>
              )}
              {/* subtle overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>

          {/* Description & highlights */}
          <div className="mt-3 space-y-3">
            {agent.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{agent.description}</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-md border border-border/50 bg-background/50 px-2.5 py-2 text-xs">
                <Star className="h-4 w-4 text-primary" />
                <span>Usage: {agent.usage_count ?? 0}</span>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border/50 bg-background/50 px-2.5 py-2 text-xs">
                <ExternalLink className="h-4 w-4 text-primary" />
                <a href={agent.preview_url} target="_blank" rel="noreferrer" className="truncate hover:underline">
                  Preview
                </a>
              </div>
            </div>

            {agent.tags && agent.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary" />
                {agent.tags.slice(0, 4).map((tag, i) => (
                  <Badge key={i} variant="outline" className="border-border/50 text-foreground/80">
                    {tag}
                  </Badge>
                ))}
                {agent.tags.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{agent.tags.length - 4}</span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {agent.status && (
                <span className="capitalize">{agent.status}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={handleView}>View</Button>
              <Button size="sm" onClick={handleUse}>Use</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAgentInfographicCard;
