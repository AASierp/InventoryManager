import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className = "nav-bar">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/inventory">Inventory</Link>
          <Link className="nav-link" to="/orders">Orders</Link>
        </nav>

        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
