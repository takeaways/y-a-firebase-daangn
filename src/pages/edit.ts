import { Product } from "../types/product";
import { getProduct, getUserId, updateProduct } from "../firebase/utils";
import { fireStore } from "../firebase";

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");
const titleEl = document.querySelector("#title") as HTMLInputElement;
const contentEl = document.querySelector("#content") as HTMLTextAreaElement;
const priceEl = document.querySelector("#price") as HTMLInputElement;
const sendEl = document.querySelector("#send") as HTMLButtonElement;
if (id) {
  let product: Product;

  getProduct(id).then(async (result) => {
    product = result.data() as Product;
    titleEl.value = product.title;
    priceEl.value = String(product.price);
    contentEl.value = product.content;

    const user = await (
      await fireStore.collection("user").doc(getUserId()).get()
    ).data();

    if (product.uid !== getUserId()) {
      if (user?.role === "admin") {
        return;
      }
      window.location.href = "/";
    }
  });

  sendEl.onclick = () => {
    const title = titleEl.value;
    const content = contentEl.value;
    const price = priceEl.value;

    updateProduct(id, {
      ...product,
      content,
      title,
      price: Number(price),
    });
  };
}
