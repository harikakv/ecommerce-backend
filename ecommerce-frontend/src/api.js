const BASE_URL = "http://127.0.0.1:8000/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem("token")}`,
});

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/`);
  return res.json();
};

export const addToCart = async (productId, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/add/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${BASE_URL}/cart/`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const placeOrder = async () => {
  const res = await fetch(`${BASE_URL}/orders/place/`, {
    method: "POST",
    headers: authHeaders(),
  });
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/`, {
    headers: authHeaders(),
  });
  return res.json();
};
