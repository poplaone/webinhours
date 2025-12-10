import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Zap, Crown, Globe, Users, Database, Code } from 'lucide-react';
import { premiumServices } from '@/data/premium-services-data';

interface PremiumServicesModalProps {
    children?: React.ReactNode;
}

export const PremiumServicesModal = ({ children }: PremiumServicesModalProps) => {
    const [open, setOpen] = useState(false);

    const getIcon = (id: string) => {
        switch (id) {
            case 'reputation': return <ShieldCheck className="w-4 h-4 mr-2" />;
            case 'social-growth': return <Users className="w-4 h-4 mr-2" />;
            case 'premium-assets': return <Crown className="w-4 h-4 mr-2" />;
            case 'business-pr': return <Globe className="w-4 h-4 mr-2" />;
            case 'tech-dev': return <Code className="w-4 h-4 mr-2" />;
            case 'community': return <Database className="w-4 h-4 mr-2" />;
            default: return <Zap className="w-4 h-4 mr-2" />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button variant="default">Premium Digital Solutions</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <DialogHeader className="p-6 border-b border-white/10">
                        <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            <Crown className="w-6 h-6 text-primary" />
                            Premium Digital Solutions
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-base mt-2">
                            Access our vetted ecosystem of enterprise-grade services. From reputation defense to exclusive digital asset acquisition.
                        </DialogDescription>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-4">
                            <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500" /> Secure Transactions</div>
                            <div className="flex items-center gap-1"><Users className="w-3 h-3 text-blue-500" /> Verified Vendors</div>
                            <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-yellow-500" /> Escrow Available</div>
                        </div>
                    </DialogHeader>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                        <Tabs defaultValue={premiumServices[0].id} orientation="vertical" className="flex-1 flex flex-col md:flex-row h-full">
                            {/* Sidebar / Tabs List */}
                            <div className="w-full md:w-64 border-r border-white/10 bg-muted/20">
                                <ScrollArea className="h-full">
                                    <TabsList className="flex flex-col h-full w-full justify-start p-2 gap-1 bg-transparent">
                                        {premiumServices.map((category) => (
                                            <TabsTrigger
                                                key={category.id}
                                                value={category.id}
                                                className="w-full justify-start px-4 py-3 h-auto text-left font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-l-2 border-primary rounded-none transition-all"
                                            >
                                                {getIcon(category.id)}
                                                {category.title}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </ScrollArea>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 bg-background/50">
                                <ScrollArea className="h-[60vh] md:h-[600px] w-full p-6">
                                    {premiumServices.map((category) => (
                                        <TabsContent key={category.id} value={category.id} className="mt-0 h-full space-y-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                                    {getIcon(category.id)}
                                                    {category.title}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {category.services.map((service, idx) => (
                                                    <div key={idx} className="group relative overflow-hidden rounded-xl border border-white/5 bg-card/40 p-5 hover:border-primary/20 hover:bg-card/60 transition-all duration-300">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors">{service.title}</h4>
                                                                <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary">Premium</Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                                                            <Button size="sm" variant="ghost" className="w-full justify-between hover:bg-primary hover:text-primary-foreground group-arrow">
                                                                Contact Support
                                                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-orange-500 font-medium text-sm">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    verification Required
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Certain high-value assets in the {category.title} category may require additional verification. Please contact support for clearance before proceeding.
                                                </p>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </ScrollArea>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
