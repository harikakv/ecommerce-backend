import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuth, logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>GlowCare</h2>

      <div>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">My Orders</Link>

        {isAuth ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
