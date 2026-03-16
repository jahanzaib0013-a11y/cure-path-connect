import { createFileRoute } from "@tanstack/react-router";
import { Search, UserPlus, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      { title: "Patients — Cure Track" },
      { name: "description", content: "Search and manage all clinical patient records." },
    ],
  }),
  component: PatientsPage,
});

const patients = [
  { id: "CT-9821-A", initials: "JD", name: "Johnathan Doe", phone: "+1 (555) 0123-456", cnic: "42101-1234567-1", status: "Stable", address: "123 Clinical Way, Medical District, North Ridge" },
  { id: "CT-4412-B", initials: "SM", name: "Sarah Miller", phone: "+1 (555) 0198-772", cnic: "35202-9876543-2", status: "Pending", address: "Suite 402, Oak Ridge Medical Plaza, West End" },
  { id: "CT-1109-C", initials: "RK", name: "Robert King", phone: "+1 (555) 0112-990", cnic: "42201-4433221-3", status: "Critical", address: "Apartment 7G, Harbor View Residences, Bay Side" },
  { id: "CT-3388-D", initials: "EL", name: "Elena Lopez", phone: "+1 (555) 0144-883", cnic: "31303-1122334-4", status: "Stable", address: "99 Pine Street, Evergreen District, East Hills" },
  { id: "CT-7742-E", initials: "AW", name: "Arthur Wright", phone: "+1 (555) 0166-210", cnic: "42501-8877665-5", status: "Stable", address: "42 Baker Blvd, Industrial Park South" },
  { id: "CT-5520-F", initials: "MC", name: "Maya Chen", phone: "+1 (555) 0177-334", cnic: "61101-5566778-6", status: "Pending", address: "200 River Road, Greenfield, Apt 12B" },
];

const statusTone: Record<string, string> = {
  Stable: "bg-success-soft text-success",
  Pending: "bg-warning-soft text-warning-foreground",
  Critical: "bg-destructive-soft text-destructive",
};

function PatientsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Patient Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and manage clinical records for all registered patients.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary-glow">
          <UserPlus className="h-4 w-4" /> Add New Patient
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5">
            <label className="text-xs font-semibold text-primary">Search Patient</label>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search by Name or Phone…" className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-primary">Age Range</label>
            <select className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary">
              <option>All Ages</option><option>0-17</option><option>18-39</option><option>40-64</option><option>65+</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-primary">Gender</label>
            <select className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary">
              <option>All Genders</option><option>Male</option><option>Female</option>
            </select>
          </div>
          <div className="flex items-end md:col-span-2">
            <button className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-accent">
              <Filter className="h-4 w-4" /> More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-soft/60">
              <tr className="text-left text-[11px] uppercase tracking-wider text-primary">
                <th className="px-6 py-4 font-semibold">Patient ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">CNIC</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">{p.initials}</div>
                      <span className="font-semibold text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.phone}</td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{p.cnic}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusTone[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="max-w-xs truncate">{p.address}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-6 py-4 text-sm">
          <div className="text-muted-foreground">Showing 1 to 6 of 1,240 patients</div>
          <div className="flex items-center gap-1">
            <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
            <button className="grid h-8 w-8 place-items-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">1</button>
            <button className="grid h-8 w-8 place-items-center rounded-md text-xs font-medium hover:bg-accent">2</button>
            <button className="grid h-8 w-8 place-items-center rounded-md text-xs font-medium hover:bg-accent">3</button>
            <span className="px-1 text-muted-foreground">…</span>
            <button className="grid h-8 w-8 place-items-center rounded-md text-xs font-medium hover:bg-accent">248</button>
            <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
