# TODO

## Responsive signal-room shell and workspace navigation

- [x] Build a full responsive website for the business-owner workspace.
- [x] Provide a persistent rail on desktop and a compact workspace switcher on mobile.
- [x] Include the four workspaces: Profile views, Campaigns, Tasks, and YouTube Agent.
- [x] Make active navigation, date range, comparison period, refresh state, and export/share controls visible.

## Profile growth and campaign overview

- [x] Show KPI cards for profile views, unique profile visitors, view growth rate, campaign-attributed views, profile conversion rate, and cost per profile view.
- [x] Show a profile-view trend comparing total views and unique visitors over time.
- [x] Show peak-day and visitor-mix callouts.
- [x] Show a sortable campaign performance table with spend, reach, profile views, engagement, conversions, cost per profile view, and status.
- [x] Show source/channel attribution, channel efficiency, conversion funnel, and operational alerts.
- [x] Include filters for date range, campaign, channel, audience, geography, device, content type, and traffic source.
- [x] Make campaign selection open a campaign detail view with summary, pacing, trend, funnel, creative ranking, audience breakdown, attribution notes, and recommendations.

## Campaign planning and monitoring

- [x] Show active, scheduled, and completed campaigns with health, budget pacing, profile views, and cost per view.
- [x] Provide campaign detail drill-down and a campaign-plan action that updates the interface.
- [x] Include performance and budget indicators with on-track, watch, and at-risk states.

## Task agent workspace

- [x] Show task counts for overdue, in progress, and done work.
- [x] Render a filterable task list with owner, due date, priority, linked workstream, and status.
- [x] Allow task status changes and task creation through a working UI state.

## YouTube comment-reply agent workspace

- [x] Show agent health, comments needing replies, replies sent, and average response time.
- [x] Render a queue with comment author, text, sentiment, linked video, and suggested response.
- [x] Allow selecting a comment, editing the reply, and marking it replied through a working UI state.

## Quality and delivery

- [x] Register all supported SPA paths in `public/manus-routes.json`.
- [x] Set project logo metadata in `app.config.ts`.
- [x] Pass TypeScript diagnostics and the static production build.
- [x] Start the configured preview server and verify readiness.
- [x] Inspect desktop and mobile renders and fix any confirmed layout issues.
- [x] Commit the complete website to the managed project repository.
