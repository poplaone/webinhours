
export interface ServiceNode {
    title: string;
    description: string;
}

export interface ServiceCategory {
    id: string;
    title: string;
    services: ServiceNode[];
}

export const premiumServices: ServiceCategory[] = [
    {
        id: "reputation",
        title: "Reputation & Verification",
        services: [
            {
                title: "Reputation Repair Services",
                description: "Online reputation cleanup, removals, deindexing, and protection"
            },
            {
                title: "Google Knowledge Panel",
                description: "Fast and affordable Google profile creation and verification services"
            },
            {
                title: "Facebook & Instagram Verification",
                description: "Account recovery, verification, username claims, and engagement support"
            },
            {
                title: "Twitter / X Services",
                description: "Verified engagement tools and trending amplification support"
            }
        ]
    },
    {
        id: "social-growth",
        title: "Social Growth & Claims",
        services: [
            {
                title: "TikTok Services",
                description: "Username claims, swaps, and automated publishing solutions"
            },
            {
                title: "YouTube Services",
                description: "Content removals and custom engagement solutions for YouTube channels"
            },
            {
                title: "Reddit Services",
                description: "Organic marketing, post removals, reporting, and traffic boosting"
            },
            {
                title: "Social Accounts & Pages",
                description: "High-reach and verified social accounts available for acquisition"
            }
        ]
    },
    {
        id: "premium-assets",
        title: "Premium Assets",
        services: [
            {
                title: "Rare Handles",
                description: "Premium Instagram usernames and rare digital identity assets"
            },
            {
                title: "Rare Emails",
                description: "Unique email assets for branding and marketing"
            },
            {
                title: "Premium Domains",
                description: "High-value domains, websites, and brandable digital properties"
            },
            {
                title: "Messaging Assets",
                description: "High-value email resources and WhatsApp verification services"
            }
        ]
    },
    {
        id: "business-pr",
        title: "Business & PR",
        services: [
            {
                title: "PR Services",
                description: "High-authority media features, contributor access, and guaranteed placements"
            },
            {
                title: "Established Databases",
                description: "Lead generation systems, datasets, and active community extractions"
            },
            {
                title: "Connected Networking",
                description: "Celebrity networks, corporate access, and exclusive partnership opportunities"
            },
            {
                title: "Influence Deals",
                description: "Shoutouts, influencer promotions, and targeted exposure campaigns"
            }
        ]
    },
    {
        id: "tech-dev",
        title: "Tech & Dev",
        services: [
            {
                title: "Web & SEO Services",
                description: "Full-stack development, website builds, and SEO ranking solutions"
            },
            {
                title: "AI Services",
                description: "AI-driven content systems, SEO tools, and automation setup"
            },
            {
                title: "Unique Services",
                description: "Specialized, high-value services with exclusive features and access"
            },
            {
                title: "Digital Utilities",
                description: "Verification tools, repurposing, invites, AI utilities, and niche support"
            }
        ]
    },
    {
        id: "community",
        title: "Community & Updates",
        services: [
            {
                title: "Starter Assets",
                description: "Aged accounts and ready-to-use digital properties for instant deployment"
            },
            {
                title: "Buyer Requests",
                description: "Active requests from buyers seeking accounts, unbans, and services"
            },
            {
                title: "Currency Exchange",
                description: "Safe-trade guidelines and updates on exchange-related policies"
            },
            {
                title: "Community Warnings",
                description: "Scam alerts, risk prevention, and verified safety warnings"
            }
        ]
    }
];
