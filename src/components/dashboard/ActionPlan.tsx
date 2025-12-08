import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Action {
  id: string;
  title: string;
  category: "environnement" | "social" | "gouvernance";
  priority: "haute" | "moyenne" | "basse";
  progress: number;
  impact: string;
  quickWin?: boolean;
}

const actions: Action[] = [
  {
    id: "1",
    title: "Réduire la consommation énergétique des bureaux",
    category: "environnement",
    priority: "haute",
    progress: 65,
    impact: "-15% CO₂",
    quickWin: true,
  },
  {
    id: "2",
    title: "Mettre en place le télétravail hybride",
    category: "social",
    priority: "haute",
    progress: 80,
    impact: "Bien-être +",
  },
  {
    id: "3",
    title: "Former les équipes à la cybersécurité",
    category: "gouvernance",
    priority: "moyenne",
    progress: 40,
    impact: "Risques -",
  },
  {
    id: "4",
    title: "Installer des panneaux solaires",
    category: "environnement",
    priority: "moyenne",
    progress: 20,
    impact: "-30% facture",
  },
];

const categoryColors = {
  environnement: "bg-success/10 text-success border-success/20",
  social: "bg-info/10 text-info border-info/20",
  gouvernance: "bg-accent/10 text-accent border-accent/20",
};

const priorityColors = {
  haute: "bg-destructive/10 text-destructive",
  moyenne: "bg-warning/10 text-warning",
  basse: "bg-muted text-muted-foreground",
};

export function ActionPlan() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Plan d'action RSE
          </h3>
          <p className="text-sm text-muted-foreground">
            4 actions prioritaires ce mois
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          Voir tout <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="p-4 rounded-xl border border-border bg-background hover:bg-secondary/30 transition-colors"
          >
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <Badge
                variant="outline"
                className={cn("text-xs font-medium", categoryColors[action.category])}
              >
                {action.category}
              </Badge>
              <Badge className={cn("text-xs", priorityColors[action.priority])}>
                {action.priority}
              </Badge>
              {action.quickWin && (
                <Badge className="bg-accent/10 text-accent text-xs gap-1">
                  <Zap className="w-3 h-3" /> Quick Win
                </Badge>
              )}
            </div>
            
            <h4 className="font-medium text-foreground mb-2">{action.title}</h4>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <Progress value={action.progress} className="h-2" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {action.progress}%
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-success" />
                Impact: {action.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
