import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Mail, Lock, AlertCircle } from "lucide-react";

interface OTPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (otp: string) => void;
  title?: string;
  description?: string;
}

export const OTPDialog = ({
  open,
  onOpenChange,
  onSubmit,
  title = "Enter NDA Firewall Code",
  description = "An email with a 6-digit NDA Firewall code has been sent. It can take a couple of minutes to arrive. When it does, copy the code and paste it below. This will unlock access behind the NDA Firewall for this browser and computer—now and whenever you return on this browser + computer.",
}: OTPDialogProps) => {
  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle multiple character paste or input
    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      
      // Auto-submit if all filled
      if (newOtp.every((digit) => digit !== "")) {
        onSubmit(newOtp.join(""));
      }
    } else {
      // Single character input
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value was entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit if all filled
      if (newOtp.every((digit) => digit !== "")) {
        onSubmit(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current input
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");
    
    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      
      // Auto-submit if all filled
      if (newOtp.every((digit) => digit !== "")) {
        onSubmit(newOtp.join(""));
      }
    }
  };

  // Reset OTP when dialog closes
  React.useEffect(() => {
    if (!open) {
      setOtp(["", "", "", "", "", ""]);
    } else {
      // Focus first input when dialog opens
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/80 border-white/20 text-white">
        {/* Email Icon & Message at Top */}
        <div className="flex flex-col items-center gap-4 pt-6 pb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
            <Mail className="h-16 w-16 text-white relative z-10 animate-fade-in" strokeWidth={1.5} />
          </div>
          <div className="text-center max-w-xs mx-auto">
            <p className="text-white font-semibold text-lg">Check Your Email</p>
            <p className="text-white/70 text-sm mt-1">Your 6-digit code is on its way (may take a couple minutes)</p>
          </div>

          {/* Spam/Junk Notice */}
          <div className="flex items-start gap-2 bg-tertiary/20 border border-tertiary/30 rounded-lg px-4 py-3 mt-2 max-w-sm">
            <AlertCircle className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-tertiary font-semibold text-sm">Can't find the email?</p>
              <p className="text-white/90 text-xs mt-0.5">
                Check your spam or junk folder. The email may have been filtered.
              </p>
            </div>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-white text-center">Enter Your Code</DialogTitle>
          <DialogDescription className="text-white/80 text-center text-sm max-w-xs mx-auto">
            Copy and paste the code to unlock NDA-protected content on this browser
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-2 justify-center py-6">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-12 text-center text-lg font-semibold",
                "bg-white/20 border-white/30 text-white placeholder:text-white/50",
                "focus-visible:ring-white/50 focus-visible:border-white/50",
                "backdrop-blur-sm"
              )}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Yellow Padlock Warning at Bottom */}
        <div className="flex items-center justify-center gap-4 pt-6 pb-6 border-t border-white/20">
          <Lock className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] flex-shrink-0" strokeWidth={1.5} fill="currentColor" />
          <div className="text-left">
            <p className="text-yellow-400 font-semibold text-sm mb-1">NDA Protected Content</p>
            <p className="text-white/80 text-xs">
              Anything with a yellow padlock is confidential. Make sure you know who's looking over your shoulder.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
