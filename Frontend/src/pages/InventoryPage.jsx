import { useState } from "react";
import ProductForm from "../components/ProductAddForm";
import ProductList from "../components/ProductList";
import DeleteProductForm from "../components/ProductDeleteForm";

export default function InventoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Inventory Management</h1>
      <div className="inventory-page-container">
        <div className="inventory-page-product-form-container">
          <ProductForm refreshData={refreshData} />
          <div className="delete-product-button-container">
            <DeleteProductForm refreshData={refreshData} />
          </div>
        </div>
        <div className="inventory-page-product-list-container">
          <ProductList refreshKey={refreshKey} />
        </div>
        <div />
      </div>
    </div>
  );
}
