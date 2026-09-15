//klick-event
//formulär
//användarinteraktion

import { addBook } from "./firebase.js";
import { Book } from "./Book.js";
import { renderBooks } from "./render.js";

const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    isRead: false,
  };

  const response = await addBook(newBook);

  const book = new Book(
    response.name,
    newBook.title,
    newBook.author,
    newBook.isRead,
    undefined,
  );

  renderBooks([book]);
  form.reset();
});
