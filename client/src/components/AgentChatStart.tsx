import { FormEvent, useState } from "react";
import { ArrowUp, Bot, ChevronRight, Sparkles, Youtube } from "lucide-react";
import { toast } from "sonner";

const suggestions = [
  "What should I publish next based on this week's comments?",
  "Find high-intent comments and draft replies",
  "Turn recurring audience questions into a video brief",
];

export function AgentChatStart({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    toast.success("Task staged for the YouTube agent", { description: "Review the plan in Agent tasks before any public action." });
  };

  return (
    <main className="chat-start-shell">
      <div className="chat-start-topbar">
        <div className="chat-brand"><span className="chat-brand-mark"><Youtube size={17} /></span><span>signal / room</span></div>
        <button className="chat-workspace-link" onClick={onOpenWorkspace}>Open workspace <ChevronRight size={15} /></button>
      </div>
      <section className="chat-start-content" aria-labelledby="chat-start-title">
        <div className="chat-start-kicker"><span className="chat-live-dot" /> YouTube agent ready</div>
        <div className="chat-start-icon"><Bot size={28} strokeWidth={1.6} /></div>
        <h1 id="chat-start-title">What should we work on?</h1>
        <p className="chat-start-subtitle">Ask your channel agent to research, plan, draft, or organize the next move. Public actions stay approval-gated.</p>
        <form className={`agent-composer ${submitted ? "submitted" : ""}`} onSubmit={submit}>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell the agent what you want to accomplish..." rows={3} aria-label="Message the YouTube agent" />
          <div className="agent-composer-footer"><span><Sparkles size={14} /> Agent can research, plan, and draft</span><button type="submit" aria-label="Send message" disabled={!message.trim()}><ArrowUp size={17} /></button></div>
        </form>
        {submitted && <div className="chat-staged-note"><span className="chat-live-dot" /> Plan staged. Your agent task is waiting for review.</div>}
        <div className="chat-suggestions"><div className="eyebrow">Try asking</div>{suggestions.map((suggestion) => <button key={suggestion} onClick={() => setMessage(suggestion)}>{suggestion}<ChevronRight size={14} /></button>)}</div>
      </section>
      <p className="chat-start-footnote">Connected channels are private to your account. The agent remembers approved work and previous decisions.</p>
    </main>
  );
}
