import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA_hXpbfG9iaYcS6n9sWtNsD8-drdMCYJc",
  authDomain: "pruebas-react-f3953.firebaseapp.com",
  projectId: "pruebas-react-f3953",
  storageBucket: "pruebas-react-f3953.appspot.com",
  messagingSenderId: "112564593912",
  appId: "1:112564593912:web:9ef7ba78de927ee8b0c70d",
  measurementId: "G-091MJ2MWFX"
};

// Initialize Firebase
// const fire = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore();

export {db};
