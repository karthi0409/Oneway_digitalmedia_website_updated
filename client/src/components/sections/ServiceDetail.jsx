import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Icon from '../ui/Icon.jsx';
import Note from '../ui/Note.jsx';

/**
 * Service Detail section component for Services page
 * @param {{ service: import('../../data/services.js').services[0], isReversed?: boolean }} props
 */
export default function ServiceDetail({ service, isReversed = false }) {
  return (
    <article className="service-detail-section" id={service.id}>
      <div className="container">
        <div className={`service-detail-grid ${isReversed ? 'grid-reversed' : ''}`}>
          {/* Header & Tagline Side */}
          <div className="service-detail-header">
            <div className="card-icon-disc" style={{ marginBottom: '1.5rem' }}>
              <Icon name={service.icon} size={28} />
            </div>
            <span className="section-tag light-theme">{service.title}</span>
            <h3>{service.tagline}</h3>
            <p className="section-subtitle" style={{ color: 'var(--lime-text)', fontWeight: 600 }}>
              {service.subtitle}
            </p>
            <p style={{ color: 'var(--muted)', marginTop: '1rem', lineHeight: '1.65' }}>
              {service.description}
            </p>

            {service.note && <Note text={service.note} theme="dark" />}

            <div style={{ marginTop: '2rem' }}>
              <Link to={`/about?service=${service.id}#contact-form`} className="btn btn-primary">
                <span>Inquire About This Service</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Service Deliverables Side */}
          <div className="service-detail-items">
            {service.items.map((item, idx) => (
              <div key={idx} className="service-item-box">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
