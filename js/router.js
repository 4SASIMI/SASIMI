import { authService, dbService } from './firebase.js';
import { showFeed } from './pages/feed.js';
import {
  getMyPost,
  getPostList,
  updateView,
  getCommentList,
} from './pages/newPost.js';
import {
  openEditBoxName,
  closeEditBoxName,
  openEditBoxBlog,
  closeEditBoxBlog,
  openEditBoxBirth,
  closeEditBoxBirth,
  openEditBoxText,
  closeEditBoxText,
  changeProfile,
  onFileChange,
} from './pages/profile_img.js';
import {
  saveName,
  saveBlog,
  saveBirth,
  saveText,
  getBirth,
  userBirth,
  getText,
  userText,
} from './pages/profile_text.js';
const routes = {
  '/': '/pages/feed.html',
  newPost: '/pages/newPost.html',
  404: '/pages/404.html',
  home: '/pages/home.html',
  // "/": "/pages/login.html",
  register: '/pages/register.html',
  login: '/pages/login.html',
  profile: '/pages/profile.html',
  post: '/pages/post.html',
};

export const handleLocation = async () => {
  let path = window.location.hash.replace('#', '');
  const pathName = window.location.pathname;

  // Live Server를 index.html에서 오픈할 경우
  if (pathName === '/index.html') {
    window.history.pushState({}, '', '/');
  }
  if (path.length == 0) {
    path = '/';
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById('root').innerHTML = html;
  // path가 /인 페이지(feed.html)에서 nickname이라는 id를 가진애가 없어서 오류발생, 주석처리 해놨어요.
  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === '/') {
    //     // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    //     document.getElementById("nickname").textContent =
    //         authService.currentUser.displayName ?? "닉네임 없음";

    //     document.getElementById("profileImg").src =
    //         authService.currentUser.photoURL ?? "../assets/blankProfile.webp";

    showFeed();
  }
  // if (path === "profile") {
  //     // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
  //     document.getElementById("profileView").src =
  //         authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
  //     document.getElementById("profileNickname").placeholder =
  //         authService.currentUser.displayName ?? "닉네임 없음";
  // }
  if (path == 'post') {
    document.getElementById('nickname').textContent =
      authService.currentUser?.displayName ?? '닉네임 없음';

    document.getElementById('profileImg').src =
      authService.currentUser?.photoURL ?? '../assets/blankProfile.webp';
    if (!localStorage.getItem('docID')) {
      getMyPost();
    } else {
      updateView();
      getPostList();
      getCommentList();
    }
    if (!authService.currentUser) {
      const writeComment = document.getElementById('myComment');
      const commentTitle = document.getElementById('commentTitle');
      writeComment.classList.add('noDisplay');
      commentTitle.classList.remove('noDisplay');
      commentTitle.classList.remove('yesDisplay');
    }
  }
  if (path == 'newPost') {
    if (!authService.currentUser) {
      alert('로그인해주세요');
      window.location.replace('#login');
    }
    // else{
    //   const deleteBtn = document.querySelector('.postDeleteBtn');
    //   if(deleteBtn === '삭제')
    // }
  }
  if (path === 'profile') {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    document.getElementById('image').src =
      authService.currentUser.photoURL ?? '/assets/blankProfile.webp';
    document.getElementById('nameText').innerHTML =
      authService.currentUser.displayName ?? '이름을 입력해주세요';
    getBirth();
    getText();
  }
};

export const goToProfile = () => {
  window.location.hash = '#profile';
};

export const goToPost = (id) => {
  localStorage.clear();
  localStorage.setItem('docID', id.id);
  window.location.hash = '#post';
};
