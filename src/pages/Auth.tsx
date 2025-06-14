
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Shield, Zap } from 'lucide-react';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import PixelCanvas from '@/components/animations/PixelCanvas';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Please check your email to confirm your account!",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated Grid Background */}
      <AnimatedGridBackground />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/10 rounded-full blur-md animate-pulse-slow delay-2000" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-primary rounded-2xl p-4 shadow-neo">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg animate-pulse-slow" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gradient-blue animate-slide-in-up">
              Welcome to Pulse Vision.AI
            </h2>
            <p className="mt-4 text-muted-foreground animate-slide-in-up delay-100">
              Join thousands of innovators transforming ideas into reality
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 mb-8 animate-scale-in delay-200">
            <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:bg-card/70 transition-all duration-300 group">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:bg-card/70 transition-all duration-300 group">
              <Zap className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs text-muted-foreground">Fast</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50 backdrop-blur border border-border/40 hover:bg-card/70 transition-all duration-300 group">
              <Sparkles className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs text-muted-foreground">AI-Powered</p>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="relative overflow-hidden glass-card animate-scale-in delay-300 group">
            {/* Pixel Canvas Background */}
            <div className="absolute inset-0 opacity-30">
              <PixelCanvas 
                colors={['#8B5CF6', '#A78BFA', '#DDD6FE']}
                gap={8}
                speed={15}
              />
            </div>
            
            {/* Card Content */}
            <div className="relative z-10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
                <CardDescription>
                  Choose between signing in or creating a new account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-background/50 backdrop-blur">
                    <TabsTrigger 
                      value="signin" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="animate-fade-in">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background/50 backdrop-blur border-border/40 focus:border-primary transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                          id="signin-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-background/50 backdrop-blur border-border/40 focus:border-primary transition-all duration-300"
                          placeholder="Enter your password"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-shine relative overflow-hidden" 
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="animate-fade-in">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="bg-background/50 backdrop-blur border-border/40 focus:border-primary transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background/50 backdrop-blur border-border/40 focus:border-primary transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={6}
                          className="bg-background/50 backdrop-blur border-border/40 focus:border-primary transition-all duration-300"
                          placeholder="Create a password (min 6 characters)"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-shine relative overflow-hidden" 
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in delay-500">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
