import { authService } from "./firebase.js";
import { getFeedList } from "./pages/feed.js"

const routes = {
    "/": "/pages/feed.html",
    newPost: "/pages/newPost.html",
    404: "/pages/404.html",
    register: "/pages/register.html",
    login: "/pages/login.html",
    profile: "/pages/profile.html",
    post: "/pages/post.html",

};

export const handleLocation = async () => {
    let path = window.location.hash.replace("#", "");
    const pathName = window.location.pathname;

    // Live Server를 index.html에서 오픈할 경우
    if (pathName === "/index.html") {
        window.history.pushState({}, "", "/");
    }
    if (path.length == 0) {
        path = "/";
    }

    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("root").innerHTML = html;

    // 특정 화면 렌더링 되자마자 DOM 조작 처리
    // 시윤님 코드 추가
    if (path === "/") {
        document.getElementById("profileImg").src =
            authService.currentUser.profileImg ?? "../assets/blankProfile.webp";

        getFeedList();
    }
    if (path === "profile") {
        // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
        document.getElementById("image").src =
            authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
        document.getElementById("nameText").innerHTML =
            authService.currentUser.displayName ?? "이름을 입력해주세요";
        getBirth();
        getText();
    }
};

export const goToProfile = () => {
    window.location.hash = "#profile";
};