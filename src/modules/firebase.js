const baseURL =
  "https://goodread-2dc1a-default-rtdb.europe-west1.firebasedatabase.app/books";

export async function getAllBooks() {
  const response = await fetch(baseURL + ".json");

  if (!response.ok) {
    throw new Error("Fetching books failed");
  }

  return await response.json();
}

export async function addBook(book) {
  const options = {
    method: "POST",
    body: JSON.stringify(book),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(baseURL + ".json", options);

  if (!response.ok) {
    throw new Error("Adding book failed");
  }

  return await response.json();
}

export async function updateBook(id, updates) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(updates),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(`${baseURL}/${id}.json`, options);

  if (!response.ok) {
    throw new Error("Updating book failed");
  }

  return await response.json();
}

export async function deleteBook(id) {
  const options = {
    method: "DELETE",
  };

  const response = await fetch(`${baseURL}/${id}.json`, options);

  if (!response.ok) {
    throw new Error("Deleting book failed!");
  }
}
