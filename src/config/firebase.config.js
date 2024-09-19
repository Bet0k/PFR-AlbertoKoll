import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDHmPyUgtfSkeMSgYh29rc6yE7upU-YIvo",
  authDomain: "potis-resto-project.firebaseapp.com",
  projectId: "potis-resto-project",
  storageBucket: "potis-resto-project.appspot.com",
  messagingSenderId: "781684052471",
  appId: "1:781684052471:web:769f0366d0903682215ef2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);