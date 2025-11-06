'use client';

import { AppHeader } from "@/components/dashboard/header";
import { MainActions } from "@/components/dashboard/main-actions";
import { VaultStats } from "@/components/dashboard/vault-stats";
import { YieldSplit } from "@/components/dashboard/yield-split";
import { GrowthPool } from "@/components/dashboard/growth-pool";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { useAppContext } from "@/contexts/app-context";
import { mockGrowthProposals, mockVaultStats, mockActivities } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { isMock } = useAppContext();

  // In a real app, you would fetch this data from a contract or API
  const vaultStats = isMock ? mockVaultStats : [];
  const growthProposals = isMock ? mockGrowthProposals.slice(0, 2) : [];
  const activities = isMock ? mockActivities : [];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid gap-8">
          <VaultStats stats={vaultStats} />
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-8">
              <MainActions />
              <RecentActivity activities={activities} />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <YieldSplit />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Featured Proposals</h3>
                    <Button variant="ghost" asChild className="hover:text-primary">
                        <Link href="/proposals">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <GrowthPool proposals={growthProposals} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
