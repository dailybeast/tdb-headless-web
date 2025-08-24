import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { zephrClient } from '@/lib/zephr';
import { Mail, Loader2 } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LoginStep = 'email' | 'otp';

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if user exists
      const userExists = await zephrClient.checkUserExists(email);
      setIsNewUser(!userExists);

      // Send OTP
      const action = userExists ? 'login' : 'register';
      const success = await zephrClient.sendOTP(email, action);

      if (success) {
        setStep('otp');
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let success: boolean;
      if (isNewUser) {
        success = await zephrClient.registerWithOTP(email, otp);
      } else {
        success = await zephrClient.verifyOTP(email, otp);
      }

      if (success) {
        // Success! Close dialog and reload page
        onOpenChange(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setError(isNewUser 
          ? 'Registration failed. Please check your code and try again.'
          : 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);
    
    const action = isNewUser ? 'register' : 'login';
    const success = await zephrClient.sendOTP(email, action);
    
    if (success) {
      setError(null);
    } else {
      setError('Failed to resend code. Please try again.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    const popup = window.open(
      zephrClient.getOAuthUrl('google'),
      'google-signin',
      'menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=500,height=600'
    );

    // Poll for popup closure and reload
    const checkInterval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkInterval);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }, 1000);
  };

  const resetDialog = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setError(null);
    setIsNewUser(false);
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) resetDialog();
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        {step === 'email' ? (
          <>
            <DialogHeader>
              <DialogTitle>Sign in or Register</DialogTitle>
              <DialogDescription>
                Enter your email to continue to The Looker
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Google OAuth Button */}
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full"
                type="button"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-2">{error}</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={loading || !email}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Continue with Email
                    </>
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {isNewUser ? 'Welcome! Confirm Your Account' : 'Enter Verification Code'}
              </DialogTitle>
              <DialogDescription>
                {isNewUser 
                  ? "Thanks for registering! We've sent a verification code to your email."
                  : "We've sent a verification code to your email address."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <form onSubmit={handleOtpSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                    disabled={loading}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-2">{error}</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-sm"
                >
                  Didn't receive the code? Resend
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError(null);
                }}
                className="text-sm"
              >
                ← Back to email
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}