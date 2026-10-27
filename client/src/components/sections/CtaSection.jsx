import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import { company } from '../../data/company.js';

export default function CtaSection({
  title = "Let's Build Your Success Story",
  lead = 'Ready to stop relying on luck and start generating predictable, scalable revenue? Schedule your complimentary 30-minute growth strategy session.',
}) {
  return (
    <section className="cta-banner" aria-label="Call to Action">
      <div className="container">
        <div className="cta-content">
          <span className="section-tag" style={{ marginBottom: '1.25rem' }}>
            Ready To Scale?
          </span>
          <h2 className="cta-title">
            {title.includes('Success Story') ? (
              <>
                Let's Build Your <span className="heading-highlight">Success Story</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="cta-lead">{lead}</p>
          <div className="cta-buttons">
            <Link to="/about#contact-form" className="btn btn-primary btn-lg">
              <span>Book Discovery Call</span>
              <FiArrowRight />
            </Link>
            <a href={`tel:${company.phone}`} className="btn btn-outline btn-lg">
              <FiPhone />
              <span>Call Us Now: +91 {company.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
