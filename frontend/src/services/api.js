const API_URL = process.env.REACT_APP_API_URL;

// ================= RESTAURANTS =================
export function fetchRestaurants() {
  return fetch(`${API_URL}/api/restaurants`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  });
}

// ================= MENU =================
export function fetchMenu(search = "") {
  const url = search
    ? `${API_URL}/api/menu/search?q=${search}`
    : `${API_URL}/api/menu`;

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
  });
}

export function addMenuItem(data) {
  return fetch(`${API_URL}/api/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add menu item");
    return res.json();
  });
}

export function updateMenuItem(id, data) {
  return fetch(`${API_URL}/api/menu/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update menu item");
    return res.json();
  });
}

export function deleteMenuItem(id) {
  return fetch(`${API_URL}/api/menu/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete menu item");
    return true;
  });
}

export function toggleAvailability(id) {
  return fetch(`${API_URL}/api/menu/${id}/availability`, {
    method: "PATCH",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to toggle availability");
    return res.json();
  });
}

// ================= DASHBOARD =================
export function fetchDashboardStats() {
  return fetch(`${API_URL}/api/dashboard/stats`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    return res.json();
  });
}


// ================= ORDERS =================
export function fetchOrders(status = "", page = 1, limit = 5) {
  let url = `${API_URL}/api/orders?page=${page}&limit=${limit}`;
  if (status) url += `&status=${status}`;

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  });
}

export function updateOrderStatus(id, status) {
  return fetch(`${API_URL}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update order status");
    return res.json();
  });
}

