const storeJSON = (function () {
    const save = function () {
        localStorage.clear()
        localStorage.setItem('library.lib', JSON.stringify(library.lib))
    }
    const load = function () {
        if (localStorage.length === 0) {
            console.log("no local data avaliable")
        }
        else {
            myLib = JSON.parse(localStorage.getItem('library.lib'));
            myLib.forEach((item) => {
                const oldBook = new Book(item.title, item.author, item.pages, item.read)
                library.lib.push(oldBook)
                oldBook.createDOMBook()
                library.booKeep()
            })
        }
    }
    return {
        save,
        load
    }
})()

const library = (() => {
    const lib = []
    const setID = function () {
        let booksDivs = document.getElementsByClassName('bookCard');
        let booksD = Array.from(booksDivs)
        booksD.forEach((item, index) => {
            item.setAttribute('id', `${index}`)
        })
    }
    const totalBooks = document.querySelector('#totalBooks');
    const booksRead = document.querySelector('#read');
    const booksUnread = document.querySelector('#notRead');
    const logBooks = function () {
        totalBooks.textContent = "Total books count: " + library.lib.length;
        let n = 0;
        library.lib.forEach((item) => (item.read === true) ? n = n + 1 : n = n)
        booksRead.textContent = "Books read: " + n;
        booksUnread.textContent = "Books not read: " + (library.lib.length - n)
    }
    const booKeep = () => {setID(); logBooks()}
    return {
        lib,
        booKeep
    }
})()

class Book {
    constructor(title, author, pages, trueOr) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = trueOr
    }
    createDOMBook() {
        let bookTitle = document.createElement('h1')
        let bookAuthor = document.createElement('h3')
        let bookPages = document.createElement('h4')
        let bookReadLabel = document.createElement('label')
        let bookRead = document.createElement('input')
        let deleteBook = document.createElement('button')
        deleteBook.setAttribute('class', 'delete')
        bookRead.setAttribute('type', 'checkbox')

        bookReadLabel.textContent = "Read or Not"
        bookAuthor.textContent = this.author
        bookTitle.textContent = this.title
        bookPages.textContent = this.pages
        bookRead.checked = this.read
        let bookCard = document.createElement('div')
        bookCard.setAttribute('class', 'bookCard')
        bookCard.append(bookTitle, bookAuthor, bookPages, bookRead, bookReadLabel, deleteBook)
        display.append(bookCard)
    }
}

const addBook = document.querySelector('#addBook').addEventListener('click', function () {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.getElementById("readIt").checked;
    if (title.length >= 3 && author.length >= 3 && pages >= 0) {
        let newBook = new Book(title, author, pages, read)
        newBook.createDOMBook();
        library.lib.push(newBook)
        library.booKeep()
        storeJSON.save()
    }
})

const deleteOrCheck = document.querySelector('#display').addEventListener('click', e => {
    if (e.target.className === 'delete') {
        library.lib.splice(e.target.parentNode.id, 1)
        document.getElementById(`${e.target.parentNode.id}`).remove()

    }
    if (e.target.type === 'checkbox') {
        library.lib[e.target.parentNode.id].read = e.target.checked;
    }
    library.booKeep()
    storeJSON.save()
})

document.onload = storeJSON.load()


