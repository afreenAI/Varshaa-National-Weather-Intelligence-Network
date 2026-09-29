import { ArrowUpRight, CheckCircle2, Clock3, ShieldCheck, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Incident } from '@/types/incident'
import { incidentIntelligence, defaultIntelligence } from '@/data/intelligence'

export function IntelligenceStrip({ incident }: { incident?: Incident | null }) {
  const intel = incident ? (incidentIntelligence[incident.id] ?? defaultIntelligence) : defaultIntelligence
  const riskTone = intel.predictedRisk >= 80 ? 'text-danger' : intel.predictedRisk >= 60 ? 'text-warning' : 'text-success'
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    <Card className="p-4"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted"><ShieldCheck className="h-3.5 w-3.5 text-success" /> Evidence strength</div><div className="mt-1 flex items-end gap-2"><span className="text-2xl font-bold text-primary">{intel.trustScore}</span><span className="pb-1 text-xs text-ink-muted">/100 trust</span></div><div className="mt-1 text-[11px] text-ink-faint">Source, time, location and corroboration</div></Card>
    <Card className="p-4"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted"><ArrowUpRight className="h-3.5 w-3.5 text-warning" /> Predicted risk</div><div className="mt-1 flex items-end gap-2"><span className={`text-2xl font-bold ${riskTone}`}>{intel.predictedRisk}%</span><span className="pb-1 text-xs text-ink-muted">next hour</span></div><div className="mt-1 text-[11px] text-ink-faint">{intel.nextHour}</div></Card>
    <Card className="p-4"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted"><TriangleAlert className="h-3.5 w-3.5 text-warning" /> Ground-truth gap</div><div className="mt-1 text-lg font-bold text-ink">{intel.groundTruth.gap}</div><div className="mt-1 text-[11px] text-ink-faint">Official: {intel.groundTruth.official} · Ground: {intel.groundTruth.ground}</div></Card>
    <Card className="p-4"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted"><Clock3 className="h-3.5 w-3.5 text-primary" /> Signal trend</div><div className="mt-1 text-lg font-bold text-ink">{intel.trend}</div><div className="mt-1 flex items-center gap-1 text-[11px] text-success"><CheckCircle2 className="h-3 w-3" /> {intel.corroboration.length} corroborating signals</div></Card>
  </div>
}
