import { useEffect } from 'react';

export default function SEOHelper({ title, description }) {
  useEffect(() => {
    // Update tab title
    document.title = `${title} | Improx Martech`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || 'Improx Martech - Premium B2B Media & Publishing Platform.');
  }, [title, description]);

  return null;
}
