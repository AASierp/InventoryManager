import { useState } from "react";
import { postProduct, putProduct } from "../api/productsAPI";

function ProductForm({ refreshInventory }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const buildProduct = () => ({
    name,
    sku,
    quantity,
    price,
    description,
    category,
  });

  const buildProductForUpdate = () => ({
    id: Number(id),
    name,
    sku,
    quantity,
    price,
    description,
    category,
  });

  const addProduct = async (event) => {
    event.preventDefault();

    const product = buildProduct();

    try {
      await postProduct(product);

      refreshInventory();

      setName("");
      setSku("");
      setQuantity(0);
      setPrice(0);
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error(error);
      console.log("Item Could not be added to the inventory.");
    }
  };

  const updateProduct = async (event) => {
    event.preventDefault();

    if (!id) {
        alert("Please enter an ID number to update");
        return;
      }

    const product = buildProductForUpdate();

    try {
      await putProduct(id, product);
      refreshInventory();
      alert("Product updated successfully");
    } catch (error) {
      console.error(error);
      console.log("Item could not be updated");
    }
  };

  return (
    <div>
      <form id="product-form" onSubmit={addProduct}>
        <fieldset className="form">
          <legend>New Product Submission Form </legend>
          <label htmlFor="id">Product Id (only for updating)</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="sku">SKU</label>
          <input
            id="sku"
            type="text"
            required
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            required
            min="0"
            step=".01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            required
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className="form-submit-button" type="submit">
            Add Product
          </button>
          <button
            className="form-update-button"
            type="button"
            onClick={updateProduct}
          >
            Update Product
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ProductForm;
