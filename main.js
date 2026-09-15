import { getAllBooks } from "./modules/firebase.js";
import { Book } from "./modules/Book.js";
import { renderBooks } from "./modules/render.js";
import "./modules/events.js";

async function init() {
  const books = await getAllBooks();
  const booksArray = Object.entries(books);

  const bookObjects = [];

  booksArray.forEach((book) => {
    const newBook = new Book(
      book[0],
      book[1].title,
      book[1].author,
      book[1].isRead,
      book[1].score,
    );

    bookObjects.push(newBook);
  });

  renderBooks(bookObjects);
}

init();
