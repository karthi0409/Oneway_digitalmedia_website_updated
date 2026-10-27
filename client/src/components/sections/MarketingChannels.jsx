import React from 'react';
import '../../styles/marketing-channels.css';

const simpleIcon = (brand, color) => (
  `https://api.iconify.design/simple-icons/${brand}.svg?color=%23${color}`
);

const favicon = (domain) => (
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
);

const logoRows = [
  [
    { name: 'Adobe', src: simpleIcon('adobe', 'EB1000') },
    { name: 'Amazon', src: simpleIcon('amazon', 'FF9900') },
    { name: 'Google Ads', src: simpleIcon('googleads', '4285F4') },
    { name: 'Meta', src: simpleIcon('meta', '0866FF') },
    { name: 'WhatsApp', src: simpleIcon('whatsapp', '25D366') },
    { name: 'Taboola', src: favicon('taboola.com') },
  ],
  [
    { name: 'LinkedIn', src: simpleIcon('linkedin', '0A66C2') },
    { name: 'Semrush', src: simpleIcon('semrush', 'FF642D') },
    { name: 'WATI', src: favicon('wati.io') },
    { name: 'Interakt', src: favicon('interakt.shop') },
    { name: 'Zoho', src: 'https://api.iconify.design/logos/zoho.svg' },
    { name: 'Mailchimp', src: simpleIcon('mailchimp', 'FFE01B') },
  ],
  [
    { name: 'Flipkart', src: simpleIcon('flipkart', '2874F0') },
    { name: 'Google Analytics', src: simpleIcon('googleanalytics', 'E37400') },
    { name: 'Google Neo', src: 'https://api.iconify.design/logos/google-icon.svg' },
    { name: 'Google Flow', src: 'https://api.iconify.design/logos/google-gemini.svg' },
    { name: 'Microsoft', src: 'https://api.iconify.design/logos/microsoft-icon.svg' },
    { name: 'Pinterest', src: simpleIcon('pinterest', 'BD081C') },
  ],
];

export default function MarketingChannels() {
  return (
    <section className="marketing-channels-section" aria-labelledby="marketing-channels-title">
      <div className="container">
        <h2 className="marketing-channels-title" id="marketing-channels-title">
          Our Marketing and Automation Channels
        </h2>

        <div className="marketing-channels-rows" aria-label="Marketing and automation platforms">
          {logoRows.map((row, rowIndex) => (
            <div
              className="marketing-channel-row"
              key={rowIndex}
              style={{ '--marquee-duration': `${42 + rowIndex * 5}s` }}
            >
              <div className={`marketing-channel-track${rowIndex % 2 === 1 ? ' marketing-channel-track-reverse' : ''}`}>
                {[0, 1].map((copy) => (
                  <div
                    className="marketing-channel-group"
                    key={copy}
                    role="list"
                    aria-label={copy === 0 ? `Platform row ${rowIndex + 1}` : undefined}
                    aria-hidden={copy === 1 ? 'true' : undefined}
                  >
                    {row.map(({ name, src }, logoIndex) => {
                      const index = rowIndex * 6 + logoIndex;
                      return (
                        <div
                          className="marketing-channel-card"
                          key={name}
                          role="listitem"
                          style={{
                            '--float-duration': `${4.8 + (index % 4) * 0.35}s`,
                            '--float-delay': `${(index % 6) * -0.45}s`,
                          }}
                        >
                          <img src={src} alt="" loading="lazy" />
                          <span className="marketing-channel-name">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
