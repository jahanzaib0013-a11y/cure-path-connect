import { createFileRoute } from "@tanstack/react-router";
import { Users, CalendarDays, Gauge, TrendingUp, Plus, Download, MoreVertical, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Cure Track" },
      { name: "description", content: "Clinic overview: patients, today's visits and follow-ups." },
    ],
  }),
  component: Dashboard,
});

const recent = [
  { initials: "EK", name: "Eleanor Kade", id: "PT-9021", reason: "Annual Health Check", time: "09:45 AM", status: "Completed", tone: "success" },
  { initials: "MS", name: "Marcus Sterling", id: "PT-8832", reason: "Follow-up: Hypertension", time: "10:15 AM", status: "In Progress", tone: "primary" },
  { initials: "AL", name: "Aria Lindquist", id: "PT-1229", reason: "Acute Respiratory Distress", time: "11:00 AM", status: "Waiting", tone: "warning" },
  { initials: "DR", name: "Daniel Reyes", id: "PT-7714", reason: "Diabetes Review", time: "11:30 AM", status: "Waiting", tone: "warning" },
];

const followups = [
  { tag: "POST-OP CHECK", time: "14:30", name: "Henry Cavill", note: "Reviewing cardiac rehab progress and adjusting medication dosage." },
  { tag: "LAB RESULTS", time: "15:15", name: "Sophia Rossi", note: "Discussion of recent blood work and thyroid function tests." },
];

const toneClass: Record<string, string> = {
  success: "bg-success-soft text-success",
  primary: "bg-primary-soft text-primary",
  warning: "bg-warning-soft text-warning-foreground",
};

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-sm font-semibold text-primary">Clinic Overview</h1>
          <p className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">Welcome back, Dr. Vance.</p>
          <p className="text-sm text-muted-foreground">Here is what is happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-accent">
            <Download className="h-4 w-4" /> Export Report
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-glow">
            <Plus className="h-4 w-4" /> New Visit Entry
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Patients" value="1,284" trend="+12%" footer="Active clinical records" />
        <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Today's Visits" value="24" trend="+8" trendIcon footer="8 completed · 16 remaining" />
        <StatCard icon={<Gauge className="h-5 w-5" />} label="Avg. Consultation" value="18m" footer={
          <div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
            </div>
            <div className="mt-1 text-right text-[11px] text-muted-foreground">Target: 15m</div>
          </div>
        } />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent patients */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent Patients</h2>
            <a className="text-sm font-medium text-primary hover:underline" href="#">View All Records</a>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Patient Name</th>
                  <th className="pb-3 font-semibold">Visit Reason</th>
                  <th className="pb-3 font-semibold">Time</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">{r.initials}</div>
                        <div>
                          <div className="font-semibold text-foreground">{r.name}</div>
                          <div className="text-[11px] text-muted-foreground">ID: #{r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-muted-foreground">{r.reason}</td>
                    <td className="py-3.5 text-muted-foreground">{r.time}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClass[r.tone]}`}>{r.status}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent"><MoreVertical className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Follow-ups */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div>
            <h2 className="font-display text-lg font-semibold">Follow-ups Due Today</h2>
            <p className="text-xs text-muted-foreground">6 patients requiring attention</p>
          </div>
          <div className="mt-4 space-y-3">
            {followups.map((f) => (
              <div key={f.name} className="rounded-xl bg-primary-soft/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-card px-2 py-1 text-[10px] font-bold tracking-wide text-primary">{f.tag}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{f.time}</span>
                </div>
                <div className="mt-2 font-semibold text-foreground">{f.name}</div>
                <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold hover:bg-accent">Notify</button>
                  <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-glow">Prepare</button>
                </div>
              </div>
            ))}
            <button className="w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:bg-accent">View All Tasks</button>
          </div>
        </div>
      </div>

      {/* Insight bar */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold">Clinical Efficiency Insight</div>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
              Based on last week's data, Tuesday mornings have the highest patient inflow. Consider scheduling non-urgent follow-ups after 2:00 PM to maintain optimal service quality.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:w-auto">
            <div className="rounded-xl bg-primary-soft px-4 py-2 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Inflow Peak</div>
              <div className="mt-0.5 text-sm font-semibold text-primary">09:00 – 11:30</div>
            </div>
            <div className="rounded-xl bg-primary-soft px-4 py-2 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recommendation</div>
              <div className="mt-0.5 text-sm font-semibold text-primary">Reschedule 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, trend, trendIcon, footer,
}: { icon: React.ReactNode; label: string; value: string; trend?: string; trendIcon?: boolean; footer: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</div>
        {trend && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">
            {trendIcon && <TrendingUp className="h-3 w-3" />} {trend}
          </span>
        )}
      </div>
      <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-primary">{value}</div>
      <div className="mt-2 text-xs text-muted-foreground">{footer}</div>
    </div>
  );
}
