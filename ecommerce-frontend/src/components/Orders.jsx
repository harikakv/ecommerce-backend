import { useEffect, useState } from "react";
import { fetchOrders } from "../api";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: "/orders" } });
      return;
    }

    fetchOrders().then(setOrders);
  }, []);

  return (
    <>
      <h2>Orders</h2>
      {orders.map((o) => (
        <div key={o.id}>
          {o.product.name} × {o.quantity}
        </div>
      ))}
    </>
  );
}
