import { getData } from "./productData.mjs";

export default async function productList(selector, category) {
  const products = await getData(category);
  const items = Object.values(products);
  console.log(items);
  const htmlItems = items.map((item) => productItemTemplate(item));
  renderList(selector, htmlItems);
}

function productItemTemplate(item) {
  const newItem = 
  [`<li class="product-card">
    <a href="${item.Id}">
      <img
        src="${item.Image}"
        alt="Marmot Ajax tent"
      />
      <h3 class="card__brand">${item.Brand.Name}</h3>
      <h2 class="card__name">${item.NameWithoutBrand}</h2>
      <p class="product-card__price">${item.ListPrice}</p></a
    >
  </li>`];
  return newItem;
}

function renderList(selector, htmlItems) {
  document.querySelector(selector).innerHTML = htmlItems.join("");
}