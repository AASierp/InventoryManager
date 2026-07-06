import OrderForm from "../components/OrderForm";
import OrderList from "../components/orderList";
import ProductList from "../components/ProductList";
import { useState } from "react";

export default function OrdersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshInventory = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Order Management</h1>
      <div className="order-page-container">
        <div />
          <div className="order-page-order-form-container">
            <OrderForm  className="page-item" refreshInventory={refreshInventory} />
          <div className="order-page-order-list-container">
            <OrderList className="page-item" refreshKey={refreshKey} />
          </div>
        </div>
        <div className="order-page-product-list-container">
          <ProductList className="page-item" refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
