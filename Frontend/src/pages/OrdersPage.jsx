import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import ProductList from "../components/ProductList";
import { useState } from "react";

export default function OrdersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Order Management</h1>
      <div className="order-page-container">
        <div className="order-page-order-form-container">
          <OrderForm refreshData={refreshData} refreshKey={refreshKey} />
          <div className="order-page-order-history-container">
            <OrderList refreshKey={refreshKey} refreshData={refreshData} />
          </div>
        </div>
        <div
          style={{ marginTop: "250px" }}
          className="order-page-product-list-container"
        >
          <ProductList refreshKey={refreshKey} />
        </div>
        <div />
      </div>
    </div>
  );
}
