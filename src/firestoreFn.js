import App  from "./index";
import { getFirestore } from "firebase/firestore";
import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const firebaseApp = App();
const db = getFirestore();


const firestoreFn = {};

firestoreFn.setUser = async(cllctn, id, object) => {
let newUser = await setDoc(doc(db, cllctn, id), object)
return newUser
}

firestoreFn.getUser = async(cllctn, id) => {
    return doc(db, cllctn, id)
}

firestoreFn.addTo = async(cllctnRef, object) => {
    let newDocRef = await addDoc(cllctnRef, object)
}

firestoreFn.addToCollection = async (cllctn, object) => {
    let newDocRef = await addDoc(collection(db, cllctn), object);
    return newDocRef;
};

firestoreFn.deleteBook = async (userID, bookID) => {
    deleteDoc(doc(db, 'users', userID, 'books', bookID ));
};

firestoreFn.updateBook = async (userID, bookID, key, value) => {
    const book = doc(db, 'users', userID, 'books', bookID);
    await updateDoc(book, {
        key: value,
    });
};

firestoreFn.getAllUserBooks = async (user) => {
    const querySnapshot = await getDocs(collection(db, 'users', user, 'books'));
    let data = [];
    querySnapshot.forEach((doc) => {
        let book = doc.data()
        book.fireID = doc._key.path.segments[8]
        data.push(book)
    });
    return data;
}

firestoreFn.addToBookCollection = async (userId, bookObject ) => {
    const subCollection = collection(db, 'users', userId, 'books');
    let newDoc = addDoc(subCollection, bookObject)
    return newDoc
}

export default firestoreFn;
