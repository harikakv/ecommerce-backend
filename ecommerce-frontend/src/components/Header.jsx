import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 15, background: "#222", color: "#fff" }}>
      <h2>E-Commerce</h2>
      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/" style={{ color: "#fff" }}>Products</Link>
        <Link to="/cart" style={{ color: "#fff" }}>Cart ({cartCount})</Link>
        <Link to="/orders" style={{ color: "#fff" }}>Orders</Link>
      </div>
    </div>
  );
}
