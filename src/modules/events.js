import { addBook, updateBook, deleteBook } from "./firebase.js";
import { books, createBook, removeBook } from "./books.js";
import { renderBooks } from "./render.js";

//Häämtar form och element från DOM
const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const booksContainer = document.querySelector("#books");

//Form för att lägga till ny bok
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Skapar bokdata fråån inpuut
  const bookData = {
    title: titleInput.value,
    author: authorInput.value,
    isRead: false,
  };

  //SParar boken i Firebase
  const response = await addBook(bookData);

  //Skapar en instans med det id Firebase genererar
  createBook(response.name, bookData);

  //Uppdaterar gränssnitt
  renderBooks(books);
  form.reset();
});

//EEvent delegation för knappar som skapas dynamiskt
booksContainer.addEventListener("click", async (event) => {
  //
  if (event.target.classList.contains("read-button")) {
    const id = event.target.dataset.id;

    //Hittar rätt bok med hjälp av id
    const book = books.find((book) => {
      return book.getId() === id;
    });

    //Växlar mellan läst/Oläst
    book.doneRead();

    //Uppdatrar staus för boken i Firebase
    if (book.getIsRead()) {
      await updateBook(book.getId(), {
        isRead: true,
      });
    } else {
      await updateBook(book.getId(), {
        isRead: false,
        score: null,
      });
    }

    renderBooks(books);
  }

  //Hanterar betygsknappar
  if (event.target.classList.contains("score-button")) {
    const id = event.target.dataset.id;

    //dataset ger en string och därför omvandlas betyget til number
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

  //Borttagning av bok, först från firebas och sedan från arrayen
  if (event.target.classList.contains("delete-button")) {
    const id = event.target.dataset.id;

    await deleteBook(id);

    removeBook(id);

    renderBooks(books);
  }
});
