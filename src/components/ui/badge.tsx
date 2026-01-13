import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 backdrop-blur-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-black border-primary shadow-[var(--shadow-float-near)] hover:bg-primary/90 hover:border-primary/90 hover:-translate-y-0.5",
        destructive: "bg-destructive text-white border-destructive shadow-[var(--shadow-float-near)] hover:bg-destructive/90 hover:border-destructive/90 hover:-translate-y-0.5",
        outline: "bg-primary/10 border-primary/30 text-primary shadow-[var(--shadow-float-near)] hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-0.5",
        vision: "bg-primary text-black border-primary hover:bg-primary/80 hover:border-primary/80 hover:-translate-y-0.5",
        partner: "bg-secondary text-white border-secondary shadow-[var(--shadow-float-near)] hover:bg-secondary/90 hover:-translate-y-0.5",
        usecase: "bg-primary/20 border-primary/40 text-primary shadow-[var(--shadow-float-near)] hover:bg-primary/30 hover:border-primary/50 hover:-translate-y-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
