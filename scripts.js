// constructors

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

// global variables

const testBook1 = new Book('a', 'Test1', 230, true);
const testBook2 = new Book('b', 'Test2', 300, false);

let books = [testBook1, testBook2];


// functions

function storeBook(book) {
    books.push(book);
    displayBooks();
}

function displayBooks() {
    let counter = 0;
    for(book of books) {
        addBookToDom(book, counter);
        counter++;
    }
}

// event listners 

function displayNewBookForm() {
    const form = document.querySelector('#myForm');
    const library = document.querySelector('.library');
    library.classList.add('hide');
    form.classList.remove('hide');
}

function closeForm() {
    const form = document.querySelector('#myForm');
    const library = document.querySelector('.library');
    form.classList.add('hide');
    library.classList.remove('hide');
    clearFields();
}

function addBook() {
    const title = document.querySelector('.title');
    const author = document.querySelector('.author');
    const numPages = document.querySelector('.num-pages');
    const isRead = document.querySelector('.read');
    if (title.value.trim() === '') {
        alert('Type in the title!');
    } else if (author.value.trim() === '') {
        alert('Type in the author name!');
    } else if (isNaN(Number(numPages.value)) || Number(numPages.value) <= 0) {
        alert('Type in the valid page count');
    } else {
        let book = new Book(title.value, author.value, Number(numPages.value), isRead.checked);
        books.push(book);
        updateLocalStorage();
        addBookToDom(book, books.length - 1);
        closeForm();
    }
    clearFields();
}

function toggleRead(e) {
    const index = Number(e.srcElement.dataset.index);
    books[index].isRead = !books[index].isRead;
    e.srcElement.innerText = books[index].isRead ? 'Read' : 'Not Read';
    updateLocalStorage();
}

function addBookToDom(book, counter) {
    const table = document.querySelector('tbody');
    const row = document.createElement('tr');
    row.classList.add('row')
    row.classList.add('book');
    for(property in book) {
        if (property == 'isRead') {
            const cell = document.createElement('td');
            const toggle = document.createElement('button');
            toggle.addEventListener('click', toggleRead);
            toggle.dataset.index = counter;
            toggle.textContent = book[property] ? 'Read' : 'Not Read';
            cell.appendChild(toggle) ;
            row.appendChild(cell);
        } else {
            const cell = document.createElement('td');
            cell.textContent = book[property];
            row.appendChild(cell);
        }
    }
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.dataset.index = counter;
    removeButton.addEventListener('click', removeBook)
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);
    table.appendChild(row);
}

function removeBook(e) {
    const index = Number(e.srcElement.dataset.index);
    const rows = document.querySelectorAll('.row');
    const removeButtons = document.querySelectorAll('.remove');
    for (let i = index + 1; i < books.length; i++) {
        removeButtons[i].dataset.index--;
    }
    rows[index].remove();
    books.splice(index, 1);
    updateLocalStorage();
}

function updateLocalStorage(book) {
    localStorage.setItem('books', JSON.stringify(books));
}

function clearFields() {
    const fields = document.querySelectorAll('input');
    console.log(fields[0]);
    fields.forEach(field => field.value = '');
}
// add event listners

const newBook = document.querySelector('.new-book');
newBook.addEventListener('click', displayNewBookForm);

const closeFormButton = document.querySelector('.cancel');
closeFormButton.addEventListener('click', closeForm);

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', addBook);

// main 
if (localStorage.length === 0) {
    localStorage.setItem('books', JSON.stringify(books));
} else {
    let retrieveData = localStorage.getItem('books');
    books = JSON.parse(retrieveData);
}

displayBooks();

console.log(localStorage);

