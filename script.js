const defaultBooks = [
  { title: "Atomic Habits", author: "James Clear", status: "Available" },
  { title: "The Alchemist", author: "Paulo Coelho", status: "Available" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", status: "Available" }
];

let books = JSON.parse(localStorage.getItem("books"));

if(!books || books.length===0){
  books = defaultBooks;
  localStorage.setItem("books",JSON.stringify(books));
}

function displayBooks(){
  const container = document.getElementById("bookList");
  container.innerHTML="";

  books.forEach((book,index)=>{

    const card = document.createElement("div");
    card.className="book-card";

    card.innerHTML=`
      <div class="book-title">${book.title}</div>
      <div class="book-author">by ${book.author}</div>

      <div class="status ${book.status==="Available"?"available":"issued"}">
        ${book.status}
      </div>

      <div class="actions">
        <button class="issue-btn" onclick="toggleStatus(${index})">
          ${book.status==="Available"?"Issue":"Return"}
        </button>
        <button class="delete-btn" onclick="deleteBook(${index})">
          Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function addBook(){
  const title=document.getElementById("title").value.trim();
  const author=document.getElementById("author").value.trim();

  if(title===""||author===""){
    alert("Fill all fields");
    return;
  }

  books.push({title,author,status:"Available"});
  localStorage.setItem("books",JSON.stringify(books));

  document.getElementById("title").value="";
  document.getElementById("author").value="";

  displayBooks();
}

function deleteBook(index){
  books.splice(index,1);
  localStorage.setItem("books",JSON.stringify(books));
  displayBooks();
}

function toggleStatus(index){
  books[index].status =
    books[index].status==="Available"?"Issued":"Available";

  localStorage.setItem("books",JSON.stringify(books));
  displayBooks();
}

displayBooks();
