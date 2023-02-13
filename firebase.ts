import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpkx-b5P4VgjXPnhwPANByKO5qTlmf4Fc",
    authDomain: "chatgpt-chase.firebaseapp.com",
    projectId: "chatgpt-chase",
    storageBucket: "chatgpt-chase.appspot.com",
    messagingSenderId: "344084455820",
    appId: "1:344084455820:web:d3bd310937e77461b136a9"
  };
  
  // Initialize Firebase
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app)

  export {db}