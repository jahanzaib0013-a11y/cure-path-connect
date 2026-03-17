import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Filter, CheckCircle2, Clock, AlertCircle, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/follow-ups")({
  head: () => ({
    meta: [
      { title: "Follow-ups — Cure Track" },
      { name: "description", content: "Manage today's and missed patient follow-ups." },
    ],
  }),
  component: FollowUpsPage,
});

const today = [
  { initials: "RM", name: "Robert Mitchell", meta: "P-9921 · 45 Yrs · Male", last: "12 Oct 2026", type: "Post-Surgery", typeTone: "primary", status: "Sent (WhatsApp)", statusTone: "success", action: "Entry Details", actionVariant: "link" },
  { initials: "EL", name: "Elena Larsson", meta: "P-8442 · 32 Yrs · Female", last: "18 Oct 2026", type: "Routine Check", typeTone: "secondary", status: "Pending SMS", statusTone: "muted", action: "Entry Details", actionVariant: "link" },
  { initials: "JK", name: "James Kowalski", meta: "P-1102 · 67 Yrs · Male", last: "15 Oct 2026", type: "Chronic Management", typeTone: "warning", status: "Failed to deliver", statusTone: "destructive", action: "Retry Call", actionVariant: "primary" },
  { initials: "AN", name: "Amelia Nguyen", meta: "P-7754 · 28 Yrs · Female", last: "20 Oct 2026", type: "Lab Review", typeTone: "primary", status: "Sent (WhatsApp)", statusTone: "success", action: "Entry Details", actionVariant: "link" },
];

const missed = [
  { initials: "DP", name: "David Park", meta: "P-3321 · 54 Yrs · Male", last: "02 Oct 2026", type: "Post-Surgery", typeTone: "primary", status: "No response", statusTone: "destructive", action: "Reschedule", actionVariant: "primary" },
  { initials: "SR", name: "Sara Rivera", meta: "P-2240 · 39 Yrs · Female", last: "28 Sep 2026", type: "Chronic Management", typeTone: "warning", status: "Phone busy", statusTone: "muted", action: "Retry Call", actionVariant: "primary" },
];

const typeTone: Record<string, string> = {
  primary: "bg-primary-soft text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  warning: "bg-warning-soft text-warning-foreground",
};

function StatusPill({ tone, label }: { tone: string; label: string }) {
  const map: Record<string, { cls: string; icon: React.ReactNode }> = {
    success: { cls: "text-success", icon: <CheckCircle2 className="h-4 w-4" /> },
    muted: { cls: "text-muted-foreground", icon: <Clock className="h-4 w-4" /> },
    destructive: { cls: "text-destructive", icon: <AlertCircle className="h-4 w-4" /> },
  };
  const m = map[tone];
  return <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${m.cls}`}>{m.icon}{label}</span>;
}

function FollowUpsPage() {
  const [tab, setTab] = useState<"today" | "missed">("today");
  const rows = tab === "today" ? today : missed;
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Follow-up Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and manage patient recovery tracking.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-glow">
          <Plus className="h-4 w-4" /> New Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Today's Completion</div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className="font-display text-4xl font-bold text-primary">18/24</div>
                <div className="text-sm text-muted-foreground">Patients checked</div>
              </div>
              <div className="mt-3 h-2 w-full max-w-md overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-primary to-primary-glow" />
              </div>
            </div>
            <div className="hidden h-20 w-32 items-end gap-2 md:flex">
              <div className="h-1/3 flex-1 rounded-t-md bg-primary-soft" />
              <div className="h-2/3 flex-1 rounded-t-md bg-primary/60" />
              <div className="h-full flex-1 rounded-t-md bg-primary" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-destructive/20 bg-destructive-soft p-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-destructive">Missed Attention</div>
          <div className="mt-2 font-display text-4xl font-bold text-destructive">06</div>
          <div className="mt-2 text-sm text-muted-foreground">Requires immediate rescheduling</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          {[
            { k: "today", label: "Today's follow-ups" },
            { k: "missed", label: "Missed follow-ups" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as "today" | "missed")}
              className={`relative px-4 py-4 text-sm font-semibold transition-colors ${tab === t.k ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
              {tab === t.k && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-border px-6 py-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Filter By:</span>
          <select className="h-9 rounded-lg border border-border bg-background px-3 text-sm">
            <option>All Departments</option><option>Cardiology</option><option>Pediatrics</option>
          </select>
          <select className="h-9 rounded-lg border border-border bg-background px-3 text-sm">
            <option>All Status</option><option>Sent</option><option>Pending</option><option>Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-semibold">Patient Name</th>
                <th className="px-6 py-4 font-semibold">Last Visit</th>
                <th className="px-6 py-4 font-semibold">Follow-up Type</th>
                <th className="px-6 py-4 font-semibold">Reminder Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.name} className="hover:bg-secondary/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">{r.initials}</div>
                      <div>
                        <div className="font-semibold text-foreground">{r.name}</div>
                        <div className="text-[11px] text-muted-foreground">{r.meta}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{r.last}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${typeTone[r.typeTone]}`}>{r.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill tone={r.statusTone} label={r.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {r.actionVariant === "primary" ? (
                      <button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-glow">{r.action}</button>
                    ) : (
                      <button className="text-sm font-semibold text-primary hover:underline">{r.action}</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4 text-sm">
          <div className="text-muted-foreground">Showing {rows.length} of {tab === "today" ? 24 : 6} patients</div>
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
            <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><BarChart3 className="h-5 w-5" /></div>
          <div>
            <div className="font-semibold">Reminder Channel Performance</div>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp delivery is at 92% this week — 14% above SMS. Consider defaulting non-urgent follow-ups to WhatsApp.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
