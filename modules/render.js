//skapa HTML
//visa böcker
//uppdatera gränssnittet

const booksContainer = document.querySelector("#books");

export function renderBooks(books) {
  books.forEach((book) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const score = document.createElement("p");
    const status = document.createElement("p");

    title.innerText = book.getTitle();
    author.innerText = book.getAuthor();
    status.innerText = book.getIsRead();

    article.append(title, author, status);

    if (book.getIsRead()) {
      score.innerText = `Betyg: ${book.getScore()}`;
      article.append(score);
    }
    booksContainer.append(article);

    if (book.getIsRead()) {
      status.innerText = "Läst";
    } else {
      status.innerText = "Oläst";
    }
  });
}
