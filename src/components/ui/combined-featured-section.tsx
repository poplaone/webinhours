import { ArrowRight, Flower, MapPin, Search, Megaphone, Shield, FileText, Activity, CheckCircle, RefreshCw, Zap, Globe, Building2, Rss, BarChart3, Lock, Wifi, TrendingUp, Star } from 'lucide-react';
import DottedMap from 'dotted-map';
import { Card } from '@/components/ui/card';

export default function CombinedFeaturedSection() {
  return <section className="py-12 md:py-16 lg:py-24 bg-transparent">
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-0">

      {/* LEFT COLUMN - SEO CONTENT */}
      <div className="flex flex-col gap-0">
        {/* SEO MAP - Top */}
        <div className="relative rounded-none overflow-hidden border border-border p-4 md:p-6 min-h-[300px] md:min-h-[400px] bg-transparent">
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

        {/* GOOGLE RANKINGS ANIMATION - Middle */}
        <div className="rounded-none border border-border p-4 md:p-6 space-y-3 md:space-y-4 min-h-[300px] md:min-h-[400px] bg-transparent">
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

        {/* SEO FEATURES LIST - Bottom (Moved from Right) */}
        <div className="relative flex flex-col justify-between gap-3 md:gap-4 p-4 md:p-6 rounded-none border border-border bg-card min-h-[300px] md:min-h-[400px] overflow-hidden group">
          {/* Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <SEOOptimizationBackground />
          </div>

          <div className="relative z-10">
            <span className="text-xs flex items-center gap-2 text-muted-foreground mb-2 md:mb-0">
              <Search className="w-3 h-3 md:w-4 md:h-4" /> SEO Optimization
            </span>
            <h3 className="text-base md:text-xl font-normal text-foreground">
              Professional SEO setup, Generative Engine Optimization (GEO),{" "}
              <span className="text-muted-foreground">and local business listing management.</span>
            </h3>
          </div>
          <div className="relative z-10 flex justify-center items-center w-full">
            <SEOFeaturesCard />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - PR & SERVICES CONTENT */}
      <div className="flex flex-col gap-0 h-full">
        {/* PR FEATURE CARDS - Grid */}
        <div className="grid sm:grid-cols-2 rounded-none bg-card h-full">
          <FeatureCard
            icon={<Megaphone className="w-4 h-4" />}
            title="PR & Media"
            subtitle="Premium Services"
            description="Press releases, media outreach, and brand reputation management."
            customBackground={<PRMediaBackground />}
          />
          <FeatureCard
            icon={<Flower className="w-4 h-4" />}
            title="Website Care"
            subtitle="Monthly Maintenance"
            description="Priority support, regular updates, and performance optimization."
            customBackground={<WebsiteCareBackground />}
          />
          <FeatureCard
            icon={<FileText className="w-4 h-4" />}
            title="Press Releases"
            subtitle="Monthly"
            description="Professional PR writing and distribution to major outlets."
            customBackground={<PressReleasesBackground />}
          />
          <FeatureCard
            icon={<Shield className="w-4 h-4" />}
            title="Brand Monitoring"
            subtitle="24/7"
            description="Continuous reputation management and security monitoring."
            customBackground={<BrandMonitoringBackground />}
          />
        </div>
      </div>
    </div>
  </section>;
}

// ----------------- Feature Card Component -------------------
function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  customBackground
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  customBackground?: React.ReactNode;
}) {
  return <div className="relative flex flex-col gap-2 md:gap-3 p-4 md:p-6 border border-border bg-background transition min-h-[200px] md:min-h-[250px] overflow-hidden group">
    <div className="flex items-center gap-3 md:gap-4 relative z-10">
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

    {/* Custom Background or Default Card */}
    {customBackground ? (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {customBackground}
      </div>
    ) : (
      <Card className="absolute bottom-0 right-0 w-16 h-14 sm:w-24 sm:h-20 md:w-32 md:h-28 lg:w-40 lg:h-32 border-4 md:border-8 border-r-0 border-b-0 rounded-tl-lg md:rounded-tl-xl rounded-br-none rounded-tr-none rounded-bl-none overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10" />
    )}

    {/* Arrow icon on top of Card */}
    <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 md:p-3 flex items-center gap-2 border border-border rounded-full hover:-rotate-45 transition z-10 bg-background">
      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary" />
    </div>
  </div>;
}

// ----------------- SEO Optimization Background -------------------
const SEOOptimizationBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Symmetrical Layout Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 md:pt-8">

        {/* Dual Cards Container - Centered without search bar */}
        <div className="flex gap-4 w-[90%] h-[60%] mt-4">

          {/* Left: Google / Traditional SEO */}
          <div className="flex-1 bg-card border border-border rounded-lg shadow-md p-3 flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Search className="w-2 h-2 text-blue-500" />
              </div>
              <span className="text-[8px] font-semibold text-muted-foreground uppercase">Google Search</span>
            </div>
            {/* Result 1 (Rank #1) */}
            <div className="p-2 rounded bg-blue-500/5 border border-blue-500/10">
              <div className="w-20 h-1.5 bg-blue-500/40 rounded-full mb-1"></div>
              <div className="w-full h-1 bg-muted/20 rounded-full"></div>
            </div>
            {/* Result 2 */}
            <div className="p-2 rounded bg-muted/5 border border-border/30">
              <div className="w-16 h-1.5 bg-muted/40 rounded-full mb-1"></div>
              <div className="w-[80%] h-1 bg-muted/20 rounded-full"></div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-blue-500 text-white text-[8px] font-bold rounded">RANK #1</div>
          </div>

          {/* Right: GEO / AI Search */}
          <div className="flex-1 bg-card border border-border rounded-lg shadow-md p-3 flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-2 h-2 text-purple-500" />
              </div>
              <span className="text-[8px] font-semibold text-muted-foreground uppercase">AI Overview</span>
            </div>
            {/* AI Summary Block */}
            <div className="flex-1 rounded bg-purple-500/5 border border-purple-500/10 p-2 flex flex-col gap-1.5">
              <div className="flex gap-1 items-center">
                <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                <div className="w-full h-1.5 bg-purple-500/30 rounded-full"></div>
              </div>
              <div className="w-[90%] h-1 bg-muted/30 rounded-full"></div>
              <div className="w-[95%] h-1 bg-muted/30 rounded-full"></div>
              <div className="w-[80%] h-1 bg-muted/30 rounded-full"></div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-purple-500 text-white text-[8px] font-bold rounded">GEO OPTIMIZED</div>
          </div>

        </div>

      </div>
    </div>
  );
};

// ----------------- PR Media Background -------------------
const PRMediaBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Documents Stack */}
      <div className="absolute bottom-[-20%] right-[-10%] md:bottom-[-10%] md:right-[-5%] w-[60%] h-[80%] opacity-80 transform rotate-[-12deg] scale-75 md:scale-100 transition-transform duration-700 group-hover:rotate-[-8deg] group-hover:scale-105">

        {/* Back Document */}
        <div className="absolute bottom-4 right-8 w-full h-full bg-background border border-border/60 rounded-lg shadow-sm transform rotate-[-5deg] origin-bottom-right"></div>

        {/* Middle Document */}
        <div className="absolute bottom-2 right-4 w-full h-full bg-background border border-border/80 rounded-lg shadow-md transform rotate-[-2deg] origin-bottom-right flex flex-col p-4 gap-2">
          <div className="w-[40%] h-2 bg-muted/30 rounded-full"></div>
          <div className="w-[80%] h-2 bg-muted/20 rounded-full"></div>
          <div className="w-[70%] h-2 bg-muted/20 rounded-full"></div>
        </div>

        {/* Front Document (Main) */}
        <div className="absolute bottom-0 right-0 w-full h-full bg-card border border-border rounded-lg shadow-xl flex flex-col p-4 gap-3">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-primary/60" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-16 h-2 bg-primary/10 rounded-full"></div>
              <div className="w-10 h-1.5 bg-muted/30 rounded-full"></div>
            </div>
          </div>

          {/* Content Lines */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-muted/20 rounded-full"></div>
            <div className="w-[90%] h-2 bg-muted/20 rounded-full"></div>
            <div className="w-[95%] h-2 bg-muted/20 rounded-full"></div>
            <div className="w-[60%] h-2 bg-muted/20 rounded-full"></div>
          </div>

          {/* "Published" Badge */}
          <div className="mt-auto self-end px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-[8px] font-medium border border-green-500/20">
            PUBLISHED
          </div>
        </div>
      </div>

      {/* Connection Lines / Network Effect */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20%" cy="30%" r="2" className="fill-primary" />
        <circle cx="40%" cy="20%" r="1.5" className="fill-primary" />
        <path d="M 20 30 Q 50 10 80 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>
    </div>
  );
};

// ----------------- Website Care Background -------------------
const WebsiteCareBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Interface Stack */}
      <div className="absolute bottom-[-20%] right-[-10%] md:bottom-[-10%] md:right-[-5%] w-[70%] h-[80%] opacity-90 transform rotate-[-6deg] scale-75 md:scale-100 transition-transform duration-700 group-hover:rotate-[-3deg] group-hover:scale-105">

        {/* Back Panel (Shadow/Depth) */}
        <div className="absolute bottom-4 right-8 w-full h-full bg-background border border-border/60 rounded-xl shadow-sm transform rotate-[-3deg] origin-bottom-right"></div>

        {/* Middle Panel (Context) */}
        <div className="absolute bottom-2 right-4 w-full h-full bg-background border border-border/80 rounded-xl shadow-md transform rotate-[-1deg] origin-bottom-right flex flex-col p-4 gap-3">
          <div className="w-full h-2 bg-muted/20 rounded-full"></div>
          <div className="w-[80%] h-2 bg-muted/20 rounded-full"></div>
        </div>

        {/* Front Panel (Main Interface) */}
        <div className="absolute bottom-0 right-0 w-full h-full bg-card border border-border rounded-xl shadow-xl flex flex-col p-5 gap-4">

          {/* Header: System Status */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">System Healthy</span>
            </div>
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
          </div>

          {/* Metrics / Rows */}
          <div className="space-y-3">
            {/* Security */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-primary/10"><Shield className="w-3 h-3 text-primary" /></div>
                <div className="w-16 h-1.5 bg-muted/30 rounded-full"></div>
              </div>
              <CheckCircle className="w-3 h-3 text-emerald-500" />
            </div>

            {/* Performance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] text-muted-foreground">
                <span>Performance</span>
                <span>99%</span>
              </div>
              <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
                <div className="h-full w-[99%] bg-emerald-500/80 rounded-full"></div>
              </div>
            </div>

            {/* Updates */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-blue-500/10"><RefreshCw className="w-3 h-3 text-blue-500" /></div>
              <div className="flex flex-col gap-1">
                <div className="w-12 h-1.5 bg-muted/30 rounded-full"></div>
                <div className="w-8 h-1.5 bg-muted/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* "Optimized" Badge */}
          <div className="mt-auto self-start px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[8px] font-medium border border-blue-500/20 flex items-center gap-1">
            <Zap className="w-2 h-2" /> OPTIMIZED
          </div>
        </div>
      </div>

      {/* Connection Lines / Network Effect (Subtle) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 50 Q 40 20 70 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="70%" cy="60%" r="1.5" className="fill-primary" />
      </svg>
    </div>
  );
};

// ----------------- Press Releases Background -------------------
const PressReleasesBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Network Nodes (Background) */}
      <div className="absolute top-[10%] left-[10%] p-1.5 rounded-full bg-primary/5 border border-primary/10">
        <Globe className="w-3 h-3 text-primary/40" />
      </div>
      <div className="absolute top-[20%] right-[30%] p-1.5 rounded-full bg-primary/5 border border-primary/10 delay-700">
        <Rss className="w-3 h-3 text-primary/40" />
      </div>
      <div className="absolute bottom-[30%] left-[20%] p-1.5 rounded-full bg-primary/5 border border-primary/10 delay-300">
        <Building2 className="w-3 h-3 text-primary/40" />
      </div>

      {/* Floating Interface Stack */}
      <div className="absolute bottom-[-20%] right-[-10%] md:bottom-[-10%] md:right-[-5%] w-[70%] h-[80%] opacity-90 transform rotate-[-6deg] scale-75 md:scale-100 transition-transform duration-700 group-hover:rotate-[-3deg] group-hover:scale-105">

        {/* Back Panel */}
        <div className="absolute bottom-4 right-8 w-full h-full bg-background border border-border/60 rounded-xl shadow-sm transform rotate-[-3deg] origin-bottom-right"></div>

        {/* Front Panel (Distribution Hub) */}
        <div className="absolute bottom-0 right-0 w-full h-full bg-card border border-border rounded-xl shadow-xl flex flex-col p-5 gap-4">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Global Distribution</span>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></span>
            </div>
          </div>

          {/* Content: Outlets List */}
          <div className="space-y-2.5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-background flex items-center justify-center">
                    <FileText className="w-3 h-3 text-primary/60" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-16 h-1.5 bg-primary/20 rounded-full"></div>
                    <div className="w-10 h-1 bg-muted-foreground/20 rounded-full"></div>
                  </div>
                </div>
                <CheckCircle className="w-3 h-3 text-green-500" />
              </div>
            ))}
          </div>

          {/* "Sent" Badge */}
          <div className="mt-auto self-end px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-[8px] font-medium border border-green-500/20">
            SENT TO 50+ OUTLETS
          </div>
        </div>
      </div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="80%" y1="80%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary" />
        <line x1="80%" y1="80%" x2="50%" y2="10%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary" />
      </svg>
    </div>
  );
};

// ----------------- Brand Monitoring Background -------------------
const BrandMonitoringBackground = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Interface Stack */}
      <div className="absolute bottom-[-20%] right-[-10%] md:bottom-[-10%] md:right-[-5%] w-[70%] h-[80%] opacity-90 transform rotate-[-6deg] scale-75 md:scale-100 transition-transform duration-700 group-hover:rotate-[-3deg] group-hover:scale-105">

        {/* Back Panel */}
        <div className="absolute bottom-4 right-8 w-full h-full bg-background border border-border/60 rounded-xl shadow-sm transform rotate-[-3deg] origin-bottom-right"></div>

        {/* Front Panel (Security Hub) */}
        <div className="absolute bottom-0 right-0 w-full h-full bg-card border border-border rounded-xl shadow-xl flex flex-col p-5 gap-4">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Brand Defense</span>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-[8px] font-bold text-indigo-500 border border-indigo-500/20">
              ACTIVE
            </div>
          </div>

          {/* Sentiment Graph (Visual) */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>Sentiment Analysis</span>
              <span className="text-green-500">+24%</span>
            </div>
            <div className="h-16 w-full bg-muted/10 rounded-lg border border-border/50 relative overflow-hidden flex items-end px-2 pb-2 gap-1">
              {/* Bars */}
              <div className="w-1/6 h-[30%] bg-indigo-500/20 rounded-t-sm"></div>
              <div className="w-1/6 h-[50%] bg-indigo-500/30 rounded-t-sm"></div>
              <div className="w-1/6 h-[40%] bg-indigo-500/25 rounded-t-sm"></div>
              <div className="w-1/6 h-[70%] bg-indigo-500/50 rounded-t-sm"></div>
              <div className="w-1/6 h-[60%] bg-indigo-500/40 rounded-t-sm"></div>
              <div className="w-1/6 h-[85%] bg-indigo-500 rounded-t-sm"></div>

              {/* Trend Line Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 50 L 20 40 L 40 45 L 60 20 L 80 30 L 100 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400 opacity-50" />
              </svg>
            </div>
          </div>

          {/* Security Checks */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-background border border-border">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[9px] font-medium">Secure</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-background border border-border">
              <Wifi className="w-3 h-3 text-muted-foreground" />
              <span className="text-[9px] font-medium">Monitoring</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ----------------- Map -------------------
const map = new DottedMap({
  height: 55,
  grid: 'diagonal'
});
const points = map.getPoints();
const Map = () => <svg viewBox="0 0 120 60" className="w-full h-auto text-primary">
  {points.map((point, i) => <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" opacity="0.7" />)}
</svg>;

// ----------------- Google Rankings Animation -------------------
const rankingsData = [{
  keyword: "web design services",
  position: 1,
  trend: "up",
  color: "from-green-400 to-emerald-500"
}, {
  keyword: "professional websites",
  position: 2,
  trend: "up",
  color: "from-blue-400 to-cyan-500"
}, {
  keyword: "custom web development",
  position: 3,
  trend: "stable",
  color: "from-purple-400 to-indigo-500"
}, {
  keyword: "business website design",
  position: 5,
  trend: "up",
  color: "from-orange-400 to-amber-500"
}, {
  keyword: "responsive web design",
  position: 7,
  trend: "down",
  color: "from-pink-400 to-rose-500"
}];
function GoogleRankingsAnimation() {
  return <div className="space-y-2 md:space-y-3">
    {rankingsData.map((item, i) => <div key={i} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-card border border-border rounded-md md:rounded-lg animate-fade-in" style={{
      animationDelay: `${i * 150}ms`,
      animationFillMode: "forwards",
      opacity: 0
    }}>
      {/* Position Badge */}


      {/* Keyword */}
      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-medium text-foreground truncate">{item.keyword}</p>
        <p className="text-[10px] md:text-xs text-muted-foreground">Google Search</p>
      </div>

      {/* Trend Indicator */}
      <div className="flex-shrink-0">
        {item.trend === "up" && <div className="flex items-center gap-1 text-green-500">
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 -rotate-45" />
          <span className="text-[10px] md:text-xs font-semibold">↑</span>
        </div>}
        {item.trend === "down" && <div className="flex items-center gap-1 text-red-500">
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 rotate-45" />
          <span className="text-[10px] md:text-xs font-semibold">↓</span>
        </div>}
        {item.trend === "stable" && <div className="flex items-center gap-1 text-muted-foreground">
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-[10px] md:text-xs font-semibold">→</span>
        </div>}
      </div>
    </div>)}
  </div>;
}

interface SEOFeature {
  title: string;
  time: string;
  content: string;
  color: string;
}

const seoFeatures: SEOFeature[] = [{
  title: "Google Rankings",
  time: "Active",
  content: "Track your position on Google search results in real-time.",
  color: "from-pink-400 to-indigo-500"
}, {
  title: "Local Listings",
  time: "Optimized",
  content: "Manage your business presence across Google My Business.",
  color: "from-orange-500 to-pink-500"
}, {
  title: "Keyword Research",
  time: "Ongoing",
  content: "Target the right keywords to attract your ideal customers.",
  color: "from-yellow-400 to-red-400"
}, {
  title: "Analytics Setup",
  time: "Integrated",
  content: "Track visitor behavior and conversion metrics effortlessly.",
  color: "from-sky-400 to-blue-700"
}];

const SEOFeaturesCard = () => {
  return <div className="w-full max-w-sm h-[220px] md:h-[280px] bg-transparent p-1 md:p-2 overflow-hidden font-sans relative">
    {/* Fade shadow overlay */}
    <div className="absolute inset-x-0 bottom-0 h-8 md:h-12 bg-gradient-to-t from-card to-transparent z-10"></div>

    <div className="space-y-1.5 md:space-y-2 relative z-0">
      {seoFeatures.map((feature, i) => <div key={i} className="flex gap-2 md:gap-3 items-start p-2 md:p-3 border border-border rounded-md md:rounded-lg transform transition duration-300 ease-in-out cursor-pointer animate-scaleUp bg-card/50" style={{
        animationDelay: `${i * 300}ms`,
        animationFillMode: "forwards",
        opacity: 0
      }}>
        <div className={`w-6 h-6 md:w-8 md:h-8 min-w-[1.5rem] md:min-w-[2rem] min-h-[1.5rem] md:min-h-[2rem] rounded-md md:rounded-lg bg-gradient-to-br ${feature.color}`} />
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
      </div>)}
    </div>
  </div>;
};