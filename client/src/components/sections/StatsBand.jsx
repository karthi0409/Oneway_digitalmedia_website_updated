import React from 'react';

export default function StatsBand() {
  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '100+', label: 'Brands Scaled' },
    { number: '500+', label: 'Campaigns Launched' },
    { number: '10X', label: 'Results That Matter' },
  ];

  return (
    <section className="stats-band" aria-label="Key Performance Statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
