import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Plus,
  Filter,
  Zap,
  Leaf,
  Users,
  Building2,
  ArrowUpRight,
  Calendar
} from "lucide-react";
import { useState } from "react";

type Priority = "haute" | "moyenne" | "basse";
type Status = "todo" | "in_progress" | "done";
type Category = "environnement" | "social" | "gouvernance";

interface Action {
  id: number;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  progress: number;
  dueDate: string;
  impact: number;
  quickWin: boolean;
}

const actions: Action[] = [
  {
    id: 1,
    title: "Réaliser un bilan carbone",
    description: "Mesurer les émissions de gaz à effet de serre de l'entreprise selon le protocole GHG",
    category: "environnement",
    priority: "haute",
    status: "in_progress",
    progress: 60,
    dueDate: "2024-03-15",
    impact: 85,
    quickWin: false,
  },
  {
    id: 2,
    title: "Mettre en place le tri sélectif",
    description: "Installer des poubelles de tri dans tous les bureaux et espaces communs",
    category: "environnement",
    priority: "moyenne",
    status: "done",
    progress: 100,
    dueDate: "2024-02-01",
    impact: 40,
    quickWin: true,
  },
  {
    id: 3,
    title: "Former les managers à la diversité",
    description: "Sensibiliser les équipes aux enjeux d'inclusion et de diversité",
    category: "social",
    priority: "haute",
    status: "todo",
    progress: 0,
    dueDate: "2024-04-30",
    impact: 70,
    quickWin: false,
  },
  {
    id: 4,
    title: "Créer un comité RSE",
    description: "Mettre en place une gouvernance dédiée à la RSE avec des objectifs clairs",
    category: "gouvernance",
    priority: "haute",
    status: "in_progress",
    progress: 30,
    dueDate: "2024-03-01",
    impact: 90,
    quickWin: false,
  },
  {
    id: 5,
    title: "Rédiger une charte télétravail",
    description: "Formaliser les règles du travail à distance pour améliorer l'équilibre vie pro/perso",
    category: "social",
    priority: "moyenne",
    status: "done",
    progress: 100,
    dueDate: "2024-01-15",
    impact: 50,
    quickWin: true,
  },
  {
    id: 6,
    title: "Audit fournisseurs responsables",
    description: "Évaluer les pratiques RSE de nos principaux fournisseurs",
    category: "gouvernance",
    priority: "moyenne",
    status: "todo",
    progress: 0,
    dueDate: "2024-05-15",
    impact: 65,
    quickWin: false,
  },
];

const categoryConfig = {
  environnement: { icon: Leaf, color: "text-success", bg: "bg-success/10" },
  social: { icon: Users, color: "text-info", bg: "bg-info/10" },
  gouvernance: { icon: Building2, color: "text-accent", bg: "bg-accent/10" },
};

const priorityConfig = {
  haute: { label: "Haute", color: "bg-destructive/10 text-destructive border-destructive/20" },
  moyenne: { label: "Moyenne", color: "bg-warning/10 text-warning border-warning/20" },
  basse: { label: "Basse", color: "bg-muted text-muted-foreground border-border" },
};

const statusConfig = {
  todo: { label: "À faire", color: "text-muted-foreground" },
  in_progress: { label: "En cours", color: "text-info" },
  done: { label: "Terminé", color: "text-success" },
};

export default function Actions() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");

  const filteredActions = actions.filter((action) => {
    if (filter !== "all" && action.category !== filter) return false;
    if (statusFilter !== "all" && action.status !== statusFilter) return false;
    return true;
  });

  const completedCount = actions.filter(a => a.status === "done").length;
  const inProgressCount = actions.filter(a => a.status === "in_progress").length;
  const todoCount = actions.filter(a => a.status === "todo").length;
  const globalProgress = Math.round((completedCount / actions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Plan d'action RSE</h1>
            <p className="text-muted-foreground mt-1">
              Gérez et suivez vos actions RSE prioritaires
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="w-4 h-4" /> Nouvelle action
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{actions.length}</p>
                <p className="text-sm text-muted-foreground">Actions totales</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Terminées</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{todoCount}</p>
                <p className="text-sm text-muted-foreground">À faire</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-6 rounded-xl border border-border bg-card mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Progression globale</h3>
            <span className="text-lg font-bold text-primary">{globalProgress}%</span>
          </div>
          <Progress value={globalProgress} className="h-3" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filtrer :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Toutes
            </Button>
            <Button
              variant={filter === "environnement" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilter("environnement")}
              className="gap-2"
            >
              <Leaf className="w-4 h-4" /> Environnement
            </Button>
            <Button
              variant={filter === "social" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilter("social")}
              className="gap-2"
            >
              <Users className="w-4 h-4" /> Social
            </Button>
            <Button
              variant={filter === "gouvernance" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilter("gouvernance")}
              className="gap-2"
            >
              <Building2 className="w-4 h-4" /> Gouvernance
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button
              variant={statusFilter === "all" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              Tous statuts
            </Button>
            <Button
              variant={statusFilter === "todo" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("todo")}
            >
              À faire
            </Button>
            <Button
              variant={statusFilter === "in_progress" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("in_progress")}
            >
              En cours
            </Button>
            <Button
              variant={statusFilter === "done" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("done")}
            >
              Terminé
            </Button>
          </div>
        </div>

        {/* Actions List */}
        <div className="space-y-4">
          {filteredActions.map((action) => {
            const CategoryIcon = categoryConfig[action.category].icon;
            return (
              <div
                key={action.id}
                className={cn(
                  "p-6 rounded-xl border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/20",
                  action.status === "done" && "opacity-75"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Category Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    categoryConfig[action.category].bg
                  )}>
                    <CategoryIcon className={cn("w-6 h-6", categoryConfig[action.category].color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className={cn(
                        "font-semibold text-foreground",
                        action.status === "done" && "line-through"
                      )}>
                        {action.title}
                      </h3>
                      {action.quickWin && (
                        <Badge variant="outline" className="gap-1 bg-success/10 text-success border-success/20">
                          <Zap className="w-3 h-3" /> Quick Win
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {action.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className={priorityConfig[action.priority].color}>
                        {priorityConfig[action.priority].label}
                      </Badge>
                      <span className={cn("text-sm font-medium", statusConfig[action.status].color)}>
                        {statusConfig[action.status].label}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(action.dueDate).toLocaleDateString("fr-FR")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Impact : <span className="font-medium text-primary">{action.impact}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress & Actions */}
                  <div className="flex items-center gap-4 lg:w-48">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progression</span>
                        <span className="text-xs font-medium text-foreground">{action.progress}%</span>
                      </div>
                      <Progress value={action.progress} className="h-2" />
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune action ne correspond aux filtres sélectionnés.</p>
          </div>
        )}
      </main>
    </div>
  );
}
