import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Target,
  Shield,
  Zap,
  Users,
  FileText,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Diagnostic instantané",
    description: "Évaluez votre maturité RSE en 10 minutes grâce à notre questionnaire intelligent basé sur ISO 26000.",
  },
  {
    icon: Target,
    title: "Plans d'action sur mesure",
    description: "Recevez des recommandations personnalisées avec des quick wins pour des résultats immédiats.",
  },
  {
    icon: Shield,
    title: "Conformité simplifiée",
    description: "RGPD, CSRD, ESG : suivez votre conformité réglementaire via des checklists dynamiques.",
  },
  {
    icon: FileText,
    title: "Reporting automatisé",
    description: "Générez vos rapports RSE en un clic pour vos parties prenantes et investisseurs.",
  },
];

const stats = [
  { value: "500+", label: "Entreprises accompagnées" },
  { value: "72%", label: "Score RSE moyen" },
  { value: "3 mois", label: "Pour voir des résultats" },
  { value: "40%", label: "Réduction CO₂ moyenne" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Leaf className="w-4 h-4" />
              La RSE accessible à toutes les entreprises
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Simplifiez votre démarche{" "}
              <span className="text-primary">RSE</span> et obtenez des résultats
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Diagnostiquez, planifiez et suivez votre performance RSE avec une plateforme 
              intelligente conçue pour startups, PME et grands groupes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/diagnostic">
                <Button variant="hero" size="xl" className="gap-2">
                  Lancer mon diagnostic gratuit
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl">
                  Voir une démo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" /> Essai gratuit
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" /> Sans carte bancaire
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" /> Résultats en 10 min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tout ce qu'il faut pour réussir votre RSE
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète qui vous accompagne de l'évaluation au reporting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Commencez en moins de 2 minutes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à transformer votre impact RSE ?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Rejoignez les centaines d'entreprises qui ont déjà accéléré leur transition responsable.
            </p>
            <Link to="/diagnostic">
              <Button variant="secondary" size="xl" className="gap-2">
                Démarrer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">R</span>
              </div>
              <span className="font-heading font-semibold text-foreground">
                RSE<span className="text-primary">360</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RSE360. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
