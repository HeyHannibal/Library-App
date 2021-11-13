const storeJSON = (function () {
    const save = function () {
        localStorage.setItem('library.lib', JSON.stringify(library.lib))
    }
    const load = function () {
        if (localStorage.getItem('hasRunBefore') === null) {
            localStorage.setItem('hasRunBefore', 'true')
            addBook('Heart Of Darkness','Joseph Conrad','128',false)
            addBook('Devil In the White City','Joseph Conrad','447',true)
            addBook('Lord Of The Rings','J.R.R Tolkien', '1178', true)

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
        let bookTitle = document.createElement('h3')
        let bookAuthor = document.createElement('h4')
        let bookPages = document.createElement('h5')
        let bookRead = document.createElement('input')
        let deleteBook = document.createElement('button')
        deleteBook.setAttribute('class', 'delete')
        bookRead.setAttribute('type', 'checkbox')
        deleteBook.textContent = 'Delete'
        bookAuthor.textContent = this.author
        bookTitle.textContent = this.title
        bookPages.textContent = this.pages
        bookRead.checked = this.read
        let bookCard = document.createElement('div')
        bookCard.setAttribute('class', 'bookCard')
        bookCard.append(bookTitle, bookAuthor, bookPages, bookRead,deleteBook)
        display.append(bookCard)
    }
}



let formError = document.querySelector('.error')
function checkValidity() {
    if (!title.checkValidity()) {
        formError.classList.add('active')
        formError.textContent = `Title too short, add at least ${3-title.value.length} characters`
        return false
    } else if (!author.checkValidity()) {
        formError.classList.add('active')
        formError.textContent = `Author's name must have at least 5 characters. Sorry, books by Bono aren't allowed`
        return false
    } else if (!pages.checkValidity()) {
        formError.classList.add('active')
        if (pages.validity.rangeUnderflow) formError.textContent = `A proper book should have more than 50 pages`
        return false
    }
    else return true 
}
const addBookToDom = document.querySelector('#addBook').addEventListener('click', function () {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let read = document.getElementById("readIt");
    let isValid = checkValidity();
    if (isValid) {
    addBook(title.value,author.value,pages.value,read.checked)
    }
})
function addBook (title,author,pages,read) {
    let newBook = new Book(title, author, pages, read)
        newBook.createDOMBook();
        library.lib.push(newBook)
        library.booKeep()
        storeJSON.save()
}

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

const openMenu = document.querySelector('.openForm')
openMenu.addEventListener('click', e=> {
let menu = document.querySelector('.libMenu')
if(menu.classList.contains('out')) {
    menu.classList.replace('out','in')}
else menu.classList.replace('in','out')
})

document.onload = storeJSON.load()


