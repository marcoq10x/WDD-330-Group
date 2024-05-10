
import { findProductById } from "./productData.mjs";
import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";



 export default async function productDetails(productID) {

  let productData = await findProductById(productID);
    console.log(`PRODUCT DATA: ${productData}`);
    renderProductDetails(productData);

  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
}

 export function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (!cartItems) cartItems = {}; 

  cartItems[product.Id] = product;
  setLocalStorage("so-cart", cartItems);
}

 function renderProductDetails(productData) {
  document.getElementById("productName").innerHTML = productData.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerHTML = productData.NameWithoutBrand;
  document.getElementById("productImage").src = productData.Image;
  document.getElementById("productImage").setAttribute("alt", productData.Name);
  document.getElementById("productFinalPrice").innerHTML = productData.FinalPrice;
  document.getElementById("productColorName").innerHTML = productData.Colors[0].ColorName;
  document.getElementById("productColorName").innerHTML = productData.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").insertAdjacentHTML("afterbegin",productData.DescriptionHtmlSimple);
  document.getElementById("addToCart").dataset.id = productData.Id;

}

// add to cart button event handler
async function addToCartHandler(e) {
  e.preventDefault(); // Prevents default button click behavior
  try {
    const product = await findProductById(e.target.dataset.id);
    console.log(product);
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


