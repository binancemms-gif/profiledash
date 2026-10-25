import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clock3,
  Download,
  ExternalLink,
  Filter,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { toast } from "sonner";

const profileTrend = [
  { day: "Oct 12", views: 1180, visitors: 754, actions: 68 },
  { day: "Oct 13", views: 1320, visitors: 812, actions: 73 },
  { day: "Oct 14", views: 1260, visitors: 792, actions: 71 },
  { day: "Oct 15", views: 1480, visitors: 914, actions: 83 },
  { day: "Oct 16", views: 1650, visitors: 1020, actions: 96 },
  { day: "Oct 17", views: 1540, visitors: 978, actions: 91 },
  { day: "Oct 18", views: 1890, visitors: 1152, actions: 117 },
  { day: "Oct 19", views: 1760, visitors: 1110, actions: 103 },
  { day: "Oct 20", views: 2100, visitors: 1282, actions: 131 },
  { day: "Oct 21", views: 2260, visitors: 1390, actions: 144 },
  { day: "Oct 22", views: 2180, visitors: 1360, actions: 138 },
  { day: "Oct 23", views: 2440, visitors: 1506, actions: 159 },
  { day: "Oct 24", views: 2690, visitors: 1654, actions: 178 },
  { day: "Oct 25", views: 2940, visitors: 1822, actions: 198 },
];

const initialCampaigns = [
  {
    id: "signal-sprint",
    name: "Signal Sprint",
    owner: "Maya Chen",
    status: "Active",
    health: "On track",
    objective: "Profile discovery",
    spend: 4860,
    budget: 6500,
    reach: 184200,
    views: 18240,
    engagement: 6.8,
    conversions: 418,
    cpv: 0.27,
    source: "Paid social",
    color: "violet",
  },
  {
    id: "founder-notes",
    name: "Founder Notes",
    owner: "Amir Patel",
    status: "Active",
    health: "Watch",
    objective: "Thought leadership",
    spend: 3120,
    budget: 4200,
    reach: 116600,
    views: 12480,
    engagement: 8.2,
    conversions: 246,
    cpv: 0.25,
    source: "Organic social",
    color: "mint",
  },
  {
    id: "q4-retargeting",
    name: "Q4 Retargeting",
    owner: "Maya Chen",
    status: "Active",
    health: "On track",
    objective: "Profile actions",
    spend: 2180,
    budget: 3000,
    reach: 72800,
    views: 8940,
    engagement: 7.1,
    conversions: 294,
    cpv: 0.24,
    source: "Paid search",
    color: "amber",
  },
  {
    id: "community-week",
    name: "Community Week",
    owner: "Noah Williams",
    status: "Scheduled",
    health: "On track",
    objective: "New audience",
    spend: 0,
    budget: 1800,
    reach: 0,
    views: 0,
    engagement: 0,
    conversions: 0,
    cpv: 0,
    source: "Email",
    color: "sky",
  },
  {
    id: "summer-proof",
    name: "Summer Proof",
    owner: "Amir Patel",
    status: "Completed",
    health: "At risk",
    objective: "Lead capture",
    spend: 6040,
    budget: 6000,
    reach: 204500,
    views: 10120,
    engagement: 3.9,
    conversions: 112,
    cpv: 0.6,
    source: "Paid social",
    color: "coral",
  },
];

const channelData = [
  { name: "Organic social", views: 12840, cpv: 0.0, rate: 4.8, spend: 0, fill: "#9ae6c2" },
  { name: "Paid social", views: 24100, cpv: 0.27, rate: 3.9, spend: 10900, fill: "#7657f6" },
  { name: "Paid search", views: 8940, cpv: 0.24, rate: 4.5, spend: 2180, fill: "#f6b84b" },
  { name: "Email", views: 5280, cpv: 0.08, rate: 7.2, spend: 420, fill: "#78a8ff" },
  { name: "Referral", views: 3760, cpv: 0.0, rate: 5.9, spend: 0, fill: "#e7a0c4" },
];

const funnelData = [
  { name: "Reach", value: 578100, fill: "#d9d2ff" },
  { name: "Impressions", value: 824600, fill: "#b9abff" },
  { name: "Profile views", value: 54920, fill: "#967fff" },
  { name: "Profile actions", value: 4280, fill: "#7657f6" },
  { name: "Leads", value: 834, fill: "#5b40d7" },
];

const initialTasks = [
  { id: 1, title: "Review Founder Notes creative set", owner: "Maya", due: "Today", priority: "High", status: "In progress", area: "Campaigns" },
  { id: 2, title: "Reply to 12 high-intent YouTube comments", owner: "YouTube agent", due: "Today", priority: "High", status: "Todo", area: "YouTube" },
  { id: 3, title: "Confirm Community Week launch budget", owner: "Amir", due: "Oct 26", priority: "Medium", status: "Todo", area: "Campaigns" },
  { id: 4, title: "Export weekly profile-view report", owner: "Noah", due: "Oct 27", priority: "Low", status: "Done", area: "Profile views" },
  { id: 5, title: "Tag returning visitors in CRM", owner: "Maya", due: "Oct 28", priority: "Medium", status: "In progress", area: "Profile views" },
  { id: 6, title: "Refresh reply tone guidelines", owner: "Noah", due: "Oct 30", priority: "Low", status: "Todo", area: "YouTube" },
];

const initialComments = [
  { id: 1, author: "Jordan Lee", avatar: "JL", text: "This is the clearest explanation I’ve seen. How would you apply this to a small team?", video: "The 20-minute growth system", sentiment: "High intent", tone: "Positive", status: "Needs reply", suggested: "Small teams can start by choosing one repeatable signal, then building a weekly ritual around it. The goal is consistency before complexity." },
  { id: 2, author: "Rosa Martins", avatar: "RM", text: "Can you share the template you used for the campaign review?", video: "Campaign reviews that actually work", sentiment: "Resource ask", tone: "Positive", status: "Needs reply", suggested: "Absolutely — I’ve linked the review template in the description. The short version is: signal, decision, owner, next check-in." },
  { id: 3, author: "Theo Baker", avatar: "TB", text: "Interesting take. I disagree on the timing, but the framework is useful.", video: "Stop measuring the wrong growth", sentiment: "Thoughtful", tone: "Neutral", status: "Needs reply", suggested: "That’s a fair pushback. Timing will vary by channel, but the framework is designed to keep the decision criteria visible." },
  { id: 4, author: "Priya Shah", avatar: "PS", text: "The last section helped me reframe our launch. Thank you.", video: "A calmer way to launch", sentiment: "Advocate", tone: "Positive", status: "Replied", suggested: "Glad it helped, Priya. Hope the next launch feels a little calmer and a lot more intentional." },
];

const workspaceItems = [
  { slug: "overview", label: "Profile views", sub: "Growth cockpit", icon: LayoutDashboard },
  { slug: "campaigns", label: "Campaigns", sub: "Plan & monitor", icon: Megaphone },
  { slug: "tasks", label: "Tasks", sub: "Keep the signal moving", icon: ListChecks },
  { slug: "youtube-agent", label: "YouTube agent", sub: "Reply with intent", icon: Youtube },
];

const number = new Intl.NumberFormat("en-US");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function formatCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return number.format(value);
}

function statusClass(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function KpiCard({ label, value, change, detail, icon: Icon, color = "violet" }: { label: string; value: string; change: string; detail: string; icon: typeof Activity; color?: string }) {
  const negative = change.startsWith("-");
  return (
    <article className={`kpi-card kpi-${color}`}>
      <div className="kpi-topline">
        <span className="eyebrow">{label}</span>
        <span className="kpi-icon"><Icon size={16} strokeWidth={1.8} /></span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-footline">
        <span className={`trend-chip ${negative ? "negative" : "positive"}`}>
          {negative ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
          {change}
        </span>
        <span className="muted-text">{detail}</span>
      </div>
      <div className="spark-bars" aria-hidden="true">
        {[35, 48, 42, 56, 51, 71, 64, 84].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
      </div>
    </article>
  );
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill ${statusClass(tone)}`}>{children}</span>;
}

function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => <div key={item.name}><span style={{ background: item.color }} />{item.name}: <b>{number.format(item.value)}</b></div>)}
    </div>
  );
}

function Sidebar({ current, onNavigate }: { current: string; onNavigate: (slug: string) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark"><span /><span /><span /></div>
        <div><div className="brand-name">signal <span>/</span> room</div><div className="brand-caption">Growth operations</div></div>
      </div>
      <div className="sidebar-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Workspace navigation">
        {workspaceItems.map(({ slug, label, sub, icon: Icon }) => (
          <button key={slug} className={`nav-item ${current === slug ? "active" : ""}`} onClick={() => onNavigate(slug)}>
            <span className="nav-icon"><Icon size={17} strokeWidth={1.8} /></span>
            <span className="nav-copy"><b>{label}</b><small>{sub}</small></span>
            {slug === "youtube-agent" && <span className="nav-count">3</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-live-card">
        <div className="live-card-head"><span className="live-dot" /> Live data <span>↗</span></div>
        <p>Sources are synced and ready for the next decision.</p>
        <div className="sync-row"><span>5 sources</span><b>99.2%</b></div>
      </div>
      <button className="sidebar-bottom"><Settings2 size={16} /> Workspace settings</button>
      <div className="sidebar-profile"><div className="avatar avatar-violet">MC</div><div><b>Maya Chen</b><small>Owner</small></div><MoreHorizontal size={17} /></div>
    </aside>
  );
}

function Topbar({ onRefresh, onExport, range, setRange, comparison, setComparison }: { onRefresh: () => void; onExport: () => void; range: string; setRange: (value: string) => void; comparison: string; setComparison: (value: string) => void }) {
  return (
    <header className="topbar">
      <div className="mobile-brand"><div className="brand-mark"><span /><span /><span /></div><span>signal / room</span></div>
      <div className="topbar-left"><span className="live-dot" /> <span>Data synced 4 min ago</span><span className="topbar-separator">/</span><span>Monday, 25 Oct 2026</span></div>
      <div className="topbar-actions">
        <label className="select-control compact"><CalendarDays size={15} /><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Date range"><option>Last 30 days</option><option>Last 7 days</option><option>This quarter</option></select><ChevronDown size={14} /></label>
        <label className="select-control compact comparison"><span>vs.</span><select value={comparison} onChange={(event) => setComparison(event.target.value)} aria-label="Comparison period"><option>Previous period</option><option>Same period last year</option><option>Campaign baseline</option></select><ChevronDown size={14} /></label>
        <button className="icon-button" title="Refresh data" onClick={onRefresh}><RefreshCw size={16} /></button>
        <button className="button button-secondary small" onClick={onExport}><Download size={15} /> Export</button>
        <button className="icon-button notification" title="Notifications"><Bell size={17} /><i /></button>
      </div>
    </header>
  );
}

function FilterBar({ campaign, setCampaign, channel, setChannel, audience, setAudience, onClear }: { campaign: string; setCampaign: (value: string) => void; channel: string; setChannel: (value: string) => void; audience: string; setAudience: (value: string) => void; onClear: () => void }) {
  return (
    <div className="filter-bar">
      <div className="filter-label"><Filter size={14} /> Filters</div>
      <label className="filter-select"><span>Campaign</span><select value={campaign} onChange={(event) => setCampaign(event.target.value)}><option>All campaigns</option>{initialCampaigns.map((item) => <option key={item.id}>{item.name}</option>)}</select><ChevronDown size={13} /></label>
      <label className="filter-select"><span>Channel</span><select value={channel} onChange={(event) => setChannel(event.target.value)}><option>All channels</option>{channelData.map((item) => <option key={item.name}>{item.name}</option>)}</select><ChevronDown size={13} /></label>
      <label className="filter-select"><span>Audience</span><select value={audience} onChange={(event) => setAudience(event.target.value)}><option>All audiences</option><option>New visitors</option><option>Returning visitors</option><option>High-intent</option></select><ChevronDown size={13} /></label>
      <button className="filter-more"><SlidersIcon /> More filters <span>2</span></button>
      {(campaign !== "All campaigns" || channel !== "All channels" || audience !== "All audiences") && <button className="clear-filters" onClick={onClear}><X size={13} /> Clear</button>}
    </div>
  );
}

function SlidersIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>;
}

function Overview({ onSelectCampaign, campaigns, channel, campaignFilter }: { onSelectCampaign: (id: string) => void; campaigns: typeof initialCampaigns; channel: string; campaignFilter: string }) {
  const filteredCampaigns = campaigns.filter((item) => (campaignFilter === "All campaigns" || item.name === campaignFilter) && (channel === "All channels" || item.source === channel));
  const viewMultiplier = campaignFilter === "All campaigns" ? 1 : 0.33;
  const currentViews = Math.round(54920 * viewMultiplier);
  const visitorCount = Math.round(34220 * viewMultiplier);
  const conversionRate = campaignFilter === "All campaigns" ? "7.8%" : "6.4%";

  return (
    <>
      <div className="page-intro">
        <div><div className="eyebrow eyebrow-violet">Monday, 25 Oct 2026 <span className="slash">/</span> live workspace</div><h1>Attention is moving in the right direction.</h1><p>Profile discovery is up, and the latest campaigns are turning that attention into action.</p></div>
        <div className="intro-actions"><button className="button button-secondary"><Target size={15} /> Set targets</button><button className="button button-primary"><Sparkles size={15} /> Optimize signal</button></div>
      </div>
      <div className="kpi-grid">
        <KpiCard label="Profile views" value={formatCompact(currentViews)} change="+18.4%" detail="vs. previous period" icon={Activity} />
        <KpiCard label="Unique visitors" value={formatCompact(visitorCount)} change="+12.9%" detail="new + returning" icon={Users} color="mint" />
        <KpiCard label="View growth rate" value="18.4%" change="+4.2 pts" detail="above target" icon={TrendingUp} color="amber" />
        <KpiCard label="Campaign-attributed" value={formatCompact(Math.round(currentViews * 0.76))} change="+24.7%" detail="76% of total views" icon={Megaphone} color="sky" />
        <KpiCard label="Profile conversion" value={conversionRate} change="+1.3 pts" detail="views → actions" icon={Zap} color="coral" />
        <KpiCard label="Cost per view" value={campaignFilter === "All campaigns" ? "$0.31" : "$0.27"} change="-14.2%" detail="lower is better" icon={Gauge} color="violet" />
      </div>
      <section className="panel trend-panel">
        <SectionHeader eyebrow="Growth signal" title="Profile views are compounding week over week" action={<div className="legend"><span><i className="legend-violet" />Profile views</span><span><i className="legend-mint" />Unique visitors</span><button className="more-button"><MoreHorizontal size={17} /></button></div>} />
        <div className="chart-meta-row"><div><b>54,920</b><span>total profile views</span></div><div className="chart-meta-up"><ArrowUpRight size={14} /> 18.4% <span>vs. previous period</span></div><div className="chart-note"><span className="live-dot" /> Peak day <b>Oct 25</b><span className="separator-dot">•</span> 2,940 views</div></div>
        <div className="main-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={profileTrend} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}><defs><linearGradient id="profileGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7657f6" stopOpacity={0.27} /><stop offset="100%" stopColor="#7657f6" stopOpacity={0.02} /></linearGradient><linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9ae6c2" stopOpacity={0.24} /><stop offset="100%" stopColor="#9ae6c2" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="#e7e1dc" vertical={false} strokeDasharray="4 5" /><XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#a19b94", fontSize: 11 }} interval={1} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "#a19b94", fontSize: 11 }} tickFormatter={formatCompact} /><Tooltip content={<ChartTooltip />} /><Area type="monotone" dataKey="views" name="Profile views" stroke="#7657f6" strokeWidth={2.5} fill="url(#profileGradient)" activeDot={{ r: 5, fill: "#7657f6", stroke: "#fff", strokeWidth: 3 }} /><Area type="monotone" dataKey="visitors" name="Unique visitors" stroke="#59be91" strokeWidth={2} fill="url(#visitorGradient)" activeDot={{ r: 4, fill: "#59be91", stroke: "#fff", strokeWidth: 3 }} /></AreaChart></ResponsiveContainer></div>
        <div className="chart-footer"><span><b>New visitors</b> 68%</span><span><b>Returning</b> 32%</span><span><b>Avg. views / visitor</b> 1.6</span><span className="chart-footer-spacer" /><button className="text-button">View detailed report <ChevronRight size={14} /></button></div>
      </section>
      <div className="two-col-layout">
        <section className="panel campaign-panel"><SectionHeader eyebrow="Campaign pulse" title="Which campaigns are pulling the signal?" action={<button className="text-button" onClick={() => onSelectCampaign(filteredCampaigns[0]?.id ?? campaigns[0].id)}>View all <ChevronRight size={14} /></button>} /><div className="campaign-table"><div className="table-row table-head"><span>Campaign</span><span>Status</span><span>Profile views</span><span>Cost / view</span><span /></div>{filteredCampaigns.slice(0, 4).map((item) => <button className="table-row table-body" key={item.id} onClick={() => onSelectCampaign(item.id)}><span className="campaign-name-cell"><i className={`campaign-dot ${item.color}`} /><span><b>{item.name}</b><small>{item.objective}</small></span></span><span><Pill tone={item.health}>{item.health}</Pill></span><span><b>{formatCompact(item.views || 0)}</b><small>{item.engagement || 0}% engagement</small></span><span><b>{item.cpv ? `$${item.cpv.toFixed(2)}` : "—"}</b><small>{item.source}</small></span><ChevronRight size={16} className="row-arrow" /></button>)}</div><div className="table-summary"><span>Showing {filteredCampaigns.length} campaigns</span><span><span className="summary-dot" /> {filteredCampaigns.filter((item) => item.status === "Active").length} active</span><span className="summary-spacer" /><button className="button-link" onClick={() => onSelectCampaign(filteredCampaigns[0]?.id ?? campaigns[0].id)}>Open campaign table <ExternalLink size={13} /></button></div></section>
        <section className="panel channel-panel"><SectionHeader eyebrow="Attribution" title="Channel efficiency" action={<button className="more-button"><MoreHorizontal size={17} /></button>} /><div className="scatter-wrap"><ResponsiveContainer width="100%" height="100%"><ScatterChart margin={{ top: 12, right: 15, bottom: 4, left: -12 }}><CartesianGrid stroke="#e7e1dc" strokeDasharray="4 5" /><XAxis type="number" dataKey="cpv" name="Cost per view" tick={{ fill: "#a19b94", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toFixed(2)}`} domain={[0, 0.7]} /><YAxis type="number" dataKey="rate" name="Conversion rate" tick={{ fill: "#a19b94", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 9]} /><ZAxis type="number" dataKey="views" range={[70, 420]} /><Tooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltip />} /><Scatter data={channelData} name="Channels" fill="#7657f6" /></ScatterChart></ResponsiveContainer></div><div className="efficiency-footer"><div><span>Best efficiency</span><b>Email <small>· $0.08 / view</small></b></div><div><span>Most volume</span><b>Paid social <small>· 24.1K views</small></b></div></div></section>
      </div>
      <div className="three-col-layout"><section className="panel funnel-panel"><SectionHeader eyebrow="Conversion" title="Attention → action" action={<button className="more-button"><MoreHorizontal size={17} /></button>} /><div className="funnel-chart"><ResponsiveContainer width="100%" height="100%"><FunnelChart><Tooltip content={<ChartTooltip />} /><Funnel dataKey="value" data={funnelData} isAnimationActive nameKey="name"><LabelList position="right" fill="#6e6963" stroke="none" dataKey="name" fontSize={11} /></Funnel></FunnelChart></ResponsiveContainer></div><div className="funnel-bottom"><b>7.8%</b><span>profile-view → action rate</span><Pill tone="positive">+1.3 pts</Pill></div></section><section className="panel alerts-panel"><SectionHeader eyebrow="Operator notes" title="Worth your attention" action={<button className="more-button"><MoreHorizontal size={17} /></button>} /><div className="alert-list"><div className="alert-item alert-amber"><span className="alert-icon"><AlertTriangle size={16} /></span><div><b>Summer Proof is over pace</b><p>Spend is 9% above budget with a 0.6 cost per view.</p><button className="button-link" onClick={() => onSelectCampaign("summer-proof")}>Review campaign <ChevronRight size={13} /></button></div></div><div className="alert-item alert-violet"><span className="alert-icon"><Sparkles size={16} /></span><div><b>Founder Notes is gaining lift</b><p>Profile-view rate is up 22% in the last 72 hours.</p><button className="button-link" onClick={() => onSelectCampaign("founder-notes")}>See what changed <ChevronRight size={13} /></button></div></div><div className="alert-item alert-mint"><span className="alert-icon"><CheckCircle2 size={16} /></span><div><b>Tracking is healthy</b><p>All active campaigns have complete attribution parameters.</p></div></div></div></section><section className="panel quick-panel"><SectionHeader eyebrow="Quick actions" title="Keep momentum" /><button className="quick-action"><span className="quick-icon violet"><Plus size={16} /></span><span><b>Plan a campaign</b><small>Start with an outcome</small></span><ChevronRight size={15} /></button><button className="quick-action"><span className="quick-icon mint"><Send size={16} /></span><span><b>Reply to comments</b><small>3 high-intent replies</small></span><ChevronRight size={15} /></button><button className="quick-action"><span className="quick-icon amber"><ListChecks size={16} /></span><span><b>Clear today’s tasks</b><small>2 items need you</small></span><ChevronRight size={15} /></button></section></div>
    </>
  );
}

function Campaigns({ campaigns, setCampaigns, onSelectCampaign, selectedCampaign }: { campaigns: typeof initialCampaigns; setCampaigns: React.Dispatch<React.SetStateAction<typeof initialCampaigns>>; onSelectCampaign: (id: string) => void; selectedCampaign: string | null }) {
  const [showPlanner, setShowPlanner] = useState(false);
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("Profile discovery");
  const active = campaigns.filter((item) => item.status === "Active");
  const selected = campaigns.find((item) => item.id === selectedCampaign) ?? campaigns[0];
  const plan = () => {
    if (!name.trim()) return;
    setCampaigns((items) => [{ id: `${name.toLowerCase().replaceAll(" ", "-")}-${Date.now()}`, name: name.trim(), owner: "Maya Chen", status: "Scheduled", health: "On track", objective, spend: 0, budget: 2500, reach: 0, views: 0, engagement: 0, conversions: 0, cpv: 0, source: "Organic social", color: "violet" }, ...items]);
    setName(""); setShowPlanner(false); toast.success("Campaign plan added to your control room");
  };
  return (
    <>
      <div className="page-intro"><div><div className="eyebrow eyebrow-violet">Campaign operating system <span className="slash">/</span> 5 campaigns</div><h1>Make every campaign easier to steer.</h1><p>Monitor pacing, profile-view lift, and the next optimization decision from one calm control room.</p></div><div className="intro-actions"><button className="button button-secondary"><Download size={15} /> Export view</button><button className="button button-primary" onClick={() => setShowPlanner((value) => !value)}><Plus size={15} /> Plan a campaign</button></div></div>
      {showPlanner && <div className="planner-card panel"><div><div className="eyebrow eyebrow-violet">New campaign plan</div><h3>Start with the decision you want the campaign to make.</h3></div><div className="planner-fields"><label><span>Campaign name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. November signal" /></label><label><span>Primary objective</span><select value={objective} onChange={(event) => setObjective(event.target.value)}><option>Profile discovery</option><option>Profile actions</option><option>Lead capture</option><option>Thought leadership</option></select></label><button className="button button-primary" onClick={plan}>Add to plan <ChevronRight size={15} /></button></div></div>}
      <div className="mini-kpi-row"><div className="mini-kpi"><span>Active campaigns</span><b>{active.length}</b><small><span className="positive-text">+1</span> this month</small></div><div className="mini-kpi"><span>Planned spend</span><b>{money.format(campaigns.reduce((sum, item) => sum + item.budget, 0))}</b><small>across active + planned</small></div><div className="mini-kpi"><span>Avg. cost / view</span><b>$0.31</b><small><span className="positive-text">-14.2%</span> vs baseline</small></div><div className="mini-kpi"><span>Profile-view lift</span><b>+18.4%</b><small><span className="positive-text">Above target</span></small></div></div>
      <div className="campaigns-layout"><section className="panel campaign-list-panel"><SectionHeader eyebrow="Campaign portfolio" title="Pacing and performance" action={<button className="filter-more"><Filter size={14} /> Filter <span>2</span></button>} /><div className="campaign-grid-table"><div className="campaign-grid-head"><span>Campaign</span><span>Health</span><span>Budget pacing</span><span>Profile views</span><span>Cost / view</span><span>Conversions</span><span /></div>{campaigns.map((item) => <button className={`campaign-grid-row ${selected.id === item.id ? "selected" : ""}`} key={item.id} onClick={() => onSelectCampaign(item.id)}><span className="campaign-name-cell"><i className={`campaign-dot ${item.color}`} /><span><b>{item.name}</b><small>{item.objective} · {item.owner}</small></span></span><Pill tone={item.health}>{item.health}</Pill><span className="pacing-cell"><span className="pacing-bar"><i style={{ width: `${Math.min(100, Math.max(item.status === "Scheduled" ? 4 : 12, Math.round((item.spend / item.budget) * 100)))}%` }} /></span><small>{item.status === "Scheduled" ? "Starts Oct 28" : `${Math.round((item.spend / item.budget) * 100)}% spent`}</small></span><span><b>{formatCompact(item.views)}</b><small>{item.status === "Scheduled" ? "forecast pending" : `${item.engagement}% engagement`}</small></span><span><b>{item.cpv ? `$${item.cpv.toFixed(2)}` : "—"}</b><small>{item.source}</small></span><span><b>{number.format(item.conversions)}</b><small>{item.status === "Scheduled" ? "—" : "attributed"}</small></span><ChevronRight size={16} className="row-arrow" /></button>)}</div></section><CampaignDetail campaign={selected} /></div>
    </>
  );
}

function CampaignDetail({ campaign }: { campaign: typeof initialCampaigns[number] }) {
  const detailData = profileTrend.map((item, index) => ({ ...item, value: campaign.status === "Scheduled" ? 0 : Math.round(item.views * (campaign.views / 54920) * (0.75 + index / 35)) }));
  return <section className="panel campaign-detail"><div className="detail-kicker"><span className={`campaign-dot ${campaign.color}`} /> {campaign.status} campaign <button className="more-button"><MoreHorizontal size={17} /></button></div><h2>{campaign.name}</h2><p>{campaign.objective} · Owned by {campaign.owner}</p><div className="detail-status"><Pill tone={campaign.health}>{campaign.health}</Pill><span><span className="live-dot" /> Updated 4 min ago</span></div><div className="detail-metrics"><div><span>Profile views</span><b>{formatCompact(campaign.views)}</b><small className="positive-text">+22.4%</small></div><div><span>Budget used</span><b>{campaign.budget ? `${Math.round((campaign.spend / campaign.budget) * 100)}%` : "—"}</b><small>{money.format(campaign.spend)} / {money.format(campaign.budget)}</small></div><div><span>Cost / view</span><b>{campaign.cpv ? `$${campaign.cpv.toFixed(2)}` : "—"}</b><small className="positive-text">Target $0.40</small></div></div><div className="detail-chart"><div className="eyebrow">Profile-view trend</div><ResponsiveContainer width="100%" height="100%"><LineChart data={detailData} margin={{ top: 10, right: 4, left: -26, bottom: 0 }}><CartesianGrid stroke="#ece5df" vertical={false} strokeDasharray="4 5" /><XAxis dataKey="day" hide /><YAxis hide /><Tooltip content={<ChartTooltip />} /><Line type="monotone" dataKey="value" name="Profile views" stroke="#7657f6" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div><div className="detail-section"><div className="eyebrow">Next recommendation</div><p className="recommendation"><Sparkles size={15} /> {campaign.health === "At risk" ? "Pause the lowest-performing creative and move 10% of remaining budget into the retargeting set." : "Keep the winning creative live and test one new opening line before the next pacing check."}</p></div><button className="button button-secondary full-width"><ExternalLink size={15} /> Open campaign workspace</button></section>;
}

function Tasks({ tasks, setTasks }: { tasks: typeof initialTasks; setTasks: React.Dispatch<React.SetStateAction<typeof initialTasks>> }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskFilter, setTaskFilter] = useState("All tasks");
  const taskCounts = { overdue: 2, progress: tasks.filter((item) => item.status === "In progress").length, done: tasks.filter((item) => item.status === "Done").length };
  const filtered = tasks.filter((item) => taskFilter === "All tasks" || item.status === taskFilter || item.area === taskFilter);
  const addTask = () => { if (!taskTitle.trim()) return; setTasks((items) => [{ id: Date.now(), title: taskTitle.trim(), owner: "Maya", due: "Tomorrow", priority: "Medium", status: "Todo", area: "Profile views" }, ...items]); setTaskTitle(""); toast.success("Task added to the signal room"); };
  const setStatus = (id: number, status: string) => setTasks((items) => items.map((task) => task.id === id ? { ...task, status } : task));
  return <><div className="page-intro"><div><div className="eyebrow eyebrow-violet">Task agent <span className="slash">/</span> owner queue</div><h1>Keep the signal moving.</h1><p>Turn campaign insights, audience questions, and follow-up actions into a clear next step.</p></div><div className="intro-actions"><div className="agent-status"><span className="live-dot" /> Task agent active</div></div></div><div className="task-stats"><div className="task-stat overdue"><CircleAlert size={18} /><div><span>Needs attention</span><b>{taskCounts.overdue}</b><small>overdue or due today</small></div></div><div className="task-stat progress"><Clock3 size={18} /><div><span>In progress</span><b>{taskCounts.progress}</b><small>moving right now</small></div></div><div className="task-stat done"><CheckCircle2 size={18} /><div><span>Completed</span><b>{taskCounts.done}</b><small>this workstream</small></div></div><div className="task-stat focus"><Sparkles size={18} /><div><span>Focus suggestion</span><b>Reply to intent</b><small>3 high-value comments waiting</small></div></div></div><section className="panel tasks-panel"><div className="tasks-toolbar"><div><div className="eyebrow">Owner queue</div><h2>Today’s signal-to-action list</h2></div><div className="task-toolbar-actions"><label className="search-control"><Search size={15} /><input placeholder="Search tasks" /></label><label className="select-control compact"><select value={taskFilter} onChange={(event) => setTaskFilter(event.target.value)} aria-label="Task filter"><option>All tasks</option><option>Todo</option><option>In progress</option><option>Done</option><option>Campaigns</option><option>YouTube</option><option>Profile views</option></select><ChevronDown size={13} /></label></div></div><div className="add-task-row"><Plus size={16} /><input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addTask(); }} placeholder="Add a task that moves the business forward…" /><button className="button button-primary small" onClick={addTask}>Add task</button></div><div className="task-table"><div className="task-row task-head"><span>Task</span><span>Owner</span><span>Due</span><span>Priority</span><span>Status</span><span /></div>{filtered.map((task) => <div className="task-row task-body" key={task.id}><div className="task-title"><button className={`task-check ${task.status === "Done" ? "checked" : ""}`} onClick={() => setStatus(task.id, task.status === "Done" ? "Todo" : "Done")} aria-label={`Mark ${task.title} ${task.status === "Done" ? "not done" : "done"}`}>{task.status === "Done" && <Check size={13} />}</button><span><b className={task.status === "Done" ? "struck" : ""}>{task.title}</b><small>{task.area}</small></span></div><span className="owner-cell"><span className="avatar avatar-small">{task.owner === "YouTube agent" ? "YT" : task.owner.slice(0, 2).toUpperCase()}</span>{task.owner}</span><span className={task.due === "Today" ? "due-today" : "muted-text"}>{task.due}</span><Pill tone={task.priority}>{task.priority}</Pill><label className="status-select"><select value={task.status} onChange={(event) => setStatus(task.id, event.target.value)} aria-label={`Status for ${task.title}`}><option>Todo</option><option>In progress</option><option>Done</option></select><ChevronDown size={13} /></label><button className="more-button"><MoreHorizontal size={16} /></button></div>)}</div></section></>;
}

function YoutubeAgent({ comments, setComments }: { comments: typeof initialComments; setComments: React.Dispatch<React.SetStateAction<typeof initialComments>> }) {
  const [selectedId, setSelectedId] = useState(1);
  const [reply, setReply] = useState(comments[0].suggested);
  const selected = comments.find((item) => item.id === selectedId) ?? comments[0];
  const pending = comments.filter((item) => item.status === "Needs reply").length;
  const sendReply = () => { setComments((items) => items.map((item) => item.id === selected.id ? { ...item, status: "Replied" } : item)); toast.success(`Reply sent to ${selected.author}`); };
  const choose = (comment: typeof initialComments[number]) => { setSelectedId(comment.id); setReply(comment.suggested); };
  return <><div className="page-intro"><div><div className="eyebrow eyebrow-violet">YouTube agent <span className="slash">/</span> reply queue</div><h1>Reply to the comments that can become relationships.</h1><p>Let the agent surface intent, then keep the final word in your voice.</p></div><div className="intro-actions"><div className="agent-status"><span className="live-dot" /> Agent listening</div><button className="button button-primary"><Settings2 size={15} /> Agent settings</button></div></div><div className="agent-summary"><div className="agent-health"><div className="health-ring"><Bot size={22} /><span>98</span></div><div><div className="eyebrow">Agent health</div><h3>Sharp and ready</h3><p>Reply tone is calibrated to your guidelines.</p></div></div><div className="agent-stat"><span>Need a reply</span><b>{pending}</b><small>high-intent comments</small></div><div className="agent-stat"><span>Replies sent</span><b>28</b><small><span className="positive-text">+18%</span> this week</small></div><div className="agent-stat"><span>Avg. response</span><b>1h 42m</b><small>down 24 minutes</small></div><div className="agent-stat"><span>Top sentiment</span><b>Positive</b><small>71% of queue</small></div></div><div className="youtube-layout"><section className="panel comment-queue"><div className="queue-header"><div><div className="eyebrow">Comment queue</div><h2>Conversations worth entering</h2></div><label className="search-control"><Search size={15} /><input placeholder="Search comments" /></label></div><div className="queue-filters"><button className="active">Needs reply <span>{pending}</span></button><button>All comments <span>{comments.length}</span></button><button>Positive <span>3</span></button><button className="more-button"><MoreHorizontal size={16} /></button></div><div className="comment-list">{comments.map((comment) => <button className={`comment-row ${selected.id === comment.id ? "selected" : ""}`} key={comment.id} onClick={() => choose(comment)}><span className="avatar">{comment.avatar}</span><span className="comment-copy"><span className="comment-meta"><b>{comment.author}</b><small>{comment.video}</small></span><strong>{comment.text}</strong><span className="comment-tags"><Pill tone={comment.sentiment}>{comment.sentiment}</Pill><Pill tone={comment.status}>{comment.status}</Pill></span></span><ChevronRight size={16} className="row-arrow" /></button>)}</div></section><section className="panel reply-panel"><div className="reply-header"><div><div className="eyebrow">Reply studio</div><h2>Keep the response human.</h2></div><button className="more-button"><MoreHorizontal size={17} /></button></div><div className="selected-comment"><div className="comment-context"><span className="avatar">{selected.avatar}</span><span><b>{selected.author}</b><small>on {selected.video}</small></span></div><p>“{selected.text}”</p><div className="sentiment-line"><span className="sentiment-icon"><Sparkles size={14} /></span><span>Agent read: <b>{selected.sentiment}</b> · {selected.tone.toLowerCase()} tone</span></div></div><div className="reply-composer"><div className="composer-head"><span className="eyebrow">Suggested reply</span><button className="button-link" onClick={() => setReply(selected.suggested)}>Regenerate <RefreshCw size={12} /></button></div><textarea value={reply} onChange={(event) => setReply(event.target.value)} aria-label="Reply text" /><div className="composer-footer"><span>{reply.length} / 500 characters</span><div><button className="button button-secondary small" onClick={() => setReply("")}>Edit manually</button><button className="button button-primary small" onClick={sendReply}><Send size={14} /> Send reply</button></div></div></div><div className="reply-guidance"><CircleHelp size={15} /><span>Use a specific answer, acknowledge the question, and offer one next step.</span></div></section></div></>;
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const current = location === "/campaigns" ? "campaigns" : location === "/tasks" ? "tasks" : location === "/youtube-agent" ? "youtube-agent" : "overview";
  const [range, setRange] = useState("Last 30 days");
  const [comparison, setComparison] = useState("Previous period");
  const [campaignFilter, setCampaignFilter] = useState("All campaigns");
  const [channel, setChannel] = useState("All channels");
  const [audience, setAudience] = useState("All audiences");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [comments, setComments] = useState(initialComments);
  const [showDetail, setShowDetail] = useState(false);

  const selectedCampaignData = useMemo(() => campaigns.find((item) => item.id === selectedCampaign), [campaigns, selectedCampaign]);
  const navigate = (slug: string) => setLocation(slug === "overview" ? "/" : `/${slug}`);
  const selectCampaign = (id: string) => { setSelectedCampaign(id); setShowDetail(true); };
  const refresh = () => toast.success("Signal room refreshed", { description: "Latest activity is now in view." });
  const exportData = () => { const csv = ["Campaign,Status,Profile views,Cost per view,Conversions", ...campaigns.map((item) => `${item.name},${item.status},${item.views},${item.cpv},${item.conversions}`)].join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = "signal-room-campaigns.csv"; anchor.click(); URL.revokeObjectURL(url); toast.success("CSV exported"); };
  const clearFilters = () => { setCampaignFilter("All campaigns"); setChannel("All channels"); setAudience("All audiences"); };

  return <div className="app-shell"><Sidebar current={current} onNavigate={navigate} /><main className="main-shell"><Topbar onRefresh={refresh} onExport={exportData} range={range} setRange={setRange} comparison={comparison} setComparison={setComparison} /><div className="mobile-workspace-nav">{workspaceItems.map(({ slug, label, icon: Icon }) => <button key={slug} className={current === slug ? "active" : ""} onClick={() => navigate(slug)}><Icon size={15} /> {label}</button>)}</div><div className="page-content">{current === "overview" && <><div className="filter-bar-wrap"><FilterBar campaign={campaignFilter} setCampaign={setCampaignFilter} channel={channel} setChannel={setChannel} audience={audience} setAudience={setAudience} onClear={clearFilters} /></div><Overview onSelectCampaign={selectCampaign} campaigns={campaigns} channel={channel} campaignFilter={campaignFilter} /></>}{current === "campaigns" && <Campaigns campaigns={campaigns} setCampaigns={setCampaigns} onSelectCampaign={(id) => { setSelectedCampaign(id); }} selectedCampaign={selectedCampaign} />}{current === "tasks" && <Tasks tasks={tasks} setTasks={setTasks} />}{current === "youtube-agent" && <YoutubeAgent comments={comments} setComments={setComments} />}</div></main>{showDetail && selectedCampaignData && <div className="modal-backdrop" onClick={() => setShowDetail(false)}><div className="modal-sheet" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowDetail(false)}><X size={18} /></button><CampaignDetail campaign={selectedCampaignData} /></div></div>}</div>;
}
