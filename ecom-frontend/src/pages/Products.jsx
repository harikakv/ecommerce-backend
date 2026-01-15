import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);

  api.get("products/")
    .then((res) => {
      console.log("PRODUCTS RESPONSE:", res.data);
      setProducts(res.data);
    })
    .catch((err) => {
      console.error(
        "PRODUCTS ERROR:",
        err.response ? err.response.data : err
      );
    });
}, []);


  const addToCart = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const go = window.confirm("Please login to add to cart");
      if (go) navigate("/login");
      return;
    }

    try {
      await api.post("cart/add/", { product_id: id });
      alert("Added to cart");
    } catch (err) {
      console.log(err);
      alert("Error adding to cart");
    }
  };

  return (
    <div className="grid">
      {products.map((p) => (
        <div className="card" key={p.id}>
          <img src={p.image} alt={p.name} />
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}


export default Products;
