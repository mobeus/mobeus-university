import { Card, CardContent } from "@/components/ui/card";
import { MicroInteraction } from "@/components/MicroInteraction";
import { LucideIcon } from "lucide-react";
import { sendToTele, generateCardPrompt } from "@/utils/teleInteraction";

interface StatCardProps {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
  className?: string;
}

const StatCard = ({ icon: Icon, stat, title, description, className = "" }: StatCardProps) => {
  // Executive-inspired border colors (muted and transparent)
  const pharmaColors: Record<string, string> = {
    'A': 'bg-primary/10 border-primary/30',
    'B': 'bg-secondary/10 border-secondary/30',
    'C': 'bg-tertiary/10 border-tertiary/30',
    'D': 'bg-primary/10 border-primary/30',
    'E': 'bg-secondary/10 border-secondary/30',
    'F': 'bg-tertiary/10 border-tertiary/30',
  };

  const colorClass = pharmaColors[stat] || 'bg-primary/10 border-primary/30';

  return (
    <MicroInteraction type="subtle">
      <Card className={`glass-medium glass-medium-hover overflow-hidden interactive-indicator ${className}`} onClick={() => sendToTele(generateCardPrompt(title))}>
        <div className={`h-1 ${colorClass}`}></div>
        <CardContent className="p-5 flex flex-col h-[420px]">
          <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-secondary/40 flex items-center justify-center flex-shrink-0">
              <Icon className="w-10 h-10 text-secondary/80" />
            </div>
            <div className="space-y-3 flex flex-col flex-1 justify-center min-h-0">
              <h3 className="text-5xl font-bold text-white">{stat}</h3>
              <p className="text-lg font-semibold text-white/90 line-clamp-2">{title}</p>
              <p className="text-sm text-white/70 leading-relaxed line-clamp-5">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

export default StatCard;
