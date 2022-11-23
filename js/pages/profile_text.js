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
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// export const saveName = async (event) => {
//   event.preventDefault();
//   let saveButton = document.getElementById('saveNameButton');
//   console.log(saveButton);
//   const comment = document.getElementById("nameComment");
//   const { uid } = authService.currentUser;
//   try {
//     await addDoc(collection(dbService, "name"), {
//       name: comment.value,
//       creatorId: uid
//     });
//     comment.value = "";
//     closeEditBoxName();
//     alert('작성 완료!');
//     // saveButton.style.display='none';
//     // editButton.style.display='block';
//     // getCommentList();
//   } catch (error) {
//     alert(error);
//     console.log("error in addDoc:", error);
//   }
// };

export const saveName = async (event) => {
  event.preventDefault();
  const newName = document.getElementById("nameComment").value;
  await updateProfile(authService.currentUser, {
    displayName: newName ? newName : null,
  })
    .then(() => {
      alert("프로필 수정 완료");
      window.location.reload();
      // window.location.hash = "#";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
};

export const saveBlog = async (event) => {
  event.preventDefault();
  let saveButton = document.getElementById('saveBlogButton');
  // console.log(saveButton);
  const comment = document.getElementById("blogComment");
  const { uid } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "blogUrl"), {
      url: comment.value,
      creatorId: uid
    });
    closeEditBoxName();
    alert('작성 완료!');
    window.location.reload();

    // let blog = document.getElementById('blog');
    // let blogVal = blog.childNodes[1].innerText;
    // let blogCommentVal = comment.value;
    // comment.value = "";

    // console.log(blogVal);
    // console.log(blogCommentVal);

    // console.log(blog.childNodes[1].childNodes[0].getAttribute('href'))

    // blog.childNodes[1].childNodes[0].removeAttribute('href');
    // console.log(blog.childNodes[1].childNodes[0].getAttribute('href'));

    // blog.childNodes[1].childNodes[0].setAttribute('href', blogCommentVal);
    // console.log(blog.childNodes[1].childNodes[0].getAttribute('href'));
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

// export const saveBirth = async (event) => {
//   event.preventDefault();
//   const newBirth = document.getElementById("birthComment").value;
//   await updateProfile(authService.currentUser, {
//     phoneNumber: newBirth ? newBirth : null,
//   })
//     .then(() => {
//       alert("프로필 수정 완료");
//       window.location.reload();
//       // window.location.hash = "#";
//     })
//     .catch((error) => {
//       alert("프로필 수정 실패");
//       console.log("error:", error);
//     });
// };

export const saveBirth = async (event) => {
  event.preventDefault();
  let saveButton = document.getElementById('saveBlogButton');
  // console.log(saveButton);
  const comment = document.getElementById("birthComment");
  const { uid } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "birth"), {
      birth: comment.value,
      creatorId: uid
    });
    closeEditBoxName();
    alert('작성 완료!');
    window.location.reload();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const saveText = async (event) => {
  event.preventDefault();
  let saveButton = document.getElementById('saveTextButton');
  // console.log(saveButton);
  const comment = document.getElementById("textComment");
  const { uid } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "text"), {
      text: comment.value,
      creatorId: uid
    });
    closeEditBoxName();
    alert('작성 완료!');
    window.location.reload();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const getBirth = async () => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, "birth"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
    alert(cmtObjList);
  });
}