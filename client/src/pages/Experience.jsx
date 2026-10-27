import React from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import StatsBand from '../components/sections/StatsBand.jsx';
import WhoWeWorkWith from '../components/sections/WhoWeWorkWith.jsx';
import ProcessSteps from '../components/sections/ProcessSteps.jsx';
import CtaSection from '../components/sections/CtaSection.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Experience() {
  useDocumentTitle(
    'Our Experience & Track Record',
    'Explore our 5+ years of digital marketing track record, industries we empower, and our structured 5-step methodology that produces predictable scale.'
  );

  return (
    <>
      <PageHero
        tag="Battle-Tested Authority"
        title="OUR"
        highlight="EXPERIENCE"
        lead="Over half a decade of engineering high-growth digital customer acquisition funnels, brand identities, and conversion-optimized websites across India."
      />

      {/* Numerical Stats Band */}
      <StatsBand />

      {/* Inspirational Brand Philosophy Quote */}
      <section className="section section-navy" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <span style={{ fontSize: '3rem', color: 'var(--lime)', display: 'block', lineHeight: 1 }}>
            “
          </span>
          <blockquote
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              lineHeight: 1.3,
              color: 'var(--white)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '1.25rem',
            }}
          >
            Digital marketing is not about collecting likes. It is the science of capturing buyer attention, engineering trust, and driving continuous sales.
          </blockquote>
          <cite style={{ fontStyle: 'normal', color: 'var(--lime)', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.08em' }}>
            — ONE WAY DIGITAL MEDIA LEADERSHIP
          </cite>
        </div>
      </section>

      {/* Target Audiences We Serve */}
      <WhoWeWorkWith theme="light" />

      {/* 5-Step Execution Methodology */}
      <ProcessSteps theme="dark" />

      {/* CTA */}
      <CtaSection />
    </>
  );
}
