import { useEffect, useState } from "react";
import { fetchProducts, addToCart, fetchCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function ProductList({ updateCartCount }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAdd = async (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { state: { from: "/" } });
      return;
    }

    await addToCart(id, 1);
    const cart = await fetchCart();
    updateCartCount(cart.length);
    alert("Added to cart");
  };

  return (
    <>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => handleAdd(p.id)}>Add to Cart</button>
        </div>
      ))}
    </>
  );
}

