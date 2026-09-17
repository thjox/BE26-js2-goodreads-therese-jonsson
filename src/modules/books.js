import { Book } from "./Book.js";

//Array som innehåller alla Book-instanser i appen
export const books = [];

//Skapar en ny Book-instans och lägger till den i arrayen
export function createBook(id, data) {
  const book = new Book(id, data.title, data.author, data.isRead, data.score);

  books.push(book);

  return book;
}

//Letar rätt på bok med hjällp av dess id och tar bort den från arrayen.
export function removeBook(id) {
  const index = books.findIndex((book) => {
    return book.getId() === id;
  });

  if (index !== -1) {
    books.splice(index, 1);
  }
}
