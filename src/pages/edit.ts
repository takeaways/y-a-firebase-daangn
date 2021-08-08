import { Product } from "../types/product";
import { getProduct, updateProduct } from "../firebase/utils";

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");
const titleEl = document.querySelector("#title") as HTMLInputElement;
const contentEl = document.querySelector("#content") as HTMLTextAreaElement;
const priceEl = document.querySelector("#price") as HTMLInputElement;
const sendEl = document.querySelector("#send") as HTMLButtonElement;
if (id) {
  let product: Product;

  getProduct(id).then((result) => {
    product = result.data() as Product;
    titleEl.value = product.title;
    priceEl.value = product.price;
    contentEl.value = product.content;
  });

  sendEl.onclick = () => {
    const title = titleEl.value;
    const content = contentEl.value;
    const price = priceEl.value;

    updateProduct(id, {
      ...product,
      content,
      title,
      price,
    });
  };
}
