
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface LoginViewProps {
  onLogin: () => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetPhone, setResetPhone] = useState('');
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email');
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${phoneNumber}`,
      });
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const handleForgotPassword = async () => {
    const identifier = resetMethod === 'email' ? resetEmail : resetPhone;
    
    if (!identifier) {
      toast({
        title: "Required Field",
        description: `Please enter your ${resetMethod === 'email' ? 'email' : 'phone number'}.`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsResetDialogOpen(false);
      setResetEmail('');
      setResetPhone('');
      toast({
        title: "Reset Link Sent",
        description: `Password reset instructions sent to ${identifier}`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      
      <Card className="w-full max-w-md glass border-0 animate-scale-in relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl font-bold text-white">A</div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your admin dashboard</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-muted/20">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="otp">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  className="bg-muted/20 border-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-muted/20 border-muted"
                />
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full gradient-primary text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </TabsContent>
            
            <TabsContent value="otp" className="space-y-4">
              {!showOtpInput ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-muted/20 border-muted"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSendOtp}
                    className="w-full gradient-primary text-white font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="bg-muted/20 border-muted text-center text-lg tracking-widest"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      OTP sent to {phoneNumber}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleVerifyOtp}
                      className="w-full gradient-primary text-white font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        setShowOtpInput(false);
                        setOtpCode('');
                      }}
                      className="w-full text-sm"
                    >
                      Back to Phone Number
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <button 
              onClick={() => setIsResetDialogOpen(true)}
              className="hover:text-primary underline"
            >
              Forgot password?
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Forgot Password Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-md glass border-0">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Choose how you'd like to receive your password reset instructions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Tabs value={resetMethod} onValueChange={(value) => setResetMethod(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email Address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-muted/20 border-muted"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-phone">Phone Number</Label>
                  <Input
                    id="reset-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={resetPhone}
                    onChange={(e) => setResetPhone(e.target.value)}
                    className="bg-muted/20 border-muted"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="gradient-primary text-white font-semibold"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
