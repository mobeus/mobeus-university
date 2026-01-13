import { ExternalLink, Globe } from "lucide-react";
import { OpenGraphData } from "@/types/openGraph";

interface URLPreviewProps {
  openGraphData: OpenGraphData;
  onClick: () => void;
}

export const URLPreview = ({ openGraphData, onClick }: URLPreviewProps) => {
  const domain = new URL(openGraphData.url).hostname;
  
  return (
    <div
      onClick={onClick}
      className="mt-2 cursor-pointer group border border-white/20 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm hover:bg-black/40 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Image Section */}
      {openGraphData.image && (
        <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-black/20">
          <img
            src={openGraphData.image}
            alt={openGraphData.title || "Preview"}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
            onError={(e) => {
              // Hide image on error
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-3 space-y-1.5">
        {/* Title */}
        {openGraphData.title && (
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm sm:text-base font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">
              {openGraphData.title}
            </h4>
            <ExternalLink className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
          </div>
        )}
        
        {/* Description */}
        {openGraphData.description && (
          <p className="text-xs sm:text-sm text-white/70 line-clamp-2">
            {openGraphData.description}
          </p>
        )}
        
        {/* Domain */}
        <div className="flex items-center gap-1.5 text-xs text-white/50 pt-1">
          <Globe className="w-3 h-3" />
          <span className="truncate">{domain}</span>
        </div>
      </div>
    </div>
  );
};
