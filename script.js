// Expanded Default Books with Categories (~100 books)
const defaultBooks = [
  // Self-Help
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Self-Help", status: "Available" },
  { title: "Deep Work", author: "Cal Newport", category: "Self-Help", status: "Available" },
  { title: "The 5 AM Club", author: "Robin Sharma", category: "Self-Help", status: "Available" },
  { title: "Ikigai", author: "Hector Garcia", category: "Self-Help", status: "Available" },
  { title: "Can't Hurt Me", author: "David Goggins", category: "Self-Help", status: "Available" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Self-Help", status: "Available" },
  { title: "Think Like a Monk", author: "Jay Shetty", category: "Self-Help", status: "Available" },
  { title: "Mindset", author: "Carol Dweck", category: "Self-Help", status: "Available" },
  { title: "Grit", author: "Angela Duckworth", category: "Self-Help", status: "Available" },
  { title: "Drive", author: "Daniel Pink", category: "Self-Help", status: "Available" },
  { title: "The Compound Effect", author: "Darren Hardy", category: "Self-Help", status: "Available" },
  { title: "Who Moved My Cheese", author: "Spencer Johnson", category: "Self-Help", status: "Available" },
  { title: "The Magic of Thinking Big", author: "David Schwartz", category: "Self-Help", status: "Available" },
  { title: "Eat That Frog", author: "Brian Tracy", category: "Self-Help", status: "Available" },

  // Fiction
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", status: "Available" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
  { title: "Life of Pi", author: "Yann Martel", category: "Fiction", status: "Available" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", status: "Available" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", status: "Available" },
  { title: "1984", author: "George Orwell", category: "Fiction", status: "Available" },
  { title: "Animal Farm", author: "George Orwell", category: "Fiction", status: "Available" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", status: "Available" },
  { title: "The Book Thief", author: "Markus Zusak", category: "Fiction", status: "Available" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", status: "Available" },
  { title: "The Da Vinci Code", author: "Dan Brown", category: "Fiction", status: "Available" },
  { title: "The Kite Runner", author: "Khaled Hosseini", category: "Fiction", status: "Available" },
  { title: "The Road", author: "Cormac McCarthy", category: "Fiction", status: "Available" },

  // Science
  { title: "Sapiens", author: "Yuval Noah Harari", category: "Science", status: "Available" },
  { title: "Homo Deus", author: "Yuval Noah Harari", category: "Science", status: "Available" },
  { title: "The Gene", author: "Siddhartha Mukherjee", category: "Science", status: "Available" },
  { title: "Cosmos", author: "Carl Sagan", category: "Science", status: "Available" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", status: "Available" },
  { title: "The Body Keeps the Score", author: "Bessel van der Kolk", category: "Science", status: "Available" },
  { title: "Why We Sleep", author: "Matthew Walker", category: "Science", status: "Available" },
  { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", category: "Science", status: "Available" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "Science", status: "Available" },
  { title: "The Sixth Extinction", author: "Elizabeth Kolbert", category: "Science", status: "Available" },

  // Math
  { title: "The Joy of x", author: "Steven Strogatz", category: "Math", status: "Available" },
  { title: "How Not to Be Wrong", author: "Jordan Ellenberg", category: "Math", status: "Available" },
  { title: "The Elements of Style", author: "Strunk & White", category: "Math", status: "Available" }, // Note: Misplaced, but kept for variety
  { title: "Flatland", author: "Edwin A. Abbott", category: "Math", status: "Available" },
  { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", category: "Math", status: "Available" },
  { title: "Fermat's Last Theorem", author: "Simon Singh", category: "Math", status: "Available" },
  { title: "The Code Book", author: "Simon Singh", category: "Math", status: "Available" },
  { title: "Chaos", author: "James Gleick", category: "Math", status: "Available" },

  // Languages
  { title: "The Language Instinct", author: "Steven Pinker", category: "Languages", status: "Available" },
  { title: "Through the Language Glass", author: "Guy Deutscher", category: "Languages", status: "Available" },
  { title: "The Loom of Language", author: "Frederick Bodmer", category: "Languages", status: "Available" },
  { title: "Empires of the Word", author: "Nicholas Ostler", category: "Languages", status: "Available" },
  { title: "The Etymologicon", author: "Mark Forsyth", category: "Languages", status: "Available" },

  // Journals
  { title: "The Diary of a Young Girl", author: "Anne Frank", category: "Journals", status: "Available" },
  { title: "Slouching Towards Bethlehem", author: "Joan Didion", category: "Journals", status: "Available" },
  { title: "We Should All Be Feminists", author: "Chimamanda Ngozi Adichie", category: "Journals", status: "Available" },
  { title: "The White Album", author: "Joan Didion", category: "Journals", status: "Available" },

  // Biography
  { title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", status: "Available" },
  { title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", status: "Available" },
  { title: "Educated", author: "Tara Westover", category: "Biography", status: "Available" },
  { title: "Becoming", author: "Michelle Obama", category: "Biography", status: "Available" },
  { title: "The Autobiography of Malcolm X", author: "Malcolm X", category: "Biography", status: "Available" },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", category: "Biography", status: "Available" },

  // Business
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Business", status: "Available" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", category: "Business", status: "Available" },
  { title: "Zero to One", author: "Peter Thiel", category: "Business", status: "Available" },
  { title: "The Psychology of Money", author: "Morgan Housel", category: "Business", status: "Available" },
  { title: "The Intelligent Investor", author: "Benjamin Graham", category: "Business", status: "Available" },
  { title: "Start With Why", author: "Simon Sinek", category: "Business", status: "Available" },
  { title: "The One Thing", author: "Gary Keller", category: "Business", status: "Available" },
  { title: "The 48 Laws of Power", author: "Robert Greene", category: "Business", status: "Available" },
  { title: "How to Win Friends & Influence People", author: "Dale Carnegie", category: "Business", status: "Available" },
  { title: "Rework", author: "Jason Fried", category: "Business", status: "Available" },
  { title: "The Lean Startup", author: "Eric Ries", category: "Business", status: "Available" },
  { title: "Crush It", author: "Gary Vaynerchuk", category: "Business", status: "Available" },
  { title: "Tools of Titans", author: "Tim Ferriss", category: "Business", status: "Available" },
  { title: "The 4-Hour Workweek", author: "Tim Ferriss", category: "Business", status: "Available" },
  { title: "Outliers", author: "Malcolm Gladwell", category: "Business", status: "Available" },
  { title: "The Richest Man in Babylon", author: "George Clason", category: "Business", status: "Available" },
  { title: "Digital Minimalism", author: "Cal Newport", category: "Business", status: "Available" },
  { title: "Show Your Work", author: "Austin Kleon", category: "Business", status: "Available" },
  { title: "Steal Like an Artist", author: "Austin Kleon", category: "Business", status: "Available" },
  { title: "Do Epic Shit", author: "Ankur Warikoo", category: "Business", status: "Available" },
  { title: "The Monk Who Sold His Ferrari", author: "Robin Sharma", category: "Business", status: "Available" }
];

// Load from localStorage
let books = JSON.parse(localStorage.getItem("books"));
if (!books || books.length === 0) {
  books = [...defaultBooks];
  localStorage.setItem("books", JSON.stringify(books));
}

// Display Books (Grouped by Category)
function displayBooks(list = books) {
  const container = document.getElementById("bookList");
  container.innerHTML = "";

  const categories = [...new Set(list.map(book => book.category))];
  categories.forEach(cat => {
    const categoryBooks = list.filter(book => book.category === cat);
    if (categoryBooks.length > 0) {
      const section = document.createElement("div");
      section.className = "category-section";
      section.innerHTML = `<h2 class="category-title">${cat}</h2>`;
      const grid = document.createElement("div");
      grid.className = "category-grid";

      categoryBooks.forEach((book, index) => {
        const card = document.createElement("div");
        card.className = "book-card animate-in";
        card.innerHTML = `
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author}</div>
          <div class="status ${book.status === "Available" ? "available" : "issued"}">${book.status}</div>
          <div class="actions">
            <button class="issue-btn" onclick="toggleStatus(${books.indexOf(book)})">${book.status === "Available" ? "Issue" : "Return"}</button>
            <button class="delete-btn" onclick="deleteBook(${books.indexOf(book)})">Delete</button>
          </div>
        `;
        grid.appendChild(card);
      });
      section.appendChild(grid);
      container.appendChild(section);
    }
  });
}

// Add Book
