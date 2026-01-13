import React from "react";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

// Hero Image Generator - disabled since Supabase was removed
// This component was used to generate AI images via Supabase edge functions

export const HeroImageGenerator: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="p-6 bg-background/50 backdrop-blur-sm">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
                <ImageIcon className="h-6 w-6" />
                Hero Image Generator
              </h2>
              <p className="text-muted-foreground mt-4">
                Image generation functionality disabled - Supabase dependency removed
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
