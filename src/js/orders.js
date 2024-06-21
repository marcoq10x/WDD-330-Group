import { getOrders } from "./externalServices.mjs";
import { checkLogin } from "./auth.mjs";
import { getLocalStorage } from "./utils.mjs";

const accessToken = getLocalStorage("so-token");

if (checkLogin("/orders/")) {
  try {
    const orders = await getOrders(accessToken);

    renderOrders(orders);
  } catch (error) {

  }
}

function renderOrders(orders) {
  // render the orders
  const ordersEl = document.getElementById("ordersContainer");
  const orderList = document.createElement("ul");

  for (let i = 0; i < 10; i++) {
    const order = orders[i];
    const orderEl = document.createElement("li");
    orderEl.innerHTML = `
      <h3>Order: ${order.id}</h3>
      <p>Number of Items: ${order.items.length}</p>
      <p>Order Date: ${new Date(order.orderDate).toLocaleDateString("en-US", {year: "numeric", month: "long", day:"numeric"})}</p>
      <p>Order Total: $${order.orderTotal}</p>
    `;
    orderList.appendChild(orderEl);
  }

  ordersEl.appendChild(orderList);
}