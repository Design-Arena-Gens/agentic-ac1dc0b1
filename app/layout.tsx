import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coach Compass | Fitness Progress Tracker",
  description:
    "A centralized progress tracker for fitness coaches to monitor clients, sessions, and milestones"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Coach Compass
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-300">
                  Keep every client on track with a real-time control center for fitness coaches.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  Live Dashboard
                </span>
                <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-brand-200">
                  Beta
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 pb-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
