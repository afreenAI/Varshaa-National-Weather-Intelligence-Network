import { useState } from 'react'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { MapLegend } from '@/components/maps/MapLegend'
import { IncidentDrawer } from '@/components/incidents/IncidentDrawer'
import { useMapStore, type MapLayer, type TimeRange } from '@/store/mapStore'
import type { Incident } from '@/types/incident'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { ShieldAlert, Route, Layers3 } from 'lucide-react'

const LAYERS: { key: MapLayer; label: string }[] = [
  { key: 'incidents', label: 'Incidents' }, { key: 'heatmap', label: 'Impact Heatmap' }, { key: 'citizenReports', label: 'Citizen Reports' }, { key: 'officialData', label: 'Official Data' }, { key: 'rainfall', label: 'Rainfall' }, { key: 'floodZones', label: 'Flood Zones' }, { key: 'thunderstorm', label: 'Thunderstorm' }, { key: 'emergingSignals', label: 'Emerging Signals' },
]
const RANGES: TimeRange[] = ['24h', '7d', '30d']

export default function LiveMap() {
  const [selected, setSelected] = useState<Incident | null>(null)
  const { activeLayers, toggleLayer, timeRange, setTimeRange } = useMapStore()
  return <div className="flex h-full flex-col lg:flex-row">
    <div className="w-full shrink-0 overflow-y-auto border-b border-border bg-surface p-4 lg:w-64 lg:border-b-0 lg:border-r"><div className="mb-5 flex items-center gap-2"><Layers3 className="h-4 w-4 text-primary" /><div><div className="text-sm font-semibold text-ink">Intelligence layers</div><div className="text-[10px] text-ink-faint">Toggle what you need</div></div></div><div className="space-y-1.5">{LAYERS.map((l) => <label key={l.key} className="flex cursor-pointer items-center gap-2 text-[13px] text-ink"><input type="checkbox" checked={activeLayers[l.key]} onChange={() => toggleLayer(l.key)} className="accent-primary" />{l.label}</label>)}</div><div className="mt-5"><div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Time Range</div><div className="flex gap-1.5">{RANGES.map((r) => <button key={r} onClick={() => setTimeRange(r)} className={cn('rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium', timeRange === r && 'border-primary bg-primary-light text-primary')}>{r.toUpperCase()}</button>)}</div></div><Card className="mt-5 p-3"><div className="flex items-center gap-2 text-[11px] font-semibold text-ink"><ShieldAlert className="h-3.5 w-3.5 text-warning" /> Impact mode</div><p className="mt-1.5 text-[11px] text-ink-muted">Map priority is based on hazard, exposure, verified reports and urgency — not rainfall alone.</p></Card><Card className="mt-3 p-3"><div className="flex items-center gap-2 text-[11px] font-semibold text-ink"><Route className="h-3.5 w-3.5 text-primary" /> Travel risk</div><p className="mt-1.5 text-[11px] text-ink-muted">Route-aware disruption analysis using road-network data.</p></Card></div>
    <div className="relative min-h-[520px] flex-1"><IndiaMap onSelectIncident={setSelected} /><MapLegend /><div className="absolute bottom-4 left-4 right-4 z-[500] grid gap-2 sm:grid-cols-3"><MapStat label="Highest impact" value="Mumbai · Kurla" /><MapStat label="Ground-truth gap" value="3 significant" /><MapStat label="Escalating" value="7 zones" /></div></div>
    <IncidentDrawer incident={selected} onClose={() => setSelected(null)} />
  </div>
}
function MapStat({ label, value }: { label: string; value: string }) { return <div className="rounded-lg border border-border bg-white/95 px-3 py-2 shadow-card backdrop-blur"><div className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">{label}</div><div className="mt-0.5 text-[11px] font-semibold text-ink">{value}</div></div> }
