import firebase from "firebase";
import { fireAuth } from "../firebase";
import { Product } from "../types/product";
import { getProduct, getUserId, getUserName } from "../firebase/utils";

const imageEle = document.querySelector(".detail-pic") as HTMLDivElement;
const titleEle = document.querySelector(".title") as HTMLDivElement;
const dateEle = document.querySelector(".date") as HTMLDivElement;
const priceEle = document.querySelector(".price") as HTMLDivElement;
const userEle = document.querySelector(".uploader") as HTMLHeadingElement;
const editEle = document.querySelector("#edit") as HTMLButtonElement;

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");
if (id) {
  getProduct(id)
    .then((result) => {
      const { image, title, date, price, userName, uid } =
        result.data() as Product;

      const userId = getUserId();
      if (userId === uid) {
        editEle.hidden = false;
        editEle.onclick = () => {
          window.location.href = `/edit?id=${id}`;
        };
      }

      userEle.innerText = `올린사람 : ${userName}`;
      imageEle.style.backgroundImage = `url(${image})`;
      titleEle.innerText = title;
      dateEle.innerText = date;
      priceEle.innerText = `${Number(price).toLocaleString()} 원`;
    })
    .catch(console.log);
}

(document.querySelector("#userName") as HTMLSpanElement).innerText =
  getUserName();
