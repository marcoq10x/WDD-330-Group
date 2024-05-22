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
  const product = urlParams.get(param);
  return product;
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
  document.getElementById(parentElement).insertAdjacentHTML(position, filter.join(""));
}

export function filterProducts(products, limit = 4) {
  return products.slice(0, limit);
}

function loadTemplate (path) {
    // wait what?  we are returning a new function?
    // this is called currying and can be very helpful.
        return async function () {
 const res = await fetch(path);
        if (res.ok) {
        const html = await res.text();
   //     console.log(html)
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
}

export function loadHeaderFooter (){
  //console.log(loadTemplate("../public/partials/header.html"))
  const headerTemplateFN = loadTemplate("/partials/header.html")
  const footerTemplateFN = loadTemplate("/partials/footer.html");

  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("header");


  renderWithTemplate(headerTemplateFN, headerEl);
 // renderWithTemplate(footerTemplateFN,footerEl);
}

