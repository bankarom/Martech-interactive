import React, { useState, useEffect, useRef } from 'react';

export default function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    if (imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      });
      observer.observe(imgRef.current);
    } else {
      setLoaded(true);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-container ${loaded ? 'loaded' : ''} ${className || ''}`}>
      {loaded ? (
        <img src={src} alt={alt} className="lazy-image" />
      ) : (
        <div className="lazy-placeholder"></div>
      )}
      <style>{`
        .lazy-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }
        .lazy-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .lazy-image-container.loaded .lazy-image {
          opacity: 1;
        }
        .lazy-placeholder {
          width: 100%;
          height: 100%;
          background: rgba(15, 22, 38, 0.5);
        }
      `}</style>
    </div>
  );
}
