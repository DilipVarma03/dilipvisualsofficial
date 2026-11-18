import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let adminInitialized = false;

try {
  const credential = admin.credential || (admin as any).default?.credential;
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY && credential) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: credential.cert(serviceAccount)
    });
    adminInitialized = true;
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && credential) {
    admin.initializeApp({
      credential: credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    });
    adminInitialized = true;
  } else {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'dilip-visuals'
      });
    }
  }
} catch (error) {
  console.log('[Firebase Admin] Local mode active. Connect service account credentials for production custom claims.');
}

export const firebaseAdmin = admin;
export const isFirebaseAdminReady = () => adminInitialized;
