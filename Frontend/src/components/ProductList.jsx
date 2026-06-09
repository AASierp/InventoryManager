import { useEffect, useState } from "react";
import { getProduct } from "../api/productsAPI";

function ProductList({ refreshKey }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = await getProduct();
        setProducts(data);
      } catch (err) {
        console.log("Error Fetching Products", err);
      }
    };

    fetchProducts();
  }, [refreshKey]);

  return (
    <div className="inventory-container">
      <h1 style={{ textAlign: "center" }}>Current Inventory</h1>
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
              <td>{e.quantity}</td>
              <td>{e.price}</td>
              <td>{e.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
