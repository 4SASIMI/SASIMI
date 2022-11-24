import { handleAuth, logout, socialLogin, onToggle } from "./pages/login.js";
import { handleLocation, goToProfile } from "./router.js";
import { authService } from "./firebase.js";
import { openEditBoxName, closeEditBoxName, openEditBoxBlog, 
    closeEditBoxBlog, openEditBoxBirth, closeEditBoxBirth, 
    openEditBoxText, closeEditBoxText, changeProfile, onFileChange} from "./pages/profile_img.js";
import { saveName, saveBlog, saveBirth, saveText, getBirth, userBirth, getText, userText } from "./pages/profile_text.js";


// url 바뀌면 handleLocation 실행하여 화면 변경
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded", function () {
    // Firebase 연결상태를 감시
    authService.onAuthStateChanged((user) => {
        // Firebase 연결되면 화면 표시
        handleLocation();
        const hash = window.location.hash;
        const postBtn = document.getElementById("newPost");
        if (user) {
            // <<<<<<< HEAD
            //             // 로그인 상태이므로 항상 홈화면으로 이동
            //             if (hash === "") {
            //                 // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
            //                 window.location.replace("#home");
            // =======
            console.log("로그인")
            postBtn.style.display = 'block';
            if (hash === "#login") {
                window.location.replace("");
            }
        } else {
            console.log("로그아웃")
            postBtn.style.display = 'none';
            // 로그아웃 상태이므로 로그인 화면으로 강제 이동
            // if (hash !== "") {
            //     window.location.replace("");
            // }
        }
    });
});
// 드롭다운 버튼 외부의 영역 클릭 시 사라지게
window.addEventListener('mousedown', function (event) {
    const dropdown1 = this.document.querySelector('.navbarUserAccountMenu');
    const dropdown2 = this.document.querySelector('.navbarBeforeLogin');
    if (!dropdown1.contains(event.target)) {
        dropdown1.classList.remove('active')
    }
    if (!dropdown2.contains(event.target)) {
        dropdown2.classList.remove('active')
    }
});

// type=module, 모듈객체는 지역적으로 밖에 사용 불가. 따라서 윈도우객체에 할당함으로써 전역적으로 사용 가능해짐
// onclick, onchange, onsubmit 이벤트 핸들러 리스트

window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.onToggle = onToggle;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;

//////////////////기동////////////////////
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
