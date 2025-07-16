import * as React from "react";

const Progress = React.forwardRef(
  ({ value, indicatorColor = "bg-primary", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}
        {...props}
      >
        <div
          className={`h-full ${indicatorColor} transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
