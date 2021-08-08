import Product from "../components/product";
import { getProducts } from "../firebase/utils";

async function main() {
  const products = await getProducts();
  products.forEach((product) =>
    Product(product, document.querySelector(".container") as HTMLDivElement)
  );
}

window.addEventListener("load", () => {
  main();
});
