import {  getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { findProductById } from "./productData.mjs";


// // add to cart button event handler
// async function addToCartHandler(e) {
//   e.preventDefault(); // Prevents default button click behavior
//   try {
//     const product = await findProductById(e.target.dataset.id);
//     console.log(product);
//     if (product) {
//       addProductToCart(product);
//     } else {
//       console.error("Product not found");
//     }
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//   }
// }

const productId = getParam("product");
productDetails(productId);


// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);