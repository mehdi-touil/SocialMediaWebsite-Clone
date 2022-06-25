import { initializeApp } from "firebase/app";
import "firebase/storage";
import firebase from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signOut,
} from "firebase/auth";
import {
 getFirestore,
 query,
 getDocs,
 collection,
 where,
 addDoc,
} from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
 apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
 authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
 projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
 storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
 appId: process.env.REACT_APP_FIREBASE_APP_ID,
 measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithGoogle = async () => {
 try {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  const user = res.user;
  const userRef = collection(db, "users");
  const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
  if (result.empty) {
   await addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    status: "online",
   });
  }
 } catch (err) {
  alert(err.message);
 }
};
const logout = () => {
 signOut(auth)
  .then(() => {
   // Sign-out successful.
   console.log("logout success");
  })
  .catch((error) => {
   // An error happened.
   console.log(error);
  });
};
export { auth, db, signInWithGoogle, logout };
