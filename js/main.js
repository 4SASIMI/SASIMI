import { handleAuth, onToggle, logout, socialLogin } from "./pages/login.js";
import { handleLocation, goToProfile } from "./router.js";
import { authService } from "./firebase.js";
import { loadingSpinner,cardMenu, getFeedList, deleteFeed } from "./pages/feed.js";
import { savePost } from "./pages/newPost.js";
import { openEditBoxName, closeEditBoxName, changeName, openEditBoxBlog, 
    closeEditBoxBlog, changeBlog, openEditBoxBirth, closeEditBoxBirth, 
    changeBirth, openEditBoxText, closeEditBoxText, changeText} from "./pages/profile.js";

// url 바뀌면 handleLocation 실행하여 화면 변경
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded", function () {
    // Firebase 연결상태를 감시
    authService.onAuthStateChanged((user) => {
        // Firebase 연결되면 화면 표시
        console.log("파이어베이스연결")
        handleLocation();
        const hash = window.location.hash;
        if (user) {
            console.log("로그인")
            if (hash === "#login") {
                window.location.replace("");
            }
        } else {
            console.log("로그아웃")
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
window.getFeedList = getFeedList;
window.savePost = savePost;
window.deleteFeed = deleteFeed;
window.cardMenu = cardMenu;
window.loadingSpinner = loadingSpinner;

// 프로필
window.openEditBoxName = openEditBoxName;
window.closeEditBoxName = closeEditBoxName;
window.changeName = changeName;
window.openEditBoxBlog = openEditBoxBlog;
window.closeEditBoxBlog = closeEditBoxBlog;
window.changeBlog = changeBlog;
window.openEditBoxBirth = openEditBoxBirth;
window.closeEditBoxBirth = closeEditBoxBirth;
window.changeBirth = changeBirth;
window.openEditBoxText = openEditBoxText;
window.closeEditBoxText = closeEditBoxText;
window.changeText = changeText;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;
