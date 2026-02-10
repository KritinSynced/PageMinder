// ===== 50 BOOKS DATA =====
const defaultBooks = [
  // Fiction (10 books)
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available" },
  { title: "1984", author: "George Orwell", category: "Fiction", status: "Available" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", status: "Available" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", status: "Available" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", status: "Available" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", status: "Available" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", status: "Available" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
  { title: "Animal Farm", author: "George Orwell", category: "Fiction", status: "Available" },
  
  // Non-Fiction (10 books)
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "Non-Fiction", status: "Available" },
  { title: "Educated", author: "Tara Westover", category: "Non-Fiction", status: "Available" },
  { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", category: "Non-Fiction", status: "Available" },
  { title: "Into the Wild", author: "Jon Krakauer", category: "Non-Fiction", status: "Available" },
  { title: "The Diary of a Young Girl", author: "Anne Frank", category: "Non-Fiction", status: "Available" },
  { title: "The Right Stuff", author: "Tom Wolfe", category: "Non-Fiction", status: "Available" },
  { title: "In Cold Blood", author: "Truman Capote", category: "Non-Fiction", status: "Available" },
  { title: "The Sixth Extinction", author: "Elizabeth Kolbert", category: "Non-Fiction", status: "Available" },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "Non-Fiction", status: "Available" },
  { title: "Quiet: The Power of Introverts", author: "Susan Cain", category: "Non-Fiction", status: "Available" },
  
  // Self-Help (7 books)
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Self-Help", status: "Available" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Self-Help", status: "Available" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Self-Help", status: "Available" },
  { title: "How to Win Friends and Influence People", author: "Dale Carnegie", category: "Self-Help", status: "Available" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", category: "Self-Help", status: "Available" },
  { title: "Mindset: The New Psychology of Success", author: "Carol S. Dweck", category: "Self-Help", status: "Available" },
  
  // Science (6 books)
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", status: "Available" },
  { title: "Cosmos", author: "Carl Sagan", category: "Science", status: "Available" },
  { title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", status: "Available" },
  { title: "The Double Helix", author: "James D. Watson", category: "Science", status: "Available" },
  { title: "The Elegant Universe", author: "Brian Greene", category: "Science", status: "Available" },
  { title: "The Emperor of All Maladies", author: "Siddhartha Mukherjee", category: "Science", status: "Available" },
  
  // Technology (5 books)
  { title: "The Innovators", author: "Walter Isaacson", category: "Technology", status: "Available" },
  { title: "The Code Book", author: "Simon Singh", category: "Technology", status: "Available" },
  { title: "Hackers: Heroes of the Computer Revolution", author: "Steven Levy", category: "Technology", status: "Available" },
  { title: "The Soul of a New Machine", author: "Tracy Kidder", category: "Technology", status: "Available" },
  { title: "The Phoenix Project", author: "Gene Kim", category: "Technology", status: "Available" },
  
  // Biography (5 books)
  { title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", status: "Available" },
  { title: "Becoming", author: "Michelle Obama", category: "Biography", status: "Available" },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", category: "Biography", status: "Available" },
  { title: "The Autobiography of Malcolm X", author: "Malcolm X", category: "Biography", status: "Available" },
  { title: "Einstein: His Life and Universe", author: "Walter Isaacson", category: "Biography", status: "Available" },
  
  // History (4 books)
  { title: "A People's History of the United States", author: "Howard Zinn", category: "History", status: "Available" },
  { title: "Guns of August", author: "Barbara W. Tuchman", category: "History", status: "Available" },
  { title: "The Rise and Fall of the Third Reich", author: "William L. Shirer", category: "History", status: "Available" },
  { title: "SPQR: A History of Ancient Rome", author: "Mary Beard", category: "History", status: "Available" },
  
  // Business (3 books)
  { title: "Good to Great", author: "Jim Collins", category: "Business", status: "Available" },
  { title: "The Lean Startup", author: "Eric Ries", category: "Business", status: "Available" },
  { title: "Zero to One", author: "Peter Thiel", category: "Business", status: "Available" }
];

// ===== GLOBAL VARIABLES =====
let books = JSON.parse(localStorage.getItem("pageMinderBooks"));
if (!books || books.length === 0) {
  books = [...defaultBooks];
  localStorage.setItem("pageMinderBooks", JSON.stringify(books));
}

let currentSort = 'title-asc';
let selectedCategories = new Set(['Fiction', 'Non-Fiction', 'Self-Help', 'Science', 'Technology', 'Biography', 'History', 'Business']);

// ===== DOM INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeLibrary();
  setupEventListeners();
  updateStats();
  setCurrentYear();
});

function initializeLibrary() {
  // Initialize category filters
  const categories = [...new Set(books.map(book => book.category))];
  const filtersContainer = document.getElementById('categoryFilters');
  
  filtersContainer.innerHTML = categories.map(category => `
    <div class="category-filter active" data-category="${category}" onclick="toggleCategory('${category}')">
      <input type="checkbox" value="${category}" checked>
      ${category}
    </div>
  `).join('');
  
  // Load all books
  displayBooksByCategory();
  
  // Initialize stats
  updateCategoryStats();
}

function setupEventListeners() {
  // Status option selection
  document.querySelectorAll('.status-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.status-option').forEach(o => o.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ===== BOOK DISPLAY FUNCTIONS =====
function displayBooksByCategory() {
  const categories = [...new Set(books.filter(book => 
    selectedCategories.has(book.category)
  ).map(book => book.category))];
  
  const container = document.getElementById('bookCategories');
  container.innerHTML = '';
  
  // Sort categories alphabetically
  categories.sort();
  
  categories.forEach(category => {
    const categoryBooks = books.filter(book => 
      book.category === category && selectedCategories.has(category)
    );
    
    if (categoryBooks.length === 0) return;
    
    const categorySection = document.createElement('div');
    categorySection.className = 'category-section';
    categorySection.innerHTML = `
      <div class="category-header">
        <h3>
          <i class="fas fa-${getCategoryIcon(category)}"></i>
          ${category}
        </h3>
        <span class="category-count">${categoryBooks.length} books</span>
      </div>
      <div class="books-grid" id="books-${category.replace(/\s+/g, '-')}">
        ${categoryBooks.map((book, index) => createBookCard(book, books.indexOf(book))).join('')}
      </div>
    `;
    
    container.appendChild(categorySection);
  });
}

function getCategoryIcon(category) {
  const icons = {
    'Fiction': 'book',
    'Non-Fiction': 'file-alt',
    'Self-Help': 'hands-helping',
    'Science': 'flask',
    'Technology': 'laptop-code',
    'Biography': 'user',
    'History': 'landmark',
    'Business': 'chart-line'
  };
  return icons[category] || 'book';
}

function createBookCard(book, index) {
  return `
    <div class="book-card">
      <div class="book-header">
        <h4 class="book-title">${book.title}</h4>
        <span class="book-status ${book.status.toLowerCase()}">
          ${book.status === 'Available' ? '✓' : '✗'}
        </span>
      </div>
      <p class="book-author">
        <i class="fas fa-user"></i> ${book.author}
      </p>
      <div class="book-actions">
        <button class="btn-action ${book.status === 'Available' ? 'btn-issue' : 'btn-return'}" 
                onclick="toggleStatus(${index})" title="${book.status === 'Available' ? 'Issue this book' : 'Return this book'}">
          <i class="fas fa-${book.status === 'Available' ? 'book-reader' : 'undo'}"></i>
          ${book.status === 'Available' ? 'Issue' : 'Return'}
        </button>
        <button class="btn-action btn-delete" onclick="deleteBook(${index})" title="Delete this book">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `;
}

// ===== SEARCH FUNCTIONALITY =====
let searchTimeout;

function debounceSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 300);
}

function performSearch() {
  const query = document.getElementById('searchBox').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('searchResults');
  
  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.category.toLowerCase().includes(query)
  );
  
  if (filteredBooks.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No books found</h3>
        <p>Try a different search term</p>
      </div>
    `;
  } else {
    resultsContainer.innerHTML = `
      <h3>Found ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''}</h3>
      <div class="books-grid">
        ${filteredBooks.map((book, index) => createBookCard(book, books.indexOf(book))).join('')}
      </div>
    `;
  }
}

function clearSearch() {
  document.getElementById('searchBox').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

// ===== BOOK MANAGEMENT =====
function addBook() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const category = document.getElementById('category').value;
  const isbn = document.getElementById('isbn').value.trim();
  const status = document.querySelector('input[name="status"]:checked').value;
  
  if (!title || !author) {
    showToast('Please fill in both title and author', 'error');
    return;
  }
  
  const newBook = {
    title,
    author,
    category,
    isbn: isbn || 'N/A',
    status
  };
  
  books.unshift(newBook); // Add to beginning
  localStorage.setItem('pageMinderBooks', JSON.stringify(books));
  
  // Update UI
  clearAddForm();
  displayBooksByCategory();
  updateStats();
  updateCategoryStats();
  showToast('Book added successfully!', 'success');
  
  // Scroll to library section
  document.getElementById('library').scrollIntoView({ behavior: 'smooth' });
}

function deleteBook(index) {
  if (confirm('Are you sure you want to delete this book from your library?')) {
    const bookTitle = books[index].title;
    books.splice(index, 1);
    localStorage.setItem('pageMinderBooks', JSON.stringify(books));
    
    displayBooksByCategory();
    updateStats();
    updateCategoryStats();
    showToast(`"${bookTitle}" has been deleted`, 'info');
  }
}

function toggleStatus(index) {
  books[index].status = books[index].status === 'Available' ? 'Issued' : 'Available';
  localStorage.setItem('pageMinderBooks', JSON.stringify(books));
  
  displayBooksByCategory();
  updateStats();
  showToast(`Book status updated to "${books[index].status}"`, 'success');
}

// ===== FILTER FUNCTIONS =====
function toggleCategory(category) {
  const filterElement = document.querySelector(`[data-category="${category}"]`);
  
  if (selectedCategories.has(category)) {
    selectedCategories.delete(category);
    filterElement.classList.remove('active');
  } else {
    selectedCategories.add(category);
    filterElement.classList.add('active');
  }
  
  displayBooksByCategory();
  updateStats();
}

function sortBooks() {
  currentSort = document.getElementById('sortOptions').value;
  
  switch(currentSort) {
    case 'title-asc':
      books.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      books.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'author-asc':
      books.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'author-desc':
      books.sort((a, b) => b.author.localeCompare(a.author));
      break;
    case 'category-asc':
      books.sort((a, b) => a.category.localeCompare(b.category));
      break;
  }
  
  localStorage.setItem('pageMinderBooks', JSON.stringify(books));
  displayBooksByCategory();
}

// ===== STATS FUNCTIONS =====
function updateStats() {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === 'Available').length;
  const issuedBooks = totalBooks - availableBooks;
  
  // Update hero stats
  document.getElementById('totalBooksHero').textContent = totalBooks;
  document.getElementById('availableBooksHero').textContent = availableBooks;
  
  // Update stats section
  document.getElementById('totalBooksStats').textContent = totalBooks;
  document.getElementById('availableBooksStats').textContent = availableBooks;
  document.getElementById('issuedBooksStats').textContent = issuedBooks;
}

function updateCategoryStats() {
  const container = document.getElementById('categoryStats');
  const categories = [...new Set(books.map(book => book.category))];
  
  // Calculate book counts per category
  const categoryCounts = {};
  categories.forEach(category => {
    categoryCounts[category] = books.filter(book => book.category === category).length;
  });
  
  const maxCount = Math.max(...Object.values(categoryCounts));
  
  container.innerHTML = categories.map(category => {
    const count = categoryCounts[category];
    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
    
    return `
      <div class="category-stat">
        <span class="stat-name">${category}</span>
        <div class="stat-bar-container">
          <div class="stat-bar" style="width: ${percentage}%"></div>
        </div>
        <span class="stat-count">${count}</span>
      </div>
    `;
  }).join('');
}

// ===== UTILITY FUNCTIONS =====
function clearAddForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('category').value = 'Fiction';
  document.getElementById('isbn').value = '';
  document.querySelectorAll('.status-option').forEach(o => o.classList.remove('active'));
  document.querySelector('.status-option input[value="Available"]').parentElement.classList.add('active');
  document.querySelector('input[name="status"][value="Available"]').checked = true;
}

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast';
  
  // Set color based on type
  if (type === 'success') {
    toast.style.background = 'var(--success)';
  } else if (type === 'error') {
    toast.style.background = 'var(--danger)';
  } else {
    toast.style.background = 'var(--primary)';
  }
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function setCurrentYear() {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== INITIAL LOAD =====
// Update stats on page load
updateStats();
updateCategoryStats();
