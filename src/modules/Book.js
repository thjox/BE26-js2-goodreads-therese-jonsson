export class Book {
  #id;
  #title;
  #author;
  #isRead;
  #score;

  //skapar en ny Book-instans
  constructor(id, title, author, isRead, score) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
  }

  //Getters som ger tillgång till de privata värdena.
  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }
  getIsRead() {
    return this.#isRead;
  }

  getScore() {
    return this.#score;
  }

  //Ändrar bokens status till läst/oläst, tar bort betyg om boken markeras som oläst.
  doneRead() {
    this.#isRead = !this.#isRead;

    if (!this.#isRead) {
      this.#score = undefined;
    }
  }

  //Sätter betyg om boken markeras som läst
  setScore(score) {
    if (this.#isRead) {
      this.#score = score;
    }
  }
}
