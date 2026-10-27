import React from 'react';

/**
 * Brand Ribbon banner in lime color with repeated slogans
 * @param {{ text?: string }} props
 */
export default function Ribbon({ text = 'BUILD. GROW. SCALE.' }) {
  return (
    <div className="lime-ribbon" role="region" aria-label="Our digital growth capabilities">
      <div className="ribbon-track">
        <span className="ribbon-item">{text}</span>
      </div>
    </div>
  );
}
