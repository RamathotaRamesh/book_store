const COUNTER_NAMESPACE = "ramesh-ramathota-book-store";

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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
        <a class="book-link" href="${book.driveLink}" target="_blank" rel="noopener noreferrer" data-book="${slugify(book.title)}">Read / Download</a>
        <p class="book-clicks" id="clicks-${slugify(book.title)}"></p>
      </div>
    </article>
  `).join("");

  loadClickCounts();
  attachClickTracking();
}

function loadClickCounts() {
  BOOKS.forEach((book) => {
    const key = slugify(book.title);
    fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${key}`)
      .then((res) => res.json())
      .then((data) => {
        const el = document.getElementById(`clicks-${key}`);
        if (el) el.textContent = `${data.value || 0} reads`;
      })
      .catch(() => {});
  });
}

function attachClickTracking() {
  document.querySelectorAll(".book-link").forEach((link) => {
    link.addEventListener("click", () => {
      const key = link.dataset.book;
      fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${key}`)
        .then((res) => res.json())
        .then((data) => {
          const el = document.getElementById(`clicks-${key}`);
          if (el) el.textContent = `${data.value || 0} reads`;
        })
        .catch(() => {});
    });
  });
}

renderBooks();
