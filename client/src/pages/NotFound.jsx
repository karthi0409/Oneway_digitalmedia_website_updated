import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('404 Page Not Found', 'The requested page could not be located on One Way Digital Media.');

  return (
    <div className="not-found-hero">
      <div className="not-found-inner">
        <span className="section-tag" style={{ marginBottom: '1rem' }}>
          Error 404
        </span>
        <h1 className="not-found-title">
          PAGE NOT FOUND
        </h1>
        <p className="not-found-lead">
          The page you are looking for may have been moved, renamed, or does not exist. Remember: there's only one way
          forward.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <FiHome />
            <span>Back to Home</span>
          </Link>
          <Link to="/about#contact-information" className="btn btn-outline btn-lg">
            <span>Contact Support</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
