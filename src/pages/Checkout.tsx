import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Lock, Shield, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWebsiteById } from "@/hooks/queries/useWebsiteByIdQuery";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const siteParam = params.get("site") || "";
  const { user } = useAuth();

  const { data, isLoading } = useWebsiteById(siteParam);
  const site = data?.data?.[0] || {} as any;

  const price = useMemo(() => {
    const p = site?.price ?? 0;
    return typeof p === "number" ? p : Number(p) || 0;
  }, [site?.price]);

  const [coupon, setCoupon] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [payMethod, setPayMethod] = useState("card");

  const discount = coupon.trim().toUpperCase() === "WELCOME10" ? Math.min(10, price * 0.1) : 0;
  const subtotal = price;
  const total = Math.max(0, subtotal - discount);

  return (
    <main className="container mx-auto px-4 py-6 lg:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
          <p className="text-sm text-muted-foreground">Complete your purchase securely.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Billing + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing details */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue={user?.user_metadata?.full_name || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input id="company" placeholder="Company LLC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" placeholder="+1 555 000 1234" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="US">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (optional)</Label>
                <Textarea id="notes" placeholder="Any specific request for setup or customization..." />
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={payMethod} onValueChange={setPayMethod} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem id="pm-card" value="card" />
                  <Label htmlFor="pm-card" className="flex items-center gap-2 cursor-pointer"><CreditCard className="h-4 w-4" /> Card</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem id="pm-upi" value="upi" />
                  <Label htmlFor="pm-upi" className="flex items-center gap-2 cursor-pointer"><Wallet className="h-4 w-4" /> UPI</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem id="pm-paypal" value="paypal" />
                  <Label htmlFor="pm-paypal" className="flex items-center gap-2 cursor-pointer">PayPal</Label>
                </div>
              </RadioGroup>

              {payMethod === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cc-name">Name on Card</Label>
                    <Input id="cc-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc-number">Card Number</Label>
                    <Input id="cc-number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc-exp">Expiry</Label>
                    <Input id="cc-exp" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc-cvc">CVC</Label>
                    <Input id="cc-cvc" placeholder="CVC" />
                  </div>
                </div>
              )}

              {payMethod === "upi" && (
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="yourname@bank" />
                </div>
              )}

              {payMethod === "paypal" && (
                <p className="text-sm text-muted-foreground">You will be redirected to PayPal to complete your purchase.</p>
              )}

              <Separator />

              <div className="flex items-start gap-3">
                <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(Boolean(v))} />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the Terms of Service and Refund Policy.
                </Label>
              </div>

              <Button
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
                disabled={!accepted}
                onClick={() => navigate(`/site/${siteParam || site?.id || ""}`)}
              >
                Complete Purchase
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1"><Lock className="h-3 w-3" /> Secure Checkout</div>
                <div className="flex items-center gap-1"><Shield className="h-3 w-3" /> 7-day Refund</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Instant Access</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={site?.thumbnail_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=280&q=60"}
                  alt={site?.title || "Template"}
                  className="h-16 w-28 object-cover rounded-md border"
                />
                <div className="min-w-0">
                  <p className="font-medium truncate">{site?.title || (isLoading ? "Loading..." : "Website Template")}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">Template</Badge>
                    <span>Single License</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => { /* frontend only - no op */ }}
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className={discount ? "text-green-500" : undefined}>{discount ? `- $${discount.toFixed(2)}` : "$0.00"}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full"
                variant="secondary"
                onClick={() => navigate(`/site/${siteParam || site?.id || ""}`)}
              >
                <Download className="h-4 w-4 mr-2" /> Back to Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What you get</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Source code in a downloadable archive</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Free updates for 6 months</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Email support</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Commercial usage license</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
