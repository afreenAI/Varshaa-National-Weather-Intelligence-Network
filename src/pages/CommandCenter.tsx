import { useState } from 'react'
import { ShieldCheck, TriangleAlert, Radio, Users, ArrowUpRight } from 'lucide-react'
import { StatusBar } from '@/components/command-center/StatusBar'
import { LiveFeed } from '@/components/command-center/LiveFeed'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { MapLegend } from '@/components/maps/MapLegend'
import { IncidentDrawer } from '@/components/incidents/IncidentDrawer'
import { IntelligenceStrip } from '@/components/intelligence/IntelligenceStrip'
import { GroundTruthPanel } from '@/components/intelligence/GroundTruthPanel'
import { ImpactPanel } from '@/components/intelligence/ImpactPanel'
import { getIncidentById, incidents } from '@/data/incidents'
import type { Incident } from '@/types/incident'

export default function CommandCenter() {
  const [selected, setSelected] = useState<Incident | null>(null)
  const focus = selected ?? incidents[0]
  return <div className="flex h-full flex-col overflow-y-auto">
    <StatusBar />
    <div className="border-b border-border bg-surface px-4 py-3 sm:px-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">National weather intelligence</div><h1 className="mt-0.5 text-lg font-bold text-ink">What is happening on the ground?</h1></div><div className="flex gap-2 text-[11px]"><span className="flex items-center gap-1 rounded-full bg-success-light px-2.5 py-1 font-semibold text-success"><Radio className="h-3 w-3" /> Live signals</span><span className="flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 font-semibold text-primary"><ShieldCheck className="h-3 w-3" /> Explainable intelligence</span></div></div></div>
    <div className="p-4 sm:p-5"><IntelligenceStrip incident={focus} /></div>
    <div className="flex min-h-[520px] flex-1 overflow-hidden border-y border-border">
      <div className="relative min-h-[520px] flex-1"><IndiaMap onSelectIncident={(i) => setSelected(i)} /><MapLegend /><div className="absolute left-4 top-4 z-[500] rounded-xl border border-border bg-white/95 p-3 shadow-card backdrop-blur"><div className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">Priority zones</div><div className="mt-2 flex gap-3 text-[11px]"><span className="flex items-center gap-1 text-danger"><span className="h-2 w-2 rounded-full bg-danger" /> 3 critical</span><span className="flex items-center gap-1 text-warning"><span className="h-2 w-2 rounded-full bg-warning" /> 5 high</span></div></div></div>
      <LiveFeed onSelect={(id) => setSelected(getIncidentById(id) ?? null)} />
    </div>
    <div className="space-y-4 p-4 sm:p-5"><GroundTruthPanel /><ImpactPanel incident={focus} /><div className="grid gap-3 sm:grid-cols-3"><Mini label="Signals corroborated" value="84%" icon={ShieldCheck} /><Mini label="Citizen reports" value="2,481" icon={Users} /><Mini label="Escalating zones" value="7" icon={ArrowUpRight} danger /></div></div>
    <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
  </div>
}
function Mini({ label, value, icon: Icon, danger }: { label: string; value: string; icon: typeof ShieldCheck; danger?: boolean }) { return <div className="rounded-xl border border-border bg-surface p-3 shadow-card"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-ink-muted"><Icon className={`h-3.5 w-3.5 ${danger ? 'text-danger' : 'text-primary'}`} /> {label}</div><div className="mt-1 text-lg font-bold text-ink">{value}</div></div> }
