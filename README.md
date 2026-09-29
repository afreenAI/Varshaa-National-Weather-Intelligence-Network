# VARSHAA — National Weather Intelligence & Ground-Truth Network

Production-quality React + TypeScript frontend \

## Stack
React 18 · TypeScript · Vite · Tailwind CSS · React Router · Zustand ·
Recharts · Leaflet/React-Leaflet · Framer Motion · React Hook Form + Zod

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To type-check and build for production:

```bash
npm run build
npm run preview
```

The project is intended to be validated locally with `npm install` followed by `npm run build` after dependency installation.

## Architecture

```
src/
├── app/          # App shell + routing
├── components/   # ui, layout, maps, charts, incidents, verification, command-center
├── pages/        # One file per route
├── data/         # Seeded demo data ("DEMO STREAM")
├── services/     # Mock service layer — same interface a real backend would expose
├── store/        # Zustand stores (incidents, dashboard, map)
├── types/        # Shared TypeScript types
└── utils/        # cn() class helper
public/india-states.geojson   # Real, simplified state/UT boundaries (all 36)
```

Every `services/*.ts` file is written as an adapter: swap the mock
implementation for a real `fetch()` call to FastAPI/Kafka/PostGIS/BHASHINI
etc. without touching any component or page.

## Frontend intelligence upgrade

The frontend now groups the product around five simple experiences: Command Center, Live Map, Citizen Report, Incident Intelligence, and Admin Review. The UI includes the planned intelligence layer for: multi-source incident clustering, AI trust/evidence scoring, old/duplicate-media checks, Indian-language normalization, ground-truth gap detection, impact-based risk, predictive escalation, recommended actions, explainable alerts, evidence graphs, hyperlocal coverage, and incident replay.

These intelligence values are intentionally seeded in the frontend for now. The next backend phase can replace each adapter with real weather APIs, IMD/official feeds, database records, NLP/CV models, geospatial clustering, notification gateways and multilingual services without redesigning the UI.



