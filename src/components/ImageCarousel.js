import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/ImageCarousel.css';

const ImageCarousel = ({ images, selectedIndex, onClose }) => {
  return (
    <div className="carousel-modal">
      <div className="carousel-content">
        <button className="close-button" onClick={onClose}>×</button>
        <Carousel
          selectedItem={selectedIndex}
          showThumbs={true}
          showStatus={true}
          showIndicators={true}
          infiniteLoop={true}
          useKeyboardArrows={true}
          swipeable={true}
          dynamicHeight={false}
          emulateTouch={true}
        >
          {images.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img src={item.url} alt={item.title} />
              <div className="carousel-details">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
