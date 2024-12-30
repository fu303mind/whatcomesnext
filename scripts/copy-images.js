import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination paths
const sourceDir = path.join(__dirname, '../public/portfolio-img');
const destDir = path.join(__dirname, '../build/portfolio-img');

// Ensure the destination directory exists
fs.ensureDirSync(destDir);

// Copy images
fs.copySync(sourceDir, destDir);

console.log('Images copied successfully!');
