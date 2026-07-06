import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";

function AppContent(){
  const location = useLocation();

  const hideNav = location.pathname === "/";

  return(
    <main className= "main-container">
    {!hideNav && (
        <nav className="nav-bar">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/inventory">Inventory</Link>
          <Link className="nav-link" to="/orders">Orders</Link>
          <Link className="nav-link" to="/login">Login</Link>
        </nav>
    )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </main>
  );
}


function App() {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
