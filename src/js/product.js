import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) cartItems = {};

  cartItems[product.Id] = product;
  setLocalStorage("so-cart", cartItems);
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

console.log(findProductById(getParam(Id)));

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);


const productId = getParam("product");
productDetails(productId);