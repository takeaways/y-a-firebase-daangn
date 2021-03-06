import { Product } from "../types/product";

export default function Product(
  { title, date, price, image, id }: Product,
  parents: Element
) {
  const product = document.createElement("div");
  product.setAttribute("class", "product");
  product.innerHTML = `
    <div
      class="thumbnail"
      style="background-image: url('${image}')"
    ></div>
    <div class="flex-grow-1 p-4">
      <h5 class="title"><a href="/detail?id=${id}"> ${title}</a></h5>
      <p class="date">${date}</p>
      <p class="price">${Number(price).toLocaleString()}원</p>
      <p class="float-end">🤍0</p>
    </div>
  `;
  parents.appendChild(product);
}
