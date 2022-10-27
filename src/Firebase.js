import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASJ103R1Xe_qlElkacnI0WJClBkJtNrss",
  authDomain: "proyectpoi.firebaseapp.com",
  projectId: "proyectpoi",
  storageBucket: "proyectpoi.appspot.com",
  messagingSenderId: "675322011103",
  appId: "1:675322011103:web:5784821be0f2044e22f86a",
  measurementId: "G-KNMKTKQSPN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();