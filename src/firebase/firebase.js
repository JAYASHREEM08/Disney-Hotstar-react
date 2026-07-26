import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1E3Ztk7MgOLn3pCkA0q6bqwuB_QcwA0Y",
  authDomain: "disney-hotstar-react-d9aed.firebaseapp.com",
  projectId: "disney-hotstar-react-d9aed",
  storageBucket: "disney-hotstar-react-d9aed.firebasestorage.app",
  messagingSenderId: "95450100846",
  appId: "1:95450100846:web:4ef4975e058f2974e4e27f",
  measurementId: "G-XFZHBYCXQX",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
