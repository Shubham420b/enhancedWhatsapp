import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgpmB0QOzCRV5Y5Fp0NkjSEWh3KD7Lw-c",
  authDomain: "whatsapp-clone-ce13d.firebaseapp.com",
  projectId: "whatsapp-clone-ce13d",
  storageBucket: "whatsapp-clone-ce13d.appspot.com",
  messagingSenderId: "208470814939",
  appId: "1:208470814939:web:dffa5f4e1d551d48175cfe",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
