import {
    doc,
    updateDoc,
    deleteDoc,
    collection,
    orderBy,
    query,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export function cardMenu(idx) {
  console.log(idx)
    document.getElementById(`cardDropdown${idx}`).classList.toggle("show");
  }
  
  window.onclick = function(event) {
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

export const getPostList = async () => {
    console.log("겟포스트리스트 호출")
    let pstObjList = [];
    const q = query(
        collection(dbService, "posts"),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const postObj = {
            id: doc.id,
            ...doc.data(),
        };
        pstObjList.push(postObj);
    });
    const postList = document.getElementById("feed");
    const currentUid = authService.currentUser.uid;
    postList.innerHTML = "";
    pstObjList.forEach((pstObj,idx) => {
        const isOwner = currentUid === pstObj.creatorId;
        const temp_html = `
        <div class="${pstObj.id}">
            <div class="cardUserInfo">
                <img class="cardProfile" src="${pstObj.profileImg === null ? "../assets/blankProfile.webp" : pstObj.profileImg}"/>
                <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                    <button onclick="cardMenu(${idx})" class="cardDropdownBtn">●●●</button>
                        <div id="cardDropdown${idx}" class="cardDropdownContent">
                            <a onclick="onEditing(event)" class="editBtn btn btn-dark"></a>
                            <a name="${pstObj.id}" onclick="deletePost(event)" class="deleteBtn btn btn-dark"></a>
                        </div>
                    </button>
                </div>
            </div>
            <div class="cardTitle">
                <span class="tooltip">${pstObj.title}</span>
                ${pstObj.title}
            </div>
            <div class="cardContent">${pstObj.text}</div>
            <div class="cardDate">${new Date(pstObj.createdAt).toString().slice(4, 15)}</div>
        </div>
   `;
        const div = document.createElement("div");
        div.classList.add("mycard");
        div.innerHTML = temp_html;
        postList.appendChild(div);

        if (pstObjList.length < 12){
          document.getElementById("moreBtn").style.display = "none"
        } else {
          document.getElementById("moreBtn").style.display = "inline-block"
          if (pstObjList.length > 12){
            document.getElementById("feed:nth-chi")
          }
        }
    });
};

// export const updatePost = async (event) => {
//     event.preventDefault();
//     const newPost = event.target.parentNode.children[0].value;
//     const id = event.target.parentNode.id;
  
//     const parentNode = event.target.parentNode.parentNode;
//     const postText = parentNode.children[0];
//     postText.classList.remove("noDisplay");
//     const postInputP = parentNode.children[1];
//     postInputP.classList.remove("d-flex");
//     postInputP.classList.add("noDisplay");
  
//     const postRef = doc(dbService, "posts", id);
//     try {
//       await updateDoc(postRef, { text: newPost });
//       getPostList();
//     } catch (error) {
//       alert(error);
//     }
//   };
  
  
export const deletePost = async (event) => {
    event.preventDefault();
    const id = event.target.name;
    const ok = window.confirm("정말 삭제하시겠습니까?🥺");
    if (ok) {
      try {
        await deleteDoc(doc(dbService, "posts", id));
        getPostList();
      } catch (error) {
        alert(error);
      }
    }
  };
  
  export function moreBtn() {

  }