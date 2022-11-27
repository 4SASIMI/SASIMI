// import { collection, getDocs, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// import { dbService } from "../firebase.js";

// // export let bestTitle1;
// // export let bestText1;
// export const getSlide = async () => {
//   let slideList = [];
//   const q = query(
//     collection(dbService, "posts"),
//     orderBy("totalView", "desc"),
//     limit(3),
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const slideObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     console.log(slideObj);
//     // let bestTitle = slideObj.title;
//     // let bestView = slideObj.text;
//     // console.log(bestTitle, bestView);
//     slideList.push(slideObj);
//     // console.log(slideList);
//     // console.log(slideList[0]);
//     // console.log(slideList);
//   });
//   // console.log(slideList[0].title);
//   // console.log(slideList[0].text);
//   // bestTitle1 = slideList[0].title
//   // bestText1 = slideList[0].text
//   let bestTitle1 = slideList[0].title;
//   let bestText1 = slideList[0].text;
//   let bestView1 = slideList[0].totalView;
//   let bestTitle2 = slideList[1].title;
//   let bestText2 = slideList[1].text;
//   let bestView2 = slideList[1].totalView;
//   let bestTitle3 = slideList[2].title;
//   let bestText3 = slideList[2].text;
//   let bestView3 = slideList[2].totalView;
//   console.log(bestTitle1, bestText1, bestView1);
//   console.log(bestTitle2, bestText2, bestView2);
//   console.log(bestTitle3, bestText3, bestView3);
//   // document.getElementById("bestTitle1").innerHTML = bestTitle1 ?? "미정";
//   // document.getElementById("bestText1").innerHTML = bestText1 ?? "미정";

//   const temp_html = `
//       <h1>베스트 토픽 슬라이드</h1>
//       <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
//       <div class="carousel-indicators">
//         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//       </div>
//       <div class="carousel-inner">
//         <div class="carousel-item active">
//           <h3>${bestTitle1}</h3></br>
//           <h4>${bestText1}</h4>
//           <div style="text-align: end; padding: 10px;">조회수: ${bestView1}</div>
//         </div>
//         <div class="carousel-item">
//           <h3>${bestTitle2}</h3></br>
//           <h4>${bestText2}</h4>
//           <div style="text-align: end; padding: 10px;">조회수: ${bestView2}</div>
//         </div>
//         <div class="carousel-item">
//           <h3>${bestTitle3}</h3></br>
//           <h4>${bestText3}</h4>
//           <div style="text-align: end; padding: 10px;">조회수: ${bestView3}</div>
//       </div>
//       <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span class="visually-hidden">Previous</span>
//       </button>
//       <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//         <span class="carousel-control-next-icon" aria-hidden="true"></span>
//         <span class="visually-hidden">Next</span>
//       </button>
//       </div>
//     `;
//   // document.getElementById("slide").style.display="block";
//   document.getElementById("slide").innerHTML = temp_html;
// }
