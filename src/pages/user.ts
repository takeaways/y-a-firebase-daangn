import firebase from "firebase";
import { fireAuth } from "../firebase";

import { signUp, signIn, logOut } from "../firebase/utils";

const register = document.querySelector("#register") as HTMLButtonElement;
const nameNew = document.querySelector("#name-new") as HTMLInputElement;
const emailNew = document.querySelector("#email-new") as HTMLInputElement;
const pwNew = document.querySelector("#pw-new") as HTMLInputElement;

register.addEventListener("click", async () => {
  try {
    const { user } = await signUp(emailNew.value, pwNew.value);
    user?.updateProfile({ displayName: nameNew.value });
  } catch (error) {
    console.log(error);
  }
});

const login = document.querySelector("#login") as HTMLButtonElement;
const email = document.querySelector("#email") as HTMLInputElement;
const pw = document.querySelector("#pw") as HTMLInputElement;

login.addEventListener("click", async () => {
  try {
    await signIn(email.value, pw.value);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
});

const logout = document.querySelector("#logout") as HTMLButtonElement;
logout.onclick = async () => {
  logOut();
  localStorage.removeItem("user");
};

const user = localStorage.getItem("user");
if (user) {
  (document.querySelector("#userName") as HTMLSpanElement).innerText =
    (JSON.parse(user) as firebase.User).displayName ?? "";
}

fireAuth.onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
});
