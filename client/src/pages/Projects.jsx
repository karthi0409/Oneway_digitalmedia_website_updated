import React from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import FeaturedWork from '../components/sections/FeaturedWork.jsx';
import Heading from '../components/ui/Heading.jsx';
import Icon from '../components/ui/Icon.jsx';
import CtaSection from '../components/sections/CtaSection.jsx';
import { services } from '../data/services.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Projects() {
  useDocumentTitle(
    'Client Case Studies & Projects',
    'Review our portfolio of digital marketing campaigns, Google/Meta ad funnels, website builds, and short-form video productions.'
  );

  return (
    <>
      <PageHero
        tag="Proven Client Outcomes"
        title="OUR"
        highlight="PROJECTS"
        lead="See how our multi-channel marketing strategies, web development frameworks, and creative campaigns translate into measurable business growth."
      />

      {/* Featured Work from API with Category Filter & Modal */}
      <FeaturedWork />

      {/* What We Deliver - Summary Per Service */}
      <section className="section section-navy" id="deliverables">
        <div className="container">
          <Heading
            tag="Core Deliverables"
            title="What We"
            highlight="Deliver"
            subtitle="Every engagement is structured around crisp, tangible outputs designed to immediately move the revenue needle."
            theme="dark"
          />

          <div className="grid-2">
            {services.map((service) => (
              <div key={service.id} className="card card-dark">
                <div className="card-icon-disc">
                  <Icon name={service.icon} size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--white)', marginBottom: '0.4rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--lime)', fontWeight: 600, fontSize: '0.925rem', marginBottom: '1rem' }}>
                  {service.tagline}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {service.items.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: 'rgba(241, 242, 240, 0.8)',
                      }}
                    >
                      <span style={{ color: 'var(--lime)', fontWeight: 700 }}>✓</span>
                      <span>
                        <strong>{item.title}:</strong> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Want To Be Our Next Success Story?"
        lead="We limit client onboarding each month to ensure dedicated strategist attention and exceptional execution quality."
      />
    </>
  );
}
