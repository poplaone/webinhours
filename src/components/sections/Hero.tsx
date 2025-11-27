import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useParallaxHero } from '@/hooks/useParallaxHero';
import { CardSlider } from '@/components/ui/CardSlider';
import { RotatingServices } from '@/components/ui/text-shuffle/RotatingServices';
export const Hero = () => {
  const navigate = useNavigate();
  useParallaxHero();
  return <section className="relume-hero-section">
      <div className="relume-hero-container">
        <div className="relume-hero-grid">
          
          {/* LEFT COLUMN */}
          <div className="relume-hero-column">
            <img src="/assets/card-1.png" alt="Design preview" className="relume-hero-image parallax-image" data-depth="0.15" />
            <img src="/assets/card-2.png" alt="Mobile designs" className="relume-hero-image is-offset-left parallax-image" data-depth="0.25" />
            <img src="/assets/card-3.png" alt="Agency website" className="relume-hero-image parallax-image" data-depth="0.2" />
            <img src="/assets/cursor-jessica.png" alt="" className="relume-hero-cursor parallax-cursor" style={{
            position: 'absolute',
            width: '82.5px',
            top: '20px',
            left: '200px'
          }} data-depth="0.4" />
          </div>

          {/* CENTER CONTENT */}
          <div className="relume-hero-center">
            <div className="relume-hero-badge">
              <span className="relume-badge-gradient">500+</span> Free Website Designs
            </div>
            
            <h1 className="relume-hero-heading text-center text-3xl">
              Build Your Online Presence in Hours, Not Weeks
            </h1>
            
            <div className="relume-hero-subheading">
              <p>
                Choose from hundreds of professional website designs—completely free. We'll handle the setup while you focus on growing your business.
              </p>
              <p className="mt-4 min-h-[48px] flex items-center justify-center">
                <span className="mr-2">Need help with</span>
                <RotatingServices />
                <span className="ml-2">? We've got you covered.</span>
              </p>
            </div>

            <Button size="lg" onClick={() => navigate('/marketplace')} className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
              <span>Choose Your Free Website</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relume-hero-column">
            <img src="/assets/card-4.png" alt="Travel website" className="relume-hero-image parallax-image" data-depth="0.18" />
            <img src="/assets/card-5.png" alt="Business website" className="relume-hero-image is-offset-right parallax-image" data-depth="0.22" />
            <img src="/assets/card-6.png" alt="Dashboard design" className="relume-hero-image parallax-image" data-depth="0.16" />
            <img src="/assets/cursor-mario.png" alt="" className="relume-hero-cursor parallax-cursor" style={{
            position: 'absolute',
            width: '69.5px',
            top: '10px',
            right: '180px'
          }} data-depth="0.35" />
          </div>

        </div>
        
        {/* Mobile Card Slider - shown only on mobile */}
        <div className="relume-hero-mobile-slider">
          <CardSlider />
        </div>
      </div>
    </section>;
};