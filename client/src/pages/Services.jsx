import React from 'react';
import PageHero from '../components/ui/PageHero.jsx';
import ServiceDetail from '../components/sections/ServiceDetail.jsx';
import MarketingChannels from '../components/sections/MarketingChannels.jsx';
import WebPlans from '../components/sections/WebPlans.jsx';
import CtaSection from '../components/sections/CtaSection.jsx';
import { services } from '../data/services.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Services() {
  useDocumentTitle(
    'Digital Services | Social Media, Ads, Websites & Video',
    'Explore our comprehensive service offerings: organic social media management, Google & Meta ads, custom responsive website development, and high-impact video production.'
  );

  return (
    <>
      <PageHero
        tag="End-to-End Capabilities"
        title="OUR"
        highlight="SERVICES"
        lead="Strategic, revenue-focused digital services crafted to help businesses generate high-quality inquiries, amplify brand awareness, and dominate their vertical."
      />

      {/* 4 In-Depth Service Sections with Anchor IDs */}
      <div className="services-container" style={{ backgroundColor: 'var(--paper)' }}>
        {services.map((service, index) => (
          <ServiceDetail
            key={service.id}
            service={service}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      <MarketingChannels />

      {/* Web Development Plans Showcase */}
      <WebPlans />

      {/* Conversion Banner */}
      <CtaSection
        title="Have a Custom Scope in Mind?"
        lead="Whether you need single-channel campaign management or a full-suite digital overhaul, our team is equipped to deliver."
      />
    </>
  );
}
