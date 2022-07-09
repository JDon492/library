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
      if (!this.isInLibrary(newBook)) {
        this.books.push(newBook)
      }
    }
  
    removeBook(title) {
      this.books = this.books.filter((book) => book.title !== title)
    }
  
    getBook(title) {
      return this.books.find((book) => book.title === title)
    }
  
    isInLibrary(newBook) {
      return this.books.some((book) => book.title === newBook.title)
    }
  }

  const library = new Library()

// UI

// New Book Button & Form

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