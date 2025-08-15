import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Tag, Star, ExternalLink, Sparkles, Cpu, ShoppingBag, Briefcase, PenTool, Newspaper, Rocket, Brain, MessageSquare, BarChart3, Shield, Globe, Code, Wand2 } from 'lucide-react';
import type { AIAgent } from '@/types/aiAgent';

interface AIAgentInfographicCardProps {
  agent: AIAgent;
  onUse?: (agent: AIAgent) => void;
  onView?: (agent: AIAgent) => void;
}

export const AIAgentInfographicCard: React.FC<AIAgentInfographicCardProps> = ({ agent, onUse, onView }) => {
  const handleUse = (e: React.MouseEvent) => { e.stopPropagation(); onUse?.(agent); };
  const handleView = (e: React.MouseEvent) => { e.stopPropagation(); onView?.(agent); };

  // Pick an icon based on agent category/title/tags
  const pickIcon = (): React.ElementType => {
    const t = `${agent.title} ${agent.category} ${agent.agent_type} ${(agent.tags||[]).join(' ')}`.toLowerCase();
    if (/(e-?comm|shop|store|retail|cart)/.test(t)) return ShoppingBag;
    if (/(portfolio|design|creative|brand|logo|ui)/.test(t)) return PenTool;
    if (/(business|company|agency|sales|crm)/.test(t)) return Briefcase;
    if (/(blog|news|content|article|copy)/.test(t)) return Newspaper;
    if (/(launch|landing|saas|startup|growth|acquisition)/.test(t)) return Rocket;
    if (/(ai|assistant|brain|ml|analysis|predict)/.test(t)) return Brain;
    if (/(chat|support|inbox|message)/.test(t)) return MessageSquare;
    if (/(analytics|report|chart|kpi|metric)/.test(t)) return BarChart3;
    if (/(security|guard|shield|auth)/.test(t)) return Shield;
    if (/(global|seo|traffic|international)/.test(t)) return Globe;
    if (/(dev|code|developer|github|automation)/.test(t)) return Code;
    if (/(magic|auto|wizard|optimize|enhance)/.test(t)) return Wand2;
    return Bot;
  };
  const Icon = pickIcon();

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border border-border/50 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        {/* Decorative infographic background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-primary/25 to-accent/20 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/15 to-accent/10 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary))/0.25_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Glass shine */}
          <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to-bottom,white,transparent_60%)]">
            <div className="absolute -top-24 left-1/4 right-1/4 h-32 rotate-12 bg-white/10 blur-md rounded-full" />
          </div>
        </div>

        <CardContent className="relative p-3 sm:p-3 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-2.5">
            <div className="shrink-0 grid place-items-center rounded-lg border border-border/60 bg-gradient-to-br from-primary/15 to-accent/15 p-2.5 text-primary shadow-sm">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold leading-tight">{agent.title}</h3>
                {agent.is_featured && (
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Featured
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                <Badge variant="outline" className="h-5 px-1.5 border-border/60 text-foreground/80">
                  {agent.agent_type}
                </Badge>
                <Badge variant="outline" className="h-5 px-1.5 border-border/60 text-foreground/80">
                  {agent.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description (subheading) */}
          {agent.description && (
            <p className="mt-2 line-clamp-2 text-[12px] text-muted-foreground">
              {agent.description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIAgentInfographicCard;
