import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Standard Dark Page Hero Banner for inner pages
 * @param {{
 *   tag?: string,
 *   title: string,
 *   highlight?: string,
 *   lead?: string,
 *   children?: React.ReactNode
 * }} props
 */
export default function PageHero({ tag, title, highlight, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero-inner">
          {tag && <span className="section-tag">{tag}</span>}
          <h1 className="page-hero-title">
            {title}{' '}
            {highlight && <span className="heading-highlight">{highlight}</span>}
          </h1>
          {lead && <p className="page-hero-lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
