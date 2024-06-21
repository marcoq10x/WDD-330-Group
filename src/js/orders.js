import { getOrders } from "./externalServices.mjs";
import { checkLogin } from "./auth.mjs";

if (checkLogin("/orders")) {
  getOrders().then((orders) => {
    console.log("Orders: ", orders);
  });
}