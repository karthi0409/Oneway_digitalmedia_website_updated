import React from 'react';
import { FiCheck } from 'react-icons/fi';

/**
 * TickList Component
 * @param {{ items: string[], theme?: 'light' | 'dark', className?: string }} props
 */
export default function TickList({ items = [], theme = 'light', className = '' }) {
  if (!items || !items.length) return null;

  return (
    <ul className={`tick-list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={`tick-item tick-item-${theme}`}>
          <span className="tick-icon">
            <FiCheck size={14} />
          </span>
          <span className="tick-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}
