import React from 'react';
import Heading from '../ui/Heading.jsx';
import Icon from '../ui/Icon.jsx';
import { aboutIntro, aboutCards } from '../../data/about.js';

export default function AboutIntro() {
  return (
    <section className="section section-light" id="about-intro">
      <div className="container">
        <Heading
          tag="Who We Are"
          title="About One Way Digital"
          highlight="Media"
          subtitle="We exist to help founders and business leaders navigate the modern digital landscape with clarity and high-velocity results."
          theme="light"
        />

        {/* Intro Paragraphs */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto 3.5rem auto',
            fontSize: '1.1rem',
            lineHeight: '1.75',
            color: 'var(--navy)',
          }}
        >
          {aboutIntro.map((p, i) => (
            <p key={i} style={{ marginBottom: '1.25rem' }}>
              {p}
            </p>
          ))}
        </div>

        {/* 4 Cards Grid */}
        <div className="grid-4">
          {aboutCards.map((card, i) => (
            <div key={i} className="card">
              <div className="card-icon-disc">
                <Icon name={card.icon} size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--navy)' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: '1.55' }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
