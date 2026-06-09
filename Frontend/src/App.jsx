import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import ProductForm from "./components/productAddForm";
import ProductList from "./components/productList";
import DeleteProductFrom from "./components/productDeleteForm";

function App() {
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
        <DeleteProductFrom refreshInventory={refreshInventory} />
      </div>
    </>
  );
}

export default App;
