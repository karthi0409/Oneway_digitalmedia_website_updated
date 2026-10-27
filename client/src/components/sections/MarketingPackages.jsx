import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import Heading from '../ui/Heading.jsx';
import { marketingPackages } from '../../data/packages.js';

export default function MarketingPackages() {
  return (
    <section className="section section-light" id="marketing-plans">
      <div className="container">
        <Heading
          tag="Retainer Solutions"
          title="Digital Marketing"
          highlight="Packages"
          subtitle="Flexible plans tailored for every growth stage. No long-term lock-ins, 100% transparent deliverables."
          theme="light"
        />

        <div className="packages-grid">
          {marketingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.isPopular ? 'popular' : ''}`}
            >
              <div
                className="package-header"
                style={
                  pkg.headerTheme === 'teal'
                    ? { backgroundColor: 'var(--teal)', color: 'var(--white)' }
                    : {}
                }
              >
                {pkg.badge && (
                  <div className="package-badge-wrap">
                    <span className="package-badge">{pkg.badge}</span>
                  </div>
                )}
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-price-wrap">
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-period">/{pkg.period}</span>
                </div>
                <p className="package-desc">{pkg.description}</p>
              </div>

              <div className="package-body">
                <ul className="package-features">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="package-feature-item">
                      <FiCheck size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={pkg.ctaLink}
                  className={`btn ${
                    pkg.isPopular ? 'btn-primary' : 'btn-outline-dark'
                  } btn-block`}
                >
                  <span>{pkg.ctaText}</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
