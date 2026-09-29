import { CheckCircle2, MapPin, ShieldAlert, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Incident } from '@/types/incident'
import { defaultIntelligence, incidentIntelligence } from '@/data/intelligence'

export function ImpactPanel({ incident }: { incident?: Incident | null }) {
  const intel = incident ? (incidentIntelligence[incident.id] ?? defaultIntelligence) : defaultIntelligence
  return <div className="grid gap-4 lg:grid-cols-3">
    <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><Target className="h-4 w-4 text-primary" /> What is driving the risk?</div><div className="mt-3 space-y-2.5">{intel.drivers.map((d) => <div key={d.label} className="flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-[12px]"><span className="text-ink-muted">{d.label}</span><span className={`font-semibold ${d.tone === 'danger' ? 'text-danger' : d.tone === 'warning' ? 'text-warning' : d.tone === 'success' ? 'text-success' : 'text-primary'}`}>{d.value}</span></div>)}</div></Card>
    <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><ShieldAlert className="h-4 w-4 text-warning" /> Predicted impact</div><div className="mt-3 space-y-2">{intel.impacts.map((i) => <div key={i.label} className="flex gap-3 rounded-lg border border-border p-2.5"><div className="min-w-[5rem] text-[12px] font-semibold text-ink">{i.label}</div><div className="flex-1"><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${i.level === 'Critical' ? 'bg-danger-light text-danger' : i.level === 'High' ? 'bg-warning-light text-warning' : 'bg-primary-light text-primary'}`}>{i.level}</span><p className="mt-1 text-[11px] text-ink-muted">{i.detail}</p></div></div>)}</div></Card>
    <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><MapPin className="h-4 w-4 text-success" /> Recommended action</div><ol className="mt-3 space-y-2">{intel.actions.map((a, i) => <li key={a} className="flex gap-2 text-[12px] text-ink"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary">{i + 1}</span>{a}</li>)}</ol><div className="mt-3 flex items-center gap-1 text-[10.5px] text-ink-faint"><CheckCircle2 className="h-3 w-3 text-success" /> Decision support, not automatic orders.</div></Card>
  </div>
}
