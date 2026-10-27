import React from 'react';
import Heading from '../ui/Heading.jsx';
import { processSteps } from '../../data/process.js';

export default function ProcessSteps({ theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <section className={`section ${isDark ? 'section-navy' : 'section-light'}`} id="process">
      <div className="container">
        <Heading
          tag="Battle-Tested Methodology"
          title="Our Proven"
          highlight="Process"
          subtitle="A structured, predictable 5-step framework that turns marketing spend into predictable, compounding revenue."
          theme={isDark ? 'dark' : 'light'}
        />

        <div className="process-grid">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className={`process-card ${isDark ? 'process-card-dark' : ''}`}
            >
              <div className="process-badge">{step.step}</div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
