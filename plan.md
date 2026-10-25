# Profile Growth & Campaign Performance — Implementation Plan

## Scope

Build a responsive, browser-only analytics workspace for a business owner. The default home view is a profile-growth and campaign-performance dashboard, with adjacent workspace views for a YouTube comment-reply agent, task management, and campaign planning/monitoring. The first version uses realistic local mock data so every interaction works immediately without login or external credentials.

## Implementation approach

- Use the existing React + TypeScript + Vite starter and keep the app static-friendly.
- Keep dashboard state in React: active workspace, date range, comparison period, campaign/channel filters, table sort, selected campaign, task status, and comment reply status.
- Use Recharts for the profile-view trend, channel efficiency scatter, funnel, and campaign charts.
- Use the existing `lucide-react` dependency for all icons and the existing Tailwind setup plus custom CSS for the visual system.
- Add a route manifest with `/`, `/campaigns`, `/tasks`, and `/youtube-agent` as the supported SPA views; the app will still use client-side state for fast transitions.
- Use accessible buttons, visible focus states, labels, mobile-friendly tables, and responsive stacking rather than introducing a backend that the requested mock-data experience does not need.

## Design direction

### Style shortlist

- Swiss editorial analytics — probability 0.07; strict grid, neutral surfaces, blue signal color, and data-first hierarchy.
- Midnight operations room — probability 0.06; dark canvas, luminous status colors, and dense command-center panels.
- **Selected: Warm instrument panel** — probability 0.08; warm graphite background, cream cards, violet signal accents, and quiet motion that makes the dashboard feel like a crafted operator tool.

### Design Movement

Warm instrument panel: an editorial operations dashboard with the calm density of a financial research terminal and the warmth of a premium productivity tool.

### Core Principles

1. Make the next decision visible before the raw data.
2. Use compact, high-signal panels instead of decorative chrome.
3. Let status color carry meaning, but pair it with labels and icons.
4. Keep every operational action within one or two clicks.

### Color Philosophy

Graphite gives the workspace focus while warm ivory keeps data legible and human. Electric violet is the signature brand signal for profile growth, with mint for healthy movement, amber for attention, and coral for risk. This makes campaign health feel alive without turning the dashboard into a rainbow.

### Layout Paradigm

A persistent rail anchors the product identity while the main canvas uses asymmetric editorial bands: a compact command header, a full-width signal trend, then split analytical panels and dense action tables. Mobile collapses the rail into a horizontal workspace switcher.

### Signature Elements

- A small violet “pulse” mark in the wordmark and active navigation state.
- KPI cards with tiny sparkline bars and period-change chips.
- Campaign rows that combine status, metric, and one-click drill-down in the same horizontal rhythm.

### Interaction Philosophy

Interactions should feel like operating an instrument: filters update the page immediately, controls disclose their active state, and detail panels slide into focus instead of forcing context switches. All actions give a small toast or inline state change.

### Animation

Use short 150–220ms ease-out transitions for hover, filter changes, and view changes. Animate chart data only on first render and keep subsequent updates subtle. Use a soft shimmer on the initial “live” dot and avoid looping motion elsewhere.

### Typography System

Use a crisp system sans for UI and a slightly expressive display serif for the page title and major section intros. Establish strong numeric hierarchy: 30–34px KPI values, 16px section titles, 12px metadata, and 11px uppercase labels with tracking.

### Brand Essence

A decision cockpit for growth operators who need to connect attention to action. Personality: measured, sharp, quietly confident.

### Brand Voice

Headlines are short and operational. CTAs are specific and calm. Example lines: “Attention is moving in the right direction.” and “Reply to the comments that can become relationships.”

### Wordmark & Logo

Use the wordmark “signal / room” with a compact violet pulse-dot mark between the words; the mark should read as a small signal moving through a track, not a generic app icon.

### Signature Brand Color

Signal violet `#7657F6` — a vivid but disciplined accent that belongs to the product and carries across charts, active controls, and action states.

## Project structure

- `client/src/pages/Home.tsx`: view state, mock data, dashboard panels, workspace views, and interactive handlers.
- `client/src/index.css`: dashboard design system, layout primitives, responsive behavior, charts, tables, and motion.
- `client/src/App.tsx`: route registration for the SPA workspace views.
- `public/manus-routes.json`: route manifest used by the managed preview/publishing system.
- `app.config.ts`: project logo metadata.
- `TODO.md`: delivery outcomes and criteria.

## Delivery workflow

Implement the frontend, add the route manifest and project metadata, run TypeScript diagnostics and the static build, start the configured preview server, verify the route manifest over HTTP and capture desktop/mobile screenshots for visual inspection, then commit the intended files to the project repository so the managed project has a recoverable checkpoint.

## OpenClaw YouTube task execution update

- Add a YouTube task-runner panel with OpenClaw bridge readiness, browser-profile context, task templates, step progress, approvals, and recent receipts.
- Keep public actions approval-gated: scanning and task creation can complete automatically in the local demo state, while replying to comments stages drafts until the owner clicks Approve & send.
- Do not store Gateway tokens or pretend the static browser app is a live Gateway client. The UI should make the next server-side connector requirement explicit.
