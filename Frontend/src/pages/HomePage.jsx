import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import OrderList from "../components/OrderList";

export default function HomePage() {
  return (
    <div>
      <h1>DashBoard</h1>
      <div className="home-page-container">
        <div className="home-page-product-list-container">
          <ProductList />
        </div>
        <div>
          <OrderList />
        </div>
      </div>
    </div>
  );
}
