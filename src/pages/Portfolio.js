import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Using process.env.PUBLIC_URL to ensure correct path resolution
    const imageList = [
      { 
        id: 1, 
        src: `${process.env.PUBLIC_URL}/portfolio/building-1.jpg`, 
        title: 'Modern Architecture', 
        category: 'Architecture' 
      },
      { 
        id: 2, 
        src: `${process.env.PUBLIC_URL}/portfolio/anotherbuilding.jpg`, 
        title: 'Urban Design', 
        category: 'Architecture' 
      },
      { 
        id: 3, 
        src: `${process.env.PUBLIC_URL}/portfolio/green buildning.jpg`, 
        title: 'Sustainable Building', 
        category: 'Architecture' 
      },
      { 
        id: 4, 
        src: `${process.env.PUBLIC_URL}/portfolio/randombuilding.jpg`, 
        title: 'Contemporary Design', 
        category: 'Architecture' 
      }
    ];
    
    setImages(imageList);
    setIsLoading(false);
  }, []);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setSelectedImage(images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedImage(images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="portfolio-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-hero">
        <h1>Portfolio</h1>
        <p>Explore our latest works</p>
      </div>

      <div className="portfolio-grid">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="portfolio-item"
            onClick={() => handleImageClick(image, index)}
          >
            <img src={image.src} alt={image.title} />
            <div className="portfolio-item-overlay">
              <h3>{image.title}</h3>
              <p>{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="carousel-overlay" onClick={handleClose}>
          <div className="carousel-content" onClick={e => e.stopPropagation()}>
            <button className="carousel-close" onClick={handleClose}>×</button>
            <button className="carousel-nav prev" onClick={handlePrevious}>‹</button>
            <button className="carousel-nav next" onClick={handleNext}>›</button>
            
            <div className="carousel-image-container">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="carousel-image"
              />
            </div>
            
            <div className="carousel-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.category}</p>
            </div>
            
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSelectedImage(images[index]);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
