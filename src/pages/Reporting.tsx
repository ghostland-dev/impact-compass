import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  FilePieChart,
  Clock,
  CheckCircle2,
  Share2,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Report {
  id: number;
  title: string;
  type: "annual" | "quarterly" | "custom" | "investor";
  status: "ready" | "generating" | "scheduled";
  date: string;
  format: string;
  size?: string;
}

const reports: Report[] = [
  {
    id: 1,
    title: "Rapport RSE Annuel 2023",
    type: "annual",
    status: "ready",
    date: "2024-01-15",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Bilan Carbone Q4 2023",
    type: "quarterly",
    status: "ready",
    date: "2024-01-10",
    format: "PDF",
    size: "1.2 MB",
  },
  {
    id: 3,
    title: "Synthèse Investisseurs",
    type: "investor",
    status: "ready",
    date: "2024-01-08",
    format: "PDF",
    size: "856 KB",
  },
  {
    id: 4,
    title: "Export données brutes",
    type: "custom",
    status: "ready",
    date: "2024-01-05",
    format: "Excel",
    size: "4.1 MB",
  },
  {
    id: 5,
    title: "Rapport RSE Q1 2024",
    type: "quarterly",
    status: "scheduled",
    date: "2024-04-01",
    format: "PDF",
  },
];

const reportTemplates = [
  {
    id: 1,
    title: "Rapport annuel RSE",
    description: "Rapport complet conforme aux normes CSRD avec tous les indicateurs ESG",
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Synthèse investisseurs",
    description: "Version condensée pour les parties prenantes financières",
    icon: FilePieChart,
    color: "bg-info/10 text-info",
  },
  {
    id: 3,
    title: "Export Excel",
    description: "Données brutes exportables pour analyse personnalisée",
    icon: FileSpreadsheet,
    color: "bg-success/10 text-success",
  },
  {
    id: 4,
    title: "Dashboard PDF",
    description: "Capture du tableau de bord avec graphiques et KPIs",
    icon: BarChart3,
    color: "bg-accent/10 text-accent",
  },
];

const kpis = [
  { label: "Score RSE global", value: "72/100", trend: "+5%", trendUp: true },
  { label: "Émissions CO₂", value: "145t", trend: "-12%", trendUp: true },
  { label: "Actions complétées", value: "24/36", trend: "+8", trendUp: true },
  { label: "Conformité RGPD", value: "94%", trend: "+2%", trendUp: true },
];

const statusConfig = {
  ready: { label: "Prêt", color: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
  generating: { label: "En cours", color: "bg-info/10 text-info border-info/20", icon: Clock },
  scheduled: { label: "Planifié", color: "bg-muted text-muted-foreground border-border", icon: Calendar },
};

const typeConfig = {
  annual: { label: "Annuel", color: "bg-primary/10 text-primary" },
  quarterly: { label: "Trimestriel", color: "bg-info/10 text-info" },
  custom: { label: "Personnalisé", color: "bg-accent/10 text-accent" },
  investor: { label: "Investisseurs", color: "bg-success/10 text-success" },
};

export default function Reporting() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reporting RSE</h1>
            <p className="text-muted-foreground mt-1">
              Générez et téléchargez vos rapports RSE automatisés
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <FileText className="w-4 h-4" /> Générer un rapport
          </Button>
        </div>

        {/* KPIs Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <span className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  kpi.trendUp ? "text-success" : "text-destructive"
                )}>
                  <TrendingUp className={cn("w-3 h-3", !kpi.trendUp && "rotate-180")} />
                  {kpi.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates Section */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-foreground mb-4">Modèles de rapport</h2>
            <div className="space-y-3">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", template.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Rapports récents</h2>
              <Button variant="outline" size="sm">Voir tout</Button>
            </div>
            <div className="space-y-3">
              {reports.map((report) => {
                const StatusIcon = statusConfig[report.status].icon;
                return (
                  <div
                    key={report.id}
                    className="p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">{report.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn("text-xs", typeConfig[report.type].color)}>
                              {typeConfig[report.type].label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(report.date).toLocaleDateString("fr-FR")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {report.format}
                            </span>
                            {report.size && (
                              <span className="text-xs text-muted-foreground">
                                • {report.size}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("gap-1", statusConfig[report.status].color)}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[report.status].label}
                        </Badge>
                        {report.status === "ready" && (
                          <>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Prochains rapports planifiés</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Rapport RSE Q1 2024</p>
                      <p className="text-sm text-muted-foreground">Génération automatique</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">1 avril 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Bilan Carbone semestriel</p>
                      <p className="text-sm text-muted-foreground">Génération automatique</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">1 juillet 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
