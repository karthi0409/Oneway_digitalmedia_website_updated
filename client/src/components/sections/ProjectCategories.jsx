import React from 'react';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'performance-ads', label: 'Performance Ads' },
  { id: 'website', label: 'Web Development' },
  { id: 'video', label: 'Video Production' },
];

export default function ProjectCategories({ currentCategory, onSelectCategory }) {
  return (
    <div className="project-filters" role="group" aria-label="Filter Projects by Service">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
