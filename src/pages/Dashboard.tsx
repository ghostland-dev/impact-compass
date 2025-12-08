import { Header } from "@/components/layout/Header";
import { RSEOverview } from "@/components/dashboard/RSEOverview";
import { ActionPlan } from "@/components/dashboard/ActionPlan";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { Button } from "@/components/ui/button";
import { FileText, Download, Bell } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord RSE</h1>
            <p className="text-muted-foreground mt-1">
              Vue d'ensemble de votre performance RSE
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" /> 3 alertes
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Exporter
            </Button>
            <Button variant="hero" size="sm" className="gap-2">
              <FileText className="w-4 h-4" /> Rapport RSE
            </Button>
          </div>
        </div>

        {/* Overview Section */}
        <RSEOverview />

        {/* Charts and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <MetricsChart />
          <ActionPlan />
        </div>
      </main>
    </div>
  );
}
