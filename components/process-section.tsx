'use client';
import React, { useState } from 'react';

const nodes = [
  {
    label: 'Brief',
    desc: 'Vous décrivez votre besoin',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    label: 'Solution',
    desc: "On conçoit l'architecture",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>
      </svg>
    ),
  },
  {
    label: 'Livraison',
    desc: 'Vous mesurez les résultats',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

function Beam({ delay = 0, paused }: { delay?: number; paused: boolean }) {
  return (
    <div className="process__beam" aria-hidden="true">
      {/* Horizontal line (desktop) */}
      <svg
        className="process__beam-svg process__beam-svg--h"
        viewBox="0 0 200 4"
        preserveAspectRatio="none"
      >
        <line
          x1="0" y1="2" x2="200" y2="2"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
      </svg>
      {/* Vertical line (mobile) */}
      <svg
        className="process__beam-svg process__beam-svg--v"
        viewBox="0 0 4 200"
        preserveAspectRatio="none"
      >
        <line
          x1="2" y1="0" x2="2" y2="200"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
      </svg>
      <span
        className="process__dot"
        style={{
          animationDelay: `${delay}s`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      />
    </div>
  );
}

export default function ProcessSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="section process" id="process">
      <div className="container">
        <span className="kicker reveal">Comment ça marche</span>
        <h2 className="h-section reveal" data-delay="1">
          Trois étapes.{' '}
          <em style={{ color: 'var(--blue-2)', fontStyle: 'normal' }}>Zéro surprise.</em>
        </h2>

        <div className="process__track reveal" data-delay="2">
          {nodes.map((node, i) => (
            <React.Fragment key={i}>
              <div
                className="process__node"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="process__ic">{node.icon}</div>
                <div className="process__step-label">{node.label}</div>
                <div className="process__step-desc">{node.desc}</div>
              </div>
              {i < nodes.length - 1 && (
                <Beam delay={i * -1.25} paused={paused} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
