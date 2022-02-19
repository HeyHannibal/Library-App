import "./style.css";
import checkValidity from "./components/checkValidityFn";
import storeJSON from "./localStorage";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firestoreFn from "./firestoreFn.js";
import { loginEmailPAssword, createAccount, logOut } from "./firebaseAuth.js";
import {qsel, eFactory} from './helperFn'


const firebaseApp = initializeApp({
  apiKey: "AIzaSyB8YxCWJy-B8Lv7RL2f81ul4pCGlmXlz6k",
  authDomain: "library-e082a.firebaseapp.com",
  projectId: "library-e082a",
  storageBucket: "library-e082a.appspot.com",
  messagingSenderId: "392976072032",
  appId: "1:392976072032:web:2cb9a745c3da5585cdb205",
});
export default async function App() {
  return initializeApp({
    apiKey: "AIzaSyB8YxCWJy-B8Lv7RL2f81ul4pCGlmXlz6k",
    authDomain: "library-e082a.firebaseapp.com",
    projectId: "library-e082a",
    storageBucket: "library-e082a.appspot.com",
    messagingSenderId: "392976072032",
    appId: "1:392976072032:web:2cb9a745c3da5585cdb205",
  });
}

const auth = getAuth(firebaseApp);

qsel("#signIn").addEventListener("click", (e) => {
  e.preventDefault();
  loginEmailPAssword(auth);
});

qsel("#signUp").addEventListener("click", (e) => {
  e.preventDefault();
  createAccount(auth);
});

qsel("#noSignIn").addEventListener("click", () => {
  qsel("#signInCont").style.display = "none";
});

qsel("#signInOut").addEventListener("click", () => {
  logOut(auth);
});

const monitorAuthState = async (myAuth) => {
  onAuthStateChanged(myAuth, (user) => {
    if (user) {
      qsel("#signInOut").textContent = "Sign Out";
      qsel("#signInCont").style.display = "none";
      qsel("#userName").textContent = user.providerData[0].email;
      firestoreFn.setUser("users", user.uid, { name: user.email });
      renderOnUserLogin(user.uid);
    } else {
      qsel("#signInOut").textContent = "Sign In";
      qsel("#signInOut").addEventListener("click", () => {
        logOut(auth);
        qsel("#signInCont").style.display = "flex";
      });
      qsel("#userName").textContent = "You're not logged in";
      qsel("#signInCont").style.display = "flex";
      let domBooks = qsel("#display").childNodes;
      while (domBooks) {
        domBooks[0].remove();
      }
    }
  });
};

async function renderOnUserLogin(user) {
  let userBooks = await firestoreFn.getAllUserBooks(user);
  console.log(userBooks);
  userBooks.forEach((book) => {
    const { title, author, pages, read, fireID } = book;
    let newBook = new Book(title, author, pages, read, fireID);
    newBook.createDOMBook();
    library.lib.push(newBook);
    library.booKeep();
  });
}

monitorAuthState(auth);

// Keeping track of user books
const library = (() => {
  const lib = [];
  const setID = function () {
    let booksDivs = document.getElementsByClassName("bookCard");
    let booksD = Array.from(booksDivs);
    booksD.forEach((item, index) => {
      item.setAttribute("id", `${index}`);
    });
  };
  const booKeep = (book) => {
    if (book) lib.push(book);
    setID();
  };
  return {
    lib,
    booKeep,
  };
})();

class Book {
  constructor(title, author, pages, trueOr, fireID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = trueOr;
    this.fireID = fireID;
  }
  createDOMBook() {
    let bookCard = document.createElement("div");
    let bookTitle = eFactory("h5", "", "book-title", `${this.title}`);
    let bookAuthor = eFactory("p", "", "book-author", `${this.author}`);
    let bookPages = eFactory("p", "", "book-pages", `${this.pages} pp.`);
    let bookRead = eFactory("input", "", "book-read", "", "checkbox");
    let readPagesDiv = eFactory("div", "", "readPagesDiv");
    let deleteBook = eFactory("span", "", "delete material-icons", "clear");
    let titleAuthourDiv = eFactory("div", "", "titleAuthorDiv");
    bookRead.checked = this.read;
    bookCard.setAttribute("class", "bookCard");
    readPagesDiv.append(bookPages, bookRead);
    titleAuthourDiv.append(bookTitle, bookAuthor);
    bookCard.append(deleteBook, titleAuthourDiv, readPagesDiv);
    display.append(bookCard);
  }
}

// Add book
async function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read, null);
  let bookObject = Object.assign({}, newBook);
  newBook.createDOMBook();
  let newBookRef = await firestoreFn.addToBookCollection(
    auth.currentUser.uid,
    bookObject
  );
  newBook.firestorePath = newBookRef._key.path.segments;
  newBook["fireID"] = newBookRef._key.path.segments[3];
  library.booKeep(newBook);
}

document.querySelector("#addBook").addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let read = document.querySelector("#readIt");
  let isValid = checkValidity(e);
  if (isValid) {
    addBook(title.value, author.value, pages.value, read.checked);
    document.querySelector("#bookForm").reset();
  }
});

// Delete and checkbox
document.querySelector("#display").addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    let deleted = library.lib.splice(e.target.parentNode.id, 1);
    document.getElementById(`${e.target.parentNode.id}`).remove();
    firestoreFn.deleteBook(auth.currentUser.uid, deleted[0].fireID);
  }
  if (e.target.type === "checkbox") {
    let update = library.lib[e.target.parentNode.parentNode.id];
    update.read = e.target.checked;
    await firestoreFn.updateBook(
      auth.currentUser.uid,
      update.fireID,
      "read",
      e.target.checked
    );
  }
  library.booKeep();
});

const checkbox = document.querySelector("#readIt");
checkbox.addEventListener("click", () => {
  let checkboxIcon = document.querySelector(".checkboxIcon");
  checkbox.checked
    ? (checkboxIcon.textContent = "check_box")
    : (checkboxIcon.textContent = "check_box_outline_blank");
});


// Close Book Form
qsel(".openForm").addEventListener("click", () => {
  let libMenu = qsel(".libMenu");
  libMenu.classList.toggle("in");
  libMenu.classList.toggle("out");
  libMenu.classList.contains("in")
    ? (qsel("#pushRigth").hidden = true)
    : (qsel("#pushRigth").hidden = false);
});

