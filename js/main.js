import { handleAuth, logout, socialLogin, onToggle } from './pages/login.js';
import { handleLocation, goToProfile, goToPost } from './router.js';
import { authService } from './firebase.js';
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
// import {
//   openEditBoxName,
//   closeEditBoxName,
//   changeName,
//   openEditBoxBlog,
//   closeEditBoxBlog,
//   changeBlog,
//   openEditBoxBirth,
//   closeEditBoxBirth,
//   changeBirth,
//   openEditBoxText,
//   closeEditBoxText,
//   changeText,
// } from './pages/profile.js';
import { showFeed } from './pages/feed.js';
import {
  savePost,
  updatePost,
  onEditing,
  deletePost,
  getPostList,
  getMyPost,
} from './pages/newPost.js';

// url 바뀌면 handleLocation 실행하여 화면 변경
window.addEventListener('hashchange', handleLocation);

// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener('DOMContentLoaded', function () {
  // Firebase 연결상태를 감시
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      // <<<<<<< HEAD
      //             // 로그인 상태이므로 항상 홈화면으로 이동
      //             if (hash === "") {
      //                 // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
      //                 window.location.replace("#home");
      // =======
      console.log('로그인');
      if (hash === '#login') {
        window.location.replace('');
      }
    } else {
      console.log('로그아웃');
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      // if (hash !== "") {
      //     window.location.replace("");
      // }
    }
  });
});
// type=module, 모듈객체는 지역적으로 밖에 사용 불가. 따라서 윈도우객체에 할당함으로써 전역적으로 사용 가능해짐
// onclick, onchange, onsubmit 이벤트 핸들러 리스트
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.showFeed = showFeed;
window.goToPost = goToPost;
window.savePost = savePost;
window.updatePost = updatePost;
window.onEditing = onEditing;
window.deletePost = deletePost;
window.getPostList = getPostList;
window.getMyPost = getMyPost;
window.openEditBoxName = openEditBoxName;
window.closeEditBoxName = closeEditBoxName;
window.openEditBoxBlog = openEditBoxBlog;
window.closeEditBoxBlog = closeEditBoxBlog;
window.openEditBoxBirth = openEditBoxBirth;
window.closeEditBoxBirth = closeEditBoxBirth;
window.openEditBoxText = openEditBoxText;
window.closeEditBoxText = closeEditBoxText;

window.onFileChange = onFileChange;
window.changeProfile = changeProfile;

window.saveName = saveName;
window.saveBlog = saveBlog;
window.saveBirth = saveBirth;
window.saveText = saveText;
window.getBirth = getBirth;
window.userBirth = userBirth;
window.getText = getText;
window.userText = userText;
