import { loadHeaderFooter, getParam } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";

loadHeaderFooter();

const urlParam = getParam("redirect");
//checkRedirect();

// this is how it would look if we listen for the submit on the form
document.forms["login"].addEventListener("submit", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) {
    // e.target would contain our form in this case
    loginRequest(e.target, urlParam);
  }
});
