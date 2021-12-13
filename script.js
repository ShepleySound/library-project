const table = document.querySelector(".book-table")
const submitButton = document.querySelector("#submit")
const formTitle = document.querySelector("#title")
const formAuthor = document.querySelector("#author")
const formPages = document.querySelector("#pages")
const formHasReadOptions = document.querySelectorAll('input[name="has-read"]')


const myLibrary = []

const book = (title, author, pages, hasRead) => {
    const info = () =>{
        let readText = ""
        if (hasRead){
            readText = "Yes"
        }
        else readText = "No"
        return `${title} by ${author}, ${pages} pages. Read: ${readText}.`
    }
    return {title, author, pages, hasRead, info}
}

const addBookToLibrary = function addBookToLibraryAndTable(book){
    let newLength = myLibrary.push(book)
    let newRow = document.createElement("tr")
    newRow.dataset.index = newLength - 1
    let newTitle = document.createElement("td")
    let newAuthor = document.createElement("td")
    let newPages = document.createElement("td")
    let newRead = document.createElement("td")
    let deleteButton = document.createElement("td")

    newTitle.innerText = book.title
    newAuthor.innerText = book.author
    newPages.innerText = book.pages
    newRead.classList.add("read-toggle")
    if (book.hasRead){
        newRead.classList.add("has-read")
        newRead.innerText = "✔"
    }
    else{
        newRead.innerText = "𝗑"
    }
    deleteButton.innerText = "𝗑"
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click", (e) => {
        deleteIndex = parseInt(e.target.parentNode.dataset.index)
        deleteBook(deleteIndex)
    })
    newRead.addEventListener("click", (e) => {
        e.target.classList.toggle("has-read")
        if (e.target.classList.contains("has-read")){
            e.target.innerText = "✔"
        }
        else{
            e.target.innerText = "𝗑"
        }
        toggleIndex = parseInt(e.target.parentNode.dataset.index)
        toggleRead(toggleIndex)
    })
    table.append(newRow)
    newRow.append(newTitle, newAuthor, newPages, newRead, deleteButton)
}

const deleteBook = function deleteBookFromLibaryAndTable(index){
    tableIndex = index + 2
    myLibrary.splice(index, 1)
    table.childNodes[tableIndex].remove()
    table.childNodes.forEach((child, index) => {
        if (index === 0 || index === 1){
            return
        }
        child.dataset.index = index - 2
    })
}

const toggleRead = function toggleReadStatus(index){
    tableIndex = index + 2
    myLibrary[index].hasRead = !myLibrary[index].hasRead

}


submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    let title = formTitle.value
    let author = formAuthor.value
    let pages = formPages.value
    let hasRead
    if (title.length > 120 || author.length > 120 || pages > 99999){
        return
    }
    if (formHasReadOptions[0].checked){
        hasRead = true
    }
    else if (formHasReadOptions[1].checked){
        hasRead = false
    }
    else return

    if (!title || !author || !pages){
        return
    }
    const newBook = book(title, author, pages, hasRead)
    addBookToLibrary(newBook, myLibrary)

    document.forms["book-form"].reset()
})


const theHobbit = book("The Hobbit", "JRR Tolkien", 304, true)
const fellowship = book("The Lord of the Rings: The Fellowship of the Ring", "JRR Tolkien", 423, true)
const wheelOfTime = book("The Eye of the World", "Robert Jordan", 782, false)

addBookToLibrary(theHobbit, myLibrary)
addBookToLibrary(fellowship, myLibrary)
addBookToLibrary(wheelOfTime, myLibrary)