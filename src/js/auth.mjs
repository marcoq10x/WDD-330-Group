import { loginRequest } from "./externalServices.mjs"
import { getLocalStorage, setLocalStorage } from "./utils.mjs"
import { jwt_decode } from "jwt-decode";


const tokenKey = "so-token";

export async function login(creds, redirect = "/"){
  console.log("Auth:3 Credd: ", creds)
  console.log("Auth:4: Redirect", redirect)

  const token = await loginRequest(email, password)
  try {
    setLocalStorage(tokenKey, token);
    window.location = redirect;

  } catch (error) {
    alertMessage(error.message.message)
  }
}

export function checkLogin (redirect) {
  const jwtToken = getLocalStorage(tokenKey);
  const isValid = tokenValid(jwtToken)

   if(isValid) { // is token expired
      window.location = redirect
  } else {
    
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
    window.location = "/login"
  }
}

function tokenValid (token) {
  if(token){
    const decode = jwt_decode(token)
    let currentDate = new Date();

    if(currentDate.getTime() > decode.exp * 1000) {
      // exipration is less than the current date... its expire
      console.log("Auth:39 EXPIRED TOKEN")
      return false;
    } else {
       console.log("Auth:39 VALID TOKEN")
       return true;
    }
   
  } else {
      return false;
  }
}