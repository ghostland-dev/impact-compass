import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Target, 
  FileText, 
  Shield,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/diagnostic", label: "Diagnostic", icon: ClipboardCheck },
  { href: "/actions", label: "Plan d'action", icon: Target },
  { href: "/reporting", label: "Reporting", icon: FileText },
  { href: "/conformite", label: "Conformité", icon: Shield },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="font-heading font-semibold text-xl text-foreground">
              RSE<span className="text-primary">360</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isHome && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className={cn(
                        "gap-2",
                        isActive && "bg-secondary text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isHome ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Connexion</Button>
                </Link>
                <Link to="/diagnostic">
                  <Button variant="hero" size="sm">Commencer gratuitement</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm">Mon compte</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {!isHome && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {isHome ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Connexion</Button>
                  </Link>
                  <Link to="/diagnostic" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full">Commencer gratuitement</Button>
                  </Link>
                </>
              ) : (
                <Button variant="outline" className="w-full">Mon compte</Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
