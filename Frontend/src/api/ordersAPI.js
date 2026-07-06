const ORDERS_URL = "http://localhost:5298/api/orders";

export async function getOrders() {
  try {
    const response = await fetch(ORDERS_URL);
    return await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postOrder(order) {
  try {
      const response = await fetch(ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Order Submission Failed ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
