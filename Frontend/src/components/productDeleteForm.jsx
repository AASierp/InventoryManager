import { deleteProduct } from "../api/productsAPI";
import { useState } from "react";

export default function DeleteProductForm({ refreshData }) {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const idPattern = /^[1-9]\d*$/;

    if (!id) {
      setError("Please enter an ID");
      return;
    }

    if (!idPattern.test(id)) {
      setError("ID must be a whole number greater than zero.");
      return;
    }

    try {
      await deleteProduct(id);
      refreshData();
      setMessage(`Product ${id} deleted successfully.`);
      setId("");
    } catch (error) {
      console.error(error);
      setError("Unable to delete specified product.");
    }
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <fieldset className="form">
          <legend>Delete Product</legend>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <input
            placeholder="Enter Product ID"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <button className="product-delete-btn" type="submit">
            Delete
          </button>
        </fieldset>
      </form>
    </div>
  );
}
