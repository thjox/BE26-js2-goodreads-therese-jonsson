import { getAllBooks } from "./modules/firebase.js";
import { addBookToLocalList, books } from "./modules/books.js";
import { renderBooks } from "./modules/render.js";
import "./modules/events.js";

async function init() {
  try {
    const data = await getAllBooks();

    const booksArray = Object.entries(data ?? {});

    booksArray.forEach(([id, bookData]) => {
      addBookToLocalList(id, bookData);
    });

    renderBooks(books);
  } catch (error) {
    console.error("Could not load books:", error);
    document.querySelector("#books").innerHTML =
      "<p>Kunde inte hämta böckerna. Försök igen senare.</p>";
  }
}

init();
