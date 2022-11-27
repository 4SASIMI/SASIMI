import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { dbService } from '../firebase.js';

// export let bestTitle1;
// export let bestText1;
export const getSlide = async () => {
  let slideList = [];
  const q = query(
    collection(dbService, 'posts'),
    orderBy('totalView', 'desc'),
    limit(3)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const slideObj = {
      id: doc.id,
      ...doc.data(),
    };

    slideList.push(slideObj);
  });
  let bestTitle1 = slideList[0].title;
  let bestText1 = slideList[0].text;
  let bestView1 = slideList[0].totalView;
  let bestTitle2 = slideList[1].title;
  let bestText2 = slideList[1].text;
  let bestView2 = slideList[1].totalView;
  let bestTitle3 = slideList[2].title;
  let bestText3 = slideList[2].text;
  let bestView3 = slideList[2].totalView;
  console.log(bestTitle1, bestText1, bestView1);
  console.log(bestTitle2, bestText2, bestView2);
  console.log(bestTitle3, bestText3, bestView3);

  const temp_html = `
      <h1>BEST POST</h1>
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <h3>${bestTitle1}</h3>
          <h4>${bestText1}</h4>
          <div class="postView" style="text-align: end; padding: 10px;">${bestView1}</div>
        </div>
        <div class="carousel-item">
          <h3>${bestTitle2}</h3>
          <h4>${bestText2}</h4>
          <div class="postView" style="text-align: end; padding: 10px;">${bestView2}</div>
        </div>
        <div class="carousel-item">
          <h3>${bestTitle3}</h3>
          <h4>${bestText3}</h4>
          <div class="postView" style="text-align: end; padding: 10px;">${bestView3}</div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
      </div>
    `;
  document.getElementById('slide').innerHTML = temp_html;
};

// export const getFeedList = async () => {
//   let feedObjList = [];
//   const q = query(collection(dbService, 'posts'), orderBy('createdAt', 'desc'));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const feedObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     feedObjList.push(feedObj);
//   });

//   const feedList = document.getElementById('feed');

//   feedList.innerHTML = '';
//   feedObjList.forEach((feedObj) => {
//     const temp_html = `<div id="${
//       feedObj.id
//     }" class="card" onclick="goToPost(this)">
//                 <img class="cardProfile" src="${
//                   feedObj.profileImg ?? '/assets/blankProfile.webp'
//                 }"alt="profileImg" />
//                 <div class="cardTitle">
//                     <span class="tooltip">${feedObj.title}</span>
//                     ${feedObj.title}
//                 </div>
//                 <div class="cardContent">${feedObj.text}</div>
//                 <div class="cardDate">${new Date(feedObj.createdAt)
//                   .toString()
//                   .slice(0, 25)}</div>
//             </div>`;
//     const div = document.createElement('div');
//     div.classList.add(`mycard`);
//     div.innerHTML = temp_html;
//     feedList.appendChild(div);
