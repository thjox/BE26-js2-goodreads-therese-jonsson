import { getAllBooks } from "./modules/firebase.js";
import { books, createBook } from "./modules/books.js";
import { renderBooks } from "./modules/render.js";
import "./modules/events.js";

// Startar appen, hämtar alla böcker från Firebase
async function init() {
  const data = await getAllBooks();

  // Firebase returnerar ett objekt där varje bok har sitt unika id som key
  const booksArray = Object.entries(data);

  // Skapar en Book-instans för varje bok
  booksArray.forEach(([id, bookData]) => {
    createBook(id, bookData);
  });

  // Visar alla böcker i gränssnittet
  renderBooks(books);
}

init();
