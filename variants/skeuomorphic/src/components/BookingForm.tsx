"use client";

import { useState, type FormEvent } from "react";

const CALENDLY_BASE = "https://calendly.com/support-0f8w/discovery-call";

const problems = [
  "One process eating my team's hours",
  "Data scattered across tools and spreadsheets",
  "I'm the bottleneck — everything routes through me",
  "We can't see what's actually happening",
  "Something else",
];

export default function BookingForm({ source }: { source: string }) {
  const [state, setState] = useState<"idle" | "sending">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const data = new FormData(event.currentTarget);
    const lead = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      problem: String(data.get("problem") || ""),
      detail: String(data.get("detail") || ""),
      source,
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // The calendar remains available even when lead capture is unavailable.
    }

    const params = new URLSearchParams({
      name: lead.name,
      email: lead.email,
      utm_source: "visionaryfunnels.com",
      utm_medium: "form",
      utm_campaign: "discovery-call",
      utm_content: source,
    });

    if (lead.company) params.set("a1", lead.company);
    window.location.href = `${CALENDLY_BASE}?${params.toString()}`;
  }

  return (
    <form onSubmit={onSubmit} className="paper booking-form">
      <div className="form-rivets" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="form-grid">
        <label>
          <span>Your name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Company</span>
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        <span>What&apos;s costing you the most right now?</span>
        <select name="problem" required defaultValue="">
          <option value="" disabled>
            Pick the closest one
          </option>
          {problems.map((problem) => (
            <option key={problem} value={problem}>
              {problem}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>
          Anything useful before the call? <small>(optional)</small>
        </span>
        <textarea name="detail" rows={4} />
      </label>
      <button className="brass-button form-submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Opening the appointment book…" : "Choose a time →"}
      </button>
      <p className="form-note">
        A 20-minute working session. Your details carry over to the calendar.
      </p>
    </form>
  );
}
