"use client";

import * as React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Drawer = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Trigger;

interface DrawerContentProps {
  className?: string;
  children?: React.ReactNode;
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay
          className={cn(
            "inset-0 z-50 bg-background/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-0 top-0 z-50 h-full data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:duration-200 data-[state=open]:duration-200",
            "bg-border p-6 shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  children,
  ...props
}: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
};
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  children,
  ...props
}: { className?: string; children?: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-reverse",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </p>
));

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
