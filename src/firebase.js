import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWyKgY0rBYtxRcJIHyYYDOmc2EUEx4WN4",
  authDomain: "whatsapp-clone-ef5af.firebaseapp.com",
  projectId: "whatsapp-clone-ef5af",
  storageBucket: "whatsapp-clone-ef5af.appspot.com",
  messagingSenderId: "200082612419",
  appId: "1:200082612419:web:c7b88dfbe761a0c55ec276",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
