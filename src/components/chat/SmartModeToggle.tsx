import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SmartModeToggleProps {
  isSmartMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export function SmartModeToggle({ isSmartMode, onToggle }: SmartModeToggleProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onToggle(!isSmartMode)}
        className={`h-8 px-3 transition-all duration-300 ${
          isSmartMode
            ? "text-primary hover:text-primary/90 bg-primary/10"
            : "text-white/40 hover:text-white/60"
        }`}
        title={isSmartMode ? "Smart Mode: Enhanced responses with tool access" : "Basic Mode"}
      >
        <Sparkles className={`w-4 h-4 ${isSmartMode ? "animate-pulse" : ""}`} />
      </Button>
      <span className="text-xs text-white/60">
        {isSmartMode ? "Smart Mode" : "Basic Mode"}
      </span>
    </div>
  );
}
