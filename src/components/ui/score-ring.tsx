import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function ScoreRing({
  score,
  maxScore = 100,
  size = "md",
  label,
  className,
}: ScoreRingProps) {
  const percentage = (score / maxScore) * 100;
  
  const sizes = {
    sm: { container: "w-20 h-20", stroke: 6, text: "text-lg" },
    md: { container: "w-32 h-32", stroke: 8, text: "text-2xl" },
    lg: { container: "w-44 h-44", stroke: 10, text: "text-4xl" },
  };

  const { container, stroke, text } = sizes[size];
  const radius = 50 - stroke / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return "stroke-success";
    if (percentage >= 50) return "stroke-primary";
    if (percentage >= 25) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <svg className={cn(container, "transform -rotate-90")}>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="fill-none stroke-muted"
          strokeWidth={stroke}
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={cn("fill-none transition-all duration-700 ease-out", getColor())}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold text-foreground", text)}>{score}</span>
        {label && (
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
        )}
      </div>
    </div>
  );
}
