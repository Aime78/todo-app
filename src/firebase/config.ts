// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCD7R28j6XJTJRz2FF9mrnghxb113RnFak',
  authDomain: 'todo-app-14180.firebaseapp.com',
  projectId: 'todo-app-14180',
  storageBucket: 'todo-app-14180.appspot.com',
  messagingSenderId: '535265206582',
  appId: '1:535265206582:web:466746160ab96491db5397',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
