const ORDERS_URL = "http://localhost:5298/api/orders";

export async function getOrders() {
  try {
    const response = await fetch(ORDERS_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    return await response.json();
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
      const errorMessage = await response.text();
      throw new Error(errorMessage || `Order Submission Failed ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cancelOrder(id) {
  try {
    const response = await fetch(`${ORDERS_URL}/${id}/cancel`, {
      method: "PUT",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to cancel order");
    }
    return { success: true };
  } catch (error) {
    console.error(`Failed to cancel order ${id}:`, error);
    throw error;
  }
}

export async function deleteOrder(id) {
  try {
    const response = await fetch(`${ORDERS_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to delete order");
    }
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete order ${id}`, error);
    throw error;
  }
}
