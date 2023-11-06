// DOM selection
const table = document.querySelector('tbody');
const headerCheckbox = document.querySelector('th>input');
const addButton = document.querySelector('#add');
const deleteButton = document.querySelector('#remove');
const submitButton = document.querySelector('#submit');
const closeButton = document.querySelector('#close');
const modal = document.querySelector('dialog');
const alert = document.querySelector('#alert');
const closeAlert = document.querySelector('#close-alert');
const form = document.querySelector('form');

let flagValidity = false

// Event Listener
headerCheckbox.addEventListener('change', checkAll);
addButton.addEventListener('click', showDialog);
closeButton.addEventListener('click', () => modal.close());
closeAlert.addEventListener('click', () => alert.close())
submitButton.addEventListener('click', handleSubmit);
deleteButton.addEventListener('click', deleteBook);

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    isRead() {
        return this.read ? 'Yes' : 'No';
    };
}

// Event Handler
function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    const books = new Book(title, author, pages, read);

    myLibrary.push(books)
}

function addBookToTable() {
    for (let i = 0; i < myLibrary.length; i++) {
        const row = table.insertRow(-1);

        const checkBoxCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const authorCell = row.insertCell(2);
        const pagesCell = row.insertCell(3);
        const readCell = row.insertCell(4);

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBoxCell.appendChild(checkBox);

        const readButton = document.createElement('button');
        readCell.appendChild(readButton);

        titleCell.textContent = myLibrary[i].title;
        authorCell.textContent = myLibrary[i].author;
        pagesCell.textContent = myLibrary[i].pages;
        readButton.textContent = myLibrary[i].isRead();

        readButton.addEventListener('click', () => {
            myLibrary[i].read = myLibrary[i].read ? false : true
            readButton.textContent = myLibrary[i].isRead()
        })
    }
}

function deleteBook() {
    const rows = document.querySelectorAll('tbody>tr');
    const checkBoxes = document.querySelectorAll('td>input');

    checkBoxes.forEach((el, index) => {
        if (!el.checked) return;
        table.removeChild(rows[index]);
        myLibrary.splice(index, 1);
    })
}

function checkAll() {
    const checkBoxs = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkBoxs.length; i++) {
        checkBoxs[i].checked = this.checked
    }
}

function checkValidity() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    if (!title) return
    if (!author) return
    if (!pages) return

    flagValidity = true
}

function refreshTable() {
    table.innerHTML = ''
}

function handleSubmit() {
    refreshTable()
    checkValidity()
    checkDuplicate()
    if (!flagValidity) {
        modal.close()
        return
    }
    addBookToLibrary()
    addBookToTable()
    form.reset()
    flagValidity = false
}

function checkDuplicate() {
    const title = document.querySelector('#title').value;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            alert.showModal()
            flagValidity = false
            break;
        }
    }
}

function showDialog() {
    modal.showModal()
    form.reset()
}