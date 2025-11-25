import { ArrowRight, Flower, MapPin, Search, Megaphone } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Card } from '@/components/ui/card'

export default function CombinedFeaturedSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-0">

        {/* LEFT COLUMN - SEO CONTENT */}
        <div className="grid grid-rows-2 gap-0">
          {/* SEO MAP - Top */}
          <div className="relative rounded-none overflow-hidden bg-muted border border-border p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              SEO Analytics
            </div>
            <h3 className="text-base md:text-xl font-normal text-foreground">
              Get found on Google with professional SEO setup.{" "}
              <span className="text-muted-foreground">Track rankings across regions.</span>
            </h3>

            <div className="relative mt-6 md:mt-8">
              <div className="absolute top-8 md:top-16 left-1/2 -translate-x-1/2 z-10 px-2 md:px-3 py-1 bg-background border border-border text-foreground rounded-md text-[10px] md:text-xs font-medium shadow-lg flex items-center gap-1 md:gap-2">
                🌍 Ranking #1 in Local Search
              </div>
              <Map />
            </div>
          </div>

          {/* GOOGLE RANKINGS ANIMATION - Bottom */}
          <div className="rounded-none border border-border bg-muted p-4 md:p-6 space-y-3 md:space-y-4 min-h-[300px] md:min-h-[400px]">
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              <Search className="w-3 h-3 md:w-4 md:h-4" />
              Google Rankings
            </div>
            <h3 className="text-base md:text-xl font-normal text-foreground">
              Watch your keywords climb to the top.{" "}
              <span className="text-muted-foreground">Real-time ranking updates.</span>
            </h3>
            <GoogleRankingsAnimation />
          </div>
        </div>

        {/* RIGHT COLUMN - PR & SERVICES CONTENT */}
        <div className="grid grid-rows-2 gap-0">
          {/* SEO FEATURES LIST - Top */}
          <div className="flex flex-col justify-between gap-3 md:gap-4 p-4 md:p-6 rounded-none border border-border bg-card min-h-[300px] md:min-h-[400px]">
            <div>
              <span className="text-xs flex items-center gap-2 text-muted-foreground mb-2 md:mb-0">
                <Search className="w-3 h-3 md:w-4 md:h-4" /> SEO Optimization
              </span>
              <h3 className="text-base md:text-xl font-normal text-foreground">
                Professional SEO setup with keyword optimization.{" "}
                <span className="text-muted-foreground">and local business listing management.</span>
              </h3>
            </div>
            <div className="flex justify-center items-center w-full">
              <SEOFeaturesCard />
            </div>
          </div>

          {/* PR FEATURE CARDS - Bottom */}
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
      </div>
    </section>
  )
}

// ----------------- Feature Card Component -------------------
function FeatureCard({ icon, title, subtitle, description }: { icon: React.ReactNode, title: string, subtitle: string, description: string }) {
  return (
    <div className="relative flex flex-col gap-2 md:gap-3 p-4 md:p-6 border border-border bg-background transition min-h-[200px] md:min-h-[250px]">
      <div className="flex items-center gap-3 md:gap-4">
        <div>
          <span className="text-xs flex items-center gap-2 text-muted-foreground mb-2 md:mb-4">
            {icon}
            {title}
          </span>
          <h3 className="text-sm md:text-lg font-normal text-foreground">
            {subtitle}{" "}
            <span className="text-muted-foreground">{description}</span>
          </h3>
        </div>
      </div>

      {/* Card pinned to bottom right */}
      <Card className="absolute bottom-0 right-0 w-16 h-14 sm:w-24 sm:h-20 md:w-32 md:h-28 lg:w-40 lg:h-32 border-4 md:border-8 border-r-0 border-b-0 rounded-tl-lg md:rounded-tl-xl rounded-br-none rounded-tr-none rounded-bl-none overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10" />

      {/* Arrow icon on top of Card */}
      <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 md:p-3 flex items-center gap-2 border border-border rounded-full hover:-rotate-45 transition z-10 bg-background">
        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
      </div>
    </div>
  )
}

// ----------------- Map -------------------
const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

const Map = () => (
  <svg viewBox="0 0 120 60" className="w-full h-auto text-primary">
    {points.map((point, i) => (
      <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" opacity="0.7" />
    ))}
  </svg>
)

// ----------------- Google Rankings Animation -------------------
const rankingsData = [
  { keyword: "web design services", position: 1, trend: "up", color: "from-green-400 to-emerald-500" },
  { keyword: "professional websites", position: 2, trend: "up", color: "from-blue-400 to-cyan-500" },
  { keyword: "custom web development", position: 3, trend: "stable", color: "from-purple-400 to-indigo-500" },
  { keyword: "business website design", position: 5, trend: "up", color: "from-orange-400 to-amber-500" },
  { keyword: "responsive web design", position: 7, trend: "down", color: "from-pink-400 to-rose-500" },
];

function GoogleRankingsAnimation() {
  return (
    <div className="space-y-2 md:space-y-3">
      {rankingsData.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-card border border-border rounded-md md:rounded-lg animate-fade-in"
          style={{
            animationDelay: `${i * 150}ms`,
            animationFillMode: "forwards",
            opacity: 0,
          }}
        >
          {/* Position Badge */}
          <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
            <span className="text-xs md:text-sm font-bold text-white">#{item.position}</span>
          </div>

          {/* Keyword */}
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-foreground truncate">{item.keyword}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Google Search</p>
          </div>

          {/* Trend Indicator */}
          <div className="flex-shrink-0">
            {item.trend === "up" && (
              <div className="flex items-center gap-1 text-green-500">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 -rotate-45" />
                <span className="text-[10px] md:text-xs font-semibold">↑</span>
              </div>
            )}
            {item.trend === "down" && (
              <div className="flex items-center gap-1 text-red-500">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 rotate-45" />
                <span className="text-[10px] md:text-xs font-semibold">↓</span>
              </div>
            )}
            {item.trend === "stable" && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-semibold">→</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
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
    <div className="w-full max-w-sm h-[220px] md:h-[280px] bg-transparent p-1 md:p-2 overflow-hidden font-sans relative">
      {/* Fade shadow overlay */}
      <div className="absolute inset-x-0 bottom-0 h-8 md:h-12 bg-gradient-to-t from-card to-transparent z-10"></div>
      
      <div className="space-y-1.5 md:space-y-2 relative z-0">
        {seoFeatures.map((feature, i) => (
          <div
            key={i}
            className="flex gap-2 md:gap-3 items-start p-2 md:p-3 border border-border rounded-md md:rounded-lg transform transition duration-300 ease-in-out cursor-pointer animate-scaleUp bg-card/50"
            style={{
              animationDelay: `${i * 300}ms`,
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <div
              className={`w-6 h-6 md:w-8 md:h-8 min-w-[1.5rem] md:min-w-[2rem] min-h-[1.5rem] md:min-h-[2rem] rounded-md md:rounded-lg bg-gradient-to-br ${feature.color}`}
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-semibold text-foreground">
                <span className="truncate">{feature.title}</span>
                <span className="text-[9px] md:text-xs text-muted-foreground before:content-['•'] before:mr-1 flex-shrink-0">
                  {feature.time}
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {feature.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
