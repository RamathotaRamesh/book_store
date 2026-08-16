function renderBooks() {
  const grid = document.getElementById("book-grid");

  if (!BOOKS || BOOKS.length === 0) {
    grid.innerHTML = '<p class="empty-state">No books added yet. Edit books.js to add some.</p>';
    return;
  }

  grid.innerHTML = BOOKS.map((book) => `
    <article class="book-card">
      <img class="book-cover" src="${book.cover}" alt="${book.title} cover" loading="lazy" />
      <div class="book-body">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <p class="book-description">${book.description}</p>
        <a class="book-link" href="${book.driveLink}" target="_blank" rel="noopener noreferrer">Read / Download</a>
      </div>
    </article>
  `).join("");
}

renderBooks();
