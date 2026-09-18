const booksContainer = document.querySelector("#books");

export function renderBooks(books) {
  booksContainer.innerHTML = "";

  books.forEach((book) => {
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const status = document.createElement("p");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    readButton.classList.add("read-button");
    readButton.dataset.id = book.getId();

    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id = book.getId();

    title.innerText = book.getTitle();
    author.innerText = book.getAuthor();
    deleteButton.innerText = "Ta bort bok";

    if (book.getIsRead()) {
      status.innerText = "Läst";
      readButton.innerText = "Markera som oläst";
    } else {
      status.innerText = "Oläst";
      readButton.innerText = "Markera som läst";
    }

    article.append(title, author, status);

    displayScore(book, article);

    article.append(readButton, deleteButton);

    booksContainer.append(article);
  });
}

function displayScore(book, article) {
  // Scores are only available for books marked as read.
  if (!book.getIsRead()) {
    return;
  }

  if (book.getScore() !== undefined) {
    const score = document.createElement("p");

    score.innerText = `Betyg: ${book.getScore()} / 5`;

    article.append(score);
  }

  for (let i = 1; i <= 5; i++) {
    const scoreButton = document.createElement("button");

    scoreButton.innerText = i;
    scoreButton.classList.add("score-button");
    scoreButton.dataset.id = book.getId();
    scoreButton.dataset.score = i;

    article.append(scoreButton);
  }
}
