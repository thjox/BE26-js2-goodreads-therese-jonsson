import { getAllBooks } from "./modules/firebase.js";
import { addBookToLocalList, books } from "./modules/books.js";
import { renderBooks } from "./modules/render.js";
import "./modules/events.js";

async function init() {
  const data = await getAllBooks();

  const booksArray = Object.entries(data ?? {});

  booksArray.forEach(([id, bookData]) => {
    addBookToLocalList(id, bookData);
  });

  renderBooks(books);
}

init();
