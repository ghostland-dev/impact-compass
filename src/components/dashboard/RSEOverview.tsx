import { ScoreRing } from "@/components/ui/score-ring";
import { StatCard } from "@/components/ui/stat-card";
import { Leaf, Users, Building2, Shield } from "lucide-react";

export function RSEOverview() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Global Score */}
        <div className="flex-shrink-0 p-6 rounded-2xl gradient-card border border-border shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">Score RSE Global</h3>
            <ScoreRing score={72} size="lg" label="/ 100" />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                +8 pts ce mois
              </span>
            </div>
          </div>
        </div>

        {/* Pillar Scores */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-card border border-border flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success" />
            </div>
            <ScoreRing score={78} size="sm" />
            <div className="text-center">
              <p className="font-medium text-foreground">Environnement</p>
              <p className="text-xs text-muted-foreground">CO₂, énergie, déchets</p>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-card border border-border flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-info" />
            </div>
            <ScoreRing score={65} size="sm" />
            <div className="text-center">
              <p className="font-medium text-foreground">Social</p>
              <p className="text-xs text-muted-foreground">Inclusion, bien-être</p>
            </div>
          </div>
          
          <div className="p-5 rounded-xl bg-card border border-border flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <ScoreRing score={71} size="sm" />
            <div className="text-center">
              <p className="font-medium text-foreground">Gouvernance</p>
              <p className="text-xs text-muted-foreground">Éthique, transparence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Émissions CO₂"
          value="245 t"
          icon={Leaf}
          variant="success"
          trend={{ value: -12, label: "vs. année précédente", positive: true }}
        />
        <StatCard
          title="Actions en cours"
          value="18"
          subtitle="sur 24 planifiées"
          icon={Shield}
          variant="primary"
        />
        <StatCard
          title="Conformité RGPD"
          value="94%"
          icon={Shield}
          variant="success"
          trend={{ value: 6, label: "ce trimestre", positive: true }}
        />
        <StatCard
          title="Taux d'inclusion"
          value="47%"
          subtitle="objectif : 50%"
          icon={Users}
          variant="warning"
        />
      </div>
    </section>
  );
}
