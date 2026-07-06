import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <div className="home-page-container">
            <div className="home-left-side">
                <Link className="home-manage-inventory-link" to="/inventory">Manage Inventory</Link>
            </div>
            <div className="home-right-side">
                <div className="home-right-side-overlay">
                    <Link className="home-place-order-link" to="/orders">Place An Order</Link>
                </div>
            </div>
        </div>
    );
}