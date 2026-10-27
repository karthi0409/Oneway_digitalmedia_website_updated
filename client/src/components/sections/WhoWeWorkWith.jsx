import React from 'react';
import Heading from '../ui/Heading.jsx';
import Icon from '../ui/Icon.jsx';
import { clientTypes } from '../../data/clients.js';

export default function WhoWeWorkWith({ theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <section className={`section ${isDark ? 'section-navy' : 'section-light'}`} id="who-we-work-with">
      <div className="container">
        <Heading
          tag="Tailored Expertise"
          title="Who We"
          highlight="Work With"
          subtitle="Specialized digital growth playbooks tailored to your industry dynamics, customer buying journey, and competitive landscape."
          theme={isDark ? 'dark' : 'light'}
        />

        <div className="who-grid">
          {clientTypes.map((client, idx) => (
            <div
              key={idx}
              className="who-card"
              style={
                isDark
                  ? {
                      backgroundColor: 'var(--navy-panel)',
                      borderColor: 'var(--navy-line)',
                      color: 'var(--white)',
                    }
                  : {}
              }
            >
              <div className="card-icon-disc">
                <Icon name={client.icon} size={24} />
              </div>
              <h4 style={isDark ? { color: 'var(--white)' } : {}}>{client.title}</h4>
              <p style={isDark ? { color: 'rgba(241, 242, 240, 0.75)' } : {}}>{client.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
