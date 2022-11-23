import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export const showFeed = async () => {
  let feedObjList = [];
  const q = query(
    collection(dbService, "posts"),
    orderBy("createdAt", "desc"),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const feedObj = {
      id: doc.id,
      ...doc.data()
    };
    console.log(feedObj);
    feedObjList.push(feedObj);
    
  });
  const feedList = document.getElementById("feed");
  const currentUid = authService.currentUser.uid;
  feedList.innerHTML = "";
  feedObjList.forEach((feedObj) => {
    const temp_html = `<div class="card">
                <img class="cardProfile" src="${feedObj.profileImg}"alt="profileImg" />
                <div class="cardTitle">
                    <span class="tooltip">${feedObj.title}</span>
                    ${feedObj.title}
                </div>
                <div class="cardContent">${feedObj.text}</div>
                <div class="cardDate">${new Date(feedObj.createdAt)
                    .toString()
                    .slice(0, 25)}</div>
            </div>`;
    const div = document.createElement("div");
    div.classList.add("myCard");
    div.innerHTML = temp_html;
    feedList.appendChild(div);
  });
};
