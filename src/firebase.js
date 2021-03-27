// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDUrlmzZk_bXNRpuVMYMFMa7wlJQWJme1U",
  authDomain: "clone-4d3fd.firebaseapp.com",
  projectId: "clone-4d3fd",
  storageBucket: "clone-4d3fd.appspot.com",
  messagingSenderId: "977369746282",
  appId: "1:977369746282:web:34e09d4900659098e4f313",
  measurementId: "G-KMCN39D9GG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth()

export { db,auth };


