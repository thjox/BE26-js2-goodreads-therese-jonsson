export class Book {
  #id;
  #title;
  #author;
  #isRead;
  #score;

  constructor(id, title, author, isRead, score) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
  }

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

  doneRead() {
    this.#isRead = !this.#isRead;
  }

  setScore(score) {
    if (this.#isRead) {
      this.#score = score;
    }
  }
}
