import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiClock, FiTarget } from 'react-icons/fi';
import Heading from '../ui/Heading.jsx';
import { webPlans } from '../../data/packages.js';

export default function WebPlans() {
  return (
    <section className="section section-navy" id="web-plans">
      <div className="container">
        <Heading
          tag="Engineering & Design"
          title="Website Development"
          highlight="Plans"
          subtitle="Modern, ultra-fast, mobile-first web platforms built with high-converting architecture and search optimization."
          theme="dark"
        />

        <div className="web-plans-grid">
          {webPlans.map((plan) => (
            <div key={plan.id} className="web-plan-card">
              <div className="web-plan-header">
                <h3 className="web-plan-name">{plan.name}</h3>
                <div className="web-plan-price">{plan.priceRange}</div>
                <div
                  className="web-plan-meta"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}
                >
                  <FiClock style={{ color: 'var(--lime-heading)' }} />
                  <span>{plan.timeline}</span>
                </div>
                <div
                  className="web-plan-meta"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}
                >
                  <FiTarget style={{ color: 'var(--lime-heading)', marginTop: '0.2rem', flexShrink: 0 }} />
                  <span>{plan.target}</span>
                </div>
              </div>

              <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                <ul className="package-features">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="package-feature-item">
                      <FiCheck size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={plan.ctaLink} className="btn btn-primary btn-block">
                <span>{plan.ctaText}</span>
                <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
