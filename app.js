// Query Selectors

const newBookBtn = document.querySelector(".add-new-book")
const removeBtn = document.querySelector(".remove-button")
const mainCont = document.querySelector(".main-container")
const readBtn = document.querySelector(".read-button")
const newBookPopup = document.querySelector(".new-book-popup")
const errorMsg = document.querySelector(".error-msg")
const docOverlay = document.querySelector(".overlay")
const form = document.querySelector("form")

// Constructors

class Book {
    constructor(title,author,pages,readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}}

class Library {
    constructor() {
      this.books = []
    }
  
    addBook(newBook) {
      if (!this.alreadyExists(newBook)) {
        this.books.push(newBook)
      }
    }
  
    removeBook(title) {
      this.books = this.books.filter((book) => book.title !== title)
    }
  
    findBook(title) {
      return this.books.find((book) => book.title === title)
    }
  
    alreadyExists(newBook) {
      return this.books.some((book) => book.title === newBook.title)
    }
  }

  const library = new Library()

// UI

// New Book Button

const newBookForm = () => {
    form.reset()
    newBookPopup.classList.add("active")
    docOverlay.classList.add("active")
}

newBookBtn.onclick = newBookForm

const closeForm = () => {
    newBookPopup.classList.remove("active")
    docOverlay.classList.remove("active")
}

docOverlay.onclick = closeForm

// New Book Form

const bookFormInput = () => {
    const title = document.getElementById("get-title").value
    const author = document.getElementById("get-author").value
    const pages = document.getElementById("get-pages").value
    const readStatus = document.getElementById("get-read-status").checked
    return new Book(title,author,pages,readStatus)
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = bookFormInput()

    if (library.alreadyExists(newBook)) {
        errorMsg.textContent = "This book already exists"
        return
    }

    library.addBook(newBook)

    updateGrid()
    closeForm()
}

form.onsubmit = addBook

// Container Updates

const clearGrid = () => {
    mainCont.innerHTML = ""
}

const updateGrid = () => {
    clearGrid()
    for (let book of library.books) {
        createBookTile(book)
    }
}



// New Tiles

const createBookTile = (book) => {
    const bookTile = document.createElement("div")
    const removeButton = document.createElement("button")
    const title = document.createElement("p")
    const author = document.createElement("p")
    const pages = document.createElement("p")
    const readStatus = document.createElement("div")
    const readText = document.createElement("p")
    const readBtn = document.createElement("button")

    bookTile.classList.add("book-tile")
    removeButton.classList.add("remove-button")
    readStatus.classList.add("read-status")
    readBtn.classList.add("read-button")

    removeButton.textContent = "✖"
    title.textContent = `${book.title}`
    author.textContent = `${book.author}`
    pages.textContent = `${book.pages} pages`

    if (book.readStatus === true) {
        readText.textContent = "Read"
        readBtn.classList.add("green-status")
    } else {
        readText.textContent = "Unread"
        readBtn.classList.add("red-status")
    }

    mainCont.appendChild(bookTile)
    bookTile.appendChild(removeButton)
    bookTile.appendChild(title)
    bookTile.appendChild(author)
    bookTile.appendChild(pages)
    bookTile.appendChild(readStatus)
    readStatus.appendChild(readText)
    readStatus.appendChild(readBtn)
}