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

  const glassEffect = 'bg-transparent border border-white/20 dark:border-white/10 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300';

  return (
    <Card
      className={`${glassEffect} overflow-hidden flex flex-col group relative h-full cursor-pointer rounded-2xl hover:scale-[1.02] transition-all duration-300`}
      onClick={handleView}
    >
      {/* Image/Icon Section - matching website cards */}
      <div className="aspect-[16/10] w-full overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {agent.thumbnail_url ? (
          <img
            src={agent.thumbnail_url}
            alt={agent.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center relative">
            {/* Decorative background patterns */}
            <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary))/0.25_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 grid place-items-center rounded-2xl border border-border/60 bg-gradient-to-br from-primary/15 to-accent/15 p-6 text-primary shadow-sm">
              <Icon className="h-16 w-16" />
            </div>
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <span className="bg-white/80 dark:bg-[#181825]/80 text-xs font-semibold px-2 py-0.5 rounded-full shadow border border-border/30 capitalize w-fit mb-1">
            {agent.category}
          </span>
          {agent.is_featured && (
            <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs xl:text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
              <Star className="w-4 h-4 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section - matching website cards */}
      <CardContent className="p-5 xl:p-6 flex flex-col flex-grow bg-transparent min-h-[110px] relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-base xl:text-lg text-foreground group-hover:text-purple-200 transition-colors line-clamp-2 pr-2">
            {agent.title}
          </h3>
          <div className="flex items-center gap-1 text-foreground/90 font-bold text-sm xl:text-base bg-background/10 backdrop-blur-sm border border-border/20 px-3 py-1.5 rounded-full hover:bg-background/20 transition-colors duration-200">
            <Bot className="h-3.5 w-3.5" />
            <span>{Number(agent.price) === 0 ? 'Free' : `$${agent.price}`}</span>
          </div>
        </div>

        {agent.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {agent.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          <Badge className="text-[10px] px-2 py-0.5 rounded-full bg-background/10 text-foreground/80 hover:bg-background/20 transition-colors border border-border/10 backdrop-blur-sm">
            {agent.agent_type}
          </Badge>
          {agent.tags && agent.tags.slice(0, 2).map((tag: string) => (
            <Badge 
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-background/10 text-foreground/80 hover:bg-background/20 transition-colors border border-border/10 backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentInfographicCard;
