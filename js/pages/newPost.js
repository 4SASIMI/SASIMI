import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { dbService, authService } from '../firebase.js';

export const savePost = async (event) => {
  event.preventDefault();
  const post = document.getElementById('writePost');
  const title = document.getElementById('writeTitle');
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, 'posts'), {
      title: title.value,
      text: post.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    post.value = '';
  } catch (error) {
    alert(error);
    console.log('error in addDoc:', error);
  }
};

// export const getPostList = async () => {
//   let cmtObjList = [];
//   const q = query(collection(dbService, 'posts'), orderBy('createdAt', 'desc'));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const commentObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     cmtObjList.push(commentObj);
//   });
//   const postList = document.getElementById('postList');
//   const currentUid = authService.currentUser.uid;
//   commnetList.innerHTML = '';
//   cmtObjList.forEach((cmtObj) => {
//     const isOwner = currentUid === cmtObj.creatorId;
//     const temp_html = `<div class="card commentCard">
//           <div class="card-body">
//               <blockquote class="blockquote mb-0">
//                   <p class="commentText">${cmtObj.text}</p>
//                   <p id="${
//                     cmtObj.id
//                   }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
//                   <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
//                     cmtObj.profileImg
//                   }" alt="profileImg" /><span>${
//       cmtObj.nickname ?? '닉네임 없음'
//     }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
//       .toString()
//       .slice(0, 25)}</div></footer>
//               </blockquote>
//               <div class="${isOwner ? 'updateBtns' : 'noDisplay'}">
//                    <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
//                 <button name="${
//                   cmtObj.id
//                 }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
//               </div>
//             </div>
//      </div>`;
//     const div = document.createElement('div');
//     div.classList.add('mycards');
//     div.innerHTML = temp_html;
//     postList.appendChild(div);
//   });
// };