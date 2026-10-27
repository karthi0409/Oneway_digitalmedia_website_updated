import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import Logo from '../ui/Logo.jsx';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Company',
    path: '/company',
    children: [
      { label: 'Who We Are', description: 'Our story and approach', path: '/about#about-intro' },
      { label: 'Our Team', description: 'The people behind the work', path: '/about#our-team' },
      { label: 'Careers', description: 'Join DigiMark', path: '/about#careers' },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'All Services', path: '/services' },
      { label: 'Packages', path: '/packages' },
    ],
  },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpenDropdown(null);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header ref={headerRef} className={`site-header${isScrolled ? ' is-scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="nav-container">
          {/* Brand Logo */}
          <div className="nav-brand">
            <Logo height={56} navbarLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => item.children ? (
              <div className={`nav-dropdown ${item.label === 'Company' ? 'nav-dropdown-company' : ''}`} key={item.label}>
                <button
                  type="button"
                  className={`nav-link nav-dropdown-trigger ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                  aria-expanded={openDropdown === item.label}
                  aria-controls={`desktop-${item.label.toLowerCase()}-submenu`}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <FiChevronDown className={openDropdown === item.label ? 'is-rotated' : ''} aria-hidden="true" />
                </button>
                {openDropdown === item.label && (
                  <div className="nav-dropdown-menu" id={`desktop-${item.label.toLowerCase()}-submenu`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`nav-dropdown-link ${`${location.pathname}${location.hash}` === child.path ? 'active' : ''}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span className="nav-dropdown-link-title">{child.label}</span>
                        {child.description && <span className="nav-dropdown-link-description">{child.description}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Action CTA & Mobile Trigger */}
          <div className="nav-actions">
            <Link
              to="/about#contact-form"
              className="btn btn-primary btn-sm"
              style={{ display: 'none', minWidth: '170px' }}
              id="desktop-cta"
            >
              <span>Get Free Consultation</span>
              <FiArrowRight />
            </Link>

            <button
              type="button"
              className="menu-toggle"
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside
        className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-header">
          <Logo height={48} navbarLogo />
          <button
            type="button"
            className="menu-toggle"
            aria-label="Close Navigation Menu"
            onClick={closeMobileMenu}
          >
            <FiX />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navItems.map((item) => item.children ? (
            <div className="mobile-nav-dropdown" key={item.label}>
              <button
                type="button"
                className={`mobile-nav-link mobile-nav-dropdown-trigger ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                aria-expanded={openDropdown === item.label}
                aria-controls={`mobile-${item.label.toLowerCase()}-submenu`}
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label}
                <FiChevronDown className={openDropdown === item.label ? 'is-rotated' : ''} aria-hidden="true" />
              </button>
              {openDropdown === item.label && (
                <div className="mobile-nav-submenu" id={`mobile-${item.label.toLowerCase()}-submenu`}>
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`mobile-nav-sublink ${`${location.pathname}${location.hash}` === child.path ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      <span className="mobile-nav-sublink-title">{child.label}</span>
                      {child.description && <span className="mobile-nav-sublink-description">{child.description}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
              onClick={closeMobileMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            to="/about#contact-form"
            className="btn btn-primary btn-block"
            onClick={closeMobileMenu}
          >
            <span>Get Free Consultation</span>
            <FiArrowRight />
          </Link>
        </div>
      </aside>
    </header>
  );
}
