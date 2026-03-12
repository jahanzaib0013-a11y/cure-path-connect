import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { LayoutGrid, Users, ClipboardPlus, CalendarClock, Search, Bell, Settings, HelpCircle } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/visit", label: "Visit Entry", icon: ClipboardPlus },
  { to: "/follow-ups", label: "Follow-ups", icon: CalendarClock },
];

export function AppLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-bold">C</div>
            <span className="font-display text-lg font-bold text-primary">Cure Track</span>
          </Link>
          <div className="relative ml-2 hidden flex-1 max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search patients, records, or appointments…"
              className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-card"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Bell className="h-5 w-5" /></button>
            <button className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"><Settings className="h-5 w-5" /></button>
            <div className="ml-2 hidden items-center gap-3 border-l border-border pl-4 md:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-sm font-semibold text-primary-foreground">JV</div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Dr. Julian Vance</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Senior Cardiologist</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border bg-sidebar p-4 md:flex md:flex-col">
          <div className="mb-6 px-2">
            <div className="font-display text-base font-bold text-primary">Cure Track</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Clinic Management</div>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent">
              <HelpCircle className="h-[18px] w-[18px]" />
              Help Center
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
