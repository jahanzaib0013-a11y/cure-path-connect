import { createFileRoute } from "@tanstack/react-router";
import { Search, Heart, Thermometer, Activity, Stethoscope, Pill, DollarSign, Calendar, Plus, Trash2, MessageCircle, Printer, Save, FileText, History, UserPlus, Eye } from "lucide-react";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit Entry — Cure Track" },
      { name: "description", content: "Create a new clinical record for a patient visit." },
    ],
  }),
  component: VisitPage,
});

const meds = [
  { name: "Amlodipine 5mg", dosage: "1 Tablet", frequency: "Once Daily (Morning)", duration: "30 Days" },
  { name: "Lisinopril 10mg", dosage: "1 Tablet", frequency: "Once Daily (Evening)", duration: "30 Days" },
];

function VisitPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Visit Entry</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create a new clinical record for a patient visit.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent">
            <History className="h-4 w-4" /> Recent Visits
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow">
            <UserPlus className="h-4 w-4" /> New Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: patient + vitals */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Patient Details</h2>
              <span className="rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">Verified</span>
            </div>
            <label className="mt-4 block text-xs font-semibold text-foreground">Search Registered Patient</label>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input defaultValue="James Henderson" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
            </div>

            <div className="mt-4 rounded-xl bg-primary-soft/60 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-sm font-bold text-primary-foreground">JH</div>
                <div>
                  <div className="font-semibold text-primary">James Henderson</div>
                  <div className="font-mono text-[11px] text-muted-foreground">ID: #CT-8829-JH</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Age / Gender</div>
                  <div className="mt-0.5 font-semibold">42 yrs / Male</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Blood Type</div>
                  <div className="mt-0.5 font-semibold text-destructive">O Positive</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="-mx-6 -mt-6 mb-4 h-1 rounded-t-2xl bg-gradient-to-r from-primary to-primary-glow" />
            <h2 className="font-display text-lg font-semibold">Vitals Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <VitalRow icon={<Heart className="h-4 w-4 text-destructive" />} label="Blood Pressure" value="128/84 mmHg" />
              <VitalRow icon={<Thermometer className="h-4 w-4 text-primary" />} label="Temperature" value="98.6 °F" />
              <VitalRow icon={<Activity className="h-4 w-4 text-success" />} label="Heart Rate" value="72 bpm" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-primary-soft/60 p-5">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Patient Compliance</div>
                <p className="mt-1 text-xs text-muted-foreground">Previous adherence to medication: <span className="font-semibold text-foreground">85%</span>. Consistent with hypertension plan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: clinical notes */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary"><Stethoscope className="h-5 w-5" /></div>
                <h2 className="font-display text-lg font-semibold">Clinical Notes</h2>
              </div>
              <span className="text-xs italic text-muted-foreground">Auto-saving…</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Diagnosis / Disease">
                <div className="relative">
                  <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input defaultValue="Essential Hypertension" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </Field>
              <Field label="Symptoms">
                <div className="flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <input placeholder="Add symptom" className="flex-1 bg-transparent text-sm outline-none" />
                  <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">Headache</span>
                  <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-semibold text-primary">Dizziness</span>
                </div>
              </Field>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-sm font-semibold">Prescribed Medicines</div>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60">
                    <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 font-semibold">Medicine Name</th>
                      <th className="px-4 py-3 font-semibold">Dosage</th>
                      <th className="px-4 py-3 font-semibold">Frequency</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {meds.map((m) => (
                      <tr key={m.name}>
                        <td className="px-4 py-3 font-semibold text-primary">{m.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.dosage}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.frequency}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.duration}</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-destructive hover:opacity-80"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="flex w-full items-center justify-center gap-2 border-t border-dashed border-border bg-primary-soft/30 py-3 text-sm font-semibold text-primary hover:bg-primary-soft">
                  <Plus className="h-4 w-4" /> Add Medicine
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Consultation Fees">
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input defaultValue="120.00" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </Field>
              <Field label="Next Visit Date">
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="date" defaultValue="2026-05-15" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </Field>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border pt-5 md:flex-row md:justify-between">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent">
                  <Printer className="h-4 w-4" /> Print Prescription
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent">Discard</button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-glow">
                  <Save className="h-4 w-4" /> Save Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function VitalRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2.5">
      <div className="flex items-center gap-2 text-muted-foreground"><span>{icon}</span>{label}</div>
      <div className="rounded-md bg-card px-2.5 py-1 text-sm font-semibold">{value}</div>
    </div>
  );
}
