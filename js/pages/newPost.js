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
import { goToPost } from '../router.js';

export const savePost = async (event) => {
  event.preventDefault();
  const post = document.getElementById('writePost');
  const postTitle = document.getElementById('writeTitle');
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, 'posts'), {
      title: postTitle.value,
      text: post.value.replace(/(\n|\r\n)/g, '<br>').replace(/ /g, '&nbsp'),
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

export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll('.postEditBtn, .postDeleteBtn');
  udBtns.forEach((udBtn) => (udBtn.disabled = 'true'));

  const postBody = event.target.parentNode.parentNode.parentNode;
  const postText = postBody.children[1].children[0];
  const postInputP = postBody.children[1].children[1];

  postText.classList.add('noDisplay');
  postInputP.classList.add('yesDisplay');
  postInputP.classList.remove('noDisplay');
  postInputP.children[0].focus();
};

export const updatePost = async (event) => {
  event.preventDefault();
  const newPost = event.target.parentNode.children[0].value
    .replace(/(\n|\r\n)/g, '<br>')
    .replace(/ /g, '&nbsp');
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const postText = parentNode.children[0];
  postText.classList.remove('noDisplay');
  const postInputP = parentNode.children[1];
  postInputP.classList.remove('yesDisplay');
  postInputP.classList.add('noDisplay');

  const postRef = doc(dbService, 'posts', id);
  try {
    await updateDoc(postRef, { text: newPost });
    getPostList();
  } catch (error) {
    alert(error);
  }
};

export const deletePost = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm('해당 글을 정말 삭제하시겠습니까?');

  if (ok) {
    try {
      await deleteDoc(doc(dbService, 'posts', id));
      window.location.replace('/');
    } catch (error) {
      alert(error);
    }
  }
};

export const getPostList = async () => {
  let postObjList = [];
  const q = query(collection(dbService, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    postObjList.push(postObj);
  });
  const postList = document.getElementById('postList');
  const currentUid = authService.currentUser.uid;

  postList.innerHTML = '';

  postObjList.forEach((postObj) => {
    const isOwner = currentUid === postObj.creatorId;
    const isPost = postObj.id === localStorage.getItem('docID');
    const temp_html = `<div class="postWrap ${
      isPost ? 'yesDisplay' : 'noDisplay'
    }" id="${postObj.id}">
                        <div class="postTitle">
                          <h2>${postObj.title}</h2>
                        </div>
                        <div class="postDesc">
                          <p>
                            ${postObj.text}
                          </p>
                          <p id="${postObj.id}" class="noDisplay">
                                <textarea class="writePost" placeholder="제목" id="post"></textarea><button class="updateBtn" onclick="updatePost(event)">완료</button></p>
                          <span class="postDate">${new Date(postObj.createdAt)
                            .toString()
                            .slice(0, 25)}</span>
                        </div>
                        <div class="postProfile">
                          <img class="cmtImg profileImg" width="50px" height="50px" src="${
                            postObj.profileImg
                          }" alt="profileImg" />
                          <span class="profileName">${
                            postObj.nickname ?? '닉네임 없음'
                          }</span>
                          <div class="postChangeGroup ${
                            isOwner ? 'updateBtns' : 'noDisplay'
                          }">
                            <button class="postEditBtn postBtn" onclick="onEditing(event)">수정</button>
                            <button name="${
                              postObj.id
                            }" class="postDeleteBtn postBtn" onclick="deletePost(event)">삭제</button>
                          </div>
                        </div>
                      </div>`;

    const div = document.createElement('div');
    div.classList.add('myPost');
    div.innerHTML = temp_html;
    if (isPost) {
      postList.appendChild(div);
    }
  });
};
