import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvbzAR9EHlURoKzlkiY02Kft-wzOKHdLU",
  authDomain: "life-as-a-game-xd.firebaseapp.com",
  projectId: "life-as-a-game-xd",
  storageBucket: "life-as-a-game-xd.firebasestorage.app",
  messagingSenderId: "115785315392",
  appId: "1:115785315392:web:ffebbb757c51d935791ba5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
