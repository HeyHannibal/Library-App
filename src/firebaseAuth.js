import App from "./index";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { qsel } from "./index";

const firebaseApp = App();

async function loginEmailPAssword(myAuth) {
    const loginEmail = qsel("#signInEmail").value;
    const loginPassword = qsel("#signInPassword").value;
    const userCredential = await signInWithEmailAndPassword(
        myAuth,
        loginEmail,
        loginPassword
    );
}

async function createAccount(myAuth) {
    const loginEmail = qsel("#signInEmail").value;
    const loginPassword = qsel("#signInPassword").value;
    const userCredential = await createUserWithEmailAndPassword(
        myAuth,
        loginEmail,
        loginPassword
    );
}

async function logOut(myAuth) {
    let signedOut = await signOut(myAuth);
    console.log(signedOut);
}

export { loginEmailPAssword, createAccount, logOut };
