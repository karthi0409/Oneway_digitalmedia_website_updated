import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/marketing-bundles.css';

const bundles = [
  {
    id: 'google-ads-seo',
    name: 'Google Ads + SEO',
    price: '₹45,000/mo',
    description: '2 services in one plan, ₹5,000 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'SEO'],
    image: '/blog/photos/photo-seo.jpg',
    imageAlt: 'Marketing planning session with search analytics on a laptop',
  },
  {
    id: 'google-meta-ads',
    name: 'Google Ads + Meta Ads',
    price: '₹40,500/mo',
    description: '2 services in one plan, ₹4,500 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads'],
    image: '/blog/photos/photo-geo.jpg',
    imageAlt: 'Digital marketing team reviewing campaign performance together',
  },
  {
    id: 'seo-local-seo',
    name: 'SEO + Local SEO',
    price: '₹22,500/mo',
    description: '2 services in one plan, ₹2,500 less than buying them alone.',
    tags: ['SEO', 'Local SEO'],
    image: '/blog/photos/photo-analytics.jpg',
    imageAlt: 'Marketing team discussing digital advertising and analytics',
  },
  {
    id: 'google-meta-seo',
    name: 'Google Ads + Meta Ads + SEO',
    price: '₹59,500/mo',
    description: '3 services in one plan, ₹10,500 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads', '+1 more'],
    image: '/blog/photos/photo-content.jpg',
    imageAlt: 'Marketer reviewing campaign data on a phone and computer',
  },
  {
    id: 'seo-website-local-seo',
    name: 'SEO + Website + Local SEO',
    price: '₹72,250/mo',
    description: '3 services in one plan, ₹12,750 less than buying them alone.',
    tags: ['SEO', 'Website Development', '+1 more'],
    image: '/blog/photos/photo-cro.jpg',
    imageAlt: 'Team analyzing website and conversion performance charts',
  },
  {
    id: 'complete-digital-marketing',
    name: 'Complete Digital Marketing Package',
    price: '₹70,400/mo',
    description: '6 services in one plan, ₹17,600 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads', '+4 more'],
    image: '/blog/photos/photo-ai-calling.jpg',
    imageAlt: 'Smartphone displaying a performance dashboard beside a laptop',
  },
];

function getSlidePosition(index, currentIndex, total) {
  const offset = (index - currentIndex + total) % total;

  if (offset === 0) return 'is-center';
  if (offset === 1) return 'is-near-right';
  if (offset === 2) return 'is-far-right';
  if (offset === total - 1) return 'is-near-left';
  if (offset === total - 2) return 'is-far-left';
  return 'is-hidden';
}

export default function MarketingBundles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const touchStartX = useRef(null);
  const activeBundle = bundles[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % bundles.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + bundles.length) % bundles.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex((index + bundles.length) % bundles.length);
  };

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused || bundles.length < 2) return undefined;
    const interval = window.setInterval(nextSlide, 6200);
    return () => window.clearInterval(interval);
  }, [isPaused, nextSlide, reducedMotion]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousSlide();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const difference = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(difference) < 45) return;
    if (difference < 0) nextSlide();
    else previousSlide();
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
  };

  return (
    <section className="marketing-bundles section" id="growth-packages" aria-labelledby="growth-packages-title">
      <div className="container">
        <header className="marketing-bundles-header">
          <span className="marketing-bundles-label">Packages</span>
          <h2 id="growth-packages-title">Growth packages, ready to start.</h2>
          <p>Bundles of our most-booked services, priced lower than buying each one alone.</p>
        </header>

        <div
          className="marketing-bundles-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Marketing packages"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="marketing-bundles-ambience"
            style={{ '--active-bundle-image': `url("${activeBundle.image}")` }}
            aria-hidden="true"
          />
          <div className="marketing-bundles-stage-overlay" aria-hidden="true" />
          <div className="marketing-bundles-orbit marketing-bundles-orbit-one" aria-hidden="true" />
          <div className="marketing-bundles-orbit marketing-bundles-orbit-two" aria-hidden="true" />

          <div className="marketing-bundles-stage-label" aria-hidden="true">
            <span><i /> A plan for your next move</span>
                  <span>{String(currentIndex + 1).padStart(2, '0')} <b>/</b> {String(bundles.length).padStart(2, '0')}</span>
          </div>

          <div className="marketing-bundles-carousel">
            {bundles.map((bundle, index) => {
              const position = getSlidePosition(index, currentIndex, bundles.length);
              const isCenter = index === currentIndex;

              return (
                <article
                  className={`marketing-bundle-card ${position}`}
                  key={bundle.id}
                  role={isCenter ? 'group' : 'button'}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${bundles.length}: ${bundle.name}`}
                  aria-current={isCenter ? 'true' : undefined}
                  tabIndex={position === 'is-hidden' ? -1 : isCenter ? undefined : 0}
                  onClick={() => !isCenter && goToSlide(index)}
                  onKeyDown={(event) => {
                    if (!isCenter && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      goToSlide(index);
                    }
                  }}
                >
                  <img
                    className="marketing-bundle-image"
                    src={bundle.image}
                    alt={bundle.imageAlt}
                    width="800"
                    height="520"
                    loading={index === currentIndex ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable="false"
                  />
                  <div className="marketing-bundle-vignette" aria-hidden="true" />

                  <div className="marketing-bundle-content">
                    <div className="marketing-bundle-topline">
                    <span className="marketing-bundle-index">OD / {String(index + 1).padStart(2, '0')}</span>
                      <span className="marketing-bundle-price">{bundle.price}</span>
                    </div>

                    <div className="marketing-bundle-copy">
                      <span className="marketing-bundle-kicker">Growth package</span>
                      <h3>{bundle.name}</h3>
                      <span className="marketing-bundle-divider" aria-hidden="true" />
                      <p className="marketing-bundle-description">{bundle.description}</p>
                      <ul className="marketing-bundle-tags" aria-label="Included services">
                        {bundle.tags.map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                      <Link
                        className="marketing-bundle-cta"
                        to={`/about?package=${encodeURIComponent(bundle.name)}#contact-form`}
                        aria-label={`Book this plan: ${bundle.name}`}
                        tabIndex={isCenter ? 0 : -1}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span>Book this plan</span>
                        <FiArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            className="marketing-bundles-arrow marketing-bundles-arrow-previous"
            type="button"
            aria-label="Previous package"
            onClick={previousSlide}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button
            className="marketing-bundles-arrow marketing-bundles-arrow-next"
            type="button"
            aria-label="Next package"
            onClick={nextSlide}
          >
            <FiChevronRight aria-hidden="true" />
          </button>

          <div className="marketing-bundles-controls">
            <div className="marketing-bundles-pagination" role="group" aria-label="Choose a package">
              {bundles.map((bundle, index) => (
                <button
                  className={`marketing-bundles-dot${index === currentIndex ? ' is-active' : ''}`}
                  key={bundle.id}
                  type="button"
                  aria-label={`Show package ${index + 1}: ${bundle.name}`}
                  aria-pressed={index === currentIndex}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <p className="marketing-bundles-current" aria-live={isPaused ? 'polite' : 'off'}>
              <span>{activeBundle.name}</span>
              <span>{activeBundle.price}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
