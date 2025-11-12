import React from 'react';
import { MapPin, Globe2, Cpu, ArrowUpRight, Send, Calculator, Calendar, MessageSquare, Mail } from 'lucide-react';

const Index = () => {
  return (
    <div className="bg-black text-neutral-200 antialiased min-h-screen font-inter">
      {/* Grid Background Container */}
      <div className="fixed top-0 left-0 right-0 bottom-0 -z-10">
        {/* Subtle dots layer */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            opacity: 0.35,
            backgroundImage: 'radial-gradient(#101010 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        ></div>
        
        {/* Grid lines layer */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            opacity: 0.22,
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '120px 1px, 1px 120px'
          }}
        ></div>
        
        {/* Vignette overlay */}
        <div 
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, black 100%)',
            pointerEvents: 'none'
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs sm:text-sm tracking-tight text-neutral-300">
              AVAILABLE/ <span className="tabular-nums">24/7</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-neutral-400">
            <div className="w-4 h-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="9" r="1"></circle>
                <circle cx="19" cy="9" r="1"></circle>
                <circle cx="5" cy="9" r="1"></circle>
                <circle cx="12" cy="15" r="1"></circle>
                <circle cx="19" cy="15" r="1"></circle>
                <circle cx="5" cy="15" r="1"></circle>
              </svg>
            </div>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-white/5 ring-1 ring-white/10">
            <span>Get Started</span>
            <Send className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative mt-10 sm:mt-16">
          <h1 className="leading-none tracking-tight text-white select-none">
            <span className="block text-[22vw] md:text-[16vw] xl:text-[12vw] 2xl:text-[10vw] font-extrabold">
              FREE
            </span>
          </h1>

          {/* Info row */}
          <div className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium tracking-tight text-white/90">Professional Websites</p>
                  <p className="text-xs text-neutral-400 mt-1">No monthly fees • No hidden costs</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium tracking-tight text-white/90">500+ Templates Available</p>
                  <p className="text-xs text-neutral-400 mt-1">Ready in 24 hours • Mobile responsive</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-indigo-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium tracking-tight text-white/90">Premium Services Optional</p>
                  <p className="text-xs text-neutral-400 mt-1">Custom design • SEO • Content creation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature image */}
          <div className="mt-10 sm:mt-14">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 via-transparent to-transparent mix-blend-screen pointer-events-none"></div>
              <div className="w-full h-[52vh] sm:h-[60vh] bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌐</div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Your Website Awaits</h2>
                  <p className="text-neutral-400">Choose from hundreds of professional templates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase - Recent Work equivalent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl tracking-tight font-semibold text-white">Popular Templates</h2>
          <a href="/marketplace" className="text-sm text-neutral-300 inline-flex items-center gap-2">
            <span>View all</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <article className="group rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">💼</div>
                  <h3 className="text-lg font-semibold text-white">Business Pro</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Business</span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-white">Professional Business</h3>
              <p className="mt-1 text-sm text-neutral-400">Perfect for corporate websites and portfolios.</p>
            </div>
          </article>

          {/* Card 2 */}
          <article className="group rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🛍️</div>
                  <h3 className="text-lg font-semibold text-white">Store Pro</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>E-commerce</span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-white">Online Store</h3>
              <p className="mt-1 text-sm text-neutral-400">Complete e-commerce solution with payments.</p>
            </div>
          </article>

          {/* Card 3 */}
          <article className="group rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5">
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="text-lg font-semibold text-white">Creative</h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Portfolio</span>
              </div>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-white">Creative Portfolio</h3>
              <p className="mt-1 text-sm text-neutral-400">Showcase your work with style and elegance.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="ring-1 ring-white/10 overflow-hidden bg-white/5 rounded-2xl">
          <div className="flex items-end justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl sm:text-3xl tracking-tight font-semibold text-white">Services</h2>
            <div className="hidden sm:flex items-center gap-2">
              <a href="/calculator" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-white bg-white/10 ring-1 ring-white/10">
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculate Cost</span>
              </a>
            </div>
          </div>

          {/* Row 1 - FREE Website */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="text-3xl sm:text-4xl font-medium tracking-tight text-emerald-400 tabular-nums">★</div>
              </div>
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
                  <span className="text-xs font-medium text-emerald-300">100% FREE</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-emerald-400"></div>
                    <span>Choose from 500+ professional templates</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-emerald-400"></div>
                    <span>Mobile-responsive design included</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-emerald-400"></div>
                    <span>SSL security & reliable hosting</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-emerald-400"></div>
                    <span>Basic contact forms & analytics</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 md:text-right">
                <h3 className="text-lg sm:text-xl tracking-tight font-semibold text-white">Professional Website</h3>
                <p className="text-xs text-neutral-400 mt-1">No monthly fees, no hidden costs</p>
              </div>
            </div>
          </div>

          {/* Row 2 - Premium Services */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="text-3xl sm:text-4xl font-medium tracking-tight text-white/70 tabular-nums">+</div>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-blue-400"></div>
                    <span>Custom design & branding - $199</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-purple-400"></div>
                    <span>SEO optimization - $149</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-orange-400"></div>
                    <span>Content creation - $99/month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-neutral-300">
                    <div className="w-3.5 h-3.5 mt-0.5 rounded-full bg-red-400"></div>
                    <span>E-commerce features - $299</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 md:text-right">
                <h3 className="text-lg sm:text-xl tracking-tight font-semibold text-white">Premium Add-ons</h3>
                <p className="text-xs text-neutral-400 mt-1">Upgrade when you're ready</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8">
            <p className="text-sm text-neutral-300">Ready to get your free website? Start browsing templates now.</p>
            <div className="flex items-center gap-3">
              <a href="/marketplace" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-emerald-500/90">
                <Calendar className="w-4 h-4" />
                <span>Browse Templates</span>
              </a>
              <a href="/calculator" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-white/10 ring-1 ring-white/10">
                <Calculator className="w-4 h-4" />
                <span>Calculate Premium Cost</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 mb-10">
        <div className="rounded-2xl p-6 sm:p-8 ring-1 ring-white/10 bg-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-neutral-400">Ready for your free website?</p>
              <h3 className="mt-1 text-xl sm:text-2xl tracking-tight font-semibold text-white">Let's build something amazing.</h3>
            </div>
            <div className="flex items-center gap-3">
              <a href="mailto:hello@webinhours.com" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-white/10">
                <Mail className="w-4 h-4" />
                <span>hello@webinhours.com</span>
              </a>
              <a href="/marketplace" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-emerald-500/90">
                <MessageSquare className="w-4 h-4" />
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-neutral-500">© 2025 WebInHours</p>
      </footer>
    </div>
  );
};

export default Index;