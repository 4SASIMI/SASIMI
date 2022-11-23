// import { authService, storageService } from "../firebase.js";
// import {
//   ref,
//   uploadString,
//   getDownloadURL,
//   deleteObject
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// // Storage에서 이미지 저장 위치 지정.
// // 현 코드에서는 userId 폴더 내에 파일명은 uuid(전세계 유일한 ID)로 설정
// const imgRef = ref(
//     storageService,
//     `${authService.currentUser.uid}/${uuidv4()}`
//   );
// // 파일 저장 API. 파일 포맷이 data_url인 경우
// uploadString(imgRef, imgDataUrl, "data_url");

// // 파일 삭제
// deleteObject(ref(storageService, attachmentUrl));

// function editForm() {
//   let name = document.getElementById('name');
//   console.log(name);
// }

///////////////////////////////////////////////////

export function openEditBoxName() {
  let name = document.getElementById('name');
  let editName = document.getElementById('editName');

  name.style.display='none';
  editName.style.display='block';
}

export function closeEditBoxName() {
  let name = document.getElementById('name');
  let editName = document.getElementById('editName');

  name.style.display='block';
  editName.style.display='none';
}

export function changeName() {
  let name = document.getElementById('name');
  let editName = document.getElementById('editName');

  // let nameVal = name.childNodes[1].innerText;
  let editNameVal = editName.childNodes[1].childNodes[1].childNodes[1].value;

  name.childNodes[1].innerText = editNameVal;
  
  name.style.display='block';
  editName.style.display='none';
}

/////////////////////////////////////////////////////

export function openEditBoxBlog() {
  let blog = document.getElementById('blog');
  let editBlog = document.getElementById('editBlog');

  blog.style.display='none';
  editBlog.style.display='block';
}

export function closeEditBoxBlog() {
  let blog = document.getElementById('blog');
  let editBlog = document.getElementById('editBlog');

  blog.style.display='block';
  editBlog.style.display='none';
}

export function changeBlog() {
  let blog = document.getElementById('blog');
  let editBlog = document.getElementById('editBlog');

  // let blogVal = blog.childNodes[1].innerText;
  let editBlogVal = editBlog.childNodes[1].childNodes[1].childNodes[1].value;

  console.log(blog.childNodes[1].childNodes[0].href);

  blog.childNodes[1].childNodes[0].href = editBlogVal;

  console.log(blog.childNodes[1].childNodes[0].href);

  blog.style.display='block';
  editBlog.style.display='none';
}

/////////////////////////////////////////////////////

export function openEditBoxBirth() {
  let birth = document.getElementById('birth');
  let editBirth = document.getElementById('editBirth');

  birth.style.display='none';
  editBirth.style.display='block';
}

export function closeEditBoxBirth() {
  let birth = document.getElementById('birth');
  let editBirth = document.getElementById('editBirth');

  birth.style.display='block';
  editBirth.style.display='none';
}

export function changeBirth() {
  let birth = document.getElementById('birth');
  let editBirth = document.getElementById('editBirth');

  let editBirthVal = editBirth.childNodes[1].childNodes[1].childNodes[1].value;

  birth.childNodes[1].innerText = editBirthVal;
  
  birth.style.display='block';
  editBirth.style.display='none';
}

/////////////////////////////////////////////////////

export function openEditBoxText() {
  let text = document.getElementById('text');
  let editText = document.getElementById('editText');

  text.style.display='none';
  editText.style.display='block';
}

export function closeEditBoxText() {
  let text = document.getElementById('text');
  let editText = document.getElementById('editText');

  text.style.display='block';
  editText.style.display='none';
}

export function changeText() {
  let text = document.getElementById('text');
  let editText = document.getElementById('editText');

  let editTextVal = editText.childNodes[1].childNodes[1].childNodes[1].value;

  text.childNodes[1].innerText = editTextVal;
  
  text.style.display='block';
  editText.style.display='none';
}