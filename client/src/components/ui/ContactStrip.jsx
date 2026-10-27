import React from 'react';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { company } from '../../data/company.js';

/**
 * Top Quick Contact Strip Bar
 */
export default function ContactStrip() {
  return (
    <div className="top-contact-strip" role="region" aria-label="Contact Information Bar">
      <div className="container">
        <div className="contact-items">
          <a href={`tel:${company.phone}`} aria-label={`Call us at ${company.phone}`}>
            <FiPhone size={13} />
            <span>+91 {company.phone}</span>
          </a>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <span>WhatsApp: +{company.whatsapp}</span>
          </a>
          <span className="contact-location" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <FiMapPin size={13} />
            <span>{company.address}</span>
          </span>
        </div>
        <div className="contact-hours" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <FiClock size={13} />
          <span>{company.hours}</span>
        </div>
      </div>
    </div>
  );
}
