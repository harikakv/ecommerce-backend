import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import { fetchCart } from "./api";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart().then((data) => setCartCount(data?.length || 0));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ProductList updateCartCount={setCartCount} />} />
          <Route path="/cart" element={<Cart updateCartCount={setCartCount} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
