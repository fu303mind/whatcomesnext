import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the service account file
const serviceAccount = JSON.parse(
  fs.readFileSync(join(__dirname, 'service-account.json'), 'utf8')
);

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://whatcomesnext-2631d.firebasestorage.app"
});

// Get Firebase Storage instance
const adminStorage = getStorage(app);
const bucket = adminStorage.bucket();

export { adminStorage, bucket };
