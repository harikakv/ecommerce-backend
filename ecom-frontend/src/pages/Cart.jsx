import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api.get("cart/")
      .then((res) => {
        setItems(res.data.items); // backend format
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  // ✅ TOTAL CALCULATION
  const total = items.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.product_price),
    0
  );

  const placeOrder = async () => {
    try {
      await api.post("orders/place/");
      alert("Order placed successfully");
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="page-box">
      <h2>My Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <span>{item.product_name}</span>
          <span>
            ₹{item.product_price} × {item.quantity}
          </span>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <hr style={{ margin: "20px 0" }} />
          <h3>Total: ₹{total.toFixed(2)}</h3>

          <button className="place-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
