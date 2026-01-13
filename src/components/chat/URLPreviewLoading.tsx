import { Skeleton } from "@/components/ui/loading-skeleton";

export const URLPreviewLoading = () => {
  return (
    <div className="mt-2 border border-white/20 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm">
      <Skeleton variant="rectangular" height="128px" className="bg-white/10" />
      <div className="p-3 space-y-2">
        <Skeleton variant="text" width="75%" className="bg-white/10" />
        <Skeleton variant="text" lines={2} className="bg-white/10" />
      </div>
    </div>
  );
};
