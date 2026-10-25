# OpenClaw YouTube Agent Integration Notes

OpenClaw is a self-hosted Gateway and agent runtime. The official documentation describes the Gateway as the control plane for sessions, tools, events, channels, and browser control. Its Gateway exposes authenticated WebSocket/RPC control and HTTP APIs, including a tools-invoke endpoint. [1] [2]

The browser surface supports named profiles, tabs, snapshots, screenshots, navigation, input, state emulation, and debugging. The default `openclaw` profile is an isolated managed browser; a `user` profile can control an existing signed-in Chrome session. [3]

The official docs describe skills and plugins as the extension path for repeatable procedures. A browser plugin can ship a browser-automation skill for multi-step browser control. [4] The official docs and repository pages reviewed here do not identify a first-party YouTube connector, so YouTube comment work should be modeled as a browser-profile task or a user-installed OpenClaw skill rather than an assumed native API integration.

OpenClaw automations persist jobs, wake the agent, and can deliver output to a chat channel, webhook, or nowhere. This makes scheduled comment scans and follow-up tasks a natural phase-two integration. [5]

## Product boundary for this website

The dashboard now includes a local task runner experience for the YouTube Agent workspace: task templates, step-by-step progress, preview/draft mode, explicit approval before public replies, completed-task history, and a connection-readiness panel for an OpenClaw Gateway and browser profile.

The current website remains browser-only and does not store or transmit Gateway tokens. Live execution against a user's Gateway requires a server-side connector or a carefully configured same-origin bridge that handles the Gateway URL, authentication, browser profile, and OpenClaw skill/tool policy. The UI therefore keeps the live connection state explicit instead of pretending that mock execution is a real Gateway call.

## References

[1]: https://github.com/openclaw/openclaw/blob/main/README.md "OpenClaw official repository README"
[2]: https://docs.openclaw.ai/gateway "OpenClaw Gateway runbook"
[3]: https://docs.openclaw.ai/cli/browser "OpenClaw browser CLI"
[4]: https://docs.openclaw.ai/tools/skills "OpenClaw skills documentation"
[5]: https://docs.openclaw.ai/automation/cron-jobs "OpenClaw automations documentation"
