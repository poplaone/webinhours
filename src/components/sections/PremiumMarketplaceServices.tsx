import React, { useState } from 'react';
import {
    ShieldCheck, Globe, ThumbsUp, Play, Twitter, Video, MessageCircle, Megaphone,
    Star, Zap, Users, Mail, AtSign, Database, Code2, Gem, Link, Rocket,
    TrendingUp, MessageSquare, DollarSign, AlertTriangle, Info, CheckCircle2, Search,
    ArrowRight,
    Fingerprint,
    Lock,
    Server,
    Activity,
    UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// --- ICONS MAPPING FOR WORKFLOWS ---
// Helper to get diverse icons for steps
const StepIcons = {
    Analysis: Search,
    Strategy: TrendingUp,
    Action: Zap,
    Protection: ShieldCheck,
    Verification: CheckCircle2,
    Identity: Fingerprint,
    Security: Lock,
    Network: Server,
    Monitoring: Activity,
    Review: UserCheck
};

// --- DATA: SERVICE CATEGORIES ---
const MARKETPLACE_CATEGORIES = [
    {
        id: "reputation",
        label: "Reputation & Verification",
        services: [
            { title: "Reputation Repair Services", desc: "Online reputation cleanup, removals, deindexing, and protection", icon: ShieldCheck },
            { title: "Google Knowledge Panel", desc: "Fast and affordable Google profile creation and verification services", icon: Search },
            { title: "Facebook & Instagram", desc: "Account recovery, verification, username claims, and engagement support", icon: ThumbsUp },
            { title: "Twitter / X Services", desc: "Verified engagement tools and trending amplification support", icon: Twitter },
        ]
    },
    {
        id: "social-growth",
        label: "Social Growth & Claims",
        services: [
            { title: "TikTok Services", desc: "Username claims, swaps, and automated publishing solutions", icon: Video },
            { title: "YouTube Services", desc: "Content removals and custom engagement solutions for YouTube channels", icon: Play },
            { title: "Reddit Services", desc: "Organic marketing, post removals, reporting, and traffic boosting", icon: MessageCircle },
            { title: "Social Accounts & Pages", desc: "High-reach and verified social accounts available for acquisition", icon: Users },
        ]
    },
    {
        id: "digital-assets",
        label: "Premium Assets",
        services: [
            { title: "Rare Handles", desc: "Premium Instagram usernames and rare digital identity assets", icon: AtSign },
            { title: "Rare Emails", desc: "Unique email assets for branding and marketing", icon: Mail },
            { title: "Premium Domains", desc: "High-value domains, websites, and brandable digital properties", icon: Globe },
            { title: "Messaging Assets", desc: "High-value email resources and WhatsApp verification services", icon: MessageSquare },
        ]
    },
    {
        id: "business",
        label: "Business & PR",
        services: [
            { title: "PR Services", desc: "High-authority media features, contributor access, and guaranteed placements", icon: Megaphone },
            { title: "Established Databases", desc: "Lead generation systems, datasets, and active community extractions", icon: Database },
            { title: "Connected Networking", desc: "Celebrity networks, corporate access, and exclusive partnership opportunities", icon: Link },
            { title: "Influence Deals", desc: "Shoutouts, influencer promotions, and targeted exposure campaigns", icon: Star },
        ]
    },
    {
        id: "tech",
        label: "Tech & Dev",
        services: [
            { title: "Web & SEO Services", desc: "Full-stack development, website builds, and SEO ranking solutions", icon: Code2 },
            { title: "AI Services", desc: "AI-driven content systems, SEO tools, and automation setup", icon: Zap },
            { title: "Unique Services", desc: "Specialized, high-value services with exclusive features and access", icon: Gem },
            { title: "Digital Utilities", desc: "Verification tools, repurposing, invites, AI utilities, and niche support", icon: SettingsIcon },
        ]
    },
    {
        id: "community",
        label: "Community & Updates",
        services: [
            { title: "Starter Assets", desc: "Aged accounts and ready-to-use digital properties for instant deployment", icon: Rocket },
            { title: "Buyer Requests", desc: "Active requests from buyers seeking accounts, unbans, and services", icon: TrendingUp },
            { title: "Currency Exchange", desc: "Safe-trade guidelines and updates on exchange-related policies", icon: DollarSign },
            { title: "Community Warnings", desc: "Scam alerts, risk prevention, and verified safety warnings", icon: AlertTriangle },
        ]
    }
];

// --- DATA: WORKFLOW TYPES ---
type WorkflowStep = {
    title: string;
    desc: string;
    icon: React.ElementType;
};

// --- DATA: WORKFLOWS MAPPING ---
// Map Service Title to Workflow Steps
const SERVICE_WORKFLOWS: Record<string, WorkflowStep[]> = {
    "Reputation Repair Services": [
        { title: "Audit", desc: "Deep scan of SERPs and negatives.", icon: StepIcons.Analysis },
        { title: "Strategy", desc: "Legal takedown or suppression plan.", icon: StepIcons.Strategy },
        { title: "Execution", desc: "Content removal & deindexing.", icon: StepIcons.Action },
        { title: "Protection", desc: "Monitoring against recurrence.", icon: StepIcons.Protection },
    ],
    "Google Knowledge Panel": [
        { title: "Entity Analysis", desc: "Assess digital footprint eligibility.", icon: StepIcons.Analysis },
        { title: "Asset Creation", desc: "Wikidata & press structuring.", icon: StepIcons.Network },
        { title: "Claiming", desc: "Official G-Portal verification.", icon: StepIcons.Verification },
        { title: "Locking", desc: "Prevent unauthorized edits.", icon: StepIcons.Security },
    ],
    "Facebook & Instagram": [
        { title: "Case Review", desc: "Analyze ban reason or claim viability.", icon: StepIcons.Analysis },
        { title: "Internal Portal", desc: "Submit via direct media partner support.", icon: StepIcons.Network },
        { title: "Escalation", desc: "High-priority manual review.", icon: StepIcons.Action },
        { title: "Recovery", desc: "Secure account handover.", icon: StepIcons.Identity },
    ],
    "Twitter / X Services": [
        { title: "Verification", desc: "Gold/Grey badge processing.", icon: StepIcons.Verification },
        { title: "Engagement", desc: "Trend amplification networking.", icon: StepIcons.Strategy },
        { title: "Portal Access", desc: "Direct specialized support tickets.", icon: StepIcons.Network },
    ],
    "TikTok Services": [
        { title: "Handle Check", desc: "Availability & trademark scan.", icon: StepIcons.Analysis },
        { title: "Claim Request", desc: "Submit claim via agency portal.", icon: StepIcons.Network },
        { title: "Swap/Transfer", desc: "Secure handle migration.", icon: StepIcons.Action },
        { title: "Verification", desc: "Official badge application.", icon: StepIcons.Verification },
    ],
    "YouTube Services": [
        { title: "Content Scan", desc: "Identify infringing videos.", icon: StepIcons.Analysis },
        { title: "Takedown", desc: "Legal/Copyright strike processing.", icon: StepIcons.Protection },
        { title: "Channel Recovery", desc: "Restoration of terminated channels.", icon: StepIcons.Action },
    ],
    "Reddit Services": [
        { title: "Trend Analysis", desc: "Identify high-traffic subreddits.", icon: StepIcons.Analysis },
        { title: "Organic Seeding", desc: "Natural conversation starter.", icon: StepIcons.Network },
        { title: "Traffic Boost", desc: "High-karma account engagement.", icon: StepIcons.Strategy },
    ],
    "Social Accounts & Pages": [
        { title: "Inventory", desc: "Browse verified/aged assets.", icon: StepIcons.Analysis },
        { title: "Vet & Audit", desc: "Check follower quality & history.", icon: StepIcons.Review },
        { title: "Transfer", desc: "Escrow-secured ownership swap.", icon: StepIcons.Security },
    ],
    "Rare Handles": [
        { title: "Sourcing", desc: "Locate owner of desired handle.", icon: StepIcons.Analysis },
        { title: "Negotiation", desc: "Broker deal or claim status.", icon: StepIcons.Strategy },
        { title: "Transfer", desc: "Secure OGE/Swap execution.", icon: StepIcons.Action },
    ],
    "Rare Emails": [
        { title: "Availability", desc: "Check global naming databases.", icon: StepIcons.Analysis },
        { title: "Acquisition", desc: "Secure legacy account access.", icon: StepIcons.Security },
        { title: "Handover", desc: "Credentials & 2FA transfer.", icon: StepIcons.Identity },
    ],
    "Premium Domains": [
        { title: "Valuation", desc: "Assess SEO & Brand value.", icon: StepIcons.Analysis },
        { title: "Brokerage", desc: "Private negotiation with holder.", icon: StepIcons.Strategy },
        { title: "Escrow", desc: "Secure funds & auth code swap.", icon: StepIcons.Security },
    ],
    "PR Services": [
        { title: "Drafting", desc: "Professional press release writing.", icon: StepIcons.Action },
        { title: "Pitching", desc: "Outreach to Tier-1 journalists.", icon: StepIcons.Network },
        { title: "Placement", desc: "Publication on Forbes, Bloomberg, etc.", icon: StepIcons.Verification },
        { title: "Indexing", desc: "Google News confirmation.", icon: StepIcons.Identity },
    ],
    "Web & SEO Services": [
        { title: "Audit", desc: "Technical & Content SEO gap analysis.", icon: StepIcons.Analysis },
        { title: "Optimization", desc: "On-page & Core Web Vitals fix.", icon: StepIcons.Action },
        { title: "Authority", desc: "High-DA backlink campaign.", icon: StepIcons.Network },
        { title: "Ranking", desc: "Keyword position tracking.", icon: StepIcons.Strategy },
    ],
    // DEFAULT GENERIC WORKFLOW FOR OTHERS
    "default": [
        { title: "Consultation", desc: "Assess requirements & scope.", icon: StepIcons.Analysis },
        { title: "Strategy", desc: "Custom roadmap development.", icon: StepIcons.Strategy },
        { title: "Execution", desc: "Professional service delivery.", icon: StepIcons.Action },
        { title: "Delivery", desc: "Asset handover & verification.", icon: StepIcons.Verification },
    ]
};

function SettingsIcon(props: any) { return <Globe {...props} />; }

// Background Network Graphic
const NetworkBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03]">
            <path d="M100 100 L300 300 M500 200 L700 400" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <path d="M150 500 L350 700 M800 100 L600 300" stroke="currentColor" strokeWidth="1" className="text-primary" />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/5 to-transparent" />
    </div>
);

export function PremiumMarketplaceServices() {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedService, setSelectedService] = useState<{ title: string, desc: string } | null>(null);

    const filteredCategories = activeTab === "all"
        ? MARKETPLACE_CATEGORIES
        : MARKETPLACE_CATEGORIES.filter(c => c.id === activeTab);

    const getWorkflow = (title: string) => {
        return SERVICE_WORKFLOWS[title] || SERVICE_WORKFLOWS["default"];
    };

    return (
        <section id="premium-services" className="py-24 px-4 relative overflow-hidden">
            <NetworkBackground />

            <div className="container mx-auto max-w-[1400px] relative z-10">
                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live Network
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">
                        Premium Digital Solutions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Access our vetted ecosystem of enterprise-grade services. <br className="hidden md:block" />
                        From reputation defense to exclusive digital asset acquisition.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <Button
                        variant="ghost"
                        onClick={() => setActiveTab("all")}
                        className={cn(
                            "rounded-none border-b-2 hover:bg-transparent transition-all h-10 px-6",
                            activeTab === "all"
                                ? "border-primary text-primary font-bold"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        ALL NODES
                    </Button>
                    {MARKETPLACE_CATEGORIES.slice(0, 4).map(cat => (
                        <Button
                            key={cat.id}
                            variant="ghost"
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "rounded-none border-b-2 hover:bg-transparent transition-all h-10 px-6 uppercase tracking-tight text-xs md:text-sm",
                                activeTab === cat.id
                                    ? "border-primary text-primary font-bold"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 gap-16">
                    {filteredCategories.map((category) => {
                        const CategoryIcon = category.services[0].icon;

                        return (
                            <div key={category.id} className="relative">
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
                                    <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground uppercase tracking-widest border border-border/50 px-4 py-1 rounded bg-background/50 backdrop-blur">
                                        <CategoryIcon className="w-4 h-4 text-primary" />
                                        {category.label}
                                    </div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.services.map((service, idx) => {
                                        const ServiceIcon = service.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                                onClick={() => setSelectedService(service)}
                                                className="group relative flex flex-col p-6 h-full bg-card/40 hover:bg-card/60 border border-border/60 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 overflow-hidden rounded-sm cursor-pointer"
                                            >
                                                {/* Tech Borders */}
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20 group-hover:border-primary transition-colors"></div>
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20 group-hover:border-primary transition-colors"></div>

                                                {/* Icon Node */}
                                                <div className="mb-5 relative">
                                                    <div className="w-10 h-10 flex items-center justify-center rounded bg-background border border-border group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all duration-500">
                                                        <ServiceIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    </div>
                                                    <div className="absolute left-5 top-10 bottom-[-100px] w-px bg-border group-hover:bg-primary/20 transition-colors h-full -z-10 hidden md:block opacity-50"></div>
                                                </div>

                                                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {service.title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {service.desc}
                                                </p>

                                                {/* Link Arrow */}
                                                <div className="mt-auto pt-6 flex items-center justify-end">
                                                    <span className="text-xs font-mono text-primary/0 group-hover:text-primary/100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 flex items-center gap-1">
                                                        ACCESS_NODE <ArrowRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="mt-24 text-center border-t border-border/40 pt-10">
                    <p className="text-sm text-muted-foreground mb-4">
                        Certain high-value assets require verification. <span className="text-primary cursor-pointer hover:underline">Contact Support</span> for clearance.
                    </p>
                    <div className="flex justify-center gap-6 text-xs text-muted-foreground uppercase tracking-widest opacity-60">
                        <span>Secure Transactions</span>
                        <span>•</span>
                        <span>Verified Vendors</span>
                        <span>•</span>
                        <span>Escrow Available</span>
                    </div>
                </div>

                {/* --- WORKFLOW MODAL --- */}
                <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
                    <DialogContent className="w-[95vw] sm:w-full sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-card border-primary/20 p-0 gap-0">
                        {selectedService && (
                            <>
                                {/* HEADER: Tech Monitor Style */}
                                <div className="relative p-4 md:p-6 pb-6 overflow-hidden bg-background/95">
                                    {/* Tech Grid Background */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                                        style={{ backgroundImage: 'linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                                    </div>

                                    <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all">
                                                <Zap className="w-6 h-6 relative z-10" />
                                                <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                                                        SYS_ID: {Math.floor(Math.random() * 9000) + 1000}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[10px] font-mono text-green-500">
                                                        <span className="relative flex h-1.5 w-1.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                                        </span>
                                                        ONLINE
                                                    </span>
                                                </div>
                                                <DialogTitle className="text-2xl font-medium tracking-tight text-foreground">
                                                    {selectedService.title}
                                                </DialogTitle>
                                                <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                                                    {selectedService.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BODY: Workflow Pipeline */}
                                <div className="p-4 md:p-8 bg-muted/10 relative overflow-hidden">
                                    {/* Decorative Side Data */}
                                    <div className="absolute right-4 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block"></div>
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 text-[9px] font-mono text-muted-foreground/40 rotate-90 origin-right">
                                        <span>LATENCY: 12ms</span>
                                        <span>UPTIME: 99.9%</span>
                                        <span>ENCRYPTION: AES-256</span>
                                    </div>

                                    <div className="space-y-6 relative max-w-lg">
                                        {/* Animated Connecting Timeline Line */}
                                        <div className="absolute left-[32px] md:left-[40px] top-4 bottom-4 w-0.5 bg-border/50">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: "100%" }}
                                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                                className="w-full bg-gradient-to-b from-primary via-primary/80 to-transparent origin-top"
                                            />
                                        </div>

                                        {getWorkflow(selectedService.title).map((step, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.15 }}
                                                className="relative z-10 group"
                                            >
                                                <div className="flex items-start gap-4 p-2 md:p-3 rounded-xl hover:bg-card/80 border border-transparent hover:border-primary/20 transition-all duration-300">
                                                    {/* Node Icon */}
                                                    <div className="relative flex-shrink-0">
                                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-background border-2 border-border group-hover:border-primary/50 flex items-center justify-center shadow-lg transition-all z-20 relative group-hover:scale-110 duration-300">
                                                            <step.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                                        </div>
                                                        {/* Pulse Ring */}
                                                        <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/30 scale-100 group-hover:scale-125 transition-all duration-500"></div>
                                                    </div>

                                                    {/* Node Content */}
                                                    <div className="pt-1.5 flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[10px] font-mono text-primary/60 tracking-wider">
                                                                NODE_0{idx + 1}
                                                            </span>
                                                            {idx === 0 && <span className="text-[9px] font-mono bg-primary/10 text-primary px-1 rounded">INIT</span>}
                                                            {idx === getWorkflow(selectedService.title).length - 1 && <span className="text-[9px] font-mono bg-green-500/10 text-green-500 px-1 rounded">FINAL</span>}
                                                        </div>
                                                        <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors leading-relaxed mt-0.5">
                                                            {step.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* FOOTER: Action Bar */}
                                <div className="p-4 bg-background/95 border-t border-border/40 flex items-center justify-between">
                                    <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            SYSTEM_READY
                                        </div>
                                        <div>VER: 2.4.0</div>
                                    </div>
                                    <Button onClick={() => setSelectedService(null)} variant="outline" className="ml-auto hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                                        Terminate Process
                                    </Button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
