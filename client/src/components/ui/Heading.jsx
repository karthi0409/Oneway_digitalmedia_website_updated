import React from 'react';

/**
 * Reusable Section / Page Heading component with optional lime highlight and subtitle
 * @param {{
 *   as?: 'h1' | 'h2' | 'h3' | 'h4',
 *   tag?: string,
 *   title: string,
 *   highlight?: string,
 *   subtitle?: string,
 *   align?: 'center' | 'left',
 *   theme?: 'dark' | 'light',
 *   className?: string
 * }} props
 */
export default function Heading({
  as: Component = 'h2',
  tag,
  title,
  highlight,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}) {
  return (
    <div className={`section-header ${align === 'left' ? 'text-left' : ''} ${className}`}>
      {tag && (
        <span className={`section-tag ${theme === 'light' ? 'light-theme' : ''}`}>
          {tag}
        </span>
      )}
      <Component className="section-title">
        {highlight ? (
          <>
            {title}{' '}
            <span className="heading-highlight">{highlight}</span>
          </>
        ) : (
          title
        )}
      </Component>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
