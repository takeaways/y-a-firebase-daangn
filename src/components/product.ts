import { Product } from "../types/product";

export default function Product(
  { title, date, price, image }: Product,
  parents: Element
) {
  const product = document.createElement("div");
  product.setAttribute("class", "product");
  product.innerHTML = `
    <div
      class="thumbnail"
      style="background-image: url('https://via.placeholder.com/350')"
    ></div>
    <div class="flex-grow-1 p-4">
      <h5 class="title">${title}</h5>
      <p class="date">${date}</p>
      <p class="price">${Number(price).toLocaleString()}원</p>
      <p class="float-end">🤍0</p>
    </div>
  `;
  parents.appendChild(product);
}
