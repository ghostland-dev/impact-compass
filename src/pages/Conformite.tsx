import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Lock,
  Users,
  Globe,
  Building2,
  Leaf
} from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  critical?: boolean;
}

interface ComplianceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  progress: number;
  items: ChecklistItem[];
}

const complianceData: ComplianceCategory[] = [
  {
    id: "rgpd",
    title: "RGPD",
    description: "Règlement Général sur la Protection des Données",
    icon: Lock,
    color: "text-info",
    progress: 85,
    items: [
      { id: "rgpd-1", label: "Registre des traitements à jour", completed: true },
      { id: "rgpd-2", label: "Politique de confidentialité publiée", completed: true },
      { id: "rgpd-3", label: "DPO désigné", completed: true },
      { id: "rgpd-4", label: "Procédure de gestion des consentements", completed: true },
      { id: "rgpd-5", label: "Procédure de réponse aux demandes RGPD", completed: false, critical: true },
      { id: "rgpd-6", label: "Analyse d'impact (PIA) réalisée", completed: false },
      { id: "rgpd-7", label: "Formation des collaborateurs", completed: true },
    ],
  },
  {
    id: "csrd",
    title: "CSRD",
    description: "Corporate Sustainability Reporting Directive",
    icon: FileText,
    color: "text-primary",
    progress: 60,
    items: [
      { id: "csrd-1", label: "Double matérialité évaluée", completed: true },
      { id: "csrd-2", label: "Indicateurs ESRS définis", completed: true },
      { id: "csrd-3", label: "Données environnementales collectées", completed: true },
      { id: "csrd-4", label: "Données sociales collectées", completed: false },
      { id: "csrd-5", label: "Données gouvernance collectées", completed: false },
      { id: "csrd-6", label: "Rapport de durabilité rédigé", completed: false, critical: true },
      { id: "csrd-7", label: "Audit externe prévu", completed: false },
    ],
  },
  {
    id: "iso26000",
    title: "ISO 26000",
    description: "Lignes directrices relatives à la responsabilité sociétale",
    icon: Globe,
    color: "text-success",
    progress: 72,
    items: [
      { id: "iso-1", label: "Gouvernance organisationnelle", completed: true },
      { id: "iso-2", label: "Droits de l'Homme", completed: true },
      { id: "iso-3", label: "Relations et conditions de travail", completed: true },
      { id: "iso-4", label: "Environnement", completed: false },
      { id: "iso-5", label: "Loyauté des pratiques", completed: true },
      { id: "iso-6", label: "Questions relatives aux consommateurs", completed: true },
      { id: "iso-7", label: "Communautés et développement local", completed: false },
    ],
  },
  {
    id: "esg",
    title: "Critères ESG",
    description: "Environnement, Social, Gouvernance",
    icon: Building2,
    color: "text-accent",
    progress: 68,
    items: [
      { id: "esg-1", label: "Bilan carbone réalisé", completed: true },
      { id: "esg-2", label: "Politique diversité en place", completed: true },
      { id: "esg-3", label: "Code éthique publié", completed: true },
      { id: "esg-4", label: "Objectifs climatiques définis", completed: false, critical: true },
      { id: "esg-5", label: "Reporting ESG standardisé", completed: false },
    ],
  },
];

const getProgressColor = (progress: number) => {
  if (progress >= 80) return "text-success";
  if (progress >= 50) return "text-warning";
  return "text-destructive";
};

const getProgressBg = (progress: number) => {
  if (progress >= 80) return "bg-success";
  if (progress >= 50) return "bg-warning";
  return "bg-destructive";
};

export default function Conformite() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["rgpd"]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    complianceData.forEach(cat => {
      cat.items.forEach(item => {
        initial[item.id] = item.completed;
      });
    });
    return initial;
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateCategoryProgress = (category: ComplianceCategory) => {
    const total = category.items.length;
    const completed = category.items.filter(item => checkedItems[item.id]).length;
    return Math.round((completed / total) * 100);
  };

  const overallProgress = Math.round(
    complianceData.reduce((acc, cat) => acc + calculateCategoryProgress(cat), 0) / complianceData.length
  );

  const criticalIssues = complianceData.flatMap(cat => 
    cat.items.filter(item => item.critical && !checkedItems[item.id])
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Conformité réglementaire</h1>
            <p className="text-muted-foreground mt-1">
              Suivez votre conformité aux normes RSE et réglementations
            </p>
          </div>
          <Button variant="hero" className="gap-2">
            <FileText className="w-4 h-4" /> Exporter le rapport
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conformité globale</p>
                <p className={cn("text-3xl font-bold", getProgressColor(overallProgress))}>
                  {overallProgress}%
                </p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2 mt-4" />
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Éléments conformes</p>
                <p className="text-3xl font-bold text-foreground">
                  {Object.values(checkedItems).filter(Boolean).length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points critiques</p>
                <p className="text-3xl font-bold text-destructive">
                  {criticalIssues.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Issues Alert */}
        {criticalIssues.length > 0 && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Points critiques à traiter</h3>
                <ul className="mt-2 space-y-1">
                  {criticalIssues.map(issue => (
                    <li key={issue.id} className="text-sm text-muted-foreground flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      {issue.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Categories */}
        <div className="space-y-4">
          {complianceData.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.includes(category.id);
            const progress = calculateCategoryProgress(category);

            return (
              <div
                key={category.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    category.color === "text-info" && "bg-info/10",
                    category.color === "text-primary" && "bg-primary/10",
                    category.color === "text-success" && "bg-success/10",
                    category.color === "text-accent" && "bg-accent/10"
                  )}>
                    <Icon className={cn("w-6 h-6", category.color)} />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        progress >= 80 && "bg-success/10 text-success border-success/20",
                        progress >= 50 && progress < 80 && "bg-warning/10 text-warning border-warning/20",
                        progress < 50 && "bg-destructive/10 text-destructive border-destructive/20"
                      )}>
                        {progress}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:block w-32">
                      <Progress value={progress} className="h-2" />
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border">
                    <div className="pt-4 space-y-3">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg transition-colors",
                            checkedItems[item.id] ? "bg-success/5" : "bg-secondary/30",
                            item.critical && !checkedItems[item.id] && "bg-destructive/5 border border-destructive/20"
                          )}
                        >
                          <Checkbox
                            id={item.id}
                            checked={checkedItems[item.id]}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <label
                            htmlFor={item.id}
                            className={cn(
                              "flex-1 text-sm cursor-pointer",
                              checkedItems[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                            )}
                          >
                            {item.label}
                          </label>
                          {item.critical && !checkedItems[item.id] && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                              Critique
                            </Badge>
                          )}
                          {checkedItems[item.id] && (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
