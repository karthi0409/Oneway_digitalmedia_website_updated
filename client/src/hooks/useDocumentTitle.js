import { useEffect } from 'react';

/**
 * Custom hook to update document title and meta description dynamically
 * @param {string} title - Page title
 * @param {string} [description] - Optional meta description
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    const baseTitle = 'One Way Digital Media';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Digital Marketing & Web Growth Agency`;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    // Scroll to top on page change unless hash is present
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [title, description]);
}
