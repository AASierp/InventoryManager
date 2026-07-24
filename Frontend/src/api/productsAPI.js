const URL = "http://localhost:5298/api/products";

export async function getProduct() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Product Get Failed, ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${URL}/${id}`);

    if (response.status === 404) {
      throw new Error("An item with that ID does not exist.");
    }

    if (!response.ok) {
      throw new Error(`Product could not be loaded.`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postProduct(product) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Product Post Failed, ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putProduct(id, product) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Product PUT failed. ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Product DELETE Failed, ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
