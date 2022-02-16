import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, doc, setDoc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"; 
const firebaseApp = initializeApp({
    apiKey: "AIzaSyB8YxCWJy-B8Lv7RL2f81ul4pCGlmXlz6k",
    authDomain: "library-e082a.firebaseapp.com",
    projectId: "library-e082a",
    storageBucket: "library-e082a.appspot.com",
    messagingSenderId: "392976072032",
    appId: "1:392976072032:web:2cb9a745c3da5585cdb205"
});
const db = getFirestore();


 export async function getAllDocs(cllctn) {
     const querySnapshot = await getDocs(collection(db, cllctn))
     let dataIds = [];
     querySnapshot.forEach((doc) => {
         dataIds.push(doc.id)
     })
     console.log(dataIds)
     return dataIds
 }
 
 export async function  deleteAllDocs(collection) {
  (await getAllDocs(collection)).forEach((id) => deleteDoc(doc(db, collection, id)))
 }


const firestoreFn = {};

firestoreFn.addToCollection = async (cllctn,object) => {
    let newDocRef = await addDoc(collection(db, cllctn), object)
    return newDocRef
}

firestoreFn.deleteBook = async (cllctn,id) => {
    await deleteDoc(doc(db, cllctn, id))
}

firestoreFn.updateBook = async (cllctn, id, value) => {
    const book = doc(db, cllctn, id)
    await updateDoc(book, {
        read: value
    })
}

export default firestoreFn 