// // firebase.js
// import { initializeApp } from 'firebase/app';
// import {initializeAuth, getReactNativePersistence} from "firebase/auth"
// // import { getFirestore } from 'firebase/firestore';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDFLWg6PyNhX7LGWUgXiHja_mmfpW9JVcY",
//   authDomain: "btcrelay-4000b.firebaseapp.com",
//   projectId: "btcrelay-4000b",
//   storageBucket: "btcrelay-4000b.firebasestorage.app",
//   messagingSenderId: "715360149588",
//   appId: "1:715360149588:web:769536ebb6960eaa2e0dc1",
//   measurementId: "G-03WC6D2H6T"
// };


// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// // export const db = getFirestore(app);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// })


// firebase.js
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getReactNativePersistence,
//   getAuth
// } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDFLWg6PyNhX7LGWUgXiHja_mmfpW9JVcY",
//   authDomain: "btcrelay-4000b.firebaseapp.com",
//   projectId: "btcrelay-4000b",
//   storageBucket: "btcrelay-4000b.firebasestorage.app",
//   messagingSenderId: "715360149588",
//   appId: "1:715360149588:web:769536ebb6960eaa2e0dc1",
//   measurementId: "G-03WC6D2H6T"
// };

// // Initialize Firebase app (only if not already initialized)
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Initialize Auth (only if not already initialized)
// let auth;
// try {
//   auth = getAuth(app);
// } catch (e) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
// }

// // Export the app and auth
// export { app, auth };

// firebase.ts
// import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getReactNativePersistence,
//   getAuth,
//   Auth
// } from 'firebase/auth';
// import { getFirestore, Firestore } from 'firebase/firestore';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDFLWg6PyNhX7LGWUgXiHja_mmfpW9JVcY",
//   authDomain: "btcrelay-4000b.firebaseapp.com",
//   projectId: "btcrelay-4000b",
//   storageBucket: "btcrelay-4000b.firebasestorage.app",
//   messagingSenderId: "715360149588",
//   appId: "1:715360149588:web:769536ebb6960eaa2e0dc1",
//   measurementId: "G-03WC6D2H6T"
// };

// // Initialize Firebase app
// const app: FirebaseApp = getApps().length === 0
//   ? initializeApp(firebaseConfig)
//   : getApp();

// // Initialize Auth with React Native persistence
// let auth: Auth;
// try {
//   auth = getAuth(app);
// } catch (e) {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
// }

// // Initialize Firestore
// const db: Firestore = getFirestore(app);

// // Export initialized services
// export { app, auth, db };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
