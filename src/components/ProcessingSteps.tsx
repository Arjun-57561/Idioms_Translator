import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { ProcessingStep } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProcessingStepsProps {
  steps: ProcessingStep[];
}

export function ProcessingSteps({ steps }: ProcessingStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
            step.status === 'complete' && "bg-primary/10",
            step.status === 'processing' && "bg-secondary/10"
          )}
        >
          {step.status === 'complete' && (
            <CheckCircle className="h-5 w-5 text-primary animate-in zoom-in duration-300" />
          )}
          {step.status === 'processing' && (
            <Loader2 className="h-5 w-5 text-secondary animate-spin" />
          )}
          {step.status === 'pending' && (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
          {step.status === 'error' && (
            <Circle className="h-5 w-5 text-destructive" />
          )}
          <span className={cn(
            "text-sm font-medium",
            step.status === 'complete' && "text-primary",
            step.status === 'processing' && "text-secondary",
            step.status === 'pending' && "text-muted-foreground"
          )}>
            {step.step}
          </span>
        </div>
      ))}
    </div>
  );
}
