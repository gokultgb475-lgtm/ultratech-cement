import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfgs2D2dk7lp0j3L25VLw0MDaDqYLfxjU",
  authDomain: "gokul-cement-store.firebaseapp.com",
  projectId: "gokul-cement-store",
  storageBucket: "gokul-cement-store.firebasestorage.app",
  messagingSenderId: "629168431695",
  appId: "1:629168431695:web:1800c602d4f95237e7403a"
};

const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);

// Export Auth for login system
export const auth = getAuth(app);
