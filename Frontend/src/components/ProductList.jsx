import { useEffect, useState } from "react";
import { getProduct } from "../api/productsAPI";

function ProductList({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = await getProduct();
        setProducts(data);
      } catch (err) {
        setError("Error Fetching Products...");
        console.log("Error Fetching Products", err);
      }
    };

    fetchProducts();
  }, [refreshKey]);

  return (
    <div>
      <fieldset className="form">
        {error && <p className="error-message">{error}</p>}
        <legend>Inventory</legend>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.sku}</td>
                <td>
                  {e.quantity}
                  {e.quantity === 0 && (
                    <p className="low-stock-alert">Out of Stock</p>
                  )}
                  {e.quantity > 0 && e.quantity <= 2 && (
                    <p className="low-stock-alert">Low stock</p>
                  )}
                </td>
                <td>{e.price}</td>
                <td>{e.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}

export default ProductList;
