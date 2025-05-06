import React from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

interface ResizablePanelGroupProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
}

export function ResizablePanel({ children, defaultSize = 25, minSize = 10, maxSize = 90, className = "" }: ResizablePanelProps) {
  return (
    <div className={`${className}`} style={{ flex: defaultSize }}>
      {children}
    </div>
  );
}

export function ResizablePanelGroup({ children, direction = "horizontal" }: ResizablePanelGroupProps) {
  return <div className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} h-full`}>{children}</div>;
} 