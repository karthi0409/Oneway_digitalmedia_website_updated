import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/marketing-bundles.css';

const bundles = [
  {
    id: 'google-ads-seo',
    name: 'Google Ads + SEO',
    price: '₹45,000/mo',
    description: '2 services in one plan, ₹5,000 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'SEO'],
    image: 'photo-1460925895917-afdab827c52f',
  },
  {
    id: 'google-meta-ads',
    name: 'Google Ads + Meta Ads',
    price: '₹40,500/mo',
    description: '2 services in one plan, ₹4,500 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads'],
    image: 'photo-1552664730-d307ca884978',
  },
  {
    id: 'seo-local-seo',
    name: 'SEO + Local SEO',
    price: '₹22,500/mo',
    description: '2 services in one plan, ₹2,500 less than buying them alone.',
    tags: ['SEO', 'Local SEO'],
    image: 'photo-1521737711867-e3b97375f902',
  },
  {
    id: 'google-meta-seo',
    name: 'Google Ads + Meta Ads + SEO',
    price: '₹59,500/mo',
    description: '3 services in one plan, ₹10,500 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads', '+1 more'],
    image: 'photo-1553877522-43269d4ea984',
  },
  {
    id: 'seo-website-local-seo',
    name: 'SEO + Website + Local SEO',
    price: '₹72,250/mo',
    description: '3 services in one plan, ₹12,750 less than buying them alone.',
    tags: ['SEO', 'Website Development', '+1 more'],
    image: 'photo-1498050108023-c5249f4df085',
  },
  {
    id: 'complete-digital-marketing',
    name: 'Complete Digital Marketing Package',
    price: '₹70,400/mo',
    description: '6 services in one plan, ₹17,600 less than buying them alone. Ad spend billed separately.',
    tags: ['Google Ads', 'Meta Ads', '+4 more'],
    image: 'photo-1556761175-b413da4baf72',
  },
];

export default function MarketingBundles() {
  return (
    <section className="marketing-bundles section" id="growth-packages" aria-labelledby="growth-packages-title">
      <div className="container">
        <header className="marketing-bundles-header">
          <span className="marketing-bundles-label">Packages</span>
          <h2 id="growth-packages-title">Growth packages, ready to start.</h2>
          <p>Bundles of our most-booked services, priced lower than buying each one alone.</p>
        </header>

        <div className="marketing-bundles-grid">
          {bundles.map((bundle, index) => (
            <article
              className="marketing-bundle-card"
              key={bundle.id}
              style={{ '--bundle-order': index }}
            >
              <img
                className="marketing-bundle-image"
                src={`https://images.unsplash.com/${bundle.image}?auto=format&fit=crop&w=960&q=80`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="marketing-bundle-content">
                <div className="marketing-bundle-title-row">
                  <h3>{bundle.name}</h3>
                  <span className="marketing-bundle-price">{bundle.price}</span>
                </div>
                <p className="marketing-bundle-description">{bundle.description}</p>
                <ul className="marketing-bundle-tags" aria-label="Included services">
                  {bundle.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link
                  className="marketing-bundle-cta"
                  to={`/about?package=${encodeURIComponent(bundle.name)}#contact-form`}
                  aria-label={`Book this plan: ${bundle.name}`}
                >
                  <span>Book this plan</span>
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
