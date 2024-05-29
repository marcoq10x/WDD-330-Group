
import { findProductById } from "./productData.mjs";
import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default async function productDetails(productID) {
  let productData = await findProductById(productID);
  renderProductDetails(productData);

  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

export function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) cartItems = {};
  animateCart();
  cartItems[product.Id] = product;
  setLocalStorage("so-cart", cartItems);
  updateNumItems();
}


// ------Updates to add a visual indicator of how much a product is discounted to the product listing page.
function renderProductDetails(productData) {
  document.getElementById("productName").innerHTML = productData.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = productData.NameWithoutBrand;
  document.getElementById("productImage").src = productData.Image;
  document.getElementById("productImage").setAttribute("alt", productData.Name);
  document.getElementById("productRetailPrice").innerHTML = `Suggested Price: $ <span class="strikethrough">${productData.SuggestedRetailPrice}</span>`;
  document.getElementById("productFinalPrice").innerHTML = `<strong>Final Price: $ ${productData.FinalPrice}</strong>`;
  document.getElementById("productColorName").innerHTML = productData.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productData.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = productData.Id;
}

// Calculate how much a product is discounted
function calculateDiscount() {
  const retailPriceElement = document.querySelector("#productRetailPrice .strikethrough");
  const finalPriceElement = document.getElementById("productFinalPrice");
  const discountElement = document.getElementById("productDiscount");

  // Change strings values to numbers
  const retailPrice = parseFloat(retailPriceElement.textContent.trim());
  const finalPrice = parseFloat(finalPriceElement.textContent.replace("Final Price: $", "").trim());

  // Verify that values are valid numbers
  if (!isNaN(retailPrice) && !isNaN(finalPrice)) {
    // Calculate discount percentage
    const discountPercentage = ((retailPrice - finalPrice) / retailPrice) * 100;

    // Update HTML elements 
    discountElement.textContent = ` ${discountPercentage.toFixed(0)}% OFF`;
    discountElement.classList.add("discount");
  } else {
    // Not valid values
    discountElement.textContent = "Error en los precios";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Get the product ID from the URL parameters
  const productID = getParam("product");
  if (productID) {
    try {
      let productData = await findProductById(productID);
      renderProductDetails(productData);
      calculateDiscount();
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  } else {
    console.error("Product ID not found in URL parameters");
  }
});

// -----End of add a visual indicator of how much a product is discounted to the product listing page---

// Animates the cart icon when a product is added to the cart
function animateCart() {
  const cartIcon = document.querySelector(".cart");
  cartIcon.classList.add("cart-animation");
  setTimeout(() => {
    cartIcon.classList.remove("cart-animation");
  }, 1000);
}

// Update Number of Items in Cart
export function updateNumItems() {
  const cartItems = getLocalStorage("so-cart");
  const numItems = Object.keys(cartItems).length;
  setLocalStorage("num-cart", numItems);
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

const productId = getParam("product");
productDetails(productId);


