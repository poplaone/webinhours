import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Globe,
    Palette,
    FileCode,
    Zap,
    Search,
    Smartphone,
    DollarSign,
    Lock,
    ChevronRight
} from 'lucide-react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface MobileServicesDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MobileServicesDrawer({ isOpen, onOpenChange }: MobileServicesDrawerProps) {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
        onOpenChange(false);
    };

    const serviceItems = [
        {
            title: 'Free Website Templates',
            href: '/marketplace',
            icon: Globe,
            description: 'Browse 100+ professional templates'
        },
        {
            title: 'Custom Design',
            href: '/contact?service=custom-website',
            icon: Palette,
            description: 'Tailored design matching your brand'
        },
        {
            title: 'Content Creation',
            href: '/contact?service=content-creation',
            icon: FileCode,
            description: 'Professional copywriting & media'
        },
        {
            title: 'SEO & GEO Optimization',
            href: '/contact?service=seo-geo',
            icon: Search,
            description: 'Rank higher in search & AI results'
        },
        {
            title: 'E-commerce Solutions',
            href: '/contact?service=ecommerce',
            icon: Zap,
            description: 'Online store setup & management'
        },
        {
            title: 'Social Media Management',
            href: '/contact?service=social-media',
            icon: Smartphone,
            description: 'Grow your online presence'
        },
    ];

    const featuredServices = [
        { title: 'Get Started Free', href: '/contact?service=free-website', icon: FileCode },
        { title: 'Browse Marketplace', href: '/marketplace', icon: Globe },
        { title: 'Get a Quote', href: '/calculator', icon: DollarSign },
    ];

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[85vh]">
                <DrawerHeader className="text-left border-b pb-4">
                    <DrawerTitle>Our Services</DrawerTitle>
                    <DrawerDescription>
                        Everything you need to build and grow your online presence.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 overflow-y-auto">
                    {/* Main Services Grid */}
                    <div className="grid grid-cols-1 gap-2 mb-6">
                        {serviceItems.map((item) => (
                            <button
                                key={item.title}
                                onClick={() => handleNavigation(item.href)}
                                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left group"
                            >
                                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm text-foreground">{item.title}</div>
                                    <div className="text-xs text-muted-foreground">{item.description}</div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                            </button>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider text-[10px]">Quick Actions</h4>
                        <div className="flex flex-col gap-2">
                            {featuredServices.map((item) => (
                                <button
                                    key={item.title}
                                    onClick={() => handleNavigation(item.href)}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors text-left"
                                >
                                    <div className="bg-muted p-1.5 rounded-md">
                                        <item.icon className="h-4 w-4 text-foreground/70" />
                                    </div>
                                    <span className="text-sm font-medium">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 24-Hour Delivery Banner */}
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Lock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-foreground">24-Hour Delivery</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Get your website live in 24 hours with SSL & GDPR compliance included.
                        </p>
                    </div>
                </div>

                <DrawerFooter className="pt-2 border-t">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
