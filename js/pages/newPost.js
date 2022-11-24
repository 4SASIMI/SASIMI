import { addDoc,  collection } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { dbService, authService } from '../firebase.js';

export const savePost = async (event) => {
  event.preventDefault();
  const post = document.getElementById('writePost');
  const title = document.getElementById('writeTitle');
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, 'posts'), {
      title: title.value,
      text: post.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    post.value = '';
  } catch (error) {
    alert(error);
    console.log('error in addDoc:', error);
  }
};