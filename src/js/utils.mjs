// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//URL Params
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {

  const htmlStrings = list.map((item) => templateFn(item));
  const filter = filterProducts(htmlStrings);
  const listTitle = document.getElementById("list-title")
  const category = getParam("category");
  listTitle.innerHTML = category.charAt(0).toUpperCase() + category.slice(1) ;
  document.getElementById(parentElement).insertAdjacentHTML(position, filter.join(""));
}

export function filterProducts(products, limit = 4) {
  return products.slice(0, limit);
}

function loadTemplate (path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
    // get template using function...no need to loop this time.
    if (clear) {
        parentElement.innerHTML = "";
    }
    const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, htmlString);

    if(callback) {
        callback(data);
    }
        // Render the updated Cart Bage
    const badge = document.querySelector("sup");
    let badgeNum
    if(getLocalStorage("so-cart")){
      badgeNum = parseInt(Object.keys(getLocalStorage("so-cart")).length);
      badge.innerText = badgeNum
      badge.hidden = false;
    }
}

export function loadHeaderFooter (){
  const headerTemplateFN = loadTemplate("/partials/header.html")
  const footerTemplateFN = loadTemplate("/partials/footer.html");

  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  renderWithTemplate(headerTemplateFN, headerEl);
  renderWithTemplate(footerTemplateFN, footerEl);
}


export function alertMessage(message, scroll=true){
   
  const alert = document.createElement("div")
  alert.classList.add('alert')
  alert.innerHTML = `<span>${message}<button>X</button></span>`

  alert.addEventListener('click', function(e) {
    if(e.target.innerText) {
      mainEl.removeChild(this);
    }
  })
  const mainEl = document.getElementById("main");
  mainEl.prepend(alert);
  if(scroll){
    window.scrollTo(0,0)
  }
}

export function findProductQtyByID(searchId) {

  const cartItems = getLocalStorage("so-cart");
  if(cartItems){
  let qty = 0;
  let largestIndex = -1;

  for (let i = 0; i < Object.keys(cartItems).length; i++) {
    if(cartItems[i].Id === searchId){
      qty++;
      largestIndex = i;
    }
  }
  return [qty, largestIndex];
}
 console.error("Could not find product in the cart")
}

export function getCartQtyArr(filteredCart) {
  let cartQtyArr = []

  filteredCart.forEach(item => {

    const cartTuple = findProductQtyByID(item.Id)
    cartQtyArr.push(cartTuple[0]); // [qty, largestIndex]
  })
  return cartQtyArr;
}



