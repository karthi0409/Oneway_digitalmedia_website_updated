import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Logo from '../ui/Logo.jsx';
import { company } from '../../data/company.js';
import { industries } from '../../data/clients.js';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="site-footer" role="contentinfo">
      <div className="footer-orb footer-orb-one" aria-hidden="true" />
      <div className="footer-orb footer-orb-two" aria-hidden="true" />
      {/* Industry Specialization Strip */}
      <div className="footer-industry-bar">
        <div className="container">
          <div className="footer-industry-items">
            {industries.map((ind, idx) => (
              <span key={idx} className="footer-industry-item">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-top" data-visible={isVisible}>
          {/* Col 1: Brand & Bio */}
          <div className="footer-col footer-brand">
            <Logo height={60} />
            <p className="footer-brand-line">Big ideas deserve a way forward.</p>
            <p>
              {company.tagline} We engineer comprehensive digital marketing, paid performance funnels, high-converting
              websites, and viral video content that turn clicks into revenue.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/about#contact-form" className="btn btn-outline btn-sm">
                <span>Book Free Discovery Call</span>
                <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about#about-us">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/packages">Marketing Packages</Link>
              </li>
              <li>
                <Link to="/experience">Why One Way</Link>
              </li>
              <li>
                <Link to="/projects">Client Results</Link>
              </li>
              <li>
                <Link to="/about#contact-information">Contact & Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Services */}
          <div className="footer-col">
            <h4>Core Services</h4>
            <ul>
              <li>
                <Link to="/services#social-media">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/services#performance-ads">Performance Marketing (Ads)</Link>
              </li>
              <li>
                <Link to="/services#website">Website Design & Dev</Link>
              </li>
              <li>
                <Link to="/services#video">Video Production & Reels</Link>
              </li>
              <li>
                <Link to="/packages">Growth Retainers</Link>
              </li>
              <li>
                <Link to="/services#website">E-Commerce Development</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="footer-col">
            <h4>Bangalore HQ</h4>
            <ul className="footer-contact-list">
              <li>
                <FiMapPin />
                <span>{company.address}</span>
              </li>
              <li>
                <FiPhone />
                <a href={`tel:${company.phone}`}>+91 {company.phone}</a>
              </li>
              <li>
                <FiMail />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <FiClock />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} {company.name}. All Rights Reserved. Built for exponential digital growth.</p>
          <div className="footer-social-links">
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              data-network="whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              data-network="instagram"
              aria-label="Instagram"
            >
              <FaInstagram size={17} />
            </a>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              data-network="facebook"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
