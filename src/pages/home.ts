import Product from "../components/product";
import { getProducts, getUserName } from "../firebase/utils";
import { fireAuth } from "../firebase";

async function main() {
  const products = await getProducts();
  products.forEach((product) =>
    Product(product, document.querySelector(".container") as HTMLDivElement)
  );
}

window.addEventListener("load", () => {
  main();
});

getUserName().then((displayName) => {
  (document.querySelector("#userName") as HTMLSpanElement).innerText =
    displayName;
});
