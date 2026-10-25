# YouTube Agent social-research playbook

ProfileDash uses a workflow-first research layer. The agent should produce a useful brief or next action, not expose raw endpoint details.

## Comment mining

Fetch public comments, preserve exact audience wording and source URLs, lightly remove duplicates or obvious spam, then classify questions, objections, complaints, praise, confusion, requests, buying intent, and culture signals. Cluster themes by frequency and intensity, label sample size and confidence, and turn the strongest themes into reply angles, FAQ ideas, content ideas, or product notes. Imported comments remain behind the rule filter and approval gate.

## Transcript intelligence

When a transcript is available, segment it into hook, setup, main claim, evidence, payoff, and CTA. Preserve exact quotes with the source URL. Extract frameworks, objections addressed, quotable lines, and reusable content atoms. If no transcript is available, say so and fall back to the title, description, and visible metadata rather than inventing spoken copy.

## Outlier finder

Use a creator's own median recent performance as the baseline. Preserve raw views, likes, comments, shares, and saves, then calculate view lift and engagement lift. Mark 1.5×, 2×, and 5× lifts separately, split mixed formats when possible, and call out low confidence when the sample is small.

## Geo discovery

Use the `youtube/geo-search-tool` pattern for location, radius, keyword, channel, and time-window filters. Keep embeddable and Creative Commons filters explicit. Treat this as a server-side adapter concept only; never copy its historical client-side API key into the dashboard.

## Guardrails

Use public data only, cite source URLs, distinguish a small comment sample from broad audience sentiment, keep exact language when it is useful, and end with an action or recommendation. Do not promise private or logged-in data. Research outputs are advisory; public replies still require human approval.
