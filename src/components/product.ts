import { Product } from "../types/product";

export default function Product(
  { title, date, price, image }: Product,
  parents: Element
) {
  const product = document.createElement("div");
  product.setAttribute("class", "product");
  product.innerHTML = `
  <div class="product">
      <div
        class="thumbnail"
        style="background-image: url('${image}')"
      ></div>
      <div class="flex-grow-1 p-4">
        <h5 class="title">${title}</h5>
        <p class="date">${date}</p>
        <p class="price">${price}원</p>
        <p class="float-end">🤍0</p>
      </div>
    </div>
  `;
  parents.appendChild(product);
}
