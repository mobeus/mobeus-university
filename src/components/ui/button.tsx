import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 backdrop-blur-md",
  {
    variants: {
      variant: {
        default: "bg-primary/20 border border-primary/30 text-white shadow-[var(--shadow-float-near)] hover:bg-primary/30 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-cyan)] active:translate-y-0 active:scale-95 rounded-2xl",
        destructive: "bg-destructive/20 border border-destructive/30 text-white shadow-[var(--shadow-float-near)] hover:bg-destructive/30 hover:border-destructive/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-2xl",
        outline: "bg-white/5 border border-white/20 text-white shadow-[var(--shadow-float-near)] hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-2xl",
        secondary: "bg-secondary/20 border border-secondary/30 text-white shadow-[var(--shadow-float-near)] hover:bg-secondary/30 hover:border-secondary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-2xl",
        ghost: "text-white hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-2xl",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 rounded-full",
        vision: "bg-gradient-to-r from-primary/30 to-primary/20 border border-primary/40 text-white shadow-[var(--shadow-glow-cyan)] hover:from-primary/40 hover:to-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 rounded-2xl",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 py-3.5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
