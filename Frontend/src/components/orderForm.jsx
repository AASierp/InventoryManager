import { useState, useEffect } from "react";
import { postOrder } from "../api/ordersAPI";
import { getProduct } from "../api/productsAPI";

export default function OrderForm({ refreshData, refreshKey }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProduct();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products.", err);
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshKey]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!productId) {
      setError("Please select a product.");
      return;
    }

    if (!quantity) {
      setError("You must provide a quantity.");
      return;
    }

    if (Number(quantity) <= 0) {
      setError("Order quantity must be greater than zero.");
      return;
    }

    const order = {
      productId: Number(productId),
      quantity: Number(quantity),
    };
    try {
      await postOrder(order);
      refreshData();
      await fetchProducts();
      setMessage("Order placed successfully.");
      setProductId("");
      setQuantity("");
    } catch (error) {
      console.error(error);
      setError(error.message || "Order could not be placed.");
    }
  };

  return (
    <div>
      <form onSubmit={handleOrder}>
        <fieldset className="form">
          <legend>Order Form</legend>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} -- {product.sku} -- {product.quantity}{" "}
                {"available"}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button className="place-order-button" type="submit">
            Place Order
          </button>
        </fieldset>
      </form>
    </div>
  );
}
