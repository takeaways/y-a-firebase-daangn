import {
  uploadProduct,
  uploadImage,
  getUserId,
  getUserName,
} from "../firebase/utils";

const titleEl = document.querySelector("#title") as HTMLInputElement;
const contentEl = document.querySelector("#content") as HTMLTextAreaElement;
const priceEl = document.querySelector("#price") as HTMLInputElement;
const fileEl = document.querySelector("#image") as HTMLInputElement;
const submitEl = document.querySelector("#send") as HTMLButtonElement;

submitEl.addEventListener("click", async () => {
  const title = titleEl.value;
  const content = contentEl.value;
  const price = priceEl.value;
  let image: string = "https://via.placeholder.com/350";

  const file = fileEl.files?.[0];
  if (file) {
    image = await uploadImage(file);
  }

  try {
    await uploadProduct({
      title,
      content,
      price,
      date: new Date().toLocaleString(),
      image,
      uid: getUserId(),
      userName: getUserName(),
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
});
