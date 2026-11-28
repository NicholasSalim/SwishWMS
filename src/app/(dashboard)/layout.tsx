"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Inbound", href: "/dashboard/inbound" },
  { name: "Outbound", href: "/dashboard/outbound" },
  { name: "Inventory", href: "/dashboard/inventory" },
  { name: "Master Data", href: "/dashboard/master" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden mr-2">
            <Menu className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="md:fixed md:left-0 md:top-0 md:h-full md:z-50 md:w-64 md:translate-x-0">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-bold">SwishWMS</DrawerTitle>
            <DrawerDescription className="text-sm">
              Warehouse Management System
            </DrawerDescription>
          </DrawerHeader>
          <nav className="px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground hover:bg-accent"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </DrawerContent>
      </Drawer>

      <main className="flex-1 overflow-hidden md:pl-0 relative z-0">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between gap-4 border-b bg-background px-4 px-md-6 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg tracking-tight">SwishWMS</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              Theme
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {session?.user?.name || session?.user?.employeeId}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
