const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '../public/portfolio');

// Get all images from the portfolio directory
const getPortfolioImages = () => {
  const files = fs.readdirSync(portfolioDir);
  return files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map((file, index) => ({
      id: index + 1,
      src: `/portfolio/${file}`,
      title: `Project ${index + 1}`,
      category: 'Photography' // You can modify this based on file naming convention
    }));
};

// Update the Portfolio component with the new image list
const updatePortfolioComponent = (images) => {
  const portfolioPath = path.join(__dirname, '../src/pages/Portfolio.js');
  const portfolioContent = fs.readFileSync(portfolioPath, 'utf8');
  
  // Find the imageList array in the component
  const updatedContent = portfolioContent.replace(
    /const imageList = \[([\s\S]*?)\];/,
    `const imageList = ${JSON.stringify(images, null, 6)};`
  );
  
  fs.writeFileSync(portfolioPath, updatedContent);
};

// Main function
const main = () => {
  try {
    const images = getPortfolioImages();
    updatePortfolioComponent(images);
    console.log(`✅ Successfully updated portfolio with ${images.length} images`);
  } catch (error) {
    console.error('❌ Error updating portfolio:', error);
  }
};

main();
