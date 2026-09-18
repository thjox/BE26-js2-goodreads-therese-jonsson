export const baseURL =
  "https://goodread-2dc1a-default-rtdb.europe-west1.firebasedatabase.app/books";

export async function getAllBooks() {
  try {
    const response = await fetch(baseURL + ".json");
    if (!response.ok) {
      throw new Error("Fetching books failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addBook(book) {
  try {
    const option = {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(baseURL + ".json", option);
    if (!response.ok) {
      throw new Error("Post failed!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
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
