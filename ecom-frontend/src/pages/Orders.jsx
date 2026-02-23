import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    // ⚠️ IMPORTANT: do NOT add /api here if already in baseURL
    api
      .get("/api/orders/")
      .then((res) => {
        console.log("ORDERS DATA:", res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders API Error:", err);
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      });
  }, [navigate]);

  // ✅ Calculate total safely
  const getOrderTotal = (order) => {
    if (order.total) return parseFloat(order.total).toFixed(2);
    if (order.total_cost) return parseFloat(order.total_cost).toFixed(2);
    if (order.total_price) return parseFloat(order.total_price).toFixed(2);

    const items = order.items || order.order_items || [];

    return items
      .reduce((sum, i) => {
        const price = parseFloat(
          i.product_price ||
          i.price ||
          i.product?.price ||
          0
        );
        return sum + i.quantity * price;
      }, 0)
      .toFixed(2);
  };

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString();
  };

  if (loading) return <div className="page-box">Loading orders...</div>;
  if (error) return <div className="page-box">{error}</div>;

  return (
    <div className="page-box">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => {
        const items = order.items || order.order_items || [];

        return (
          <div
            key={order.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              background: "#fafafa",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              <span>Order #{order.id}</span>
              <span>Total: ₹{getOrderTotal(order)}</span>
            </div>

            {/* META */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                color: "#555",
                marginBottom: "12px",
              }}
            >
              <span>
                Date: {formatDate(order.created_at || order.order_date)}
              </span>
              <span>Status: {order.status || "Placed"}</span>
            </div>

            <hr />

            {/* ITEMS */}
            {items.map((item, idx) => {
              const price = parseFloat(
                item.product_price ||
                item.price ||
                item.product?.price ||
                0
              );

              const name =
                item.product_name ||
                item.name ||
                item.product?.name ||
                "Product";

              const lineTotal = (price * item.quantity).toFixed(2);

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span>{name}</span>
                  <span>
                    ₹{price} × {item.quantity} = ₹{lineTotal}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Orders;