import { initFirestore } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';

const credential = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
});

const firestore = initFirestore({ credential });

export { firestore };
