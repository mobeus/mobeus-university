import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string;
  height?: string;
  lines?: number;
}

export const Skeleton = ({ 
  className, 
  variant = "rectangular",
  width,
  height,
  lines = 1,
  ...props 
}: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-mist/10 rounded";
  
  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full w-12 h-12",
    rectangular: "w-full h-24",
    card: "w-full h-48 rounded-lg",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4",
              className
            )}
            style={{ width: i === lines - 1 ? undefined : width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="glass-medium rounded-lg p-6 space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton variant="circular" className="flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
    <Skeleton variant="rectangular" height="120px" />
  </div>
);

export const ListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 glass-light rounded-lg">
        <Skeleton variant="circular" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
    ))}
  </div>
);

export const GridSkeleton = ({ count = 6, columns = 3 }: { count?: number; columns?: number }) => (
  <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);
