import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {jwtDecode} from "jwt-decode";
import { alertMessage } from "./utils.mjs";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
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

  // is token expired
  if (isValid) {
    return true;
  } else {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
    return false;
  }
}

function tokenValid(token) {
  if (token) {
    const decode = jwtDecode(token.accessToken);
    let currentDate = new Date();

    if (currentDate.getTime() < decode.exp * 1000) {
      // exipration is less than the current date... its expire
      return true;
    }
  } else {
    return false;
  }
}
