import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQUC2ctDa2_DHQQu2AZ8nuBS_kE49IhdQ",
  authDomain: "crwn-clothing-db-5b173.firebaseapp.com",
  projectId: "crwn-clothing-db-5b173",
  storageBucket: "crwn-clothing-db-5b173.appspot.com",
  messagingSenderId: "185202415641",
  appId: "1:185202415641:web:6d4fd0fc9a23a0794bb288",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // set the document with the data from userAuth in my collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`Error creating the user ${error}.`);
    }
  }

  // if user data exist, return userDocref
  return userDocRef;
};
