// Function to get all image files from the portfolio-img directory
export const getPortfolioImages = async () => {
  try {
    // Get the list of files from the portfolio-img directory
    const context = require.context('/public/portfolio-img', false, /\.(jpg|jpeg|png|gif|webp)$/i);
    const images = context.keys().map(path => {
      // Get the file name without extension to use as title
      const fileName = path.replace('./', '').replace(/\.[^/.]+$/, '');
      return {
        id: fileName,
        src: `/portfolio-img/${path.replace('./', '')}`,
        alt: fileName.replace(/-/g, ' '),
        title: fileName.replace(/-/g, ' '),
        description: `Description for ${fileName.replace(/-/g, ' ')}`
      };
    });
    return images;
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
};
