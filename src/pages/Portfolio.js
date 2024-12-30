import React, { useState, useEffect } from 'react';
import ImageCarousel from '../components/ImageCarousel.js';
import '../styles/Portfolio.css';

// Local images for development
const localImages = [
  {
    url: '/portfolio-img/building-1.jpg',
    title: 'Building 1'
  },
  {
    url: '/portfolio-img/anotherbuilding.jpg',
    title: 'Another Building'
  },
  {
    url: '/portfolio-img/green buildning.jpg',
    title: 'Green Building'
  },
  {
    url: '/portfolio-img/randombuilding.jpg',
    title: 'Random Building'
  }
];

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In development, use local images
        if (process.env.NODE_ENV === 'development') {
          setImages(localImages);
          setLoading(false);
          return;
        }

        // In production, load from Firebase Storage
        const { storage } = await import('../firebase/config.js');
        const { ref, listAll, getDownloadURL } = await import('firebase/storage');
        
        const storageRef = ref(storage, 'portfolio-img');
        const result = await listAll(storageRef);
        
        if (result.items.length === 0) {
          setError('No images found');
          setLoading(false);
          return;
        }

        const imagePromises = result.items.map(async (imageRef) => {
          try {
            const url = await getDownloadURL(imageRef);
            return {
              url,
              title: imageRef.name
                .replace(/\.[^/.]+$/, '')
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            };
          } catch (err) {
            console.error('Error getting download URL:', err);
            return null;
          }
        });

        const loadedImages = await Promise.all(imagePromises);
        const validImages = loadedImages.filter(img => img !== null);
        
        if (validImages.length === 0) {
          setError('No images could be loaded');
        } else {
          setImages(validImages);
        }
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Error loading images');
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

  if (loading) {
    return (
      <div className="portfolio-page">
        <h1>Our Portfolio</h1>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-page">
        <h1>Our Portfolio</h1>
        <div className="error">Error: {error}</div>
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
        {images.map((image, index) => (
          <div
            key={index}
            className="portfolio-item"
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={image.url} 
              alt={image.title}
              loading="lazy"
              onError={(e) => {
                console.error('Image load error:', image.url);
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.title)}`;
              }}
            />
            <div className="portfolio-item-overlay">
              <h3>{image.title}</h3>
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
