// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6zY3a1nb0FlBcv413FhlJ9K6kvXjL9kM",
    authDomain: "chat-application-e5778.firebaseapp.com",
    projectId: "chat-application-e5778",
    storageBucket: "chat-application-e5778.appspot.com",
    messagingSenderId: "134051316016",
    appId: "1:134051316016:web:a1293dcda37c063d1a08f5",
    measurementId: "G-5D46200GTC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
