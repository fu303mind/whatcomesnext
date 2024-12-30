import { bucket } from '../firebase/admin-config.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..', '..');

const uploadImages = async () => {
  const portfolioDir = join(projectRoot, 'public', 'portfolio-img');
  
  try {
    // Read all files from the portfolio-img directory
    const files = fs.readdirSync(portfolioDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images to upload`);
    console.log('Using storage bucket:', bucket.name);
    
    // Upload each image
    for (const file of imageFiles) {
      const filePath = join(portfolioDir, file);
      // Replace spaces with underscores in the destination filename
      const destFileName = file.replace(/\s+/g, '_');
      
      try {
        console.log(`Uploading ${file}...`);
        
        // Upload the file to Firebase Storage
        await bucket.upload(filePath, {
          destination: `portfolio-img/${destFileName}`,
          metadata: {
            contentType: `image/${file.split('.').pop().toLowerCase()}`
          },
          public: true, // Make file public during upload
          validation: false // Skip MD5 validation for faster upload
        });
        
        console.log(`✓ Uploaded ${file} successfully`);
        console.log(`Public URL: https://storage.googleapis.com/${bucket.name}/portfolio-img/${destFileName}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`);
        console.error('Error details:', JSON.stringify(error, null, 2));
        if (error.code === 404) {
          console.error('Bucket not found. Please check your Firebase Storage settings.');
        }
      }
    }
    
    console.log('\nUpload process completed!');
  } catch (error) {
    console.error('Error during upload process:', error);
    throw error;
  }
};

// Run the upload function
uploadImages()
  .then(() => {
    console.log('All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Upload failed:', error);
    process.exit(1);
  });
