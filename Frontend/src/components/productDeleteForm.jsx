import { deleteProduct } from "../api/productsAPI";
import { useState } from "react";

export default function DeleteProductForm({ refreshData }) {
  const [id, setId] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteProduct(id);
      refreshData();
      alert("Delete Successful");
      setId("");
    } catch (error) {
      console.error(error);
      console.log("Unable to delete specified product.");
    }
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <fieldset className="form">
          <legend>Delete Product</legend>
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
