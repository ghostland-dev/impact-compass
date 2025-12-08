import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ArrowLeft, Leaf, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    id: 1,
    category: "environnement",
    question: "Comment gérez-vous vos émissions de CO₂ ?",
    options: [
      { value: 0, label: "Nous ne mesurons pas nos émissions" },
      { value: 25, label: "Nous mesurons mais n'avons pas d'objectif" },
      { value: 50, label: "Nous avons des objectifs de réduction" },
      { value: 100, label: "Nous sommes engagés dans une démarche carbone neutre" },
    ],
  },
  {
    id: 2,
    category: "social",
    question: "Quelle est votre politique en matière de diversité et d'inclusion ?",
    options: [
      { value: 0, label: "Pas de politique formalisée" },
      { value: 25, label: "Politique en cours d'élaboration" },
      { value: 50, label: "Politique active avec des indicateurs" },
      { value: 100, label: "Programme mature avec des résultats mesurables" },
    ],
  },
  {
    id: 3,
    category: "gouvernance",
    question: "Comment intégrez-vous la RSE dans votre gouvernance ?",
    options: [
      { value: 0, label: "La RSE n'est pas un sujet au niveau direction" },
      { value: 25, label: "Discussion occasionnelle en comité" },
      { value: 50, label: "Un responsable RSE est désigné" },
      { value: 100, label: "La RSE est intégrée dans la stratégie globale" },
    ],
  },
];

const categoryIcons = {
  environnement: Leaf,
  social: Users,
  gouvernance: Building2,
};

const categoryColors = {
  environnement: "text-success",
  social: "text-info",
  gouvernance: "text-accent",
};

export default function Diagnostic() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const CategoryIcon = categoryIcons[question.category as keyof typeof categoryIcons];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    if (values.length === 0) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  if (isComplete) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Diagnostic terminé !
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Votre score RSE estimé est de :
            </p>
            <div className="text-7xl font-bold text-primary mb-2">{score}</div>
            <p className="text-muted-foreground mb-8">sur 100</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="gap-2">
                  Voir mon tableau de bord
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setIsComplete(false);
              }}>
                Recommencer
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                question.category === "environnement" && "bg-success/10",
                question.category === "social" && "bg-info/10",
                question.category === "gouvernance" && "bg-accent/10"
              )}>
                <CategoryIcon className={cn("w-5 h-5", categoryColors[question.category as keyof typeof categoryColors])} />
              </div>
              <span className="text-sm font-medium text-muted-foreground capitalize">
                {question.category}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all duration-200",
                    answers[question.id] === option.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/30 hover:bg-secondary/50"
                  )}
                >
                  <span className="font-medium text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Précédent
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={answers[question.id] === undefined}
              className="gap-2"
            >
              {currentQuestion === questions.length - 1 ? "Terminer" : "Suivant"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
