import React from 'react';
import Heading from '../ui/Heading.jsx';
import { whyChooseUs } from '../../data/about.js';

export default function WhyChooseUs({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <section className={`section ${isDark ? 'section-dark' : 'section-light'}`} id="why-choose-us">
      <div className="container">
        <Heading
          tag="The One Way Advantage"
          title="Why Businesses"
          highlight="Choose Us"
          subtitle="We discard agency fluff and vanity metrics to focus squarely on customer acquisition, conversion efficiency, and measurable ROI."
          theme={isDark ? 'dark' : 'light'}
        />

        <div className="why-grid">
          {whyChooseUs.map((item) => (
            <div
              key={item.number}
              className="why-card"
              style={
                !isDark
                  ? {
                      backgroundColor: 'var(--white)',
                      borderColor: 'var(--line)',
                      color: 'var(--navy)',
                    }
                  : {}
              }
            >
              <div className="why-number">{item.number}</div>
              <h4 style={!isDark ? { color: 'var(--navy)' } : {}}>{item.title}</h4>
              <p style={!isDark ? { color: 'var(--muted)' } : {}}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
