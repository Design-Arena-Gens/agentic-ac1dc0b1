import { UpcomingSession } from "@/lib/metrics";

interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
}

const emphasisColor: Record<UpcomingSession["emphasis"], string> = {
  strength: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
  conditioning: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  mobility: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  recovery: "border-amber-500/30 bg-amber-500/10 text-amber-200"
};

export function UpcomingSessions({ sessions }: UpcomingSessionsProps) {
  return (
    <section className="glass-panel flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Upcoming Sessions</h2>
          <p className="text-sm text-slate-400">Prioritize prep notes and programming adjustments.</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          Auto-sync: Google Calendar
        </span>
      </div>
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="glass-panel-subtle flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-sm text-slate-300">
                <span className="text-white">{session.clientName}</span>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {new Intl.DateTimeFormat("en", {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  }).format(new Date(session.date))}
                </span>
              </div>
              <div className="hidden h-12 w-px bg-white/5 sm:block" />
              <p className="text-sm text-slate-200">{session.focus}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs ${emphasisColor[session.emphasis]}`}>
              {session.emphasis}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingSessions;
