import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageFeedbackProps {
  messageId: string;
  currentFeedback?: "up" | "down" | null;
  onFeedback: (messageId: string, type: "up" | "down") => void;
}

export function MessageFeedback({
  messageId,
  currentFeedback,
  onFeedback,
}: MessageFeedbackProps) {
  return (
    <div className="flex items-center gap-1 mt-2 justify-end">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onFeedback(messageId, "up")}
        className={`h-7 w-7 p-0 transition-all duration-200 ${
          currentFeedback === "up"
            ? "text-secondary hover:text-secondary"
            : currentFeedback === "down"
            ? "opacity-30 cursor-not-allowed"
            : "text-white/40 hover:text-secondary"
        }`}
        disabled={currentFeedback === "down"}
        title="Helpful response"
      >
        <ThumbsUp className="w-4 h-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => onFeedback(messageId, "down")}
        className={`h-7 w-7 p-0 transition-all duration-200 ${
          currentFeedback === "down"
            ? "text-tertiary hover:text-tertiary"
            : currentFeedback === "up"
            ? "opacity-30 cursor-not-allowed"
            : "text-white/40 hover:text-tertiary"
        }`}
        disabled={currentFeedback === "up"}
        title="Not helpful"
      >
        <ThumbsDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
