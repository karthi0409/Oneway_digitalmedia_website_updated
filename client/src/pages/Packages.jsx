import React from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import Note from '../components/ui/Note.jsx';
import MarketingPackages from '../components/sections/MarketingPackages.jsx';
import WebPlans from '../components/sections/WebPlans.jsx';
import CtaSection from '../components/sections/CtaSection.jsx';
import { packageNote } from '../data/packages.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Packages() {
  useDocumentTitle(
    'Digital Marketing Packages & Pricing',
    'Transparent pricing plans for social media marketing, performance ads management, and website development. Choose between Starter, Growth, and Scale retainers.'
  );

  return (
    <>
      <PageHero
        tag="Transparent Investments"
        title="DIGITAL MARKETING"
        highlight="PACKAGES"
        lead="Flexible plans for every stage of growth. We believe in clear pricing, zero hidden lock-in clauses, and complete alignment with your revenue targets."
      />

      <section className="packages-note-section" aria-label="Pricing details">
        <div className="container">
          <div className="packages-note-panel">
            <span className="packages-note-label">A note on pricing</span>
            <Note text={packageNote} theme="light" className="packages-pricing-note" />
          </div>
        </div>
      </section>

      {/* 3 Marketing Retainer Plans */}
      <MarketingPackages />

      {/* 3 Web Development Plans */}
      <WebPlans />

      {/* Custom Enterprise CTA */}
      <CtaSection
        title="Need an Omnichannel Enterprise Plan?"
        lead="Scaling past ₹50L/month? Talk to our founders for custom multi-market ad funnels, bespoke CRM architectures, and dedicated creative squads."
      />
    </>
  );
}
