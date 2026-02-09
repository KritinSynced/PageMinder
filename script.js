// ===== IMPROVED BOOK DATA STRUCTURE =====
const defaultBooks = [
  // Self-Help
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Self-Help", status: "Available" },
  { title: "Deep Work", author: "Cal Newport", category: "Self-Help", status: "Available" },
  { title: "The 5 AM Club", author: "Robin Sharma", category: "Self-Help", status: "Available" },
  { title: "Ikigai", author: "Hector Garcia", category: "Self-Help", status: "Available" },
  { title: "Can't Hurt Me", author: "David Goggins", category: "Self-Help", status: "Issued" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "Self-Help", status: "Available" },
  
  // Fiction
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fiction", status: "Issued" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
  { title: "1984", author: "George Orwell", category: "Fiction", status: "Available" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", status: "Available" },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", status: "Issued" },
  
  // Science
  { title: "Sapiens", author: "Yuval Noah Harari", category: "Science", status: "Available" },
  { title: "Homo Deus", author: "Yuval Noah Harari", category: "Science", status: "Available" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", status: "Issued" },
  { title: "Cosmos", author: "Carl Sagan", category: "Science", status: "Available" },
  
  // Math
  { title: "The Joy of x", author: "Steven Strogatz", category: "Math", status: "Available" },
  { title: "How Not to Be Wrong", author: "Jordan Ellenberg", category: "Math", status: "Available" },
  { title: "Flatland", author: "Edwin A. Abbott", category: "Math", status: "Issued" },
  
  // Languages
  { title: "The Language Instinct", author: "Steven Pinker", category: "Languages", status: "Available" },
  { title: "Through the Language Glass", author: "Guy Deutscher", category: "Languages", status: "Available" },
  
  // Journals
  { title: "The Diary of a Young Girl", author: "Anne Frank", category: "Journals", status: "Available" },
  { title: "Slouching Towards Bethlehem", author: "Joan Didion", category: "Journals", status: "Issued" },
  
  // Biography
  { title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", status: "Available" },
  { title: "Becoming", author: "Michelle Obama", category: "Biography", status: "Available" },
  { title: "Educated", author: "Tara Westover", category: "Biography", status: "Issued" },
  
  // Business
  { title: "Atomic Habits", author: "James Clear", category: "Business", status: "Available" },
  { title: "The Psychology of Money", author: "Morgan Housel", category: "Business", status: "Available" },
  { title: "Zero to One", author: "Peter Thiel", category: "Business", status: "Issued" },
  { title: "The Lean Startup", author: "Eric Ries", category: "Business", status: "Available" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Business", status: "Available" }
];

// ===== ENHANCED SEARCH ALGORITHM =====
class BookSearch {
  constructor(books) {
    this.books = books;
    this.searchIndex = this.buildSearchIndex();
  }
  
  buildSearchIndex() {
    const index = new Map();
    this.books.forEach((book, idx) => {
      const terms = [
        ...book.title.toLowerCase().split(/\s+/),
        ...book.author.toLowerCase().split(/\s+/),
        book.category.toLowerCase(),
        book.status.toLowerCase()
      ];
      
      const uniqueTerms = [...new Set(terms)];
      uniqueTerms.forEach(term => {
        if (!index.has(term)) {
          index.set(term, []);
        }
        index.get(term).push(idx);
      });
    });
    return index;
  }
  
  fuzzyMatch(query, text) {
    query = query.toLowerCase();
    text = text.toLowerCase();
    
    // Exact match (highest priority)
    if (text.includes(query)) return 3;
    
    // Word boundary match
    const words = text.split(/\s+/);
    if (words.some(word => word.startsWith(query))) return 2;
    
    // Partial match
    if (text.indexOf(query) !== -1) return 1;
    
    // No match
    return 0;
  }
  
  search(query) {
    if (!query.trim()) return this.books;
    
    query = query.toLowerCase().trim();
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    
    // Score each book based on search relevance
    const scoredBooks = this.books.map((book, idx) => {
      let score = 0;
      
      // Check each query word against book properties
      queryWords.forEach(word => {
        const titleScore = this.fuzzyMatch(word, book.title) * 3; // Title has highest weight
        const authorScore = this.fuzzyMatch(word, book.author) * 2; // Author has medium weight
        const categoryScore = this.fuzzyMatch(word, book.category) * 1.5; // Category weight
        const statusScore = this.fuzzyMatch(word, book.status) * 1; // Status weight
        
        score += Math.max(titleScore, authorScore, categoryScore, statusScore);
      });
      
      // Bonus for exact phrase match
      const fullText = `${book.title} ${book.author} ${book.category} ${book.status}`.toLowerCase();
      if (fullText.includes(query)) score += 5;
      
      return { book, score, idx };
    });
    
    // Filter out zero-score matches and sort by score
    return scoredBooks
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.book);
  }
  
  updateBooks(newBooks) {
    this.books = newBooks;
    this.searchIndex = this.buildSearchIndex();
  }
}

// ===== GLOBAL VARIABLES =====
let books = JSON.parse(localStorage.getItem("books"));
if (!books || books.length === 0) {
  books = [...defaultBooks];
  localStorage.setItem("books", JSON.stringify(books));
}

const bookSearch = new BookSearch(books);
let currentView = 'grid';
let currentFilters = {
  categories: new Set(['Self-Help', 'Fiction', 'Science', 'Math', 'Languages', 'Journals', 'Biography', 'Business']),
  status: 'all'
};

// ===== DOM INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  displayBooks();
  updateStats();
  setupEventListeners();
  setCurrentYear();
});

function initializeUI() {
  // Initialize category filters
  const categories = [...new Set(books.map(book => book.category))];
  const filtersContainer = document.getElementById('categoryFilters');
  
  filtersContainer.innerHTML = categories.map(category => `
    <label class="category-filter active" data-category="${category}">
      <input type="checkbox" value="${category}" checked>
      <span class="checkmark"><i class="fas fa-check"></i></span>
      ${category}
    </label>
  `).join('');
  
  // Add event listeners to category filters
  document.querySelectorAll('.category-filter').forEach(filter => {
    filter.addEventListener('click', function() {
      this.classList.toggle('active');
      updateCategoryFilters();
    });
  });
  
  // Add event listeners to status filters
  document.querySelectorAll('.status-filters input').forEach(radio => {
    radio.addEventListener('change', function() {
      document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      currentFilters.status = this.value;
      displayBooks();
    });
  });
  
  // View toggle buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentView = this.dataset.view;
      applyViewMode();
    });
  });
}

function setupEventListeners() {
  // Modal close on outside click
  document.getElementById('addBookModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeAddBookModal();
    }
  });
  
  // Enter key in search
  document.getElementById('searchBox').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      displayBooks();
    }
  });
  
  // Real-time search updates
  document.getElementById('searchBox').addEventListener('input', function() {
    debounceSearch();
  });
}

// ===== ENHANCED SEARCH WITH DEBOUNCE =====
let searchTimeout;
function debounceSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    displayBooks();
  }, 300);
}

// ===== BOOK DISPLAY =====
function displayBooks() {
  const searchQuery = document.getElementById('searchBox').value;
  let filteredBooks;
  
  // Use enhanced search algorithm
  if (searchQuery.trim()) {
    filteredBooks = bookSearch.search(searchQuery);
  } else {
    filteredBooks = [...books];
  }
  
  // Apply category filters
  filteredBooks = filteredBooks.filter(book => 
    currentFilters.categories.has(book.category)
  );
  
  // Apply status filter
  if (currentFilters.status !== 'all') {
    filteredBooks = filteredBooks.filter(book => 
      book.status === currentFilters.status
    );
  }
  
  // Update UI
  updateBooksDisplay(filteredBooks);
  updateResultsCount(filteredBooks.length);
  updateBooksTitle(searchQuery);
}

function updateBooksDisplay(filteredBooks) {
  const container = document.getElementById('bookList');
  const emptyState = document.getElementById('emptyState');
  
  if (filteredBooks.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  const booksHTML = filteredBooks.map((book, index) => `
    <div class="book-card animate-in" style="animation-delay: ${index * 0.05}s">
      <span class="book-category">${book.category}</span>
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">
        <i class="fas fa-user-edit"></i> ${book.author}
      </p>
      <div class="book-status">
        <span class="status-indicator ${book.status.toLowerCase()}"></span>
        <span>${book.status}</span>
      </div>
      <div class="book-actions">
        <button class="${book.status === 'Available' ? 'btn-issue' : 'btn-return'}" 
                onclick="toggleStatus(${books.indexOf(book)})">
          <i class="fas ${book.status === 'Available' ? 'fa-book-reader' : 'fa-undo'}"></i>
          ${book.status === 'Available' ? 'Issue' : 'Return'}
        </button>
        <button class="btn-delete" onclick="deleteBook(${books.indexOf(book)})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = booksHTML;
  applyViewMode();
}

function applyViewMode() {
  const container = document.getElementById('bookList');
  if (currentView === 'list') {
    container.classList.remove('books-grid');
    container.classList.add('books-list');
    container.style.gridTemplateColumns = '1fr';
  } else {
    container.classList.remove('books-list');
    container.classList.add('books-grid');
    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
  }
}

// ===== BOOK MANAGEMENT =====
function addBook() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const category = document.getElementById('category').value;
  const status = document.querySelector('input[name="status"]:checked').value;
  
  if (!title || !author) {
    alert('Please fill in both title and author.');
    return;
  }
  
  const newBook = {
    title,
    author,
    category,
    status
  };
  
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  bookSearch.updateBooks(books);
  
  closeAddBookModal();
  displayBooks();
  updateStats();
  updateCategoryStats();
}

function deleteBook(index) {
  if (confirm('Are you sure you want to delete this book?')) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    bookSearch.updateBooks(books);
    displayBooks();
    updateStats();
    updateCategoryStats();
  }
}

function toggleStatus(index) {
  books[index].status = books[index].status === 'Available' ? 'Issued' : 'Available';
  localStorage.setItem('books', JSON.stringify(books));
  displayBooks();
  updateStats();
}

// ===== FILTER MANAGEMENT =====
function updateCategoryFilters() {
  const activeCategories = new Set(
    Array.from(document.querySelectorAll('.category-filter.active'))
      .map(filter => filter.dataset.category)
  );
  currentFilters.categories = activeCategories;
  displayBooks();
}

function resetFilters() {
  // Reset category filters
  document.querySelectorAll('.category-filter').forEach(filter => {
    filter.classList.add('active');
    filter.querySelector('input').checked = true;
  });
  
  // Reset status filter
  document.querySelector('input[value="all"]').checked = true;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  document.querySelector('.filter-chip[data-status="all"]').classList.add('active');
  
  // Reset search
  document.getElementById('searchBox').value = '';
  
  // Update filters
  currentFilters.categories = new Set(['Self-Help', 'Fiction', 'Science', 'Math', 'Languages', 'Journals', 'Biography', 'Business']);
  currentFilters.status = 'all';
  
  displayBooks();
}

// ===== UI UPDATES =====
function updateStats() {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === 'Available').length;
  
  document.getElementById('totalBooks').textContent = totalBooks;
  document.getElementById('availableBooks').textContent = availableBooks;
}

function updateCategoryStats() {
  const statsContainer = document.getElementById('categoryStats');
  const categories = [...new Set(books.map(book => book.category))];
  const maxCount = Math.max(...categories.map(cat => 
    books.filter(book => book.category === cat).length
  ));
  
  const statsHTML = categories.map(category => {
    const count = books.filter(book => book.category === category).length;
    const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
    
    return `
      <div class="category-stat">
        <span class="stat-name">
          <i class="fas fa-book"></i> ${category}
        </span>
        <span class="stat-bar">
          <span class="stat-fill" style="width: ${percentage}%"></span>
        </span>
        <span class="stat-count">${count}</span>
      </div>
    `;
  }).join('');
  
  statsContainer.innerHTML = statsHTML;
}

function updateResultsCount(count) {
  document.getElementById('resultsCount').textContent = 
    `${count} book${count !== 1 ? 's' : ''}`;
}

function updateBooksTitle(searchQuery) {
  const titleElement = document.getElementById('booksTitle');
  if (searchQuery.trim()) {
    titleElement.textContent = `Search Results for "${searchQuery}"`;
  } else if (currentFilters.status !== 'all') {
    titleElement.textContent = `${currentFilters.status} Books`;
  } else {
    titleElement.textContent = 'All Books';
  }
}

// ===== MODAL FUNCTIONS =====
function showAddBookModal() {
  document.getElementById('addBookModal').classList.add('active');
  document.getElementById('title').focus();
}

function closeAddBookModal() {
  document.getElementById('addBookModal').classList.remove('active');
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('category').value = 'Self-Help';
}

// ===== UTILITY FUNCTIONS =====
function clearSearch() {
  document.getElementById('searchBox').value = '';
  displayBooks();
}

function setCurrentYear() {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== INITIAL LOAD =====
// Update category stats on initial load
updateCategoryStats();
