import { cn } from '../../lib/utils';

interface PatternProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Pattern({ className, ...props }: PatternProps) {
  return (
    <div 
      className={cn(
        "relative w-full aspect-[2/1] bg-white",
        className
      )} 
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 L50 25 L100 0 L100 50 L50 25 L0 50 Z"
          fill="currentColor"
          className="text-primary/10"
        />
        <path
          d="M25 12.5 L50 25 L75 12.5 L75 37.5 L50 25 L25 37.5 Z"
          fill="currentColor"
          className="text-primary/5"
        />
      </svg>
    </div>
  );
}
