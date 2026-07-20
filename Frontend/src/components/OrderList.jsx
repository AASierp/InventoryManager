import { useState, useEffect } from "react";
import { getOrders, cancelOrder, deleteOrder } from "../api/ordersAPI";

export default function OrderList({ refreshKey }) {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);

  const handleCancelOrder = async (id) => {
    setMessage("");
    setError("");

    try {
      await cancelOrder(id);
      await fetchOrders();
      setMessage(`Order ${id} canceled successfully.`);
    } catch (err) {
      setError(err.message || `Failed to cancel order`);
    }
  };

  const handleDeleteOrder = async (id) => {
    setMessage("");
    setError("");

    const confirmed = window.confirm(
      `Permanently delete order ${id}? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteOrder(id);
      await fetchOrders();
      setMessage(`Order ${id} has been permanently deleted`);
    } catch (err) {
      setError(err.message || `Failed to delete order ${id}`);
    }
  };

  return (
    <div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <fieldset className="form">
        <legend>Order History</legend>
        <div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productId}</td>
                  <td>{order.product?.name}</td>
                  <td>{order.product.sku}</td>
                  <td>{order.quantity}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    {order.status === "Canceled" ? (
                      <button
                        type="button"
                        className="delete-order-button"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="cancel-order-button"
                        onClick={() => handleCancelOrder(order.id)}
                        disable={order.status === "Canceled"}
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                    )}
                  </td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
  );
}
