import { useState } from 'react'
import { CheckCircle2, ImageOff, Languages, Link2, ShieldCheck, Clock3 } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { VerificationPipeline } from '@/components/verification/VerificationPipeline'
import { Card } from '@/components/ui/Card'
import { EvidenceGraph } from '@/components/intelligence/EvidenceGraph'
import { verificationQueue } from '@/data/intelligence'

export default function AIVerification() {
  const [selected, setSelected] = useState(0)
  const report = verificationQueue[selected]
  return <div className="space-y-5 p-6">
    <PageHeader title="AI Verification Lab" description="Score evidence, detect old or duplicated media, normalize Indian-language reports and keep a human reviewer in the loop." />
    <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <Card><div className="mb-3 flex items-center justify-between"><div><h3 className="font-semibold text-ink">Live evidence pipeline</h3><p className="mt-0.5 text-[11px] text-ink-muted">Every stage produces a reason that can be inspected later.</p></div><span className="rounded-full bg-success-light px-2 py-1 text-[10px] font-semibold text-success">HUMAN-IN-THE-LOOP</span></div><VerificationPipeline /></Card>
      <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck className="h-4 w-4 text-primary" /> Verification queue</div><div className="mt-3 space-y-2">{verificationQueue.map((r,i)=><button key={r.id} onClick={()=>setSelected(i)} className={`w-full rounded-lg border p-3 text-left ${selected===i?'border-primary bg-primary-light':'border-border hover:bg-canvas'}`}><div className="flex justify-between text-[12px] font-semibold text-ink"><span>{r.id} · {r.location}</span><span>{r.score}/100</span></div><div className="mt-1 text-[11px] text-ink-muted">{r.event} · {r.language}</div><div className="mt-1 text-[10.5px] text-ink-faint">{r.reason}</div></button>)}</div></Card>
    </div>
    <div className="grid gap-5 lg:grid-cols-2">
      <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><ImageOff className="h-4 w-4 text-warning" /> Media integrity checks</div><div className="mt-3 space-y-2">{[['Image similarity','No high-similarity match','success'],['Old-media check','Timestamp consistent','success'],['Location metadata','Within 1.8 km','success'],['Weather correlation','Strong match','success'],['Manipulation signal','No strong signal','success']].map(([a,b,t])=><div key={a} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-[12px]"><span className="text-ink-muted">{a}</span><span className={`font-semibold ${t==='success'?'text-success':'text-warning'}`}><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />{b}</span></div>)}</div><p className="mt-3 text-[10.5px] text-ink-faint">Evidence checks combine media, metadata, location and weather signals
to support transparent incident verification.</p></Card>
      <Card><div className="flex items-center gap-2 text-sm font-semibold text-ink"><Languages className="h-4 w-4 text-primary" /> Indian-language normalization</div><div className="mt-3 grid gap-2 sm:grid-cols-2">{[['Hinglish','Ulwe mein road pe bahut paani bhar gaya hai.'],['Hindi','इधर सड़क पूरी पानी में है'],['Marathi','रस्त्यावर खूप पाणी साचले आहे'],['English','The road is severely waterlogged']].map(([lang,text])=><div key={lang} className="rounded-lg bg-canvas p-3"><div className="text-[10px] font-semibold uppercase text-primary">{lang}</div><div className="mt-1 text-[12px] text-ink">{text}</div><div className="mt-1 text-[10px] text-ink-faint">→ Waterlogging · normalized event</div></div>)}</div></Card>
    </div>
    <EvidenceGraph />
    <Card><div className="grid gap-3 sm:grid-cols-3"><div><div className="flex items-center gap-1 text-[10px] uppercase text-ink-muted"><Clock3 className="h-3 w-3" /> Current report</div><div className="mt-1 text-sm font-semibold text-ink">{report.id} · {report.location}</div></div><div><div className="text-[10px] uppercase text-ink-muted">Review state</div><div className="mt-1 text-sm font-semibold text-warning">{report.state}</div></div><div><div className="text-[10px] uppercase text-ink-muted">Next action</div><div className="mt-1 text-sm font-semibold text-ink">{report.score >= 85 ? 'Corroborate & cluster' : 'Request more evidence'}</div></div></div><div className="mt-3 flex items-center gap-2 text-[10.5px] text-ink-faint"><Link2 className="h-3.5 w-3.5" /> AI scores support review; they do not replace human verification.</div></Card>
  </div>
}
