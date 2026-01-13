import { useState } from "react";
import { Wrench, ChevronDown, ChevronUp } from "lucide-react";

interface ToolCallIndicatorProps {
  toolName: string;
  parameters: Record<string, any>;
  timestamp: Date;
  defaultExpanded?: boolean;
}

export function ToolCallIndicator({
  toolName,
  parameters,
  timestamp,
  defaultExpanded = false,
}: ToolCallIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="mb-2 rounded-lg bg-primary/10 backdrop-blur-lg border border-primary/30 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Tool Called</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 space-y-2 text-sm animate-accordion-down">
          <div>
            <span className="text-white/60">Function:</span>{" "}
            <span className="text-white font-mono">{toolName}</span>
          </div>
          
          {Object.keys(parameters).length > 0 && (
            <div>
              <span className="text-white/60">Parameters:</span>
              <ul className="mt-1 space-y-1 ml-4">
                {Object.entries(parameters).map(([key, value]) => (
                  <li key={key} className="text-white/80">
                    <span className="text-white/60">•</span>{" "}
                    <span className="font-mono text-primary">{key}</span>:{" "}
                    <span className="font-mono">
                      {typeof value === "string" ? `"${value}"` : JSON.stringify(value)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-white/50 text-xs">
            Executed: {formatTime(timestamp)}
          </div>
        </div>
      )}
    </div>
  );
}
