import React, { useEffect } from 'react';
import Hero from '../components/sections/Hero.jsx';
import ServiceStrip from '../components/sections/ServiceStrip.jsx';
import MarketingBundles from '../components/sections/MarketingBundles.jsx';
import GrowthEngine from '../components/sections/GrowthEngine.jsx';
import ProcessSteps from '../components/sections/ProcessSteps.jsx';
import WhoWeWorkWith from '../components/sections/WhoWeWorkWith.jsx';
import CtaSection from '../components/sections/CtaSection.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { company } from '../data/company.js';

export default function Home() {
  useDocumentTitle(
    'Digital Marketing & Web Agency Bangalore',
    'One Way Digital Media is an end-to-end digital marketing and web development agency in Bangalore. We scale businesses with social media, ROI-focused ads, web engineering, and video production.'
  );

  // Inject JSON-LD Schema for ProfessionalService / LocalBusiness
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: company.name,
      image: 'https://onewaydigital.in/brand/logo.png',
      telephone: company.phone,
      email: company.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'HSR Layout',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560102',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 12.9121,
        longitude: 77.6446,
      },
      url: 'https://onewaydigital.in',
      priceRange: '₹₹',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
      sameAs: [
        company.social.instagram,
        company.social.facebook,
      ],
    });

    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('json-ld-schema');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  return (
    <>
      {/* Hero with badge, 3-line headline, buttons, ribbon, audience bar */}
      <Hero />

      {/* Services short version (4 cards) */}
      <ServiceStrip />

      {/* How business insight connects to measurable growth */}
      <GrowthEngine />

      {/* Ready-to-start service bundles */}
      <MarketingBundles />

      {/* Our 5-Step Process */}
      <ProcessSteps theme="light" />

      {/* Who We Work With */}
      <WhoWeWorkWith theme="navy" />

      {/* Final Call to Action */}
      <CtaSection />
    </>
  );
}
