import {eFactory} from '../index.js'

export default function defaultBook(auth) {
let addDefBook = eFactory("button", "addDefaultBook", "", "Default Book");
addDefBook.addEventListener("click", () => {
  const defaultBook = {
    title: "Default Book",
    author: "John Doe",
    pages: 304,
  };
  Object.keys(defaultBook).forEach((key) => {
    document.querySelector(`#${key}`).value = defaultBook[key];
  });
  document.querySelector("#addBook").click();
  firestoreFn.addToBookCollection(
    "users",
    auth.currentUser.uid,
    "books",
    defaultBook
  );
});
document.querySelector("body").append(addDefBook);
}