import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { BsEnvelopeHeart } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import '@/components/header/header.css';
import { app } from '@/firebase';

const header = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        //서버에 user 데이터 전달, cookie에 저장
        //함수로 email, id, 이미지 전달
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Hcontainer">
      <BsEnvelopeHeart className="logo" />
      <FiLogIn className="login" onClick={handleLogin} />
      {/* 로그인 상태 true 일 경우 > 로그아웃 버튼 or 사용자정보 표시
      <GoSignOut className="logout" /> */}
    </div>
  );
};

export default header;
