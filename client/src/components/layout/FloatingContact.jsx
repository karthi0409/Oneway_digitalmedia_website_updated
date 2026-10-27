import React, { useState, useEffect } from 'react';
import { FiPhone, FiChevronUp } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import { company } from '../../data/company.js';
import FaqChatbot from './FaqChatbot.jsx';

export default function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <aside className="floating-actions" aria-label="Quick Communication Options">
      <FaqChatbot />

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${company.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-whatsapp"
        aria-label="Direct Chat on WhatsApp"
        title="Chat with our team on WhatsApp"
      >
        <BiMessageDetail />
      </a>

      {/* Direct Phone Call Button */}
      <a
        href={`tel:${company.phone}`}
        className="float-btn float-phone"
        aria-label={`Call us directly at ${company.phone}`}
        title={`Call us at ${company.phone}`}
      >
        <FiPhone />
      </a>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="float-btn float-scroll"
          aria-label="Scroll back to top of page"
          title="Back to top"
        >
          <FiChevronUp />
        </button>
      )}
    </aside>
  );
}
