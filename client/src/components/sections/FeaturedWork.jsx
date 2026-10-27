import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiExternalLink, FiArrowRight, FiInbox } from 'react-icons/fi';
import ProjectCategories from './ProjectCategories.jsx';
import Heading from '../ui/Heading.jsx';
import { fetchProjects } from '../../api.js';
import { showcaseProjects } from '../../../../shared/data/showcaseProjects.mjs';

export default function FeaturedWork() {
  const [category, setCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingShowcaseProjects, setUsingShowcaseProjects] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProjects(category)
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res?.data) ? res.data : [];
          const fallback = category === 'all'
            ? showcaseProjects
            : showcaseProjects.filter((project) => project.category === category);
          setUsingShowcaseProjects(list.length === 0);
          setProjects(list.length > 0 ? list : fallback);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Error loading projects:', err);
          const fallback = category === 'all'
            ? showcaseProjects
            : showcaseProjects.filter((project) => project.category === category);
          setUsingShowcaseProjects(true);
          setProjects(fallback);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <section className="section section-light" id="featured-work">
      <div className="container">
        <Heading
          tag="Case Studies & Portfolio"
          title="Featured"
          highlight="Work"
          subtitle="A selection of high-impact brand transformations, lead generation funnels, and digital builds."
          theme="light"
        />

        {/* Filter Categories */}
        <ProjectCategories currentCategory={category} onSelectCategory={setCategory} />

        {!loading && usingShowcaseProjects && (
          <p className="project-showcase-notice" role="status">
            Showing illustrative project concepts because published projects could not be loaded from the project database.
            These examples are not completed client engagements, and no performance results are claimed.
          </p>
        )}

        {!loading && !usingShowcaseProjects && projects.some((project) => project.isIllustrative) && (
          <p className="project-showcase-notice">
            These are illustrative project concepts created to show possible approaches. They are not completed client
            engagements, and no performance results are claimed.
          </p>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted)' }}>
            <p>Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((proj) => (
              <article
                key={proj._id || proj.id}
                className="project-card"
                onClick={() => setActiveProject(proj)}
                tabIndex="0"
                role="button"
                onKeyDown={(e) => e.key === 'Enter' && setActiveProject(proj)}
              >
                <div className="project-thumb">
                  {proj.imageUrl ? (
                    <img src={proj.imageUrl} alt={proj.title} loading="lazy" />
                  ) : (
                    <div className="project-thumb-placeholder">✦</div>
                  )}
                </div>
                <div className="project-card-info">
                  {proj.isIllustrative && <span className="project-showcase-label">Illustrative concept</span>}
                  <span className="project-category-tag">{proj.category}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-result">{proj.result || proj.client}</p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--lime-text)',
                      marginTop: 'auto',
                    }}
                  >
                    <span>View Case Study</span>
                    <FiArrowRight />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiInbox />
            </div>
            <h3>Case studies are being added</h3>
            <p>
              We are constantly updating our portfolio with recently concluded campaign metrics, client testimonials, and
              live web projects. Get in touch to review specific case studies tailored to your niche.
            </p>
            <Link to="/about#contact-form" className="btn btn-primary">
              <span>Ask for examples</span>
              <FiArrowRight />
            </Link>
          </div>
        )}

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="modal-overlay" onClick={() => setActiveProject(null)} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close"
                onClick={() => setActiveProject(null)}
                aria-label="Close Case Study Details"
              >
                <FiX />
              </button>

              <span className="section-tag" style={{ marginBottom: '0.75rem' }}>
                {activeProject.category}
              </span>
              {activeProject.isIllustrative && (
                <p className="project-showcase-notice project-showcase-notice-modal">
                  Illustrative concept — not a completed client engagement or verified result.
                </p>
              )}
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--white)' }}>
                {activeProject.title}
              </h2>
              {activeProject.client && (
                <p style={{ color: 'var(--lime)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  {activeProject.isIllustrative ? 'Project type' : 'Client'}: {activeProject.client}
                </p>
              )}

              {activeProject.imageUrl && (
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={activeProject.imageUrl} alt={activeProject.title} style={{ width: '100%', height: 'auto' }} />
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  Overview & Challenge
                </h4>
                <p style={{ color: 'rgba(241, 242, 240, 0.85)', lineHeight: '1.65' }}>
                  {activeProject.description}
                </p>
              </div>

              {activeProject.result && (
                <div
                  style={{
                    backgroundColor: 'rgba(138, 198, 22, 0.1)',
                    border: '1px solid rgba(138, 198, 22, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    marginBottom: '1.75rem',
                  }}
                >
                  <h4 style={{ color: 'var(--lime)', marginBottom: '0.35rem', fontSize: '1rem' }}>
                    Key Outcome & Results
                  </h4>
                  <p style={{ color: 'var(--white)', margin: 0, fontWeight: 500 }}>
                    {activeProject.result}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  to="/about#contact-form"
                  className="btn btn-primary"
                  onClick={() => setActiveProject(null)}
                >
                  <span>Build Similar Growth Engine</span>
                  <FiArrowRight />
                </Link>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
