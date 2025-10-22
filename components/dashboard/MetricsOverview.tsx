import { DashboardMetrics } from "@/lib/metrics";

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
  readinessIndex: number;
}

const metricCopy: Record<keyof DashboardMetrics, { label: string; hint: string }> = {
  activeClients: {
    label: "Active Clients",
    hint: "Total clients currently enrolled across programs"
  },
  onTrackRate: {
    label: "On-Track Rate",
    hint: "Clients making planned progress this month"
  },
  averageCompliance: {
    label: "Average Compliance",
    hint: "Aggregate nutrition, training & recovery adherence"
  },
  attentionClients: {
    label: "Needs Attention",
    hint: "Flagged clients with stalled progress"
  },
  celebrationClients: {
    label: "Win Stories",
    hint: "Clients hitting major milestones recently"
  }
};

const formatValue = (key: keyof DashboardMetrics, value: number) => {
  if (key === "activeClients" || key === "attentionClients" || key === "celebrationClients") {
    return value;
  }
  return `${value}%`;
};

export function MetricsOverview({ metrics, readinessIndex }: MetricsOverviewProps) {
  return (
    <section className="glass-panel relative overflow-hidden">
      <div className="blurred-gradient" />
      <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="glass-panel-subtle flex flex-col gap-2 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              {metricCopy[key as keyof DashboardMetrics].label}
            </div>
            <div className="text-2xl font-semibold text-white">
              {formatValue(key as keyof DashboardMetrics, value as number)}
            </div>
            <p className="text-xs text-slate-400">
              {metricCopy[key as keyof DashboardMetrics].hint}
            </p>
          </div>
        ))}
        <div className="glass-panel-subtle flex flex-col gap-2 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-400">Readiness Index</div>
          <div className="text-2xl font-semibold text-white">{readinessIndex}%</div>
          <p className="text-xs text-slate-400">
            Composite score factoring momentum, compliance and recovery markers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MetricsOverview;
