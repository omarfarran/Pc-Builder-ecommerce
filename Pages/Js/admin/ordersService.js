const ORDERS_KEY = "admin_orders";

async function getOrders() {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) return JSON.parse(stored);

  const res = await fetch("../../Data/orders.json");
  const orders = await res.json();
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function updateOrderStatus(orderId, newStatus) {
  getOrders().then(orders => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = newStatus;
    saveOrders(orders);
  });
}
