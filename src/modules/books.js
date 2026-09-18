import { Book } from "./Book.js";

export const books = [];

export function addBookToLocalList(id, data) {
  const book = new Book(id, data.title, data.author, data.isRead, data.score);

  books.push(book);

  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => {
    return book.getId() === id;
  });

  if (index !== -1) {
    books.splice(index, 1);
  }
}
