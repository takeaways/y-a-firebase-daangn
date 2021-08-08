import { fireStore } from "../firebase";
import { getUserId } from "../firebase/utils";

let currentId: string;
fireStore
  .collection("chatroom")
  .where("who", "array-contains", getUserId()) // in ["a1", "n2"]
  .get()
  .then((room) => {
    const fragment = document.createDocumentFragment();
    room.docs.forEach((doc) => {
      const li = document.createElement("li");
      li.setAttribute("class", "list-group-item");
      li.innerHTML = `
        <h6>${doc.data().product}</h6>
        <h6 class="text-small">${doc.id}</h6>
      `;
      li.addEventListener("click", () => {
        currentId = doc.id;
        fireStore
          .collection("chatroom")
          .doc(currentId)
          .collection("messages")
          .orderBy("date")
          .onSnapshot((result) => {
            const chatContent = document.querySelector(
              ".chat-content"
            ) as HTMLUListElement;
            chatContent.innerHTML = "";
            const fragment: any = [];
            result.forEach((doc) => {
              fragment.push(`
                <li>
                  <span class="chat-box ${
                    doc.data().uid === getUserId() && "mine"
                  }">
                    ${doc.data().content}
                  </span>
                </li>
              `);
            });
            chatContent.innerHTML = fragment.join("");
            (
              document.querySelector(
                ".chat-content li:last-child"
              ) as HTMLLIElement
            ).scrollIntoView({ behavior: "smooth" });
          });
      });
      fragment.append(li);
    });

    (document.querySelector(".chat-list") as HTMLUListElement).append(fragment);
  });

const chatInput = document.querySelector("#chat-input") as HTMLInputElement;
const send = document.querySelector("#send") as HTMLButtonElement;

send.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  const data = {
    content: chatInput.value,
    date: new Date(),
    uid: getUserId(),
  };

  fireStore
    .collection("chatroom")
    .doc(currentId)
    .collection("messages")
    .add(data);
});
