import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {qsel} from './index'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyB8YxCWJy-B8Lv7RL2f81ul4pCGlmXlz6k",
    authDomain: "library-e082a.firebaseapp.com",
    projectId: "library-e082a",
    storageBucket: "library-e082a.appspot.com",
    messagingSenderId: "392976072032",
    appId: "1:392976072032:web:2cb9a745c3da5585cdb205"
});

const auth = getAuth(firebaseApp);

async function loginEmailPAssword() {
  const loginEmail = qsel("#signInEmail").value;
  const loginPassword = qsel("#signInPassword").value;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );
}

async function createAccount() {
  const loginEmail = qsel("#signInEmail").value;
  const loginPassword = qsel("#signInPassword").value;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );
}

async function logOut() {
  let signedOut = await signOut(auth);
  console.log(signedOut);
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        qsel("#authForm").style.display = "none";
        qsel("#userName").textContent = user.providerData[0].email;
      } else {
          qsel("#userName").textContent = 'You\'re not logged in';
          qsel("#authForm").style.display = "flex";
  
      }
    });
  };



export { loginEmailPAssword, createAccount, logOut, monitorAuthState };
