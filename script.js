let myLibrary = [];

if (localStorage.length === 0) {
    console.log("no local data avaliable")
}
else {
    myLib = JSON.parse(localStorage.getItem('myLibrary'));
    myLib.forEach((item) => {
        const oldBook = new Book(item.title, item.author, item.pages, item.readOrNot)
        myLibrary.push(oldBook)
    })
}



function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readOrNot = read
    this.displayed = false
}

function addBookToLibrary(t, a, p, r) {
    if (t.length === 0 || a.length === 0 || p.length === 0) {
       console.log('no');
    }
    else {
        const newBook = new Book(t, a, p, r);
        myLibrary.push(newBook);
    }
}

const display = document.querySelector('#display')

function displayBooks() {
    myLibrary.forEach((item) => {
        if (item.displayed) {
            return;
        }
        else {
            let displayBook = document.createElement('div');
            let disTitle = document.createElement('h2');
            let disAuthor = document.createElement('h3');
            let disPages = document.createElement('h3');
            let disRead = document.createElement('input');
            disRead.type = 'checkbox';
            let deleteBook = document.createElement('button')
            disTitle.textContent = item.title;
            disAuthor.textContent = item.author;
            disPages.textContent = item.pages;
            disRead.checked = (item.readOrNot === true);
            displayBook.append(disTitle, disAuthor, disPages, disRead, deleteBook);
            display.appendChild(displayBook);
            deleteBook.setAttribute('class', 'deleteBook')
            displayBook.setAttribute('class', 'bookCard')
            item.displayed = true;
        }
        setID()
    })
}
displayBooks();
setID();

const addBook = document.querySelector('#addBook')
addBook.addEventListener('click', function () {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = (document.getElementById("readIt").checked) ? true : false;
    addBookToLibrary(title, author, pages, read);
    displayBooks()
    store()
})

document.querySelector('#display').addEventListener('click', e => {
    if (e.target.className === 'deleteBook') {
        myLibrary.splice(e.target.parentNode.id, 1)
        document.getElementById(`${e.target.parentNode.id}`).remove()
        store()                                                    
    }
    setID()
    if (e.target.type === 'checkbox') {
        myLibrary[e.target.parentNode.id].readOrNot = e.target.checked;
        console.table(myLibrary)
        store()
    }
})

function setID() {
    let booksDivs = document.getElementsByClassName('bookCard');
    let booksD = Array.from(booksDivs)
    booksD.forEach((item, index) => {
        item.setAttribute('id', `${index}`)
    })
}

function store() {
    localStorage.clear()
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    logBooks()
}

const totalBooks = document.querySelector('#totalBooks');
const booksRead = document.querySelector('#read');
const booksUnread = document.querySelector('#notRead');
function logBooks() {
    totalBooks.textContent = "Total books count: " + myLibrary.length;
    let n = 0;
    myLibrary.forEach((item) => (item.readOrNot === true) ? n=n+1: n=n)
    booksRead.textContent = "Books read: " + n;
    booksUnread.textContent = "Books read: " + (myLibrary.length - n);
}
logBooks()

// const LoTR = new Book('Lord of The Rings', 'J.R.R. Tolkien', '1178', true)
// myLibrary.push(LoTR)
// const HoD = new Book('Heart of Darkness', 'Joseph Conrad' , '122', false )
// myLibrary.push(HoD)
// const KfC = new Book('Killing For Company', 'Brian Masters' , '400', true )
// myLibrary.push(KfC)