import { renderListWithTemplate } from "./utils.mjs";
import { getData } from "./productData.mjs";

export default async function productList(selector, category) {
  const products = await getData(category);
  renderListWithTemplate(productItemTemplate, selector, products);
}

function productItemTemplate(item) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${item.Id}">
      <img
        src="${item.Image}"
      />
      <h3 class="card__brand">${item.Brand.Name}</h3>
      <h2 class="card__name">${item.NameWithoutBrand}</h2>
      <p class="product-card__price">$${item.ListPrice}</p></a
    >
  </li>`;
}
