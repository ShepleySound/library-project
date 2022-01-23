const table = document.querySelector(".book-table");
const submitButton = document.querySelector("#submit");
const form = document.querySelector("form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formHasReadOptions = document.querySelectorAll('input[name="has-read"]');

const myLibrary = [];

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
  info() {
    return `${title} by ${author}, ${pages} pages. Read: ${hasRead}.`;
  }
}

const addBookToLibrary = function addBookToLibraryAndTable(book) {
  const newLength = myLibrary.push(book);
  const newRow = document.createElement("tr");
  newRow.dataset.index = newLength - 1;
  const newTitle = document.createElement("td");
  const newAuthor = document.createElement("td");
  const newPages = document.createElement("td");
  const newRead = document.createElement("td");
  const deleteButton = document.createElement("button");

  newTitle.innerText = book.title;
  newAuthor.innerText = book.author;
  newPages.innerText = book.pages;
  newRead.classList.add("read-toggle");
  if (book.hasRead) {
    newRead.classList.add("has-read");
    newRead.innerText = "✔";
  } else {
    newRead.innerText = "𝗑";
  }
  deleteButton.innerText = "𝗑";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", (e) => {
    const deleteIndex = parseInt(e.target.parentNode.dataset.index);
    deleteBook(deleteIndex);
  });
  newRead.addEventListener("click", (e) => {
    e.target.classList.toggle("has-read");
    if (e.target.classList.contains("has-read")) {
      e.target.innerText = "✔";
    } else {
      e.target.innerText = "𝗑";
    }
    toggleIndex = parseInt(e.target.parentNode.dataset.index);
    toggleRead(toggleIndex);
  });
  table.append(newRow);
  newRow.append(newTitle, newAuthor, newPages, newRead, deleteButton);
};

const deleteBook = function deleteBookFromLibaryAndTable(index) {
  tableIndex = index + 2;
  myLibrary.splice(index, 1);
  table.childNodes[tableIndex].remove();
  table.childNodes.forEach((child, index) => {
    if (index === 0 || index === 1) {
      return;
    }
    child.dataset.index = index - 2;
  });
};

const toggleRead = function toggleReadStatus(index) {
  tableIndex = index + 2;
  myLibrary[index].hasRead = !myLibrary[index].hasRead;
};

submitButton.addEventListener("click", (e) => {
  //   e.preventDefault();
  const title = formTitle.value;
  const author = formAuthor.value;
  const pages = formPages.value;
  let hasRead;
  //   if (title.length > 120 || author.length > 120 || pages > 99999) {
  //     return;
  //   }
  if (formHasReadOptions[0].checked) {
    hasRead = true;
  } else if (formHasReadOptions[1].checked) {
    hasRead = false;
  } else return;

  //   if (!title || !author || !pages) {
  //     return;
  //   }
  console.log(pages);
  const newBook = new Book(title, author, pages, hasRead);
  addBookToLibrary(newBook, myLibrary);

  document.forms["book-form"].reset();
});

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 304, true);
const fellowship = new Book(
  "The Lord of the Rings: The Fellowship of the Ring",
  "JRR Tolkien",
  423,
  true
);
const wheelOfTime = new Book(
  "The Eye of the World",
  "Robert Jordan",
  782,
  false
);

addBookToLibrary(theHobbit, myLibrary);
addBookToLibrary(fellowship, myLibrary);
addBookToLibrary(wheelOfTime, myLibrary);
