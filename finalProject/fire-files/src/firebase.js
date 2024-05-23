// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyQw-4U7y8HUhSeNtaZ1pQyeJgFLph-As",
  authDomain: "fire-files-c4513.firebaseapp.com",
  projectId: "fire-files-c4513",
  storageBucket: "fire-files-c4513.appspot.com",
  messagingSenderId: "964344120983",
  appId: "1:964344120983:web:ce1eca1ee22c6464330bd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
