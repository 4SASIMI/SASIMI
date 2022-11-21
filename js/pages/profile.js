// import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// Storage에서 이미지 저장 위치 지정.
// 현 코드에서는 userId 폴더 내에 파일명은 uuid(전세계 유일한 ID)로 설정
const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );
// 파일 저장 API. 파일 포맷이 data_url인 경우
uploadString(imgRef, imgDataUrl, "data_url");

// 파일 삭제
deleteObject(ref(storageService, attachmentUrl));

function editForm() {
  let name = document.getElementById('name');
  console.log(name);
}