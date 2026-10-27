import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiMail } from 'react-icons/fi';
import { blogArticles, blogCategories, featuredStory, getArticleSlug } from '../data/blogArticles.js';
import { company } from '../data/company.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const coverStoryPath = `/blog/${featuredStory.slug}`;

function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="container blog-hero-content">
        <p className="blog-eyebrow"><span aria-hidden="true" /> The DigiMark journal</p>
        <h1>Field notes from <span>Bangalore</span></h1>
        <p className="blog-hero-subtitle">Sharp ideas on SEO, GEO &amp; growth.</p>
        <p className="blog-hero-description">
          A working agency’s journal, written for operators who care about pipeline, not vanity metrics. SEO, AI
          search, CRO, paid media and the messy middle of the buyer journey.
        </p>
      </div>
    </section>
  );
}

function FeaturedCoverStory() {
  return (
    <section className="blog-featured-section" aria-labelledby="blog-featured-title">
      <div className="container">
        <article className="blog-featured-card">
          <div className="blog-featured-copy">
            <p className="blog-featured-category">{featuredStory.category}</p>
            <h2 id="blog-featured-title">{featuredStory.title}</h2>
            <p className="blog-featured-description">{featuredStory.description}</p>
            <div className="blog-featured-meta">
              <span className="blog-author-monogram" aria-hidden="true">D</span>
              <span><small>{featuredStory.authorLabel}</small><strong>{featuredStory.author}</strong></span>
            </div>
            <Link to={coverStoryPath} className="blog-featured-link">
              Read the cover story <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <Link to={coverStoryPath} className="blog-featured-visual" aria-label={`Read cover story: ${featuredStory.title}`}>
            <img
              src="/blog/cover-dashboard.svg"
              alt="Analytics dashboard with a rising conversion trend and lead funnel"
              width="960"
              height="620"
            />
            <span className="blog-visual-caption">From first call to closed deal <FiArrowUpRight aria-hidden="true" /></span>
          </Link>
        </article>
      </div>
    </section>
  );
}

function ArticleCard({ article }) {
  const articlePath = `/blog/${getArticleSlug(article.title)}`;

  return (
    <article className="blog-article-card">
      <div className="blog-card-meta">
        <span className="blog-card-number">{String(article.number).padStart(2, '0')}</span>
        <span className="blog-card-category">{article.category}</span>
      </div>
      <div className="blog-card-date-row">
        <time dateTime={article.dateTime}>{article.date}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTime} read</span>
      </div>
      <h3><Link to={articlePath}>{article.title}</Link></h3>
      <p>{article.description}</p>
      <Link to={articlePath} className="blog-read-link" aria-label={`Read ${article.title}`}>
        Read <FiArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}

function BlogArchive() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryCounts = useMemo(
    () => blogArticles.reduce((counts, article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
      return counts;
    }, {}),
    []
  );
  const displayedArticles = activeCategory === 'All'
    ? blogArticles
    : blogArticles.filter((article) => article.category === activeCategory);

  return (
    <section className="blog-archive-section" id="archive" aria-labelledby="blog-archive-title">
      <div className="container">
        <div className="blog-section-heading">
          <div>
            <p className="blog-eyebrow">Ideas worth keeping</p>
            <h2 id="blog-archive-title">The archive</h2>
          </div>
          <p className="blog-archive-total">{blogArticles.length} articles, newest first</p>
        </div>

        <div className="blog-filter-list" role="group" aria-label="Filter articles by category">
          <button
            type="button"
            className={`blog-filter-button ${activeCategory === 'All' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('All')}
            aria-pressed={activeCategory === 'All'}
          >
            All <span>{blogArticles.length}</span>
          </button>
          {blogCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={`blog-filter-button ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category} <span>{String(categoryCounts[category] || 0).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <p className="blog-results-count" aria-live="polite">
          Showing {displayedArticles.length} {displayedArticles.length === 1 ? 'article' : 'articles'}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>

        {displayedArticles.length > 0 ? (
          <div className="blog-article-grid">
            {displayedArticles.map((article) => <ArticleCard key={article.number} article={article} />)}
          </div>
        ) : (
          <div className="blog-empty-state" role="status">
            <h3>No articles in this category yet</h3>
            <p>Choose another topic or view the full archive.</p>
            <button type="button" className="blog-empty-reset" onClick={() => setActiveCategory('All')}>
              Show all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const whatsappMessage = encodeURIComponent('Hello, I’d like to get the SEO & GEO Brief on WhatsApp.');
  const whatsappHref = `https://wa.me/${company.whatsapp}?text=${whatsappMessage}`;

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('Your email is valid, but newsletter signup is not connected yet. No subscription was made.');
  }

  return (
    <section className="blog-newsletter-section" aria-labelledby="blog-newsletter-title">
      <div className="container">
        <div className="blog-newsletter-card">
          <div className="blog-newsletter-copy">
            <p className="blog-eyebrow">A useful signal, once a month</p>
            <h2 id="blog-newsletter-title">The SEO &amp; GEO Brief</h2>
            <p className="blog-newsletter-subtitle">One email, once a month.</p>
            <p>
              The biggest shifts in Google AI Overviews, ChatGPT citations and search, explained in plain English,
              with what to do about them.
            </p>
          </div>
          <div className="blog-newsletter-actions">
            <form className="blog-newsletter-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="blog-newsletter-email">Email address</label>
              <div className="blog-email-input-wrap">
                <FiMail aria-hidden="true" />
                <input
                  id="blog-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus('');
                  }}
                  required
                />
              </div>
              <button type="submit" className="blog-subscribe-button">Subscribe by email</button>
            </form>
            <a className="blog-whatsapp-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp aria-hidden="true" /> Get it on WhatsApp
            </a>
            <p className="blog-newsletter-status" role="status" aria-live="polite">{status}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Blog() {
  useDocumentTitle(
    'Field notes from Bangalore — SEO, GEO & Growth',
    'Sharp ideas on SEO, GEO, AI search, CRO and growth from a working agency journal.'
  );

  return (
    <>
      <BlogHero />
      <FeaturedCoverStory />
      <BlogArchive />
      <Newsletter />
    </>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const article = slug === featuredStory.slug
    ? featuredStory
    : blogArticles.find((item) => getArticleSlug(item.title) === slug);

  useDocumentTitle(
    article?.title || 'Article not found',
    article?.description || 'The requested article could not be found in the blog archive.'
  );

  if (!article) {
    return (
      <section className="blog-detail-section">
        <div className="container blog-detail-container">
          <p className="blog-eyebrow">The DigiMark journal</p>
          <h1>Article not found</h1>
          <p>This article is not in the archive.</p>
          <Link className="blog-back-link" to="/blog"><FiArrowLeft aria-hidden="true" /> Back to the blog</Link>
        </div>
      </section>
    );
  }

  const isFeatured = article === featuredStory;

  return (
    <article className="blog-detail-section">
      <div className="container blog-detail-container">
        <Link className="blog-back-link" to="/blog"><FiArrowLeft aria-hidden="true" /> Back to the archive</Link>
        <p className="blog-detail-category">{isFeatured ? article.category : `Article ${String(article.number).padStart(2, '0')} · ${article.category}`}</p>
        <h1>{article.title}</h1>
        <div className="blog-detail-meta">
          {isFeatured
            ? <span>{article.authorLabel}: {article.author}</span>
            : <><time dateTime={article.dateTime}>{article.date}</time><span>{article.readingTime} read</span></>}
        </div>
        <p className="blog-detail-description">{article.description}</p>
        {isFeatured && (
          <img
            className="blog-detail-image"
            src="/blog/cover-dashboard.svg"
            alt="Analytics dashboard with a rising conversion trend and lead funnel"
            width="960"
            height="620"
          />
        )}
        <div className="blog-detail-content">
          <h2>About this article</h2>
          <p>
            {isFeatured
              ? 'This cover story is listed in the blog brief, but its full long-form content has not been provided yet.'
              : 'The archive entry currently includes the supplied summary. Full long-form article content has not been provided yet.'}
          </p>
        </div>
      </div>
    </article>
  );
}
