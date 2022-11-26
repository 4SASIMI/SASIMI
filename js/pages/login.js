import { emailRegex, pwRegex } from '../util.js';
import { authService } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
// import { getAuth, updatePassword } from "firebase/auth";
// 로그인 성공 시 홈 화면으로 이동
export const handleAuth = (event) => {
  console.log('handleAuth: 작동');
  event.preventDefault();
  const email = document.getElementById('email');
  const emailVal = email.value;
  const pw = document.getElementById('password');
  const pwVal = pw.value;
  // const pwConfirm = document.getElementById("confirmPassword");
  // const pwConfirmVal = pwConfirm.value;

  // 유효성 검사 진행
  if (!emailVal) {
    alert('이메일을 입력해 주세요');
    email.focus();
    return;
  }
  if (!pwVal) {
    alert('비밀번호를 입력해 주세요');
    pw.focus();
    return;
  }

  const matchedEmail = emailVal.match(emailRegex);
  const matchedPw = pwVal.match(pwRegex);
  // const matchedpwConfirm = pwConfirmVal.match(pwVal);
  if (matchedEmail === null) {
    alert('이메일 형식에 맞게 입력해 주세요');
    email.focus();
    return;
  }
  if (matchedPw === null) {
    alert('비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다');
    pw.focus();
    return;
  }
  // 비밀번호 확인
  // if (pwVal !== pwConfirmVal) {
  //     confirmPassword.setCustomValidity("비밀번호가 일치하지 않습니다")
  //     pwConfirm.focus();
  //     return;
  // }
  // if (pwVal === pwConfirmVal) {
  //     confirmPassword.setCustomValidity("")
  //     return
  // }

  // 유효성 검사 통과 후 로그인 또는 회원가입 API 요청
  // 로그인, 회원가입 버튼 아이디는 loginBtn입니당..
  const loginBtnText = document.querySelector('#loginBtn').value;
  if (loginBtnText === '로그인') {
    // 유효성검사 후 로그인 성공 시 홈 화면으로

    signInWithEmailAndPassword(authService, emailVal, pwVal)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.hash = '#home';
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('errorMessage:', errorMessage);
        if (errorMessage.includes('user-not-found')) {
          alert('가입되지 않은 회원입니다.');
          return;
        } else if (errorMessage.includes('wrong-password')) {
          alert('비밀번호가 잘못 되었습니다.');
        }
      });
  }
  if (loginBtnText === '회원가입') {
    // 회원가입 버튼 클릭의 경우
    createUserWithEmailAndPassword(authService, emailVal, pwVal)
      .then((userCredential) => {
        // Signed in
        console.log('회원가입 성공!');
        window.location.hash = '#home';
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('errorMessage:', errorMessage);
        if (errorMessage.includes('email-already-in-use')) {
          alert('이미 가입된 이메일입니다.');
        }
      });
  }
};

export const socialLogin = (event) => {
  const { name } = event.target;
  let provider;

  if (name === 'google') {
    provider = new GoogleAuthProvider();
  } else if (name === 'github') {
    provider = new GithubAuthProvider();
  }
  signInWithPopup(authService, provider)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log('error:', error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// 홈 화면 드롭다운 버튼 기능
export function onToggle() {
  let ulElementBeforeLogin = document.querySelector('.navbarBeforeLogin');
  let ulElementAfterLogin = document.querySelector('.navbarUserAccountMenu');

  // 사용자 상태 확인
  authService.onAuthStateChanged((user) => {
    if (user) {
      ulElementAfterLogin.classList.toggle('active');
    } else {
      ulElementBeforeLogin.classList.toggle('active');
    }
  });
}

export const logout = () => {
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      console.log('로그아웃 성공');
      // 이게 최선,,??
      let ulElementBeforeLogin = document.querySelector('.navbarBeforeLogin');
      let ulElementAfterLogin = document.querySelector(
        '.navbarUserAccountMenu'
      );
      ulElementAfterLogin.classList.remove('active');
      ulElementBeforeLogin.classList.remove('active');
    })
    .catch((error) => {
      // An error happened.
      console.log('error:', error);
    });
};