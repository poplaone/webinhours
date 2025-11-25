import { Activity, ArrowRight, Files, Flower, GalleryVerticalEnd, MapPin, Search, Megaphone } from 'lucide-react'
import DottedMap from 'dotted-map'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card } from '@/components/ui/card'
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

export default function CombinedFeaturedSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">

        {/* 1. SEO MAP - Top Left */}
        <div className="relative rounded-none overflow-hidden bg-muted border border-border p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            SEO Analytics
          </div>
          <h3 className="text-xl font-normal text-foreground">
            Get found on Google with professional SEO setup.{" "}
            <span className="text-muted-foreground">Track rankings across regions.</span>
          </h3>

          <div className="relative mt-8">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-background border border-border text-foreground rounded-md text-xs font-medium shadow-lg flex items-center gap-2">
              🌍 Ranking #1 in Local Search
            </div>
            <Map />
          </div>
        </div>

        {/* 2. SEO FEATURES - Top Right */}
        <div className="flex flex-col justify-between gap-4 p-6 rounded-none border border-border bg-card">
          <div>
            <span className="text-xs flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" /> SEO Optimization
            </span>
            <h3 className="text-xl font-normal text-foreground">
              Professional SEO setup with keyword optimization.{" "}
              <span className="text-muted-foreground">and local business listing management.</span>
            </h3>
          </div>
          <div className="flex justify-center items-center w-full">
            <SEOFeaturesCard />
          </div>
        </div>

        {/* 3. PR CHART - Bottom Left */}
        <div className="rounded-none border border-border bg-muted p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Activity className="w-4 h-4" />
            Performance Tracking
          </div>
          <h3 className="text-xl font-normal text-foreground">
            Real-time performance and analytics tracking.{" "}
            <span className="text-muted-foreground">Monitor your growth instantly.</span>
          </h3>
          <MonitoringChart />
        </div>

        {/* 4. PR FEATURE CARDS - Bottom Right */}
        <div className="grid sm:grid-cols-2 rounded-none bg-card">
          <FeatureCard
            icon={<Megaphone className="w-4 h-4" />}
            title="PR & Media"
            subtitle="Premium Services"
            description="Press releases, media outreach, and brand reputation management."
          />
          <FeatureCard
            icon={<Flower className="w-4 h-4" />}
            title="Website Care"
            subtitle="Monthly Maintenance"
            description="Priority support, security monitoring, and performance optimization."
          />
        </div>
      </div>
    </section>
  )
}

// ----------------- Feature Card Component -------------------
function FeatureCard({ icon, title, subtitle, description }: { icon: React.ReactNode, title: string, subtitle: string, description: string }) {
  return (
    <div className="relative flex flex-col gap-3 p-6 border border-border bg-background transition">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs flex items-center gap-2 text-sm text-muted-foreground mb-4">
            {icon}
            {title}
          </span>
          <h3 className="text-lg font-normal text-foreground">
            {subtitle}{" "}
            <span className="text-muted-foreground">{description}</span>
          </h3>
        </div>
      </div>

      {/* Card pinned to bottom right */}
      <Card className="absolute bottom-0 right-0 w-24 h-20 sm:w-32 sm:h-28 md:w-40 md:h-32 border-8 border-r-0 border-b-0 rounded-tl-xl rounded-br-none rounded-tr-none rounded-bl-none overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10" />

      {/* Arrow icon on top of Card */}
      <div className="absolute bottom-2 right-2 p-3 flex items-center gap-2 border border-border rounded-full hover:-rotate-45 transition z-10 bg-background">
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </div>
  )
}

// ----------------- Map -------------------
const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

const Map = () => (
  <svg viewBox="0 0 120 60" className="w-full h-auto text-primary/70">
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
    ))}
  </svg>
)

// ----------------- Chart -------------------
const chartData = [
  { month: 'May', desktop: 56, mobile: 224 },
  { month: 'June', desktop: 90, mobile: 300 },
  { month: 'July', desktop: 126, mobile: 252 },
  { month: 'Aug', desktop: 205, mobile: 410 },
  { month: 'Sep', desktop: 200, mobile: 126 },
  { month: 'Oct', desktop: 400, mobile: 800 },
]

const chartConfig = {
  desktop: {
    label: 'Website Traffic',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile Users',
    color: 'hsl(var(--primary) / 0.6)',
  },
} satisfies ChartConfig

function MonitoringChart() {
  return (
    <ChartContainer className="h-60 aspect-auto" config={chartConfig}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis hide />
        <YAxis hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area strokeWidth={2} dataKey="mobile" type="monotone" fill="url(#fillMobile)" stroke="var(--color-mobile)" />
        <Area strokeWidth={2} dataKey="desktop" type="monotone" fill="url(#fillDesktop)" stroke="var(--color-desktop)" />
      </AreaChart>
    </ChartContainer>
  )
}

interface SEOFeature {
  title: string;
  time: string;
  content: string;
  color: string;
}

const seoFeatures: SEOFeature[] = [
  {
    title: "Google Rankings",
    time: "Active",
    content: "Track your position on Google search results in real-time.",
    color: "from-pink-400 to-indigo-500",
  },
  {
    title: "Local Listings",
    time: "Optimized",
    content: "Manage your business presence across Google My Business.",
    color: "from-orange-500 to-pink-500",
  },
  {
    title: "Keyword Research",
    time: "Ongoing",
    content: "Target the right keywords to attract your ideal customers.",
    color: "from-yellow-400 to-red-400",
  },
  {
    title: "Analytics Setup",
    time: "Integrated",
    content: "Track visitor behavior and conversion metrics effortlessly.",
    color: "from-sky-400 to-blue-700",
  },
  {
    title: "Press Releases",
    time: "Monthly",
    content: "Professional PR writing and distribution to major outlets.",
    color: "from-orange-300 to-fuchsia-500",
  },
  {
    title: "Brand Monitoring",
    time: "24/7",
    content: "Continuous reputation management and security monitoring.",
    color: "from-green-400 to-blue-500",
  },
];

const SEOFeaturesCard = () => {
  return (
    <div className="w-full max-w-sm h-[280px] bg-background p-2 overflow-hidden font-sans relative">
      {/* Fade shadow overlay */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      <div className="space-y-2 relative z-0">
        {seoFeatures.map((feature, i) => (
          <div
            key={i}
            className="flex gap-3 items-start p-3 border border-border rounded-lg transform transition duration-300 ease-in-out cursor-pointer animate-scaleUp"
            style={{
              animationDelay: `${i * 300}ms`,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <div
              className={`w-8 h-8 min-w-[2rem] min-h-[2rem] rounded-lg bg-gradient-to-br ${feature.color}`}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                {feature.title}
                <span className="text-xs text-muted-foreground before:content-['•'] before:mr-1">
                  {feature.time}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {feature.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
