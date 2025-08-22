import admin from 'firebase-admin';

// Initialize Firebase only when first needed
let firebaseInitialized = false;

const initializeFirebase = () => {
  if (firebaseInitialized || admin.apps.length > 0) {
    return;
  }

  console.log("Initializing Firebase with env vars:");
  console.log("Project ID:", process.env.FIREBASE_PROJECT_ID || "MISSING");
  console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL || "MISSING");
  console.log("Private Key exists:", !!process.env.FIREBASE_PRIVATE_KEY);

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error("Missing Firebase environment variables!");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

  firebaseInitialized = true;
  console.log("✅ Firebase initialized successfully!");
};

export const authenticateUser = async (req, res, next) => {
  try {
    // Initialize Firebase only when first request comes in
    initializeFirebase();

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      message: 'Invalid or expired token.' 
    });
  }
};