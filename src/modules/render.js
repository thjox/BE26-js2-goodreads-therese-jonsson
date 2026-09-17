const booksContainer = document.querySelector("#books");

//Renderar alla böcker i books-arrayen i gränssnittet
export function renderBooks(books) {
  //Tömmer containern för att det inte ska bli dubletter vid ny rendering
  booksContainer.innerHTML = "";

  books.forEach((book) => {
    //HTML-element för varje bok
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const score = document.createElement("p");
    const status = document.createElement("p");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    //Boken id gör att rätt knappar kopplas
    readButton.classList.add("read-button");
    readButton.dataset.id = book.getId();

    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id = book.getId();

    //Visar informationen om boken
    title.innerText = book.getTitle();
    author.innerText = book.getAuthor();
    deleteButton.innerText = "Ta bort bok";

    //Beroende på om boken är läst/oläst anpassas statusen för boken
    if (book.getIsRead()) {
      status.innerText = "Läst";
      readButton.innerText = "Markera som oläst";
    } else {
      status.innerText = "Oläst";
      readButton.innerText = "Markera som läst";
    }

    article.append(title, author, status);

    //När boken markeras som läst kommer betygsknappar 1-5 upp
    if (book.getIsRead()) {
      if (book.getScore() !== undefined) {
        score.innerText = `Betyg: ${book.getScore()}`;
        article.append(score);
      }

      for (let i = 1; i <= 5; i++) {
        const scoreButton = document.createElement("button");

        scoreButton.innerText = i;
        scoreButton.classList.add("score-button");

        //Sparar bokens id och betyg i data-attributet
        scoreButton.dataset.id = book.getId();
        scoreButton.dataset.score = i;

        article.append(scoreButton);
      }
    }

    //Lägger till knappar och bok på sidan
    article.append(readButton, deleteButton);
    booksContainer.append(article);
  });
}
