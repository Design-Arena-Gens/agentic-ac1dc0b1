import Link from "next/link";
import { calculateStrengthProgress, calculateWeightDelta, getLatestProgressRecord } from "@/lib/metrics";
import type { ClientProfile } from "@/lib/types";

interface ClientProgressTableProps {
  clients: ClientProfile[];
}

const statusBadgeCopy: Record<ClientProfile["status"], { label: string; className: string }> = {
  "on-track": {
    label: "On track",
    className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
  },
  "at-risk": {
    label: "Needs attention",
    className: "bg-amber-500/10 text-amber-200 border-amber-500/30"
  },
  celebrating: {
    label: "Milestone hit",
    className: "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-500/30"
  }
};

export function ClientProgressTable({ clients }: ClientProgressTableProps) {
  return (
    <section className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Client Progress Pulse</h2>
          <p className="text-sm text-slate-400">Snapshot of adherence, momentum and last touchpoints.</p>
        </div>
        <Link
          href="/clients"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Manage roster
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Program Goal</th>
              <th className="px-6 py-3 font-medium">Last Check-in</th>
              <th className="px-6 py-3 font-medium">Weight Trend</th>
              <th className="px-6 py-3 font-medium">Strength Gain</th>
              <th className="px-6 py-3 font-medium">Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clients.map((client) => {
              const weight = calculateWeightDelta(client);
              const strength = calculateStrengthProgress(client);
              const latest = getLatestProgressRecord(client);
              const complianceAvg = Math.round(
                (client.compliance.nutrition + client.compliance.training + client.compliance.recovery) / 3
              );

              return (
                <tr key={client.id} className="hover:bg-white/[0.03]">
                  <td className="px-6 py-4">
                    <Link href={`/clients/${client.id}`} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-sm font-semibold text-brand-100">
                        {client.avatarInitials}
                      </span>
                      <div>
                        <p className="font-medium text-white">{client.name}</p>
                        <span
                          className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                            statusBadgeCopy[client.status].className
                          }`}
                        >
                          {statusBadgeCopy[client.status].label}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{client.goal}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
                      new Date(client.latestCheckIn)
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                        weight.delta < 0
                          ? "bg-emerald-500/10 text-emerald-200"
                          : weight.delta > 0
                            ? "bg-amber-500/10 text-amber-200"
                            : "bg-slate-500/10 text-slate-200"
                      }`}
                    >
                      <span>{weight.delta > 0 ? "+" : weight.delta < 0 ? "-" : "±"}</span>
                      <span>{Math.abs(weight.delta)}kg</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex flex-col">
                      <span className="text-sm text-white">+{strength.change} pts</span>
                      <span className="text-xs text-slate-400">{strength.percentage}% gain</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-slate-300">
                      <span>Overall: {complianceAvg}%</span>
                      <div className="flex gap-2">
                        <span>Nutrition {client.compliance.nutrition}%</span>
                        <span>Training {client.compliance.training}%</span>
                        <span>Recovery {client.compliance.recovery}%</span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-xs text-slate-400">
        Metrics update automatically after coach check-ins, wearable sync, or client habit logs.
      </div>
    </section>
  );
}

export default ClientProgressTable;
