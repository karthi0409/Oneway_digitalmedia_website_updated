import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

/**
 * Callout Note Component
 * @param {{ text: string, theme?: 'dark' | 'light', className?: string }} props
 */
export default function Note({ text, theme = 'dark', className = '' }) {
  if (!text) return null;

  return (
    <div className={`callout-note callout-note-${theme} ${className}`}>
      <FiAlertCircle className="note-icon" size={20} />
      <div>{text}</div>
    </div>
  );
}
