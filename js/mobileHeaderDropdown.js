/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function mobileMenu() {
  console.log(document.getElementById("mobileDropdown"))
  document.getElementById("mobileDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    console.log("드롭다운 닫기")
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