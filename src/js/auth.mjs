import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import * as jwtDecode from "jwt-decode";
import { alertMessage } from "./utils.mjs";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
  console.log("Auth:9 Credd: ", creds);
  console.log("Auth:10: Redirect", redirect);

  try {
    const token = await loginRequest(creds.email.value, creds.password.value);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (error) {
    console.log("Auth:18: Error: ", error);
    alertMessage(error.message.message);
  }
}

export function checkLogin(redirect) {
  const jwtToken = getLocalStorage(tokenKey);
  const isValid = tokenValid(jwtToken);

  if (isValid) {
    // is token expired
    console.log("Auth:28: Token is valid");
    window.location = redirect;
  } else {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
    window.location = "/login";
  }
}

function tokenValid(token) {
  if (token) {
    const decode = jwtDecode.jwt_decode(token);
    let currentDate = new Date();

    if (currentDate.getTime() > decode.exp * 1000) {
      // exipration is less than the current date... its expire
      console.log("Auth:39 EXPIRED TOKEN");
      return false;
    } else {
      console.log("Auth:39 VALID TOKEN");
      return true;
    }
  } else {
    return false;
  }
}
