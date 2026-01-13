import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: 'subtle' | 'lift';
  className?: string;
  disabled?: boolean;
}

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type = 'subtle',
  className,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(false);

  const typeClasses = {
    subtle: 'hover:scale-[1.01] hover:shadow-elegant active:scale-[0.99]',
    lift: 'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-elegant active:scale-[0.98] active:translate-y-0',
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer',
        !disabled && typeClasses[type],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      {children}
    </div>
  );
};

export const PulseIndicator: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className="relative inline-flex">
      <span
        className={cn(
          'absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping',
          sizeClasses[size]
        )}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full bg-primary',
          sizeClasses[size],
          className
        )}
      />
    </span>
  );
};

export const RippleEffect: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};
