export function mobileMenu() {
  console.log("모바일 메뉴")
  document.getElementById("cardDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    console.log("이벤트 함수")
    if (!event.target.matches('.cardDropdownBtn')) {
      var dropdowns = document.getElementsByClassName("cardDropdownContent");
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