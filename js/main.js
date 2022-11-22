import { handleAuth, onToggle, logout } from "./pages/login.js";
import { socialLogin } from "./pages/login.js";
import { handleLocation, goToProfile } from "./router.js";
import { authService } from "./firebase.js";
import { openEditBoxName, closeEditBoxName, changeName, openEditBoxBlog, 
    closeEditBoxBlog, changeBlog, openEditBoxBirth, closeEditBoxBirth, 
    changeBirth, openEditBoxText, closeEditBoxText, changeText, changeProfile, onFileChange} from "./pages/profile.js";

// url 바뀌면 handleLocation 실행하여 화면 변경
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded", function () {
    // Firebase 연결상태를 감시
    authService.onAuthStateChanged((user) => {
        // Firebase 연결되면 화면 표시
        // handleLocation() : 화면을 띄우는 역할
        handleLocation();
        const hash = window.location.hash;
        if (user) {
            // 로그인 상태이므로 항상 팬명록 화면으로 이동
            if (hash === "") {
                // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
                window.location.replace("#home");
            }
        } else {
            // 로그아웃 상태이므로 로그인 화면으로 강제 이동
            if (hash !== "") {
                window.location.replace("");
            }
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
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;

//////////////////프로필////////////////////
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