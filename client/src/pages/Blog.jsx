import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiSearch,
} from 'react-icons/fi';
import { blogArticles, blogCategories, featuredStory, getArticleSlug } from '../data/blogArticles.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const tickerItems = [
  'SEO Strategy',
  'AI Search',
  'GEO',
  'Content Marketing',
  'CRO',
  'Paid Media',
  'Analytics',
  'Lead Generation',
];

function useBlogMeta(title, description, image, type = 'website') {
  const { pathname } = useLocation();

  useDocumentTitle(title, description);

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(pathname, origin).href;
    const imageUrl = new URL(image, origin).href;
    const values = {
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:type': type,
      'og:image': imageUrl,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': imageUrl,
    };
    const managedNodes = [];

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.dataset.blogManaged = 'true';
      document.head.appendChild(canonical);
      managedNodes.push(canonical);
    }
    canonical.href = canonicalUrl;

    Object.entries(values).forEach(([property, content]) => {
      const selector = property.startsWith('og:')
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:')) meta.setAttribute('property', property);
        else meta.setAttribute('name', property);
        meta.dataset.blogManaged = 'true';
        document.head.appendChild(meta);
        managedNodes.push(meta);
      }
      meta.content = content;
    });

    return () => {
      managedNodes.forEach((node) => node.remove());
    };
  }, [description, image, pathname, title, type]);
}

function BlogHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--blog-pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty('--blog-pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => hero.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <section ref={heroRef} className="blog-hero" aria-labelledby="blog-hero-title">
      <div className="blog-hero-fallback" aria-hidden="true" />
      <video
        className="blog-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/blog/photos/photo-analytics.jpg"
        aria-hidden="true"
      >
        <source src="/blog/blog-hero.mp4" type="video/mp4" />
      </video>
      <div className="blog-hero-grid" aria-hidden="true" />
      <div className="blog-hero-overlay" aria-hidden="true" />

      <div className="container blog-hero-inner">
        <div className="blog-hero-copy">
          <p className="blog-eyebrow"><span aria-hidden="true" /> INSIGHTS, IDEAS &amp; GROWTH</p>
          <h1 id="blog-hero-title">Field notes from <span>Bangalore</span></h1>
          <p className="blog-hero-subtitle">Sharp ideas on SEO, GEO &amp; growth.</p>
          <p className="blog-hero-description">
            A working agency&apos;s journal, written for operators who care about pipeline, not vanity metrics.
            Explore SEO, AI search, CRO, paid media, content strategy, and the messy middle of the buyer journey.
          </p>
          <div className="blog-hero-actions">
            <a className="btn btn-primary btn-lg" href="#latest-articles">
              <span>Explore the latest insights</span>
              <FiArrowDown aria-hidden="true" />
            </a>
            <Link className="btn btn-outline btn-lg" to="/services">
              <span>Explore our services</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="blog-hero-signals" aria-label="Editorial focus areas">
            <span><i aria-hidden="true" /> Built from live client questions</span>
            <span><i aria-hidden="true" /> No vanity metrics</span>
            <span><i aria-hidden="true" /> Practical next moves</span>
          </div>
        </div>
      </div>

      <div className="blog-ticker" aria-label="Topics covered in the journal">
        <div className="blog-ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span>{item}</span>
              <b aria-hidden="true">→</b>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleThumbnail({ article, featured = false }) {
  return (
    <div className={`blog-thumbnail${featured ? ' blog-thumbnail-featured' : ''}`}>
      <img
        src={article.thumbnail}
        alt={article.thumbnailAlt}
        width="800"
        height="520"
        loading={featured ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="blog-thumbnail-scan" aria-hidden="true" />
      <span className="blog-thumbnail-label">{article.category}</span>
    </div>
  );
}

function FeaturedCoverStory() {
  return (
    <section className="blog-featured-section" aria-labelledby="blog-featured-title">
      <div className="container">
        <div className="blog-section-kicker">
          <p className="blog-eyebrow">Cover story</p>
          <span>01 / 08</span>
        </div>
        <article className="blog-featured-card">
          <div className="blog-featured-copy">
            <div className="blog-featured-meta-line">
              <span className="blog-featured-pill">{featuredStory.category}</span>
              <span><FiClock aria-hidden="true" /> {featuredStory.readingTime} read</span>
            </div>
            <h2 id="blog-featured-title">{featuredStory.title}</h2>
            <p className="blog-featured-description">{featuredStory.excerpt}</p>
            <div className="blog-featured-note">
              <span className="blog-signal-dot" aria-hidden="true" />
              <span>Illustrative framework. No fabricated case studies or performance claims.</span>
            </div>
            <Link to={`/blog/${getArticleSlug(featuredStory)}`} className="blog-featured-link">
              Read the cover story <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <Link
            to={`/blog/${getArticleSlug(featuredStory)}`}
            className="blog-featured-visual"
            aria-label={`Read cover story: ${featuredStory.title}`}
          >
            <ArticleThumbnail article={featuredStory} featured />
            <span className="blog-visual-caption">AI calling, with a human handoff <FiArrowUpRight aria-hidden="true" /></span>
          </Link>
        </article>
      </div>
    </section>
  );
}

function ArticleCard({ article, index }) {
  const articlePath = `/blog/${getArticleSlug(article)}`;

  return (
    <article className="blog-article-card" style={{ '--article-index': index }}>
      <Link to={articlePath} className="blog-card-image-link" aria-label={`Read ${article.title}`}>
        <ArticleThumbnail article={article} />
      </Link>
      <div className="blog-card-body">
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
        <p>{article.excerpt}</p>
        <Link to={articlePath} className="blog-read-link" aria-label={`Read ${article.title}`}>
          Read Article <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function BlogArchive() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(
    () => blogArticles.reduce((counts, article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
      return counts;
    }, {}),
    []
  );

  const displayedArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return blogArticles.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const searchableText = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchQuery]);

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <section className="blog-archive-section" id="latest-articles" aria-labelledby="blog-archive-title">
      <div className="container">
        <div className="blog-section-heading">
          <div>
            <p className="blog-eyebrow">The working archive</p>
            <h2 id="blog-archive-title">Latest articles</h2>
          </div>
          <p className="blog-archive-total">{blogArticles.length} field notes, newest first</p>
        </div>

        <div className="blog-archive-tools">
          <label className="blog-search-field">
            <span className="visually-hidden">Search articles</span>
            <FiSearch aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search the archive"
              aria-label="Search articles by title or description"
            />
          </label>
          <p className="blog-results-count" aria-live="polite">
            {displayedArticles.length} {displayedArticles.length === 1 ? 'article' : 'articles'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {searchQuery ? ` matching “${searchQuery}”` : ''}
          </p>
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

        {displayedArticles.length > 0 ? (
          <div className="blog-article-grid">
            {displayedArticles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}
          </div>
        ) : (
          <div className="blog-empty-state" role="status">
            <span className="blog-empty-mark" aria-hidden="true">?</span>
            <h3>No matching field notes</h3>
            <p>Try a broader search or return to the full archive.</p>
            <button type="button" className="blog-empty-reset" onClick={clearFilters}>Show all articles</button>
          </div>
        )}
      </div>
    </section>
  );
}

function getSectionId(article, heading, index) {
  return `${article.slug}-${index}-${getArticleSlug(heading)}`;
}

function ArticleBody({ article }) {
  return (
    <div className="blog-article-body">
      <p className="blog-article-intro">{article.content.intro}</p>
      {article.content.sections.map((section, index) => (
        <section key={section.heading} className="blog-content-section" id={getSectionId(article, section.heading, index)}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.subsections?.map((subsection) => (
            <div className="blog-content-subsection" key={subsection.heading}>
              <h3>{subsection.heading}</h3>
              {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
        </section>
      ))}
      <aside className="blog-article-conclusion">
        <span className="blog-eyebrow">The useful signal</span>
        <p>{article.content.conclusion}</p>
      </aside>
    </div>
  );
}

function ArticleTableOfContents({ article }) {
  return (
    <nav className="blog-table-of-contents" aria-label="Table of contents">
      <span className="blog-toc-label">On this page</span>
      <ol>
        {article.content.sections.map((section, index) => (
          <li key={section.heading}>
            <a href={`#${getSectionId(article, section.heading, index)}`}>{section.heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RelatedArticles({ article }) {
  const related = blogArticles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);

  return (
    <aside className="blog-related-section" aria-labelledby="related-articles-title">
      <div className="blog-related-heading">
        <p className="blog-eyebrow">Keep reading</p>
        <h2 id="related-articles-title">Related articles</h2>
      </div>
      <div className="blog-related-grid">
        {related.map((item) => (
          <Link key={item.slug} to={`/blog/${getArticleSlug(item)}`} className="blog-related-card">
            <ArticleThumbnail article={item} />
            <span>{item.category} <FiArrowUpRight aria-hidden="true" /></span>
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function ArticleNotFound() {
  return (
    <section className="blog-detail-section blog-not-found">
      <div className="container blog-detail-container">
        <p className="blog-eyebrow">The working archive</p>
        <h1>That article is not in the archive.</h1>
        <p>Try the latest articles instead.</p>
        <Link className="blog-back-link" to="/blog"><FiArrowLeft aria-hidden="true" /> Back to the blog</Link>
      </div>
    </section>
  );
}

export default function Blog() {
  useBlogMeta(
    'Field notes from Bangalore - SEO, GEO & growth',
    'Sharp ideas on SEO, GEO, AI search, CRO, paid media, content strategy, analytics, and growth from a working agency journal.',
    '/blog/photos/photo-analytics.jpg'
  );

  return (
    <>
      <BlogHero />
      <FeaturedCoverStory />
      <BlogArchive />
    </>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug);

  useBlogMeta(
    article?.title || 'Article not found',
    article?.excerpt || 'The requested article could not be found in the One Way Digital Media journal.',
    article?.thumbnail || '/blog/photos/photo-analytics.jpg',
    'article'
  );

  if (!article) return <ArticleNotFound />;

  const relatedServiceLinks = article.serviceLinks || [];

  return (
    <>
      <section className="blog-detail-section" aria-labelledby="article-title">
        <div className="container blog-detail-container">
          <Link className="blog-back-link" to="/blog"><FiArrowLeft aria-hidden="true" /> Back to the blog</Link>
          <div className="blog-detail-category-row">
            <span className="blog-featured-pill">{article.category}</span>
            <span><time dateTime={article.dateTime}>{article.date}</time></span>
            <span><FiClock aria-hidden="true" /> {article.readingTime} read</span>
          </div>
          <h1 id="article-title">{article.title}</h1>
          <p className="blog-detail-description">{article.excerpt}</p>
          <div className="blog-detail-cover">
            <ArticleThumbnail article={article} featured />
          </div>
        </div>
      </section>

      <section className="blog-reader-section">
        <div className="container blog-reader-layout">
          <ArticleTableOfContents article={article} />
          <ArticleBody article={article} />
          <aside className="blog-service-note">
            <span className="blog-eyebrow">A related next move</span>
            <h2>Turn the idea into a working system.</h2>
            <p>See how the right service mix can turn a useful insight into a measurable customer journey.</p>
            <div className="blog-service-links">
              {relatedServiceLinks.map((service) => <Link key={service.to} to={service.to}>{service.label} <FiArrowUpRight aria-hidden="true" /></Link>)}
            </div>
          </aside>
        </div>
      </section>

      <div className="container">
        <RelatedArticles article={article} />
      </div>
    </>
  );
}
