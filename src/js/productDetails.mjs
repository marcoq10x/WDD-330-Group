import { findProductById } from "./externalServices.mjs";
import { getParam, getLocalStorage, setLocalStorage, loadHeaderFooter, alertMessage} from "./utils.mjs";

export default async function productDetails(productID) {
  let productData = await findProductById(productID);
  renderProductDetails(productData);
  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

export function addProductToCart(product) {

  let cartItems = getLocalStorage("so-cart");
  let  cartQty

  if (!cartItems){
    cartItems = {};
    cartQty = 0;
    cartItems[cartQty] = product;
  }
  else {
    cartQty = parseInt(Object.keys(cartItems).length);
    cartItems[cartQty] = product;
  }

  // Do this everytime
  animateCart();
  setLocalStorage("so-cart", cartItems);
  
  setTimeout(() => { // necessary for the cart shake animation
  
    loadHeaderFooter()//updateCartBadge;
     alertMessage("Added to cart")
  }, 1000);

setTimeout(() => { // added to cart alert
     document.querySelector(".alert").remove();
  }, 3000);
}


// ------Updates to add a visual indicator of how much a product is discounted to the product listing page------
function renderProductDetails(productData) {
  document.querySelector("#productName").innerHTML = productData.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerHTML = productData.NameWithoutBrand;
  document.querySelector("#productImage").src = productData.Images.PrimaryLarge;
  document.querySelector("#productImage").setAttribute("alt", productData.Name);
  document.querySelector("#productRetailPrice").innerHTML = `Suggested Price: $ <span class="strikethrough">${productData.SuggestedRetailPrice}</span>`;
  document.querySelector("#productFinalPrice").innerHTML = `<strong>Final Price: $ ${productData.FinalPrice}</strong>`;
  document.querySelector("#productColorName").innerHTML = productData.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productData.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = productData.Id;
}

// Calculate how much a product is discounted
function calculateDiscount() {
  const retailPriceElement = document.querySelector("#productRetailPrice .strikethrough");
  const finalPriceElement = document.querySelector("#productFinalPrice");
  const discountElement = document.querySelector("#productDiscount");

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
      loadHeaderFooter()
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  } else {
    console.error("Product ID not found in URL parameters");
  }
});

// -----End of add a visual indicator of how much a product is discounted to the product listing page------

// animates the cart icon when a product is added to the cart
function animateCart() {
  const cartIcon = document.querySelector(".cart");
  cartIcon.classList.add("cart-animation");

  setTimeout(() => { 
    cartIcon.classList.remove("cart-animation");
  }, 1000);


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

