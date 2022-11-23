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

export const saveName = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("comment");
  const { uid } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "name"), {
      name: comment.value,
      creatorId: uid,
    });
    comment.value = "";
    closeEditBoxName();
    alert('변경 완료!');
    // getCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};


