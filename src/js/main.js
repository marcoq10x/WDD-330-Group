import { buildAlerts, getAlerts } from "./alert.mjs";
import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

productList("product-list");
loadHeaderFooter();
buildAlerts();