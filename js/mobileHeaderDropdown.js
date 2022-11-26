import { onToggle } from "./pages/login.js";

export function mobileMenu() {
  console.log("모바일 메뉴")
  document.getElementById("mobileDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  console.log("이벤트 함수")
  if (!event.target.matches('.mobileDropdownBtn')) {
    var dropdowns = document.getElementsByClassName("mobileDropdownContent");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.mobileMenu = mobileMenu;
window.onToggle = onToggle;