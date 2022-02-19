import App from "./index";
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

const firestore = {}

firestore.setUser = async (cllctn, id, object) => {
  let newUser = await setDoc(doc(db, cllctn, id), object);
  return newUser;
};

firestore.addToBookCollection = async (userId, bookObject) => {
  const subCollection = collection(db, "users", userId, "books");
  let newDoc = addDoc(subCollection, bookObject);
  return newDoc;
};

firestore.deleteBook = async (userID, bookID) => {
  deleteDoc(doc(db, "users", userID, "books", bookID));
};

firestore.updateBook = async (userID, bookID, key, value) => {
   const book = doc(db, "users", userID, "books", bookID);
  await updateDoc(book, {
    [key]: value,
  });
};

firestore.getAllUserBooks = async (user) => {
 const querySnapshot = await getDocs(collection(db, "users", user, "books"));
  let data = [];
  querySnapshot.forEach((doc) => {
    let book = doc.data();
    book.fireID = doc._key.path.segments[8];
    data.push(book);
  });
  return data;
};

firestore.addToBookCollection = async (userId, bookObject) => {
  const subCollection = collection(db, "users", userId, "books");
  let newDoc = addDoc(subCollection, bookObject);
  return newDoc;
};

firestore.isOn = true

const firestoreFn = new Proxy(firestore, {
    get: function(target, prop) {
        if(target.isOn) {
            return target[prop]
        }
        else {
            prop = {}
            return new Proxy(prop, {
                get: function(target, objProps) {
                    return target[objProps] = 'firestore is off'
                }})
            } 
        
        }
    }
    
)

export default firestoreFn;
