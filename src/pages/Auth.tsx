import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { SignInPage, SignInPageTestimonial } from "@/components/ui/sign-in-page";

// Based on the shared TestimonialAuthor interface, but we need to map it correctly.
const sampleTestimonials: SignInPageTestimonial[] = [
  {
    author: {
      name: "Alex Morgan",
      handle: "",
      avatar: ""
    },
    text: "This platform completely revolutionized our workflow. The automation tools are incredibly powerful and easy to use."
  },
  {
    author: {
      name: "Sarah Chen",
      handle: "",
      avatar: ""
    },
    text: "The best investment we've made for our startup. We scaled from 100 to 10k users without a hitch thanks to the robust infrastructure."
  },
  {
    author: {
      name: "Michael Chang",
      handle: "",
      avatar: ""
    },
    text: "Customer support is outstanding. They resolved my complex query in minutes, not days. truly 24/7 service."
  },
  {
    author: {
      name: "Jessica Wu",
      handle: "",
      avatar: ""
    },
    text: "I was skeptical at first, but the ROI speaks for itself. Our efficiency improved by 40% in just the first month."
  },
  {
    author: {
      name: "David Miller",
      handle: "",
      avatar: ""
    },
    text: "The interface is intuitive and beautiful. It makes managing complex data sets feel like a breeze. Highly recommended!"
  },
  {
    author: {
      name: "Emily Davis",
      handle: "",
      avatar: ""
    },
    text: "Security was our top concern, and this platform delivered enterprise-grade protection out of the box."
  }
];

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/websites';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setIsLoading(true);
    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    }
    setIsLoading(false);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      setMode('signin');
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();

    if (error) {
      toast({
        title: "Error signing in with Google",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "Please contact support for password reset assistance.",
    });
  };

  const handleToggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <SignInPage
      mode={mode}
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={mode === 'signin' ? handleSignIn : handleSignUp}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleToggleMode}
      isLoading={isLoading}
    />
  );
};

export default Auth;
