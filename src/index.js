import "./style.css";

import signInForm from "./signIn";
import defaultBook from './components/defaultBook'
import checkValidity from './components/checkValidity'
document.querySelector("body").append(signInForm());

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firestoreFn from "./firestoreFn.js";
import { loginEmailPAssword, createAccount, logOut } from "./firebaseAuth.js";



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
  })
}


const auth = getAuth(firebaseApp);

qsel("#signIn").addEventListener("click", (e) => {
  e.preventDefault(), 
  loginEmailPAssword(auth);
});

qsel("#signUp").addEventListener("click", (e) => {
  e.preventDefault();
  createAccount(auth);
});

qsel("#signOut").addEventListener("click", (e) => {
  e.preventDefault();
  logOut(auth);
});

const monitorAuthState = async (myAuth) => {
  onAuthStateChanged(myAuth, (user) => {
    if (user) {
      qsel("#authForm").style.display = "none";
      qsel("#userName").textContent = user.providerData[0].email;
      firestoreFn.setUser("users", user.uid, { name: user.email });
      renderOnUserLogin(user.uid);
    } else {
      qsel("#userName").textContent = "You're not logged in";
      qsel("#authForm").style.display = "flex";
    }
  });
};

async function renderOnUserLogin(user) {
  let userBooks = await firestoreFn.getAllUserBooks(user);
  userBooks.forEach((book) => {
    const { title, author, pages, read } = book;
    let newBook = new Book(title, author, pages, read);
    newBook.createDOMBook();
    library.lib.push(newBook);
    library.booKeep();
    console.log(library.lib)
  });
}

monitorAuthState(auth)


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
    lib.push(book)
  };
  return {
    lib,
    booKeep,
  };
})();

class Book {
  constructor(title, author, pages, trueOr) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = trueOr;
  }
  createDOMBook() {
    let bookCard = document.createElement("div");
    let bookTitle = eFactory("h5", "", "book-title", `${this.title}`);
    let bookAuthor = eFactory("p", "", "book-author", `${this.author}`);
    let bookPages = eFactory("p", "", "book-pages", `${this.pages} pp.`);
    let bookRead = eFactory("input", "", "book-read", "", "checkbox");
    bookRead.checked = this.read;
    let deleteBook = eFactory("span", "", "delete material-icons", "clear");
    bookCard.setAttribute("class", "bookCard");
    let readPagesDiv = eFactory("div", "", "readPagesDiv");
    let titleAuthourDiv = eFactory("div", "", "titleAuthorDiv");
    readPagesDiv.append(bookPages, bookRead);
    titleAuthourDiv.append(bookTitle, bookAuthor);
    bookCard.append(deleteBook, titleAuthourDiv, readPagesDiv);
    display.append(bookCard);
  }
}




document.querySelector("#addBook").addEventListener("click", function (e) {
  e.preventDefault()
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


async function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  let bookObject = Object.assign({}, newBook);
  newBook.createDOMBook();

  let newBookRef = await firestoreFn.addToBookCollection(auth.currentUser.uid,bookObject);
  newBook.firestorePath = newBookRef._key.path.segments;
  library.booKeep(newBook);
}

document.querySelector("#display").addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    let deleteThis = library.lib.splice(e.target.parentNode.id, 1);
    document.getElementById(`${e.target.parentNode.id}`).remove();
    /// DELETE FIRESTORE
  }
  if (e.target.type === "checkbox") {
    let update = library.lib[e.target.parentNode.parentNode.id];
    update.read = e.target.checked;
    await firestoreFn.updateBook("books", update.docID, e.target.checked);
  }
  library.booKeep();
  // storeJSON.save();
});

const checkbox = document.querySelector("#readIt");
checkbox.addEventListener("click", () => {
  let checkboxIcon = document.querySelector(".checkboxIcon");
  checkbox.checked
    ? (checkboxIcon.textContent = "check_box")
    : (checkboxIcon.textContent = "check_box_outline_blank");
});
// document.onload = storeJSON.load();

qsel(".openForm").addEventListener("click", () => {
  let libMenu = qsel(".libMenu");
  libMenu.classList.toggle("in");
  libMenu.classList.toggle("out");
  libMenu.classList.contains("in")
    ? (qsel("#pushRigth").hidden = true)
    : (qsel("#pushRigth").hidden = false);
});

export function qsel(arrt) {
  return document.querySelector(arrt);
}

export function eFactory(type, id, cssClass, textContent, inputType, name) {
  const element = document.createElement(type);
  if (id) element.setAttribute("id", id);
  if (cssClass) element.setAttribute("class", cssClass);
  if (textContent) element.textContent = textContent;
  if (inputType) element.setAttribute("type", inputType);
  if (name) element.setAttribute(name, name);
  return element;
}
