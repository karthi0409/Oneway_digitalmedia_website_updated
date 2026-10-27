import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand logo image component
 * @param {{ height?: number, showLink?: boolean, className?: string, markOnly?: boolean, navbarLogo?: boolean }} props
 */
export default function Logo({ height = 46, showLink = true, className = '', markOnly = false, navbarLogo = false }) {
  const imageSrc = navbarLogo
    ? '/brand/logo-navbar.png'
    : markOnly
      ? '/brand/logo-mark.png'
      : '/brand/logo.png';
  const imageClassName = navbarLogo ? 'brand-logo-navbar' : markOnly ? 'brand-logo-mark' : 'brand-logo-img';
  const content = (
    <div className={`brand-logo-wrap ${markOnly ? 'brand-logo-mark-wrap' : ''} ${className}`} style={{ minHeight: height }}>
      <img
        src={imageSrc}
        alt={markOnly ? 'One Way Digital Media growth mark' : 'One Way Digital Media'}
        className={imageClassName}
        style={markOnly ? { width: height, height } : { height }}
      />
    </div>
  );

  if (showLink) {
    return (
      <Link to="/" aria-label="One Way Digital Media - Home">
        {content}
      </Link>
    );
  }

  return content;
}
