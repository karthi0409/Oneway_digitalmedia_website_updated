import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import TickList from '../ui/TickList.jsx';
import { company } from '../../data/company.js';

export default function ContactDetails() {
  const whyWorkTicks = [
    'Direct communication with senior digital strategists (no account managers playing telephone)',
    'Tailored growth playbooks designed specifically around your target market and margins',
    'Transparent ad spend, direct client-owned advertising accounts and clear dashboard reporting',
    'Rapid creative execution with weekly iterations and proactive campaign pivots',
    'Full-service stack: Web engineering, high-converting copy, paid media, and video production'
  ];

  return (
    <div className="contact-details-wrap">
      {/* 4 Quick Info Boxes */}
      <div className="contact-info-cards">
        <div className="contact-info-box">
          <div className="info-icon">
            <FiPhone />
          </div>
          <h4>Call Directly</h4>
          <a href={`tel:${company.phone}`}>+91 {company.phone}</a>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Direct strategist line</span>
        </div>

        <div className="contact-info-box">
          <div className="info-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.15)', color: '#128c7e' }}>
            <BiMessageDetail />
          </div>
          <h4>WhatsApp</h4>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
            +{company.whatsapp}
          </a>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Quick responses & quotes</span>
        </div>

        <div className="contact-info-box">
          <div className="info-icon">
            <FiMail />
          </div>
          <h4>Email Inquiries</h4>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Guaranteed response within 24h</span>
        </div>

        <div className="contact-info-box">
          <div className="info-icon">
            <FiClock />
          </div>
          <h4>Working Hours</h4>
          <p>{company.hours}</p>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Emergency support available</span>
        </div>
      </div>

      {/* Why Work With Us Checklist */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--navy)' }}>
          Why Partner With One Way Digital Media?
        </h4>
        <TickList items={whyWorkTicks} theme="light" />
      </div>

      {/* Office Location & Google Maps Static Iframe */}
      <div>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--navy)' }}>
          Bangalore Headquarters
        </h4>
        <p style={{ color: 'var(--muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiMapPin style={{ color: 'var(--lime-heading)' }} />
          <span>{company.address}</span>
        </p>

        <div className="map-wrapper">
          <iframe
            title="One Way Digital Media Location - HSR Layout, Bangalore"
            src={company.mapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
