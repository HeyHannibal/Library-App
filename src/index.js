import './style.css'
const storeJSON = (function () {
    const save = function () {
        localStorage.setItem('library.lib', JSON.stringify(library.lib))
    }
    const load = function () {
        if (localStorage.getItem('hasRunBefore') === null) {
            localStorage.setItem('hasRunBefore', 'true')
            addBook('Heart Of Darkness','Joseph Conrad','128',false)
            addBook('Devil In the Wddddddddhite City','Erik Larson','447',true)
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
 function elementFactory(type, id, cssClass, textContent, inputType) {
    let element = document.createElement(`${type}`);
    if (id != undefined) element.setAttribute('id', `${id}`);
    if (cssClass != undefined) element.setAttribute('class', `${cssClass}`);
    if (textContent != undefined) element.textContent = textContent
    if (inputType != undefined) element.setAttribute('type',`${inputType}`)
    return element;
}

class Book {
    constructor(title, author, pages, trueOr) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = trueOr
    }
    createDOMBook() {
        let bookTitle = elementFactory('h5','','book-title',`${this.title}`)
        let bookAuthor = elementFactory('p','','book-author',`${this.author}`)
        let bookPages = elementFactory('p','','book-pages',`${this.pages} pp.`)
        let bookRead = elementFactory('input','','book-read','','checkbox')
        bookRead.checked = this.read
        let deleteBook = elementFactory('span','','delete material-icons','clear')
        let bookCard = document.createElement('div')
        bookCard.setAttribute('class','bookCard')
        let readPagesDiv = elementFactory('div','','readPagesDiv')
        let titleAuthourDiv = elementFactory('div', '', 'titleAuthorDiv')
        readPagesDiv.append(bookPages,bookRead)
        titleAuthourDiv.append(bookTitle,bookAuthor)
        bookCard.append(deleteBook,titleAuthourDiv,readPagesDiv)
        display.append(bookCard)
    }
}

let formError = document.querySelectorAll('.error')
function checkValidity(e) {
    e.preventDefault()
    if (!title.checkValidity()) {
            formError[0].hidden = false
            formError[0].textContent = `Title should have at least 3 characters.`
        return false
    } else if (!author.checkValidity()) {
            formError[1].hidden = false
            formError[1].textContent = `Author's name must have at least 5 characters.`
            return false
    } else if (!pages.checkValidity()) {
        if(pages.validity.rangeUnderflow) {
            formError[2].hidden = false
            formError[2].textContent = `A book should have more than 50 pages.`
        }
        if(pages.validity.rangeOverflow) {
            formError[2].hidden = false
            formError[2].textContent = `A book should have less than 99999 pages`  
        }
            return false
    }
    else {
        let allErrors = Array.from(formError)
        allErrors.forEach(item => item.hidden = true)
        return true} 
    
}
const addBookToDom = document.querySelector('#addBook').addEventListener('click', function (e) {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let read = document.querySelector("#readIt");
    let isValid = checkValidity(e);
    if (isValid) {
    addBook(title.value,author.value,pages.value,read.checked)
    document.querySelector("#bookForm").reset();
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
    if (e.target.classList.contains('delete')) {
        library.lib.splice(e.target.parentNode.id, 1)
        document.getElementById(`${e.target.parentNode.id}`).remove()

    }
    if (e.target.type === 'checkbox') {
        library.lib[e.target.parentNode.parentNode.id].read = e.target.checked;
    }
    library.booKeep()
    storeJSON.save()
})
const pushRight = document.querySelector('#pushRigth')
const openMenu = document.querySelector('.openForm')
openMenu.addEventListener('click', e=> {
let menu = document.querySelector('.libMenu')
if(menu.classList.contains('out')) {
    menu.classList.replace('out','in');
    pushRight.hidden = true;
} else {
    menu.classList.replace('in','out')
    pushRight.hidden = false;
}
})
const checkbox = document.querySelector('#readIt')
checkbox.addEventListener('click', () => {
    let checkboxIcon = document.querySelector('.checkboxIcon')
    if(checkbox.checked) checkboxIcon.textContent = 'check_box';
    else checkboxIcon.textContent = 'check_box_outline_blank';
   
})
document.onload = storeJSON.load()

