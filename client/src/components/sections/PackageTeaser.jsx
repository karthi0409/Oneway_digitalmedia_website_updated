import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import Heading from '../ui/Heading.jsx';
import { marketingPackages } from '../../data/packages.js';

export default function PackageTeaser() {
  return (
    <section className="section section-light" id="packages-teaser">
      <div className="container">
        <Heading
          tag="Transparent Pricing"
          title="Digital Growth"
          highlight="Packages"
          subtitle="Fixed monthly growth retainers engineered for fast turnaround, maximum transparency, and compounding returns."
          theme="light"
        />

        <div className="packages-grid">
          {marketingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.isPopular ? 'popular' : ''}`}
            >
              <div className="package-header">
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
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="package-feature-item">
                      <FiCheck size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={pkg.ctaLink}
                  className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline-dark'} btn-block`}
                >
                  <span>{pkg.ctaText}</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/packages" className="btn btn-outline-dark btn-lg">
            <span>View Full Package Comparison & Web Plans</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
