import { useState, useEffect } from "react";
import { getOrders } from "../api/ordersAPI";

export default function OrderList({ refreshKey }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data);
    }

    fetchOrders();
  }, [refreshKey]);

  return (
    <div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>
    </div>
  );
}
