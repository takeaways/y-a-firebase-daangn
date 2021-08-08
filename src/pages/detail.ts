import firebase from "firebase";
import { fireAuth } from "../firebase";
import { Product } from "../types/product";
import { getProduct, getUserName } from "../firebase/utils";

const imageEle = document.querySelector(".detail-pic") as HTMLDivElement;
const titleEle = document.querySelector(".title") as HTMLDivElement;
const dateEle = document.querySelector(".date") as HTMLDivElement;
const priceEle = document.querySelector(".price") as HTMLDivElement;

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");
if (id) {
  getProduct(id)
    .then((result) => {
      const { image, title, date, price } = result.data() as Product;

      imageEle.style.backgroundImage = `url(${image})`;
      titleEle.innerText = title;
      dateEle.innerText = date;
      priceEle.innerText = `${Number(price).toLocaleString()} 원`;
    })
    .catch(console.log);
}

getUserName().then((displayName) => {
  (document.querySelector("#userName") as HTMLSpanElement).innerText =
    displayName;
});
