// firebase.js
import { initializeApp } from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDFLWg6PyNhX7LGWUgXiHja_mmfpW9JVcY",
  authDomain: "btcrelay-4000b.firebaseapp.com",
  projectId: "btcrelay-4000b",
  storageBucket: "btcrelay-4000b.firebasestorage.app",
  messagingSenderId: "715360149588",
  appId: "1:715360149588:web:769536ebb6960eaa2e0dc1",
  measurementId: "G-03WC6D2H6T"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Use persistent auth
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

