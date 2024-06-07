import {getLocalStorage} from "./utils.mjs";
import {checkout} from "./externalServices.mjs"

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
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
          id: item.Id,
          price: item.FinalPrice,
          name: item.Name,
          quantity: 1,
        };
          
        });
        return simplifiedItems;
      }


const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: (key, outputSelector) {
        this.key = key; //key is the "name" of the form input.
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key); 
        this.calculateItemSummary();
    },

calculateItemSummary: function(){
    //Get the elements that display the number of items and the total amount.
    const numItems = document.querySelector("#num-items");
    const cartTotal = document.querySelector("#cartTotal");

    //Calculate the total number of items and the total amount
    const totalNumberofItems = getTotalNumberItems();
    const totalAmount = getTotal ();

    //Update the inner HTML of the elements with the total amount
    numItems.innerHTML = `${totalNumberofItems()} items`;
    this.itemTotal = totalAmount;
    cartTotal.innerHTML = `${this.itemTotal.toFixed(2)} $`;
},

calculateOrdertotal: function(){
    //calculate the shipping and tax amounts. Them use them to along with the cart total to figure out the order total.
    let numberItems = getTotalNumberItems();  
    if (numberItems >= 1){
      this.shipping = 10;
      this.shipping += (numberItems * 2) - 2;
    }

    this.tax = this.itemTotal * 0.06;
    this.orderTotal =  this.itemTotal + this.shipping + this.tax;

    // display the totals.
    this.displayOrderTotals();
  }
},

displayOrderTotals: function(){
    //once the totals are all calculated display them in the order summary page.

}


 
  
    async checkout(form) {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
  
      // call the checkout method in our externalServices module and send it our data object.
    }
  


export default checkoutProcess;