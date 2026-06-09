import { deleteProduct } from "../api/productsAPI";
import { useState } from "react";

export default function DeleteProductForm({ refreshInventory }) {
  const [id, setId] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteProduct(id);
      refreshInventory();
      alert("Delete Successful");
      setId("");
    } catch (error) {
      console.error(error);
      console.log("Unable to delete specified product.");
    }
  };

  return (
    <>
      <form onSubmit={handleDelete}>
        <input
          placeholder = "Enter Product ID"
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <button  className= "product-delete-btn" type="submit">Delete</button>
      </form>
    </>
  );
}
