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
    title: titleInput.value,
    author: authorInput.value,
    isRead: false,
  };

  const response = await addBook(bookData);

  addBookToLocalList(response.name, bookData);

  renderBooks(books);
  form.reset();
});

// Event delegation keeps one listener on the container as book buttons are re-rendered.
booksContainer.addEventListener("click", async (event) => {
  //
  if (event.target.classList.contains("read-button")) {
    const id = event.target.dataset.id;

    const book = books.find((book) => {
      return book.getId() === id;
    });

    book.doneRead();

    if (book.getIsRead()) {
      await updateBook(book.getId(), {
        isRead: true,
      });
    } else {
      // Firebase removes the score property when its value is set to null.
      await updateBook(book.getId(), {
        isRead: false,
        score: null,
      });
    }

    renderBooks(books);
  }

  if (event.target.classList.contains("score-button")) {
    const id = event.target.dataset.id;

    const score = Number(event.target.dataset.score);

    const book = books.find((book) => {
      return book.getId() === id;
    });

    book.setScore(score);

    await updateBook(book.getId(), {
      score: book.getScore(),
    });

    renderBooks(books);
  }

  if (event.target.classList.contains("delete-button")) {
    const id = event.target.dataset.id;

    await deleteBook(id);

    removeBook(id);

    renderBooks(books);
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
