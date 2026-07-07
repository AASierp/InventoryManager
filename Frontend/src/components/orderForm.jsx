import { useState } from "react";
import { postOrder } from "../api/ordersAPI";

export default function OrderForm({ refreshInventory }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = async (e) => {
    e.preventDefault();
    const order = {
      productId: Number(productId),
      quantity: Number(quantity),
    };
    try {
      await postOrder(order);
      refreshInventory();
    } catch (error) {
      console.error(error);
      throw new Error("Order could not be placed.");
    }
    setProductId("");
    setQuantity("");
  };

  return (
    <div>
      <form onSubmit={handleOrder}>
        <fieldset className="form">
          <legend>Order Form</legend>
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className="place-order-button" type="submit">
            Place Order
          </button>
        </fieldset>
      </form>
    </div>
  );
}
