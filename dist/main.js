/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/

const storeJSON = (function () {
    const save = function () {
        localStorage.setItem('library.lib', JSON.stringify(library.lib))
    }
    const load = function () {
        if (localStorage.getItem('hasRunBefore') === null) {
            localStorage.setItem('hasRunBefore', 'true')
            addBook('Heart Of Darkness','Joseph Conrad','128',false)
            addBook('Devil In the White City','Erik Larson','447',true)
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsTUFBTTtBQUM3QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsNENBQTRDLEtBQUs7QUFDakQsdURBQXVELEdBQUc7QUFDMUQsZ0VBQWdFLFNBQVM7QUFDekU7QUFDQSwrREFBK0QsVUFBVTtBQUN6RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsV0FBVztBQUMxRSxnRUFBZ0UsWUFBWTtBQUM1RSw4REFBOEQsWUFBWTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdUJBQXVCOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYnJhcnktYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qgc3RvcmVKU09OID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzYXZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlicmFyeS5saWInLCBKU09OLnN0cmluZ2lmeShsaWJyYXJ5LmxpYikpXG4gICAgfVxuICAgIGNvbnN0IGxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGFzUnVuQmVmb3JlJykgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoYXNSdW5CZWZvcmUnLCAndHJ1ZScpXG4gICAgICAgICAgICBhZGRCb29rKCdIZWFydCBPZiBEYXJrbmVzcycsJ0pvc2VwaCBDb25yYWQnLCcxMjgnLGZhbHNlKVxuICAgICAgICAgICAgYWRkQm9vaygnRGV2aWwgSW4gdGhlIFdoaXRlIENpdHknLCdFcmlrIExhcnNvbicsJzQ0NycsdHJ1ZSlcbiAgICAgICAgICAgIGFkZEJvb2soJ0xvcmQgT2YgVGhlIFJpbmdzJywnSi5SLlIgVG9sa2llbicsICcxMTc4JywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG15TGliID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlicmFyeS5saWInKSk7XG4gICAgICAgICAgICBteUxpYi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkQm9vayA9IG5ldyBCb29rKGl0ZW0udGl0bGUsIGl0ZW0uYXV0aG9yLCBpdGVtLnBhZ2VzLCBpdGVtLnJlYWQpXG4gICAgICAgICAgICAgICAgbGlicmFyeS5saWIucHVzaChvbGRCb29rKVxuICAgICAgICAgICAgICAgIG9sZEJvb2suY3JlYXRlRE9NQm9vaygpXG4gICAgICAgICAgICAgICAgbGlicmFyeS5ib29LZWVwKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZSxcbiAgICAgICAgbG9hZFxuICAgIH1cbn0pKClcblxuY29uc3QgbGlicmFyeSA9ICgoKSA9PiB7XG4gICAgY29uc3QgbGliID0gW11cbiAgICBjb25zdCBzZXRJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGJvb2tzRGl2cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jvb2tDYXJkJyk7XG4gICAgICAgIGxldCBib29rc0QgPSBBcnJheS5mcm9tKGJvb2tzRGl2cylcbiAgICAgICAgYm9va3NELmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpbmRleH1gKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjb25zdCB0b3RhbEJvb2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvdGFsQm9va3MnKTtcbiAgICBjb25zdCBib29rc1JlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVhZCcpO1xuICAgIGNvbnN0IGJvb2tzVW5yZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdFJlYWQnKTtcbiAgICBjb25zdCBsb2dCb29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG90YWxCb29rcy50ZXh0Q29udGVudCA9IFwiVG90YWwgYm9va3MgY291bnQ6IFwiICsgbGlicmFyeS5saWIubGVuZ3RoO1xuICAgICAgICBsZXQgbiA9IDA7XG4gICAgICAgIGxpYnJhcnkubGliLmZvckVhY2goKGl0ZW0pID0+IChpdGVtLnJlYWQgPT09IHRydWUpID8gbiA9IG4gKyAxIDogbiA9IG4pXG4gICAgICAgIGJvb2tzUmVhZC50ZXh0Q29udGVudCA9IFwiQm9va3MgcmVhZDogXCIgKyBuO1xuICAgICAgICBib29rc1VucmVhZC50ZXh0Q29udGVudCA9IFwiQm9va3Mgbm90IHJlYWQ6IFwiICsgKGxpYnJhcnkubGliLmxlbmd0aCAtIG4pXG4gICAgfVxuICAgIGNvbnN0IGJvb0tlZXAgPSAoKSA9PiB7c2V0SUQoKTsgbG9nQm9va3MoKX1cbiAgICByZXR1cm4ge1xuICAgICAgICBsaWIsXG4gICAgICAgIGJvb0tlZXBcbiAgICB9XG59KSgpXG4gZnVuY3Rpb24gZWxlbWVudEZhY3RvcnkodHlwZSwgaWQsIGNzc0NsYXNzLCB0ZXh0Q29udGVudCwgaW5wdXRUeXBlKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGAke3R5cGV9YCk7XG4gICAgaWYgKGlkICE9IHVuZGVmaW5lZCkgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aWR9YCk7XG4gICAgaWYgKGNzc0NsYXNzICE9IHVuZGVmaW5lZCkgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y3NzQ2xhc3N9YCk7XG4gICAgaWYgKHRleHRDb250ZW50ICE9IHVuZGVmaW5lZCkgZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHRDb250ZW50XG4gICAgaWYgKGlucHV0VHlwZSAhPSB1bmRlZmluZWQpIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJyxgJHtpbnB1dFR5cGV9YClcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuY2xhc3MgQm9vayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGF1dGhvciwgcGFnZXMsIHRydWVPcikge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5hdXRob3IgPSBhdXRob3JcbiAgICAgICAgdGhpcy5wYWdlcyA9IHBhZ2VzXG4gICAgICAgIHRoaXMucmVhZCA9IHRydWVPclxuICAgIH1cbiAgICBjcmVhdGVET01Cb29rKCkge1xuICAgICAgICBsZXQgYm9va1RpdGxlID0gZWxlbWVudEZhY3RvcnkoJ2g1JywnJywnYm9vay10aXRsZScsYCR7dGhpcy50aXRsZX1gKVxuICAgICAgICBsZXQgYm9va0F1dGhvciA9IGVsZW1lbnRGYWN0b3J5KCdwJywnJywnYm9vay1hdXRob3InLGAke3RoaXMuYXV0aG9yfWApXG4gICAgICAgIGxldCBib29rUGFnZXMgPSBlbGVtZW50RmFjdG9yeSgncCcsJycsJ2Jvb2stcGFnZXMnLGAke3RoaXMucGFnZXN9IHBwLmApXG4gICAgICAgIGxldCBib29rUmVhZCA9IGVsZW1lbnRGYWN0b3J5KCdpbnB1dCcsJycsJ2Jvb2stcmVhZCcsJycsJ2NoZWNrYm94JylcbiAgICAgICAgYm9va1JlYWQuY2hlY2tlZCA9IHRoaXMucmVhZFxuICAgICAgICBsZXQgZGVsZXRlQm9vayA9IGVsZW1lbnRGYWN0b3J5KCdzcGFuJywnJywnZGVsZXRlIG1hdGVyaWFsLWljb25zJywnY2xlYXInKVxuICAgICAgICBsZXQgYm9va0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBib29rQ2FyZC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywnYm9va0NhcmQnKVxuICAgICAgICBsZXQgcmVhZFBhZ2VzRGl2ID0gZWxlbWVudEZhY3RvcnkoJ2RpdicsJycsJ3JlYWRQYWdlc0RpdicpXG4gICAgICAgIGxldCB0aXRsZUF1dGhvdXJEaXYgPSBlbGVtZW50RmFjdG9yeSgnZGl2JywgJycsICd0aXRsZUF1dGhvckRpdicpXG4gICAgICAgIHJlYWRQYWdlc0Rpdi5hcHBlbmQoYm9va1BhZ2VzLGJvb2tSZWFkKVxuICAgICAgICB0aXRsZUF1dGhvdXJEaXYuYXBwZW5kKGJvb2tUaXRsZSxib29rQXV0aG9yKVxuICAgICAgICBib29rQ2FyZC5hcHBlbmQoZGVsZXRlQm9vayx0aXRsZUF1dGhvdXJEaXYscmVhZFBhZ2VzRGl2KVxuICAgICAgICBkaXNwbGF5LmFwcGVuZChib29rQ2FyZClcbiAgICB9XG59XG5cbmxldCBmb3JtRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZXJyb3InKVxuZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKCF0aXRsZS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgIGZvcm1FcnJvclswXS5oaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgZm9ybUVycm9yWzBdLnRleHRDb250ZW50ID0gYFRpdGxlIHNob3VsZCBoYXZlIGF0IGxlYXN0IDMgY2hhcmFjdGVycy5gXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAoIWF1dGhvci5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgIGZvcm1FcnJvclsxXS5oaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgZm9ybUVycm9yWzFdLnRleHRDb250ZW50ID0gYEF1dGhvcidzIG5hbWUgbXVzdCBoYXZlIGF0IGxlYXN0IDUgY2hhcmFjdGVycy5gXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKCFwYWdlcy5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgaWYocGFnZXMudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cpIHtcbiAgICAgICAgICAgIGZvcm1FcnJvclsyXS5oaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgZm9ybUVycm9yWzJdLnRleHRDb250ZW50ID0gYEEgYm9vayBzaG91bGQgaGF2ZSBtb3JlIHRoYW4gNTAgcGFnZXMuYFxuICAgICAgICB9XG4gICAgICAgIGlmKHBhZ2VzLnZhbGlkaXR5LnJhbmdlT3ZlcmZsb3cpIHtcbiAgICAgICAgICAgIGZvcm1FcnJvclsyXS5oaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgZm9ybUVycm9yWzJdLnRleHRDb250ZW50ID0gYEEgYm9vayBzaG91bGQgaGF2ZSBsZXNzIHRoYW4gOTk5OTkgcGFnZXNgICBcbiAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgYWxsRXJyb3JzID0gQXJyYXkuZnJvbShmb3JtRXJyb3IpXG4gICAgICAgIGFsbEVycm9ycy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5oaWRkZW4gPSB0cnVlKVxuICAgICAgICByZXR1cm4gdHJ1ZX0gXG4gICAgXG59XG5jb25zdCBhZGRCb29rVG9Eb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkQm9vaycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgICBsZXQgYXV0aG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dGhvcicpO1xuICAgIGxldCBwYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlcycpO1xuICAgIGxldCByZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWFkSXRcIik7XG4gICAgbGV0IGlzVmFsaWQgPSBjaGVja1ZhbGlkaXR5KGUpO1xuICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgYWRkQm9vayh0aXRsZS52YWx1ZSxhdXRob3IudmFsdWUscGFnZXMudmFsdWUscmVhZC5jaGVja2VkKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYm9va0Zvcm1cIikucmVzZXQoKTtcbn1cbn0pXG5mdW5jdGlvbiBhZGRCb29rICh0aXRsZSxhdXRob3IscGFnZXMscmVhZCkge1xuICAgIGxldCBuZXdCb29rID0gbmV3IEJvb2sodGl0bGUsIGF1dGhvciwgcGFnZXMsIHJlYWQpXG4gICAgICAgIG5ld0Jvb2suY3JlYXRlRE9NQm9vaygpO1xuICAgICAgICBsaWJyYXJ5LmxpYi5wdXNoKG5ld0Jvb2spXG4gICAgICAgIGxpYnJhcnkuYm9vS2VlcCgpXG4gICAgICAgIHN0b3JlSlNPTi5zYXZlKClcbn1cblxuY29uc3QgZGVsZXRlT3JDaGVjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNwbGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUnKSkge1xuICAgICAgICBsaWJyYXJ5LmxpYi5zcGxpY2UoZS50YXJnZXQucGFyZW50Tm9kZS5pZCwgMSlcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gKS5yZW1vdmUoKVxuXG4gICAgfVxuICAgIGlmIChlLnRhcmdldC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGxpYnJhcnkubGliW2UudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZF0ucmVhZCA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgfVxuICAgIGxpYnJhcnkuYm9vS2VlcCgpXG4gICAgc3RvcmVKU09OLnNhdmUoKVxufSlcbmNvbnN0IHB1c2hSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwdXNoUmlndGgnKVxuY29uc3Qgb3Blbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3BlbkZvcm0nKVxub3Blbk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlPT4ge1xubGV0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGliTWVudScpXG5pZihtZW51LmNsYXNzTGlzdC5jb250YWlucygnb3V0JykpIHtcbiAgICBtZW51LmNsYXNzTGlzdC5yZXBsYWNlKCdvdXQnLCdpbicpO1xuICAgIHB1c2hSaWdodC5oaWRkZW4gPSB0cnVlO1xufSBlbHNlIHtcbiAgICBtZW51LmNsYXNzTGlzdC5yZXBsYWNlKCdpbicsJ291dCcpXG4gICAgcHVzaFJpZ2h0LmhpZGRlbiA9IGZhbHNlO1xufVxufSlcbmNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlYWRJdCcpXG5jaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsZXQgY2hlY2tib3hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrYm94SWNvbicpXG4gICAgaWYoY2hlY2tib3guY2hlY2tlZCkgY2hlY2tib3hJY29uLnRleHRDb250ZW50ID0gJ2NoZWNrX2JveCc7XG4gICAgZWxzZSBjaGVja2JveEljb24udGV4dENvbnRlbnQgPSAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xuICAgXG59KVxuZG9jdW1lbnQub25sb2FkID0gc3RvcmVKU09OLmxvYWQoKVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=