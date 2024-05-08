import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let currentCart = getLocalStorage("so-cart");
  if (!Array.isArray(currentCart)) {
    // This will check if the currentCart is actually an array
    currentCart = []; // If not, initialize it as an empty array
  }
  currentCart.push(product); // Add new product to the cart array
  setLocalStorage("so-cart", currentCart); // Save updated cart back to localStorage
}

// add to cart button event handler
async function addToCartHandler(e) {
  e.preventDefault(); // Prevents default button click behavior
  try {
    const product = await findProductById(e.target.dataset.id);
    if (product) {
      addProductToCart(product);
    } else {
      console.error("Product not found");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
