// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4m6ELzre5oeJBjeKJUt2SbsuO_PGkdyw",
  authDomain: "twitter-clone-react-554b3.firebaseapp.com",
  projectId: "twitter-clone-react-554b3",
  storageBucket: "twitter-clone-react-554b3.appspot.com",
  messagingSenderId: "45382816799",
  appId: "1:45382816799:web:a23a9d1f0498e02adff12a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };