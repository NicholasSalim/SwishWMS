"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Memuat sesi...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Sesi tidak ditemukan. Silakan masuk.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Selamat datang, {session.user.name || session.user.employeeId}
          </span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Produk" value="—" />
        <StatCard title="Penerimaan Tertunda" value="—" />
        <StatCard title="Picking Tertunda" value="—" />
        <StatCard title="Pengiriman Tertunda" value="—" />
      </div>
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Tugas Tertunda</h2>
        <p className="text-sm text-muted-foreground">
          Belum ada data. Mulai dengan data master dan penerimaan barang.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="rounded-lg border p-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{value}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter />
    </Card>
  );
}
