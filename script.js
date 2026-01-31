// 50+ Default Books
const defaultBooks = [
{title:"Atomic Habits",author:"James Clear",status:"Available"},
{title:"The Alchemist",author:"Paulo Coelho",status:"Available"},
{title:"Rich Dad Poor Dad",author:"Robert Kiyosaki",status:"Available"},
{title:"Think and Grow Rich",author:"Napoleon Hill",status:"Available"},
{title:"Harry Potter",author:"J.K. Rowling",status:"Available"},
{title:"The Hobbit",author:"J.R.R. Tolkien",status:"Available"},
{title:"The Power of Now",author:"Eckhart Tolle",status:"Available"},
{title:"Deep Work",author:"Cal Newport",status:"Available"},
{title:"The 5 AM Club",author:"Robin Sharma",status:"Available"},
{title:"Ikigai",author:"Hector Garcia",status:"Available"},
{title:"The Monk Who Sold His Ferrari",author:"Robin Sharma",status:"Available"},
{title:"Wings of Fire",author:"A.P.J Abdul Kalam",status:"Available"},
{title:"Zero to One",author:"Peter Thiel",status:"Available"},
{title:"The Psychology of Money",author:"Morgan Housel",status:"Available"},
{title:"Can't Hurt Me",author:"David Goggins",status:"Available"},
{title:"Sapiens",author:"Yuval Noah Harari",status:"Available"},
{title:"Homo Deus",author:"Yuval Noah Harari",status:"Available"},
{title:"The Subtle Art of Not Giving a F*ck",author:"Mark Manson",status:"Available"},
{title:"Do Epic Shit",author:"Ankur Warikoo",status:"Available"},
{title:"Think Like a Monk",author:"Jay Shetty",status:"Available"},
{title:"The Richest Man in Babylon",author:"George Clason",status:"Available"},
{title:"The Intelligent Investor",author:"Benjamin Graham",status:"Available"},
{title:"Digital Minimalism",author:"Cal Newport",status:"Available"},
{title:"Start With Why",author:"Simon Sinek",status:"Available"},
{title:"The One Thing",author:"Gary Keller",status:"Available"},
{title:"Eat That Frog",author:"Brian Tracy",status:"Available"},
{title:"The 48 Laws of Power",author:"Robert Greene",status:"Available"},
{title:"How to Win Friends & Influence People",author:"Dale Carnegie",status:"Available"},
{title:"Rework",author:"Jason Fried",status:"Available"},
{title:"The Lean Startup",author:"Eric Ries",status:"Available"},
{title:"Crush It",author:"Gary Vaynerchuk",status:"Available"},
{title:"Show Your Work",author:"Austin Kleon",status:"Available"},
{title:"Steal Like an Artist",author:"Austin Kleon",status:"Available"},
{title:"Tools of Titans",author:"Tim Ferriss",status:"Available"},
{title:"The 4-Hour Workweek",author:"Tim Ferriss",status:"Available"},
{title:"Mindset",author:"Carol Dweck",status:"Available"},
{title:"Grit",author:"Angela Duckworth",status:"Available"},
{title:"Drive",author:"Daniel Pink",status:"Available"},
{title:"Outliers",author:"Malcolm Gladwell",status:"Available"},
{title:"The Compound Effect",author:"Darren Hardy",status:"Available"},
{title:"Who Moved My Cheese",author:"Spencer Johnson",status:"Available"},
{title:"The Magic of Thinking Big",author:"David Schwartz",status:"Available"},
{title:"Life of Pi",author:"Yann Martel",status:"Available"},
{title:"The Great Gatsby",author:"F. Scott Fitzgerald",status:"Available"},
{title:"To Kill a Mockingbird",author:"Harper Lee",status:"Available"},
{title:"1984",author:"George Orwell",status:"Available"},
{title:"Animal Farm",author:"George Orwell",status:"Available"},
{title:"The Catcher in the Rye",author:"J.D. Salinger",status:"Available"},
{title:"The Book Thief",author:"Markus Zusak",status:"Available"}
];

// Load Storage
let books = JSON.parse(localStorage.getItem("books"));

if(!books || books.length===0){
  books = defaultBooks;
  localStorage.setItem("books",JSON.stringify(books));
}

// Display Books
function displayBooks(list = books){
  const container = document.getElementById("bookList");
  container.innerHTML="";

  list.forEach((book,index)=>{

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

// Add Book
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

// Delete
function deleteBook(index){
  books.splice(index,1);
  localStorage.setItem("books",JSON.stringify(books));
  displayBooks();
}

// Toggle
function toggleStatus(index){
  books[index].status =
  books[index].status==="Available"?"Issued":"Available";

  localStorage.setItem("books",JSON.stringify(books));
  displayBooks();
}

// 🔍 Search Feature
function searchBooks(){
  const query = document.getElementById("searchBox").value.toLowerCase();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  displayBooks(filtered);
}

// Initial Load
displayBooks();
