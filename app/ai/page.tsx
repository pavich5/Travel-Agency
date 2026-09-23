"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "../Components/travel/Icon";
type Message = { role: "assistant" | "user"; content: string };
const welcome: Message = {
  role: "assistant",
  content:
    "Hello, curious traveler. Tell me where you’d love to go, your budget, or the kind of escape you’re dreaming of. Let’s find your somewhere.",
};
export default function TravelAI() {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("globetrotter-chat") || "null",
      );
      if (
        Array.isArray(saved) &&
        saved.length &&
        saved.every(
          (m) =>
            (m.role === "assistant" || m.role === "user") &&
            typeof m.content === "string",
        )
      )
        setMessages(saved.slice(-20));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(
          "globetrotter-chat",
          JSON.stringify(messages.slice(-20)),
        );
      } catch {}
      bottom.current?.scrollIntoView({ block: "nearest" });
    }
  }, [messages, ready]);
  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Message[] = [
      ...messages,
      { role: "user", content: text.trim() },
    ];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Your planner is taking a moment. Please try again.",
        );
      setMessages((current) => [...current, data.output]);
      setMode(data.mode);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="shell chat-wrap">
      <div className="page-top">
        <div className="page-top-row">
          <p className="eyebrow">MEET YOUR CURIOUS COMPANION</p>
          <button
            className="text-link"
            style={{
              background: "none",
              borderTop: 0,
              borderLeft: 0,
              borderRight: 0,
              cursor: "pointer",
            }}
            disabled={busy}
            onClick={() => {
              setMessages([welcome]);
              setError("");
              setMode("");
            }}
          >
            New conversation
          </button>
        </div>
        <h1>
          A big idea.
          <br />
          <em>A little help getting there.</em>
        </h1>
        <p>
          Ask about destinations, compare escapes, or find a place that fits
          your pace.
        </p>
      </div>
      <div className="chat-prompts">
        {[
          "A sunny escape in Greece",
          "A mountain getaway",
          "Trips under €1,200",
        ].map((prompt) => (
          <button disabled={busy} key={prompt} onClick={() => send(prompt)}>
            {prompt}
            <span style={{ marginLeft: 8 }}>↗</span>
          </button>
        ))}
      </div>
      <div
        className="chat-messages"
        role="log"
        aria-label="Travel planner conversation"
        aria-live="polite"
      >
        {messages.map((message, i) => (
          <div className={`chat-bubble ${message.role}`} key={i}>
            <span className="sr-only">
              {message.role === "user" ? "You" : "Travel planner"}:{" "}
            </span>
            {message.content}
          </div>
        ))}
        {busy && (
          <div className="chat-bubble" role="status">
            Finding a little inspiration…
          </div>
        )}
        <div ref={bottom} />
      </div>
      {error && (
        <p
          className="notice error-notice"
          role="alert"
          style={{ marginTop: 15 }}
        >
          {error}{" "}
          <button
            className="text-link"
            onClick={() =>
              send(
                messages.filter((m) => m.role === "user").at(-1)?.content || "",
              )
            }
          >
            Try again
          </button>
        </p>
      )}
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          aria-label="Message your travel planner"
          value={input}
          maxLength={1000}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Somewhere new. Somewhere you."
        />
        <button
          type="submit"
          className="button button-green"
          disabled={busy || !input.trim()}
        >
          Send <Icon name="arrow" size={16} />
        </button>
      </form>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 16 }}>
        {mode === "catalog"
          ? "You’re chatting with our catalog guide. It matches ideas to the available sample trips."
          : "Suggestions are inspiration. Always check the offer details before booking."}{" "}
        <Link href="/offers" className="text-link" style={{ fontSize: 13 }}>
          Browse all trips
        </Link>
      </p>
    </main>
  );
}
