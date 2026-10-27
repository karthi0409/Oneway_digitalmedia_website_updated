import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMapPin, FiTrendingUp, FiBarChart2, FiCheck } from 'react-icons/fi';
import Ribbon from '../ui/Ribbon.jsx';
import { company } from '../../data/company.js';

const audiences = [
  'Startups & Innovators',
  'Local SMBs & Clinics',
  'D2C & E-Commerce',
  'Real Estate & B2B',
];

export default function Hero() {
  return (
    <>
      <section
        className="hero-section"
        aria-label="Hero Introduction"
      >
        <div className="hero-scene" aria-hidden="true">
          <div className="hero-glow" />
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-badge">
                <FiTrendingUp />
                <span>Digital Growth Partner</span>
              </div>

              <h1 className="hero-title">
                <span className="title-line">Build a brand</span>
                <span className="title-line lime-word">that moves</span>
                <span className="title-line">business forward.</span>
              </h1>

              <p className="hero-pillars">
                Strategy <span>•</span> Content <span>•</span> Advertising <span>•</span> Technology
              </p>

              <p className="hero-lead">
                We bring strategy, creativity and performance together to build your brand, reach the right people and turn attention into sustainable growth.
              </p>

              <div className="hero-actions">
                <Link to="/services" className="btn btn-primary btn-lg">
                  <span>Explore Our Services</span>
                  <FiArrowRight />
                </Link>
                <Link to="/about#contact-form" className="btn btn-outline btn-lg">
                  <span>Start a Project</span>
                </Link>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="growth-card glass-card">
                <div className="growth-card-header">
                  <div>
                    <span className="growth-eyebrow">THE GROWTH LOOP</span>
                    <h2>Make every move count.</h2>
                  </div>
                  <span className="growth-icon"><FiBarChart2 /></span>
                </div>
                <div className="growth-chart">
                  <span style={{ height: '36%' }} />
                  <span style={{ height: '52%' }} />
                  <span style={{ height: '44%' }} />
                  <span style={{ height: '68%' }} />
                  <span style={{ height: '60%' }} />
                  <span style={{ height: '82%' }} />
                  <span style={{ height: '100%' }} />
                </div>
                <div className="growth-card-footer">
                  <span><i /> Strategy-led. Data-backed.</span>
                  <span className="growth-status"><FiCheck /> Ready to grow</span>
                </div>
              </div>
              <div className="growth-note glass-card">
                <span className="growth-note-icon"><FiTrendingUp /></span>
                <span><strong>One team.</strong><small>From first click to real growth.</small></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ribbon text="Strategy • Content • Advertising • Technology" />

      <div className="hero-bottom-strip">
        <div className="container">
          <div className="hero-audiences">
            {audiences.map((audience) => (
              <span key={audience} className="hero-audience-tag">
                {audience}
              </span>
            ))}
          </div>
          <div className="hero-location-contact">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <FiMapPin style={{ color: 'var(--lime)' }} />
              {company.address}
            </span>
            <a href={`tel:${company.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <FiPhone style={{ color: 'var(--lime)' }} />
              Contact: {company.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
