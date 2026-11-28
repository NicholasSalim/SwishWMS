import * as React from "react";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

function variantClass(variant: string): string {
  switch (variant) {
    case "default":
      return "bg-primary text-primary-foreground hover:bg-primary/90";
    case "destructive":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    case "outline":
      return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    case "ghost":
      return "hover:bg-accent hover:text-accent-foreground";
    case "link":
      return "text-primary underline-offset-4 hover:underline";
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90";
  }
}

function sizeClass(size: string): string {
  switch (size) {
    case "sm":
      return "h-8 px-3 text-xs";
    case "lg":
      return "h-10 px-8";
    case "icon":
      return "h-9 w-9";
    case "default":
    default:
      return "h-9 px-4 py-2";
  }
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClass(variant),
        sizeClass(size),
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
