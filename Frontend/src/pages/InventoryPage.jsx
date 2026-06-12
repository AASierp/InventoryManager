import { useState } from "react";
import ProductForm from "../components/productAddForm";
import ProductList from "../components/productList";
import DeleteProductForm from "../components/productDeleteForm";

export default function InventoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshInventory = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <h1 className="h1-heading">Inventory Management</h1>
      <div className="main-container">
        <ProductForm refreshInventory={refreshInventory} />
        <ProductList refreshKey={refreshKey} />
        <DeleteProductForm refreshInventory={refreshInventory} />
      </div>
    </>
  );
}
