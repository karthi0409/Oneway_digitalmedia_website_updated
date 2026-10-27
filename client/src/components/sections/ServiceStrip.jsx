import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Heading from '../ui/Heading.jsx';
import Icon from '../ui/Icon.jsx';
import { services } from '../../data/services.js';

export default function ServiceStrip() {
  return (
    <section className="section section-light" id="services-strip">
      <div className="container">
        <Heading
          tag="What we do"
          title="Digital marketing services in Bangalore."
          subtitle="Everything to get found, get chosen and grow — from one team."
          theme="light"
        />

        <div className="service-strip-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="card-icon-disc">
                <Icon name={service.icon} size={24} />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-tagline">{service.tagline}</p>
              <p className="service-card-desc">{service.subtitle}</p>
              <Link to={`/services#${service.id}`} className="service-card-link">
                <span>Explore Details</span>
                <FiArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
