import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", co2: 320, energie: 280, score: 58 },
  { month: "Fév", co2: 300, energie: 270, score: 60 },
  { month: "Mar", co2: 290, energie: 260, score: 62 },
  { month: "Avr", co2: 275, energie: 250, score: 65 },
  { month: "Mai", co2: 260, energie: 240, score: 68 },
  { month: "Juin", co2: 245, energie: 230, score: 72 },
];

export function MetricsChart() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Évolution des indicateurs
        </h3>
        <p className="text-sm text-muted-foreground">
          Progression sur les 6 derniers mois
        </p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">CO₂ (tonnes)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-info" />
          <span className="text-sm text-muted-foreground">Énergie (MWh)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Score RSE</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145, 60%, 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(145, 60%, 42%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorEnergie" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(200, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 45%, 28%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152, 45%, 28%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 88%)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "hsl(150, 10%, 45%)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(150, 10%, 45%)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(150, 15%, 88%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="co2"
              stroke="hsl(145, 60%, 42%)"
              fillOpacity={1}
              fill="url(#colorCo2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="energie"
              stroke="hsl(200, 80%, 50%)"
              fillOpacity={1}
              fill="url(#colorEnergie)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(152, 45%, 28%)"
              fillOpacity={1}
              fill="url(#colorScore)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
