import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAE0F0cMQBVQDaWQ2b9QGT6rSDCGOtcvrk",
  authDomain: "chat-b3698.firebaseapp.com",
  projectId: "chat-b3698",
  storageBucket: "chat-b3698.appspot.com",
  messagingSenderId: "424195302983",
  appId: "1:424195302983:web:9e59e83ed647d7a3e73362"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();