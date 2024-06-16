import {alertMessage, getLocalStorage, setLocalStorage} from "./utils.mjs";
import { checkout } from "./externalServices.mjs"


function formDataToJSON(formElement) {
    // Create a FormData object from the form element
    const formData = new FormData(formElement),
      convertedJSON = {};

   // Iterate over each key-value pair in the FormData object
    formData.forEach(function (value, key) {
   // Add the key-value pair to the convertedJSON object  
      convertedJSON[key] = value;
    });

   // Return the JSON object
    return convertedJSON;
  }

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(cartItems) {

    const items = Object.values(cartItems)
    const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
    };

  });
  return simplifiedItems;
}

const checkoutProccess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  


  calculateItemSummary: function(){
    //Get the elements that display the number of items and the total amount.
    const numItems = document.querySelector("#num-items");
    const cartSubTotal = document.querySelector("#cartSubTotal");
    const orderTotal = document.querySelector("#orderTotal");
    const tax = document.querySelector("#tax");
    const shipping = document.querySelector("#shipping");

    //Calculate the total number of items and the total amount
    const totalNumberofItems = this.getTotalNumberItems();
    const totalAmount = this.getSubTotal();
    const finalTotal =  this.calculateOrdertotal(totalNumberofItems,totalAmount);

    //Update the inner HTML of the elements with the total amount
    numItems.insertAdjacentText("beforebegin", totalNumberofItems);
 
    cartSubTotal.innerHTML = `$${totalAmount.toFixed(2)} `;
    orderTotal.innerHTML = `$${finalTotal.toFixed(2)}`
    tax.innerHTML = `$${this.tax.toFixed(2)}`
    shipping.innerHTML = `$${this.shipping.toFixed(2)}`
  },

  calculateOrdertotal: function(numberItems, subTotal){
    //calculate the shipping and tax amounts. Them use them to along with the cart total to figure out the order total.
    if (numberItems >= 1){
      this.shipping = 10;
      this.shipping += (numberItems * 2) - 2;
    }

    this.tax = subTotal * 0.06;
   return this.orderTotal = subTotal  + this.shipping + this.tax;
 

  },
getTotalNumberItems: function() {
  if(getLocalStorage("so-cart")){
  return  parseInt(Object.keys(getLocalStorage("so-cart")).length);
  }
  return 0;
},

getSubTotal: function () {
  let subTotal = 0

  const simpList = packageItems(this.list)
  for(const item of simpList) {
    subTotal += item.price
  }
  return subTotal
},

  displayOrderTotals: function() {
    //once the totals are all calculated display them in the order summary page.
      orderTotal.innerHTML = `${this.orderTotal}`
  
  },

  checkout: async function (form) {

    const json = formDataToJSON(form);

    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    try {
      await checkout(json);
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html"
      

    } catch (error) {
      for (let message in error.message){
        alertMessage(error.message[message])
      }
      //alertMessage(error);
    console.error(error);
    }
  },
   
  };


export default checkoutProccess;