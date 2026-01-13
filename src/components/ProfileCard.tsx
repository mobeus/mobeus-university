import { Card, CardContent } from "@/components/ui/card";
import { MicroInteraction } from "@/components/MicroInteraction";

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  className?: string;
}

const ProfileCard = ({ name, role, description, imageUrl, className = "" }: ProfileCardProps) => {
  return (
    <MicroInteraction type="subtle">
      <Card className={`glass-medium glass-medium-hover overflow-hidden ${className}`}>
        <CardContent className="p-5 flex flex-col h-[420px]">
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 mb-4">
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="space-y-2 flex flex-col flex-1 min-h-0">
              <h3 className="text-lg font-bold text-white line-clamp-2">{name}</h3>
              <p className="text-xs font-semibold text-white/80 line-clamp-2">{role}</p>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-6 flex-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

export default ProfileCard;
