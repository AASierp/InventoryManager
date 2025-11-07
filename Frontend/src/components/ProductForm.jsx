import { useState } from "react";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, sku, quantity, price, description, category };

    try {
      const response = await fetch("https://localhost:7292/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product, ${response.status}`);
      }

      const savedProduct = await response.json();
      onProductAdded(savedProduct);
      alert("Product Successfully added");

      setName("");
      setSku("");
      setQuantity(0);
      setDescription("");
      setPrice(0);
      setCategory("");

    } catch (err) {
      console.error("Error adding products", err);
    }
  };

  return (
    <div>
      <form id="product-form" onSubmit={handleSubmit}>
        <fieldset className="product-form">
          <legend>New Product Submission Form </legend>
          <label htmlFor="name">Product Name</label>
          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="sku">SKU</label>
          <input id="sku" type="text" required value={sku} onChange={(e) => setSku(e.target.value)}/>
          <label htmlFor="description">Description</label>
          <textarea id="description" required rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="price">Price</label>
          <input id="price" type="number" required min="0" step=".01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <label htmlFor="category">Category</label>
          <input id="category" type="text" required value={category} onChange={(e) => setCategory(e.target.value)}/>
          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" type="number" required min="0" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
          <button className = "form-submit-button" type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default ProductForm;
