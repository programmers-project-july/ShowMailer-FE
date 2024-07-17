import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import '@/components/header/Header.css';
import { BsEnvelopeHeart } from 'react-icons/bs';
import { IoMdPerson } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';
import { app } from '@/firebase';

const Header = () => {
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
      <p className="logoTitle">서울 문화공연 알리미</p>
      <FiLogIn className="login" onClick={handleLogin} />
      {/* 로그인 상태 true 일 경우 > 사용자정보 표시
      <IoMdPerson className="logout" /> */}
    </div>
  );
};

export default Header;
