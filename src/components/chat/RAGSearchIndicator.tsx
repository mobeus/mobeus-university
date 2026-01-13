import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface RAGSearchIndicatorProps {
  searchQuery: string;
  resultsCount?: number;
  timestamp: Date;
  defaultExpanded?: boolean;
}

export function RAGSearchIndicator({
  searchQuery,
  resultsCount,
  timestamp,
  defaultExpanded = false,
}: RAGSearchIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="mb-2 rounded-lg bg-secondary/10 backdrop-blur-lg border border-secondary/30 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-secondary/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">Knowledge Search</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-secondary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-secondary" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 space-y-2 text-sm animate-accordion-down">
          <div>
            <span className="text-white/60">Query:</span>{" "}
            <span className="text-white font-mono">"{searchQuery}"</span>
          </div>
          
          {resultsCount !== undefined && (
            <div>
              <span className="text-white/60">Results:</span>{" "}
              <span className="text-secondary">{resultsCount} documents</span>
            </div>
          )}
          
          <div className="text-white/50 text-xs">
            Searched: {formatTime(timestamp)}
          </div>
        </div>
      )}
    </div>
  );
}
