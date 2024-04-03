// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPCGPk6ucqRDOOujfMVs3Hdiy09TjvMMs",
  authDomain: "fir-dns.firebaseapp.com",
  databaseURL: "https://fir-dns-default-rtdb.firebaseio.com",
  projectId: "fir-dns",
  storageBucket: "fir-dns.appspot.com",
  messagingSenderId: "906824867247",
  appId: "1:906824867247:web:27314cfe011f5c1771635a",
  measurementId: "G-MN6DT4DV3L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getDatabase(app)