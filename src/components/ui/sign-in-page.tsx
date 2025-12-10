import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

// --- TYPE DEFINITIONS ---

// Use generics compatible with both the local usage and shared component interface
export interface SignInPageTestimonial {
  author: TestimonialAuthor;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: SignInPageTestimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  isLoading?: boolean;
  mode?: 'signin' | 'signup';
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors focus-within:border-primary/70 focus-within:bg-primary/5">
    {children}
  </div>
);

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
  title,
  description,
  heroImageSrc,
  testimonials = [],
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  isLoading = false,
  mode = 'signin',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const defaultTitle = mode === 'signin'
    ? <span className="font-light text-foreground tracking-tighter">Welcome Back</span>
    : <span className="font-light text-foreground tracking-tighter">Create Account</span>;

  const defaultDescription = mode === 'signin'
    ? "Access your account and continue your journey with us"
    : "Join us today and start your journey";

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full overflow-hidden">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8 bg-background z-10">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              {title || defaultTitle}
            </h1>
            <p className="text-muted-foreground">{description || defaultDescription}</p>

            <form className="space-y-5" onSubmit={onSignIn}>
              {mode === 'signup' && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <GlassInputWrapper>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-foreground"
                      required
                    />
                  </GlassInputWrapper>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-foreground"
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Password</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-foreground"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {mode === 'signin' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="w-4 h-4 rounded border-border bg-background checked:bg-primary"
                    />
                    <span className="text-foreground/90">Keep me signed in</span>
                  </label>
                  <button
                    type="button"
                    onClick={onResetPassword}
                    className="hover:underline text-primary transition-colors"
                  >
                    Reset password
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={onGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'signin' ? (
                <>
                  New to our platform?{' '}
                  <button
                    type="button"
                    onClick={onCreateAccount}
                    className="text-primary hover:underline transition-colors"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onCreateAccount}
                    className="text-primary hover:underline transition-colors"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {/* Right column: Animated Graphics + Testimonials */}
      <section className="hidden md:block flex-1 relative bg-background overflow-hidden border-l border-border/50">
        {/* Professional Animated Graphics Background - Skeleton UI Design */}
        <div className="absolute inset-0 w-full h-full bg-background/50 flex items-center justify-center overflow-hidden">

          {/* Straight Responsive Skeleton Interface */}
          <div
            className="relative w-full h-full bg-zinc-950 dark:bg-white opacity-100 overflow-hidden"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Skeleton Header */}
            <div className="absolute top-8 left-8 right-8 h-12 bg-zinc-900/50 dark:bg-zinc-100/50 rounded-xl border border-white/10 dark:border-black/10 flex items-center px-4 gap-3 shadow-md backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
              <div className="ml-auto w-1/3 h-4 bg-white/10 dark:bg-black/10 rounded-full"></div>
            </div>

            {/* Skeleton Sidebar */}
            <div className="absolute top-24 left-8 w-48 bottom-8 bg-zinc-900/50 dark:bg-zinc-100/50 rounded-xl border border-white/10 dark:border-black/10 flex flex-col gap-4 p-4 shadow-md backdrop-blur-sm">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 w-full bg-white/10 dark:bg-black/10 rounded-lg border border-white/5 dark:border-black/5"></div>
              ))}
            </div>

            {/* Skeleton Main Content Grid */}
            <div className="absolute top-24 left-60 right-8 bottom-8 grid grid-cols-2 gap-6 p-2">
              {/* Hero Block */}
              <div className="col-span-2 h-40 bg-zinc-900/50 dark:bg-zinc-100/50 rounded-xl border border-white/10 dark:border-black/10 p-6 flex flex-col justify-end shadow-md backdrop-blur-sm">
                <div className="w-1/2 h-6 bg-white/20 dark:bg-black/20 rounded-lg mb-2 shadow-sm"></div>
                <div className="w-1/3 h-4 bg-white/10 dark:bg-black/10 rounded-lg"></div>
              </div>

              {/* Dashboard Cards */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative bg-zinc-900/50 dark:bg-zinc-100/50 rounded-xl border border-white/10 dark:border-black/10 p-4 flex flex-col gap-3 overflow-hidden group shadow-md backdrop-blur-sm hover:border-white/20 dark:hover:border-black/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/10 dark:bg-black/10 shadow-sm"></div>
                  <div className="w-3/4 h-3 rounded-full bg-white/10 dark:bg-black/10"></div>
                  <div className="w-1/2 h-3 rounded-full bg-white/10 dark:bg-black/10"></div>

                  {/* Decorative Lines */}
                  <div className="mt-auto flex items-end gap-1 h-8">
                    <div className="w-1/4 h-[40%] bg-white/20 dark:bg-black/20 rounded-t-sm"></div>
                    <div className="w-1/4 h-[70%] bg-white/20 dark:bg-black/20 rounded-t-sm"></div>
                    <div className="w-1/4 h-[50%] bg-white/20 dark:bg-black/20 rounded-t-sm"></div>
                    <div className="w-1/4 h-[80%] bg-white/20 dark:bg-black/20 rounded-t-sm"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements (Static now) */}
            <div className="absolute -right-20 top-40 w-40 h-40 bg-primary/20 rounded-full blur-[60px]"></div>
            <div className="absolute -left-20 bottom-40 w-60 h-60 bg-secondary/20 rounded-full blur-[80px]"></div>
          </div>
        </div>



        {testimonials.length > 0 && (
          <div className="absolute inset-0 overflow-hidden flex flex-col justify-end pb-12 px-12 z-10">
            <style>
              {`
                  @keyframes shimmer {
                    100% { transform: translateX(100%); }
                  }
                  @keyframes marquee-vertical {
                      0% { transform: translateY(0); }
                      100% { transform: translateY(-50%); }
                  }
                  .animate-marquee-vertical {
                      animation: marquee-vertical 50s linear infinite;
                  }
                  .animate-marquee-vertical:hover {
                       animation-play-state: paused;
                  }
                  `}
            </style>
            <div className="h-[600px] overflow-hidden relative mask-image-b-gradient">
              <div className="animate-marquee-vertical flex flex-col gap-6">
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`orig-${i}`}
                    author={testimonial.author}
                    text={testimonial.text}
                    className="w-full max-w-full bg-card/40 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/60 transition-colors"
                  />
                ))}
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`item-dup-${i}`}
                    author={testimonial.author}
                    text={testimonial.text}
                    className="w-full max-w-full bg-card/40 backdrop-blur-md border border-border/50 text-foreground hover:bg-card/60 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
