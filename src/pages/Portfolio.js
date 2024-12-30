import React, { useState, useEffect } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Get the list of files from the portfolio-img directory
        const response = await fetch('http://localhost:3001/portfolio-img');
        const text = await response.text();
        
        // Create a temporary div to parse the directory listing HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
          .map(link => link.href)
          .filter(href => 
            href.match(/\.(jpg|jpeg|png|gif|webp)$/i) && 
            !href.includes('?') && 
            !href.includes('=')
          );

        // Create image objects from the files
        const imageObjects = links.map((href, index) => {
          const filename = href.split('/').pop();
          const title = filename
            .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return {
            id: index + 1,
            title: title,
            description: `${title} - Professional architectural design and implementation`,
            filename: filename,
            src: `http://localhost:3001/portfolio-img/${filename}`,
            alt: title,
            category: title.split(' ')[0],
            tags: title.split(' ').map(word => word.trim()).filter(word => word.length > 2)
          };
        });

        setImages(imageObjects);
      } catch (error) {
        console.error('Error loading images:', error);
        // Fallback to loading images from public directory directly
        try {
          const response = await fetch('/portfolio-img');
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const links = Array.from(doc.querySelectorAll('a'))
            .map(link => link.href)
            .filter(href => 
              href.match(/\.(jpg|jpeg|png|gif|webp)$/i) && 
              !href.includes('?') && 
              !href.includes('=')
            );

          const imageObjects = links.map((href, index) => {
            const filename = href.split('/').pop();
            const title = filename
              .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return {
              id: index + 1,
              title: title,
              description: `${title} - Professional architectural design and implementation`,
              filename: filename,
              src: `/portfolio-img/${filename}`,
              alt: title,
              category: title.split(' ')[0],
              tags: title.split(' ').map(word => word.trim()).filter(word => word.length > 2)
            };
          });

          setImages(imageObjects);
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowCarousel(true);
  };

  const handleCloseCarousel = () => {
    setShowCarousel(false);
  };

  // Handle keyboard events for the carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showCarousel) return;
      
      if (e.key === 'Escape') {
        handleCloseCarousel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCarousel]);

  if (loading) {
    return (
      <div className="portfolio-page">
        <h1>Our Portfolio</h1>
        <div className="loading">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <h1>Our Portfolio</h1>
      <div className="portfolio-description">
        <p>Explore our diverse collection of innovative designs and creative solutions</p>
      </div>
      <div className="portfolio-grid">
        {images.map((item, index) => (
          <div 
            key={item.id} 
            className="portfolio-item"
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={item.src} 
              alt={item.alt} 
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/800x800/?${item.category},design`;
              }}
            />
            <div className="portfolio-item-overlay">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="tags">
                {item.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCarousel && (
        <ImageCarousel
          images={images}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseCarousel}
        />
      )}
    </div>
  );
};

export default Portfolio;
