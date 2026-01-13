import { ShieldCheck, Loader2, Building2, Mail, AlertCircle, Lock } from "lucide-react";
import SectionBackButton from "@/components/SectionBackButton";
import { UnifiedSectionHeader } from "@/components/layout/UnifiedSectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendAuthCode, notifyTele, sendNdaAccessRequestEmail, verifyAuthCode } from "@/utils/acknowledgmentHelpers";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface AuthorizedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
}

const NDAFirewallSection = ({
  animationClass = "",
  openOtp,
  avatarState,
  onConnectAvatar,
}: {
  animationClass?: string;
  openOtp: () => void;
  avatarState?: "off" | "connecting" | "connected";
  onConnectAvatar?: () => Promise<boolean>;
}) => {
  const [step, setStep] = useState<'input' | 'code' | 'unauthorized'>('input');
  const [inputValue, setInputValue] = useState("");
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [isValidating, setIsValidating] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [matchedUser, setMatchedUser] = useState<AuthorizedUser | null>(null);
  const inFlightRef = useRef(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const authorizedUsers: AuthorizedUser[] = [
    { id: "exec-nima", name: "Nima A.", email: "nima@mobeus.com", phone: "exec-nima-b1179fbb-8b59-4bf9-af0b-8cc2ba640e31", phoneNumber: "+14373244231" },
    { id: "exec-richie", name: "Richie E.", email: "richie@mobeus.com", phone: "exec-richie-a375538c-b687-4cc6-ad04-bccbf7a74fa2", phoneNumber: "+19174030642" },
    { id: "exec-sales", name: "Sales Leadership", email: "sales@fiserv.com" },
    { id: "exec-product", name: "Product Team", email: "product@fiserv.com" },
    { id: "exec-strategy", name: "Corporate Strategy", email: "strategy@fiserv.com" },
    { id: "exec-board", name: "Executive Board", email: "board@fiserv.com" },
  ];

  // Countdown timer for resend
  useEffect(() => {
    if (step === 'code' && resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => {
          if (prev === 1) {
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, resendCountdown]);

  const normalizePhone = (value: string) => value.replace(/\D/g, "");

  const handleEmailPhoneSubmit = async () => {
    if (inFlightRef.current || !inputValue.trim()) return;

    setIsValidating(true);
    inFlightRef.current = true;

    try {
      // Check if input matches any authorized user (email or phone)
      const rawInput = inputValue.trim();
      const normalizedInputEmail = rawInput.toLowerCase();
      const normalizedInputPhone = normalizePhone(rawInput);

      const user = authorizedUsers.find((u) => {
        const emailMatch = u.email.toLowerCase() === normalizedInputEmail;
        const phoneMatch =
          normalizedInputPhone.length > 0 &&
          !!u.phoneNumber &&
          normalizePhone(u.phoneNumber) === normalizedInputPhone;

        return emailMatch || phoneMatch;
      });

      if (user) {
        console.log("[NDA] Authorized user found:", user.email);
        setMatchedUser(user);

        // Connect avatar if needed
        if (avatarState !== "connected" && onConnectAvatar) {
          console.log("[NDA] Connecting avatar...");
          const connected = await onConnectAvatar();
          if (!connected) {
            console.error("[NDA] Failed to connect avatar");
            toast.error("Failed to connect. Please try clicking the avatar first.");
            setIsValidating(false);
            inFlightRef.current = false;
            return;
          }
          await new Promise((r) => setTimeout(r, 500));
        } else {
          await new Promise((r) => setTimeout(r, 100));
        }

        // Send auth code
        await sendAuthCode("", user.email, user.phone);
        console.log("[NDA] Auth code sent successfully");

        // Move to code entry step
        setStep('code');
        setCodeDigits(['', '', '', '', '', '']);
        setCanResend(false);
        setResendCountdown(60);

        // Notify user
        let message = "Check your email for the 6-digit code";
        if (user.email && user.phone) {
          message = "Check your email and phone for the 6-digit code";
        } else if (user.phone) {
          message = "Check your phone for the 6-digit code";
        }
        notifyTele(`Improvise a response that is less than 10 words using this as your raw material - ${message}`);
        toast.success(message);

        // Focus first input after a short delay
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        console.log("[NDA] User not authorized:", inputValue);
        setStep('unauthorized');
      }
    } catch (error) {
      console.error("[NDA] Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsValidating(false);
      inFlightRef.current = false;
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are filled
    if (value && index === 5 && newDigits.every(d => d)) {
      handleCodeSubmit(newDigits.join(''));
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!codeDigits[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    if (pastedData.length === 6) {
      const newDigits = pastedData.split('');
      setCodeDigits(newDigits);
      inputRefs.current[5]?.focus();
      // Auto-submit after paste
      setTimeout(() => handleCodeSubmit(pastedData), 100);
    }
  };

  const handleCodeSubmit = async (code: string) => {
    if (isValidating || code.length !== 6) return;

    setIsValidating(true);
    console.log("[NDA] Validating code:", code);

    try {
      // Here you would validate the code with backend
      // For now, simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isVerified = verifyAuthCode(code);
      if (!isVerified) {
        toast.error("Invalid code. Please try again.");
        notifyTele("Improvise a response that is less than 10 words using this as your raw material - The code you entered is incorrect, please try again");
        setCodeDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        return;
      }

      // On success, navigate to next section or show success
      toast.success("Access granted!");
      notifyTele("Improvise a response that is less than 10 words using this as your raw material - Access granted. Welcome!");
      (window as any).teleNavigation?.navigateToSection?.("welcome");
      (window as any).showEmotion?.("happy");

      // Navigate or perform success action here
      // For now, just log
      console.log("[NDA] Code validated successfully");

    } catch (error) {
      console.error("[NDA] Code validation error:", error);
      toast.error("Invalid code. Please try again.");
      setCodeDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsValidating(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || !matchedUser) return;

    setCanResend(false);
    setResendCountdown(60);

    try {
      await sendAuthCode("", matchedUser.email, matchedUser.phone);
      toast.success("New code sent!");
      notifyTele("Improvise a response that is less than 10 words using this as your raw material - A new code has been sent");
    } catch (error) {
      console.error("[NDA] Resend error:", error);
      toast.error("Failed to resend code");
      setCanResend(true);
    }
  };

  const handleRequestAccess = async () => {
    const email = inputValue.trim();
    if (!email) {
      toast.error("Enter your email before requesting access.");
      return;
    }

    try {
      await sendNdaAccessRequestEmail(email);
      notifyTele("User just sent a request to get accsess to ristricted area. Notify the user that we will review their request and get back to them shortly");
      toast.success("Request received. We'll review and respond shortly.");
      (window as any).teleNavigation?.navigateToSection?.("welcome");
    } catch (error) {
      console.error("[NDA] Access request error:", error);
      toast.error("Failed to send request. Please try again.");
    }
  };

  const handleTryAgain = () => {
    setStep('input');
    setInputValue('');
    setCodeDigits(['', '', '', '', '', '']);
    setMatchedUser(null);
  };

  return (
    <section className={`relative flex flex-col min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)] ${animationClass}`}>
      <div className="container mx-auto max-w-[1400px] px-16 md:px-24 lg:px-32 h-full">
        <SectionBackButton />
        <div className="max-w-4xl mx-auto flex flex-col justify-center h-full py-8">
          {/* Header */}
          <UnifiedSectionHeader
            badge="EXECUTIVE ACCESS"
            title="Confidential Information"
            subtitle="Sensitive strategic information accessible to authorized Fiserv executives and partners."
            animate={true}
          />

          {/* Main Glass Card */}
          <div className="glass-strong rounded-2xl p-8 md:p-12 border border-white/10 shadow-elegant">
            {/* Government Header */}
            <div className="flex justify-center items-center gap-4 mb-10">
              <Building2 className="w-10 h-10 text-white/70" />
              <div className="text-center">
                <h4 className="text-white/90 text-lg font-semibold">Fiserv DMA Executive Access</h4>
                <p className="text-white/60 text-sm">Authorized Access Only</p>
              </div>
            </div>

            {/* Step 1: Email/Phone Input */}
            {step === 'input' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <ShieldCheck className="w-12 h-12 text-white/80" />
                  </div>
                  <h3 className="text-white/90 text-xl font-semibold mb-2">
                    Verify Your Identity
                  </h3>
                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    Enter your authorized email or phone number to receive a verification code
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <Input
                    type="text"
                    placeholder="Email address or phone number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailPhoneSubmit()}
                    disabled={isValidating}
                    className="text-center text-lg h-14 bg-white/5 border-white/20 text-white placeholder:text-white/40
                              focus-visible:ring-white/30 focus-visible:border-white/40"
                  />

                  <div className="flex justify-center">
                    <Button
                      onClick={handleEmailPhoneSubmit}
                      disabled={isValidating || !inputValue.trim()}
                      className="bg-primary hover:opacity-90 text-white px-8 py-6 text-base font-medium
                                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isValidating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Access"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: 6-Digit Code Input */}
            {step === 'code' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <Mail className="w-12 h-12 text-white/80" />
                  </div>
                  <h3 className="text-white/90 text-xl font-semibold mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-white/70 text-sm">
                    A 6-digit code has been sent to <span className="font-medium text-white/90">{inputValue}</span>
                  </p>
                </div>

                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-4 mb-8">
                  {codeDigits.map((digit, index) => (
                    <Input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={index === 0 ? handleCodePaste : undefined}
                      disabled={isValidating}
                      className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold
                                bg-white/10 border-white/30 text-white
                                focus-visible:ring-white/50 focus-visible:border-white/60
                                disabled:opacity-50 transition-all duration-200"
                    />
                  ))}
                </div>

                {/* Validation State */}
                {isValidating && (
                  <div className="flex justify-center items-center gap-2 mb-6 text-white/70">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Validating code...</span>
                  </div>
                )}

                {/* Resend Code */}
                <div className="text-center">
                  <button
                    onClick={handleResendCode}
                    disabled={!canResend}
                    className="text-white/60 hover:text-white/90 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {canResend ? (
                      "Resend Code"
                    ) : (
                      `Resend code in ${resendCountdown}s`
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Unauthorized User */}
            {step === 'unauthorized' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="w-12 h-12 text-red-400/80" />
                  </div>
                  <h3 className="text-white/90 text-xl font-semibold mb-2">
                    Access Not Found
                  </h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto mb-1">
                    Your email or phone number is not in our authorized list.
                  </p>
                  <p className="text-white/60 text-xs max-w-md mx-auto">
                    If you believe this is an error, please request access below.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleRequestAccess}
                    className="bg-primary hover:opacity-90 text-white px-8 py-6 text-base font-medium"
                  >
                    Request Access
                  </Button>

                  <button
                    onClick={handleTryAgain}
                    className="text-white/60 hover:text-white/80 text-sm transition-colors"
                  >
                    Try a different email or phone
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/50 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              <span>Protected Content: <span className="text-white/70 font-medium">Budget Information • Strategic Plans • Confidential Reports</span></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NDAFirewallSection;
