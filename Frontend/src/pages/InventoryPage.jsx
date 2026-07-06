import { useState } from "react";
import ProductForm from "../components/ProductAddForm";
import ProductList from "../components/ProductList";
import DeleteProductForm from "../components/ProductDeleteForm";

export default function InventoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshInventory = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <div className="inventory-page-container">
        <div className="inventory-page-product-form-container">
          <ProductForm
            className="page-item"
            refreshInventory={refreshInventory}
          />
          <div className="delete-product-button-container">
            <DeleteProductForm
              className="page-item"
              refreshInventory={refreshInventory}
            />
          </div>
        </div>
        <div className="inventory-page-product-list-container">
          <ProductList className="page-item" refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
