import { addBook, updateBook, deleteBook } from "./firebase.js";
import { books, addBookToLocalList, removeBook } from "./books.js";
import { renderBooks } from "./render.js";

const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const booksContainer = document.querySelector("#books");
const searchInput = document.querySelector("#search");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bookData = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    isRead: false,
  };

  if (!bookData.title || !bookData.author) {
    return;
  }

  try {
    const response = await addBook(bookData);

    // The local book is added only after Firebase has saved it successfully.
    addBookToLocalList(response.name, bookData);

    renderBooks(books);
    form.reset();
  } catch (error) {
    console.error("Could not add book:", error);
    alert("Det gick inte att lägga till boken. Försök igen.");
  }
});

// Event delegation keeps one listener on the container as book buttons are re-rendered.
booksContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("read-button")) {
    const id = event.target.dataset.id;
    const book = books.find((book) => book.getId() === id);

    if (!book) return;

    const nextIsRead = !book.getIsRead();

    // Firebase removes the score property when its value is null.
    const updates = nextIsRead
      ? { isRead: true }
      : { isRead: false, score: null };

    try {
      // Local state is changed only after Firebase has updated successfully.
      await updateBook(book.getId(), updates);

      book.doneRead();
      renderBooks(books);
    } catch (error) {
      console.error("Could not update read status:", error);
      alert("Det gick inte att uppdatera bokens status. Försök igen.");
    }
  }

  if (event.target.classList.contains("score-button")) {
    const id = event.target.dataset.id;
    const score = Number(event.target.dataset.score);
    const book = books.find((book) => book.getId() === id);

    if (!book || !book.getIsRead()) return;

    try {
      await updateBook(book.getId(), { score });

      book.setScore(score);
      renderBooks(books);
    } catch (error) {
      console.error("Could not update score:", error);
      alert("Det gick inte att spara betyget. Försök igen.");
    }
  }

  if (event.target.classList.contains("delete-button")) {
    const id = event.target.dataset.id;

    try {
      await deleteBook(id);

      removeBook(id);
      renderBooks(books);
    } catch (error) {
      console.error("Could not delete book:", error);
      alert("Det gick inte att ta bort boken. Försök igen.");
    }
  }
});

function searchBooks(searchText) {
  const filteredBooks = books.filter((book) => {
    return (
      book.getTitle().toLowerCase().includes(searchText.toLowerCase()) ||
      book.getAuthor().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = "<p>Inga böcker hittades.</p>";
    return;
  }

  renderBooks(filteredBooks);
}

searchInput.addEventListener("input", () => {
  searchBooks(searchInput.value);
});
