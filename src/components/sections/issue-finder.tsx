"use client";

import { useState } from "react";
import { TextLink } from "@/components/ui/action-links";
import { issues } from "@/content/issues";

/** "What are you noticing?" toggle group with a matching next step. */
export function IssueFinder() {
  const [active, setActive] = useState(0);
  const issue = issues[active];
  return (
    <div className="issue-finder">
      <div className="issue-options" role="group" aria-label="What are you noticing?">
        {issues.map((option, n) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={n === active}
            onClick={() => setActive(n)}
          >
            <span className="selection-dot" />
            {option.name}
            <span className="issue-plus">{n === active ? "−" : "+"}</span>
          </button>
        ))}
      </div>
      <div className="issue-answer" aria-live="polite">
        <span className="small-label">YOUR STARTING POINT</span>
        <h3>{issue.title}</h3>
        <p>{issue.text}</p>
        <TextLink
          href={`/contact?service=${issue.service}&issue=${issue.id}`}
          label="Tell John about it"
        />
        <small>A guide to starting the conversation, not a diagnosis.</small>
      </div>
    </div>
  );
}
