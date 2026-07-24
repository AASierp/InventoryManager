import { useState } from "react";
import { getProductById, postProduct, putProduct } from "../api/productsAPI";

function ProductForm({ refreshData }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearData = () => {
    setName("");
    setSku("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setCategory("");
  };

  const handleClearForm = () => {
    clearData();
    setMessage("");
    setError("");
    setId("");
  };

  const handleLoadProduct = async (id) => {
    setMessage("");
    setError("");
    clearData();

    if (!id) {
      setError("Please enter a valid ID.");
      return;
    }

    try {
      const formData = await getProductById(id);

      setName(formData.name);
      setSku(formData.sku);
      setQuantity(String(formData.quantity));
      setPrice(String(formData.price));
      setDescription(formData.description);
      setCategory(formData.category);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const buildProduct = () => ({
    name: name.trim(),
    sku: sku.trim(),
    quantity: Number(quantity),
    price: Number(price),
    description: description.trim(),
    category: category.trim(),
  });

  const buildProductForUpdate = () => ({
    id: Number(id),
    ...buildProduct(),
  });

  const productValidation = () => {
    setMessage("");
    setError("");

    const pricePattern = /^\d+(\.\d{1,2})?$/;
    const quantityPattern = /^\d+$/;

    if (!pricePattern.test(price) || Number(price) <= 0) {
      setError(
        "Price must be greater than 0 and may include up to  two decimal places.",
      );
      return false;
    }
    if (!quantityPattern.test(quantity)) {
      setError("Quantity must be a whole number.");
      return false;
    }

    if (
      name.trim() === "" ||
      sku.trim() === "" ||
      description.trim() === "" ||
      category.trim() === ""
    ) {
      setError("All fields are requried.");
      return false;
    }
    return true;
  };

  const addProduct = async (event) => {
    event.preventDefault();

    if (!productValidation()) {
      return;
    }

    const product = buildProduct();

    try {
      await postProduct(product);

      refreshData();
      clearData();

      setMessage("Product added successfully");
    } catch (error) {
      console.error(error);
      setError(error.message || "Product could not be added.");
    }
  };

  const updateProduct = async (event) => {
    event.preventDefault();

    if (!id) {
      alert("Please enter an ID number to update");
      return;
    }

    if (!productValidation()) {
      return;
    }

    const product = buildProductForUpdate();

    try {
      await putProduct(id, product);
      refreshData();
      setMessage("Product updated successfully");

      clearData();
      setId("");
    } catch (error) {
      console.error(error);
      console.log("Item could not be updated");
    }
  };

  return (
    <div>
      <form id="product-form" onSubmit={addProduct} noValidate>
        <fieldset className="form">
          <legend>New Product Submission Form </legend>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <label htmlFor="id">Product Id (only for updating)</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <button
            type="button"
            className="load-prod-button"
            onClick={(e) => handleLoadProduct(id)}
          >
            Load Product
          </button>
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
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setQuantity(e.target.value)}
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
          <button
            type="button"
            className="clear-form-button"
            onClick={handleClearForm}
          >
            Clear Form
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ProductForm;
