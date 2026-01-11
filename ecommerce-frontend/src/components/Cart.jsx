import { useEffect, useState } from "react";
import { fetchCart, placeOrder } from "../api";
import { useNavigate } from "react-router-dom";

export default function Cart({ updateCartCount }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    fetchCart().then((data) => {
      setCart(data);
      updateCartCount(data.length);
    });
  }, []);

  const order = async () => {
    await placeOrder();
    alert("Order placed!");
    setCart([]);
    updateCartCount(0);
  };

  return (
    <>
      <h2>Cart</h2>
      {cart.map((c) => (
        <div key={c.id}>
          {c.product.name} × {c.quantity}
        </div>
      ))}
      {cart.length > 0 && <button onClick={order}>Place Order</button>}
    </>
  );
}
