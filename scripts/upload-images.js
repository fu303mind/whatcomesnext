import uploadImages from '../src/utils/uploadImages.js';

console.log('Starting image upload...');
uploadImages()
  .then(() => {
    console.log('Upload complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Upload failed:', error);
    process.exit(1);
  });
