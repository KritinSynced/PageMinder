// Default books (only used first time)
const defaultBooks = [
  { title: "Atomic Habits", author: "James Clear", status: "Available" },
  { title: "The Alchemist", author: "Paulo Coelho", status: "Available" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", status: "Available" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", status: "Available" },
  { title: "Harry Potter", author: "J.K. Rowling", status: "Available" }
];

// Load books from localStorage OR use defaults
let books = JSON.parse(localStorage.getItem("books"));

if (!books || books.length === 0) {
  books = defaultBooks;
  localStorage.setItem("books", JSON.stringify(books));
}

// Display Books
function displayBooks() {
  let table = document.getElementById("bookList");
  table.innerHTML = "";

  books.forEach((book, index) => {
    let row = table.insertRow();

    row.insertCell(0).innerText = book.title;
    row.insertCell(1).innerText = book.author;
    row.insertCell(2).innerText = book.status;

    let actionCell = row.insertCell(3);

    let issueBtn = document.createElement("button");
    issueBtn.innerText = book.status === "Available" ? "Issue" : "Return";
    issueBtn.onclick = () => toggleStatus(index);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteBook(index);

    actionCell.appendChild(issueBtn);
    actionCell.appendChild(deleteBtn);
  });
}

// Add Book
function addBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;

  if (title === "" || author === "") {
    alert("Please enter all fields");
    return;
  }

  books.push({ title, author, status: "Available" });
  localStorage.setItem("books", JSON.stringify(books));

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";

  displayBooks();
}

// Delete Book
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Issue / Return Book
function toggleStatus(index) {
  books[index].status =
    books[index].status === "Available" ? "Issued" : "Available";

  localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}

// Initial Display
displayBooks();
