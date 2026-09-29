export interface RiskDriver {
  label: string
  value: string
  tone: 'danger' | 'warning' | 'success' | 'default'
}

export interface ImpactItem {
  label: string
  level: 'Critical' | 'High' | 'Moderate' | 'Low'
  detail: string
}

export const incidentIntelligence: Record<string, {
  trustScore: number
  trend: 'Rising' | 'Stable' | 'Falling'
  nextHour: string
  predictedRisk: number
  groundTruth: { official: string; ground: string; gap: 'Significant' | 'Moderate' | 'Low' }
  drivers: RiskDriver[]
  impacts: ImpactItem[]
  actions: string[]
  corroboration: string[]
}> = {
  'INC-1001': {
    trustScore: 94, trend: 'Rising', nextHour: 'Risk may escalate in 30–60 min', predictedRisk: 89,
    groundTruth: { official: 'High rainfall', ground: 'Severe waterlogging', gap: 'Significant' },
    drivers: [
      { label: 'Rainfall intensity', value: '+38% / 30 min', tone: 'danger' },
      { label: 'Citizen cluster', value: '17 reports / 2.1 km', tone: 'warning' },
      { label: 'Official correlation', value: 'Confirmed', tone: 'success' },
      { label: 'Duplicate risk', value: 'Low', tone: 'success' },
    ],
    impacts: [
      { label: 'Roads', level: 'Critical', detail: 'Waterlogging on 6 reported corridors' },
      { label: 'Public transport', level: 'High', detail: 'Delay risk increasing' },
      { label: 'Residential areas', level: 'High', detail: 'Low-lying pockets exposed' },
      { label: 'Power', level: 'Moderate', detail: 'Monitor local outages' },
    ],
    actions: ['Verify the two newest high-impact reports', 'Issue local road advisory for low-lying corridors', 'Monitor the incident cluster for 30 minutes', 'Escalate if rainfall and reports continue rising'],
    corroboration: ['17 citizen reports', 'IMD/weather observation match', '3 independent source groups', 'Location cluster within 2.1 km'],
  },
  'INC-1002': {
    trustScore: 96, trend: 'Stable', nextHour: 'Flash-flood risk remains elevated', predictedRisk: 84,
    groundTruth: { official: 'Heavy rainfall', ground: 'Urban flooding', gap: 'Moderate' },
    drivers: [
      { label: 'Rainfall intensity', value: 'Sustained high', tone: 'danger' },
      { label: 'Citizen cluster', value: '24 reports / 3.8 km', tone: 'warning' },
      { label: 'Official warning', value: 'Active', tone: 'success' },
      { label: 'Media duplication', value: 'Low', tone: 'success' },
    ],
    impacts: [
      { label: 'Roads', level: 'High', detail: 'Multiple arterial roads affected' },
      { label: 'Population', level: 'High', detail: 'Dense urban exposure' },
      { label: 'Drainage', level: 'Critical', detail: 'Rapid accumulation reported' },
    ],
    actions: ['Prioritize low-lying zones for field verification', 'Keep emergency teams on standby', 'Track river/drainage observations', 'Refresh alert if the cluster expands'],
    corroboration: ['Official rainfall signal', '24 citizen reports', 'Satellite/API correlation', 'No strong duplicate pattern'],
  },
  'INC-1003': {
    trustScore: 82, trend: 'Rising', nextHour: 'Thunderstorm activity may spread east', predictedRisk: 63,
    groundTruth: { official: 'Moderate', ground: 'Moderate–High', gap: 'Moderate' },
    drivers: [
      { label: 'Storm signals', value: 'Increasing', tone: 'warning' },
      { label: 'Independent reports', value: '12 sources', tone: 'success' },
      { label: 'Location match', value: 'Good', tone: 'success' },
      { label: 'Evidence gap', value: 'Needs review', tone: 'warning' },
    ],
    impacts: [
      { label: 'Outdoor safety', level: 'High', detail: 'Lightning exposure' },
      { label: 'Road visibility', level: 'Moderate', detail: 'Short-term visibility drop' },
      { label: 'Power', level: 'Moderate', detail: 'Monitor local disruptions' },
    ],
    actions: ['Keep lightning advisory visible', 'Request verification of new media', 'Watch eastern neighbourhoods for spread'],
    corroboration: ['12 independent sources', 'Weather correlation', 'Recent timestamps'],
  },
  'INC-1004': {
    trustScore: 97, trend: 'Falling', nextHour: 'Risk expected to ease if rainfall declines', predictedRisk: 48,
    groundTruth: { official: 'High', ground: 'High', gap: 'Low' },
    drivers: [
      { label: 'Rainfall trend', value: 'Decreasing', tone: 'success' },
      { label: 'Official match', value: 'Confirmed', tone: 'success' },
      { label: 'Human verification', value: 'Confirmed', tone: 'success' },
    ],
    impacts: [
      { label: 'Underpasses', level: 'High', detail: 'Waterlogging still present' },
      { label: 'Traffic', level: 'Moderate', detail: 'Recovery expected' },
    ],
    actions: ['Keep advisory active until road clearance', 'Recheck affected underpasses before closure'],
    corroboration: ['Official rainfall data', '58 reports', 'Human reviewer confirmation'],
  },
}

export const defaultIntelligence = incidentIntelligence['INC-1001']

export const verificationQueue = [
  { id: 'RPT-4812', location: 'Kurla, Mumbai', language: 'Hinglish', event: 'Waterlogging', score: 91, reason: '3 nearby reports + rainfall correlation', state: 'AI screened' },
  { id: 'RPT-4798', location: 'Guwahati', language: 'Hindi', event: 'Flash Flood', score: 78, reason: 'Image location needs confirmation', state: 'Human review' },
  { id: 'RPT-4771', location: 'Kolkata', language: 'Bengali', event: 'Thunderstorm', score: 64, reason: 'Low independent corroboration', state: 'Needs evidence' },
]

export const riskForecast = [
  { time: 'Now', risk: 68, label: 'High' },
  { time: '+30m', risk: 76, label: 'High' },
  { time: '+60m', risk: 84, label: 'High' },
  { time: '+90m', risk: 79, label: 'High' },
]

export const groundTruthRows = [
  { location: 'Mumbai · Kurla', official: 'High rainfall', ground: 'Severe waterlogging', gap: 'Significant', reports: 31 },
  { location: 'Guwahati · Kamrup', official: 'Heavy rainfall', ground: 'Flash flooding', gap: 'Moderate', reports: 44 },
  { location: 'Chennai · Central', official: 'High rainfall', ground: 'High rainfall', gap: 'Low', reports: 58 },
  { location: 'Kolkata · Central', official: 'Moderate storm', ground: 'Moderate–High', gap: 'Moderate', reports: 34 },
]

export const incidentTimeline = [
  { time: '14:02', label: 'Official rainfall signal detected', detail: 'Rainfall intensity moved above local baseline.' },
  { time: '14:08', label: 'First citizen report', detail: 'Hinglish report received with GPS and photo.' },
  { time: '14:12', label: 'Incident cluster created', detail: '5 nearby reports grouped into one event.' },
  { time: '14:17', label: 'Media evidence screened', detail: 'Image passed location and weather consistency checks.' },
  { time: '14:24', label: 'Ground-truth gap detected', detail: 'Citizen impact exceeded the official observation level.' },
  { time: '14:31', label: 'Risk escalated', detail: 'Prediction engine moved the zone to high risk.' },
  { time: '14:36', label: 'Action recommendation generated', detail: 'Road advisory and field verification suggested.' },
]
