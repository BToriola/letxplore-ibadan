import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Read env vars safely (may be undefined during build in some environments)
const firebaseConfig: Partial<FirebaseOptions> = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasFullConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
].every(Boolean);

// Initialize Firebase only on the client and only when config is present.
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (typeof window !== 'undefined' && hasFullConfig) {
  try {
    app = initializeApp(firebaseConfig as FirebaseOptions);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    // Fail gracefully; don't crash prerender/build if something goes wrong here.
    // Client-side usage can still check for null and show fallback UI.
    // Log for debugging in dev/prod logs.
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Firebase on client:', err);
    app = null;
    auth = null;
    db = null;
  }
} else if (!hasFullConfig) {
  // If config is missing, log but do not throw — server-side prerender must not fail.
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn('Firebase configuration incomplete. Firebase not initialized.');
  }
}

export { auth, db };
export default app;
