import { Skeleton, GridSkeleton } from '@/components/ui/loading-skeleton';

export const SectionLoadingFallback = () => {
  return (
    <div className="min-h-screen bg-black text-white animate-fade-in">
      {/* Hero Skeleton */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/90" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Skeleton variant="rectangular" width="128px" height="48px" className="bg-white/10" />
          <Skeleton variant="rectangular" width="100%" height="96px" className="bg-white/10 max-w-2xl" />
          <Skeleton variant="text" lines={1} className="bg-white/10 max-w-xl" />
          <div className="flex gap-4 pt-4">
            <Skeleton variant="rectangular" width="160px" height="48px" className="bg-white/10" />
            <Skeleton variant="rectangular" width="160px" height="48px" className="bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Section Title */}
          <div className="space-y-4">
            <Skeleton variant="rectangular" width="256px" height="40px" className="bg-white/10" />
            <Skeleton variant="text" lines={1} className="bg-white/10 max-w-3xl" />
          </div>

          {/* Grid Skeleton */}
          <GridSkeleton count={6} columns={3} />
        </div>
      </div>
    </div>
  );
};
