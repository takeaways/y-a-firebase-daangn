import { uploadProduct } from "../firebase/utils";

const titleEl = document.querySelector("#title") as HTMLInputElement;
const contentEl = document.querySelector("#content") as HTMLTextAreaElement;
const priceEl = document.querySelector("#price") as HTMLInputElement;
const submitEl = document.querySelector("#send") as HTMLButtonElement;

submitEl.addEventListener("click", async () => {
  const title = titleEl.value;
  const content = contentEl.value;
  const price = priceEl.value;

  try {
    await uploadProduct({
      title,
      content,
      price,
      date: new Date().toLocaleString(),
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
});
